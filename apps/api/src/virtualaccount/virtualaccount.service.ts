import { Injectable } from '@nestjs/common';
import { PaymentProvider } from '../payment/payment.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VirtualAccountService {
  constructor(
    private readonly paymentProvider: PaymentProvider,
    private readonly prismaService: PrismaService,
  ) {}

  async create(walletId: string, userId: string) {
    const account = await this.paymentProvider.createVirtualAccount(userId);

    return this.prismaService.virtualAccount.create({
      data: {
        walletId,

        provider: account.provider,

        bankName: account.bankName,

        accountName: account.accountName,

        accountNumber: account.accountNumber,
      },
    });
  }
}
