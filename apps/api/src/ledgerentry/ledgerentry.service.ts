
import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma ,TransactionStatus} from "../../generated/prisma";
import { randomUUID } from "crypto";
import { CreateLedgerEntryDto } from "./dto/create-ledger-entry.dto";
import { QueryLedgerEntriesDto } from "./dto/query-ledger-entries.dto";


@Injectable()
export class LedgerEntriesService {
  constructor(private readonly prisma: PrismaService) {}

  private makeReference(prefix = "ACC") {
    return `${prefix}-${randomUUID()}`;
  }

  private balanceChange(
    type: "ASSET" | "LIABILITY" | "EQUITY" | "REVENUE" | "EXPENSE",
    direction: "DEBIT" | "CREDIT",
    amount: Prisma.Decimal,
  ) {
    const debitIncreasesBalance =
      type === "ASSET" || type === "EXPENSE";

    const increasesBalance =
      (direction === "DEBIT" && debitIncreasesBalance) ||
      (direction === "CREDIT" && !debitIncreasesBalance);

    return increasesBalance ? amount : amount.negated();
  }

  async create(dto: CreateLedgerEntryDto) {
    const currency = dto.currency ?? "NGN";

    const preparedLines = dto.lines.map((line) => ({
      accountId: line.accountId,
      direction: line.direction,
      amount: new Prisma.Decimal(line.amount),
    }));

    for (const line of preparedLines) {
      if (!line.amount.isFinite() || line.amount.lte(0)) {
        throw new BadRequestException(
          "Every ledger line must have a positive amount.",
        );
      }
    }

    const debitTotal = preparedLines
      .filter((line) => line.direction === "DEBIT")
      .reduce((sum, line) => sum.plus(line.amount), new Prisma.Decimal(0));

    const creditTotal = preparedLines
      .filter((line) => line.direction === "CREDIT")
      .reduce((sum, line) => sum.plus(line.amount), new Prisma.Decimal(0));

    if (debitTotal.isZero() || creditTotal.isZero()) {
      throw new BadRequestException(
        "A journal entry must contain both debit and credit lines.",
      );
    }

    if (!debitTotal.equals(creditTotal)) {
      throw new BadRequestException(
        "Total debits must equal total credits.",
      );
    }

    const accountIds = [...new Set(preparedLines.map((line) => line.accountId))];

    // if (accountIds.length !== preparedLines.length) {
      // A journal can legitimately contain multiple lines for one account.
      // Repeated account IDs are therefore allowed; this check is not required.
    // }

    return this.prisma.$transaction(async (tx) => {
      const accounts = await tx.account.findMany({
        where: { id: { in: accountIds } },
      });

      if (accounts.length !== accountIds.length) {
        throw new BadRequestException(
          "One or more ledger accounts do not exist.",
        );
      }

      const accountById = new Map(
        accounts.map((account) => [account.id, account]),
      );

      for (const account of accounts) {
        if (account.currency !== currency) {
          throw new BadRequestException(
            `Account ${account.code} uses ${account.currency}, not ${currency}.`,
          );
        }
      }

      const transaction = await tx.transaction.create({
        data: {
          reference: this.makeReference(),
          type: "ADJUSTMENT",
          status: TransactionStatus.SUCCESS,
          amount: debitTotal,
          currency,
          description: dto.description,
          ledgerEntries: {
            create: preparedLines.map((line) => ({
              accountId: line.accountId,
              amount: line.amount,
              direction: line.direction,
            })),
          },
        },
        include: { ledgerEntries: true },
      });

      // Update normal balances atomically with the ledger transaction.
      for (const line of preparedLines) {
        const account = accountById.get(line.accountId)!;

        const change = this.balanceChange(
          account.type,
          line.direction,
          line.amount,
        );

        await tx.account.update({
          where: { id: account.id },
          data: {
            balance: { increment: change },
          },
        });
      }

      return transaction;
    });
  }

  async reverse(id: string, reason: string) {
    if (!reason?.trim()) {
      throw new BadRequestException("A reversal reason is required.");
    }

    return this.prisma.$transaction(async (tx) => {
      const original = await tx.transaction.findUnique({
        where: { id },
        include: {
          ledgerEntries: {
            include: { account: true },
          },
        //   reversal: true,
        },
      });

      if (!original) {
        throw new NotFoundException("Transaction not found.");
      }

      if (original.status !== "SUCCESS") {
        throw new BadRequestException(
          "Only successful transactions can be reversed.",
        );
      }

    //   if (original.reversal) {
    //     throw new ConflictException(
    //       "This transaction has already been reversed.",
    //     );
    //   }

      if (original.ledgerEntries.length < 2) {
        throw new BadRequestException(
          "The original transaction does not have enough ledger entries to reverse.",
        );
      }

      const debitTotal = original.ledgerEntries
        .filter((entry) => entry.direction === "DEBIT")
        .reduce(
          (sum, entry) => sum.plus(entry.amount),
          new Prisma.Decimal(0),
        );

      const creditTotal = original.ledgerEntries
        .filter((entry) => entry.direction === "CREDIT")
        .reduce(
          (sum, entry) => sum.plus(entry.amount),
          new Prisma.Decimal(0),
        );

      if (!debitTotal.equals(creditTotal)) {
        throw new BadRequestException(
          "The original ledger transaction is not balanced.",
        );
      }

      const reversal = await tx.transaction.create({
        data: {
          reference: this.makeReference("REV"),
          type: "REVERSAL",
          status: TransactionStatus.SUCCESS,
          amount: original.amount,
          currency: original.currency,
          description: `Reversal of ${original.reference}: ${reason.trim()}`,
        //   reversalOfId: original.id,
          metadata: {
            originalReference: original.reference,
            reason: reason.trim(),
          },
          ledgerEntries: {
            create: original.ledgerEntries.map((entry) => ({
              accountId: entry.accountId,
              amount: entry.amount,
              direction: entry.direction === "DEBIT" ? "CREDIT" : "DEBIT",
            })),
          },
        },
        include: { ledgerEntries: true },
      });

      for (const entry of original.ledgerEntries) {
        const change = this.balanceChange(
          entry.account.type,
          entry.direction === "DEBIT" ? "CREDIT" : "DEBIT",
          entry.amount,
        );

        await tx.account.update({
          where: { id: entry.accountId },
          data: {
            balance: { increment: change },
          },
        });
      }

      await tx.transaction.update({
        where: { id: original.id },
        data: { status: TransactionStatus.REVERSED },
      });

      return reversal;
    });
  }


