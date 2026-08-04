import { Injectable } from '@nestjs/common';
import { PaymentProvider } from '../payment/payment.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, PrismaClient } from '@prisma/client/extension';

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

@Injectable()
export class VirtualAccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    walletId: string,
    data: {
      provider: string;

      bankName: string;

      accountNumber: string;

      accountName: string;
    },
    db: PrismaExecutor = this.prismaService,
  ) {
    return db.virtualAccount.upsert({
      where: { walletId },
      data: {
        ...data,
        status: 'ACTIVE',
      },
    });
  }
}
