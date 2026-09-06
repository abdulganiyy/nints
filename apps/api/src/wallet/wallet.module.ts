import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { PrismaModule } from '../prisma/prisma.module';
import { WalletController } from './wallet.controller';

@Module({
  controllers: [WalletController],
  imports: [PrismaModule],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
