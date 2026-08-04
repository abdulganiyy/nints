import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, PrismaClient } from '@prisma/client/extension';

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

@Injectable()
export class WalletService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, db: PrismaExecutor = this.prismaService) {
    return db.wallet.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        userId,

        balance: 0,

        currency: 'NGN',

        status: 'ACTIVE',
      },
    });
  }
}