  async findAll(query: QueryLedgerEntriesDto) {
  const {
    page = 1,
    limit = 20,
    accountId,
    transactionId,
    direction,
    fromDate,
    toDate,
    search,
  } = query;

  if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
    throw new BadRequestException(
      "fromDate must be earlier than or equal to toDate.",
    );
  }

  const createdAt: Prisma.DateTimeFilter = {};

  if (fromDate) {
    createdAt.gte = new Date(fromDate);
  }

  if (toDate) {
    createdAt.lte = new Date(toDate);
  }

  const where: Prisma.LedgerEntryWhereInput = {
    ...(accountId && { accountId }),
    ...(transactionId && { transactionId }),
    ...(direction && { direction }),
    ...(fromDate || toDate ? { createdAt } : {}),
    ...(search && {
      transaction: {
        is: {
          OR: [
            {
              reference: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
      },
    }),
  };

  const skip = (page - 1) * limit;

  const [total, entries] = await this.prisma.$transaction([
    this.prisma.ledgerEntry.count({ where }),
    this.prisma.ledgerEntry.findMany({
      where,
      skip,
      take: limit,
      orderBy: [
        { createdAt: "desc" },
        { id: "desc" },
      ],
      include: {
        account: {
          select: {
            id: true,
            code: true,
            name: true,
            type: true,
            currency: true,
          },
        },
        transaction: {
          select: {
            id: true,
            reference: true,
            type: true,
            status: true,
            amount: true,
            currency: true,
            description: true,
            createdAt: true,
            // createdById: true,
            // reversedById: true,
            // reversedAt: true,
            // reversalOfId: true,
          },
        },
      },
    }),
  ]);

  return {
    data: entries.map((entry) => ({
      id: entry.id,
      transactionId: entry.transactionId,
      accountId: entry.accountId,
      amount: entry.amount.toString(),
      direction: entry.direction,
      balanceBefore: entry.balanceBefore?.toString() ?? null,
      balanceAfter: entry.balanceAfter?.toString() ?? null,
      createdAt: entry.createdAt.toISOString(),
      account: entry.account,
      transaction: {
        ...entry.transaction,
        amount: entry.transaction.amount.toString(),
        createdAt: entry.transaction.createdAt.toISOString(),
      },
    })),
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

  async findOne(id: string) {
    const transaction = await this.prisma.transaction.findUniqueOrThrow({
      where: { id },
      include: {
        ledgerEntries: {
          include: {
            account: {
              select: {
                id: true,
                code: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    const lines = transaction.ledgerEntries.map((entry) => ({
      id: entry.id,
      accountId: entry.accountId,
      accountCode: entry.account.code,
      accountName: entry.account.name,
      direction: entry.direction,
      debit:
        entry.direction === "DEBIT" ? entry.amount.toString() : "0.00",
      credit:
        entry.direction === "CREDIT" ? entry.amount.toString() : "0.00",
    }));

    const totalDebit = transaction.ledgerEntries
      .filter((entry) => entry.direction === "DEBIT")
      .reduce(
        (total, entry) => total.plus(entry.amount),
        new Prisma.Decimal(0),
      );

    const totalCredit = transaction.ledgerEntries
      .filter((entry) => entry.direction === "CREDIT")
      .reduce(
        (total, entry) => total.plus(entry.amount),
        new Prisma.Decimal(0),
      );

    return {
      id: transaction.id,
      reference: transaction.reference,
      description: transaction.description,
      type: transaction.type,
      status: transaction.status,
      currency: transaction.currency,
      amount: transaction.amount.toString(),
      createdAt: transaction.createdAt.toISOString(),
      lines,
      totalDebit: totalDebit.toString(),
      totalCredit: totalCredit.toString(),
    };
  }

  async getSummary() {
  const [totalEntries, debits, credits] = await this.prisma.$transaction([
    this.prisma.ledgerEntry.count(),

    this.prisma.ledgerEntry.aggregate({
      where: { direction: "DEBIT" },
      _sum: { amount: true },
    }),

    this.prisma.ledgerEntry.aggregate({
      where: { direction: "CREDIT" },
      _sum: { amount: true },
    }),
  ]);

  return {
    totalEntries,
    totalDebits: debits._sum.amount ?? 0,
    totalCredits: credits._sum.amount ?? 0,
  };
}
}
