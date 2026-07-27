import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string) {
    return this.prismaService.wallet.create({
      data: {
        userId,

        balance: 0,

        currency: 'NGN',

        status: 'ACTIVE',
      },
    });
  }
}
