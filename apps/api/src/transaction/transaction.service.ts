import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, PrismaClient } from '../../generated/prisma';
import { GetTransactionsDto } from './dto/get-transactions.dto';

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserTransactions(userId: string) {
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        ledgerEntries: {
          some: {
            account: {
              wallet: {
                userId,
              },
            },
          },
        },
      },

      include: {
        ledgerEntries: {
          where: {
            account: {
              wallet: {
                userId,
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    return transactions;
  }

  async getAllTransactions(query: GetTransactionsDto) {
  const page = Math.max(1, query.page ?? 1);
  const limit = Math.min(100, Math.max(1, query.limit ?? 20));
  const skip = (page - 1) * limit;

  const where: Prisma.TransactionWhereInput = {
    ...(query.status ? { status: query.status } : {}),
    ...(query.type ? { type: query.type } : {}),
  };

  const [transactions, total] =
    await this.prismaService.$transaction([
      this.prismaService.transaction.findMany({
        where,
        select: {
          id: true,
          reference: true,
          type: true,
          status: true,
          amount: true,
          currency: true,
          description: true,
          createdAt: true,
          updatedAt: true,

          ledgerEntries: {
            select: {
              id: true,
              direction: true,
              amount: true,
              balanceBefore: true,
              balanceAfter: true,
              // description: true,
              createdAt: true,
              account: {
                select: {
                  id: true,
                  code: true,
                  name: true,
                  currency: true,
                  wallet: {
                    select: {
                      user: {
                        select: {
                          id: true,
                          fullname: true,
                          email: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: [
          { createdAt: 'desc' },
          { id: 'desc' },
        ],
        skip,
        take: limit,
      }),

      this.prismaService.transaction.count({ where }),
    ]);

  return {
    data: transactions,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}}
