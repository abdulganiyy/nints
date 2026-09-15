import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, PrismaClient } from '../../generated/prisma';

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
}
