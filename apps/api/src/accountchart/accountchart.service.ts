import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { Prisma,AccountType } from "../../generated/prisma";

import { PrismaService } from "../prisma/prisma.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { QueryAccountsDto } from "./dto/query-accounts.dto";

@Injectable()
export class ChartOfAccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAccountDto) {
    const code = dto.code.trim();
    const name = dto.name.trim();

    const existing = await this.prisma.account.findUnique({
      where: { code },
    });

    if (existing) {
      throw new ConflictException(
        `An account with code ${code} already exists.`,
      );
    }

    // Account creation must not let an ordinary admin introduce
    // privileged/system accounts.
    if (dto.isSystem) {
      throw new BadRequestException(
        "System accounts must be provisioned through an authorized process.",
      );
    }

    return this.prisma.account.create({
      data: {
        code,
        name,
        type: dto.type,
        balance: dto.balance,
      
      },
    });
  }


  async getSummary() {
  const [totalAccounts, accountsByType] = await Promise.all([
    this.prisma.account.count(),
    this.prisma.account.groupBy({
      by: ["type"],
      _count: {
        _all: true,
      },
      orderBy: {
        type: "asc",
      },
    }),
  ]);

  const summary = {
    totalAccounts,
    assets: 0,
    liabilities: 0,
    equity: 0,
    revenue: 0,
    expenses: 0,
  };

  for (const item of accountsByType) {
    const count = item._count;

    const total =
      typeof count === "object" && count !== null
        ? count._all ?? 0
        : 0;

    switch (item.type) {
      case "ASSET":
        summary.assets = total;
        break;
      case "LIABILITY":
        summary.liabilities = total;
        break;
      case "EQUITY":
        summary.equity = total;
        break;
      case "REVENUE":
        summary.revenue = total;
        break;
      case "EXPENSE":
        summary.expenses = total;
        break;
    }
  }

  return summary;
}

  async findAll(query: QueryAccountsDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    const where: Prisma.AccountWhereInput = {
      ...(query.type ? { type: query.type } : {}),
      ...(query.search
        ? {
            OR: [
              {
                code: {
                  contains: query.search,
                  mode: "insensitive",
                },
              },
              {
                name: {
                  contains: query.search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.account.findMany({
        where,
        orderBy: [{ code: "asc" }],
        skip,
        take: limit,
      }),
      this.prisma.account.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const account = await this.prisma.account.findUnique({
      where: { id },
    });

    if (!account) {
      throw new NotFoundException("Account not found.");
    }

    return account;
  }

  async update(id: string, dto: UpdateAccountDto) {
    const account = await this.findOne(id);

    
    // Do not change an account's accounting classification after it
    // has been used without an explicit accounting migration process.
    const hasLedgerHistory = await this.prisma.ledgerEntry.findFirst({
      where: { accountId: id },
      select: { id: true },
    });

    if (
      hasLedgerHistory &&
      (dto.type !== undefined ||
        dto.balance !== undefined)
    ) {
      throw new BadRequestException(
        "Account type and normal balance cannot be changed after the account has journal history.",
      );
    }

    return this.prisma.account.update({
      where: { id },
      data: {
        ...(dto.name !== undefined ? { name: dto.name.trim() } : {}),
        ...(dto.description !== undefined
          ? { description: dto.description?.trim() || null }
          : {}),
        ...(dto.type !== undefined ? { type: dto.type } : {}),
        ...(dto.balance !== undefined
          ? { balance: dto.balance }
          : {}),
      },
    });
  }

}