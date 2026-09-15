import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  controllers: [TransactionController],
  imports: [PrismaModule],
  providers: [TransactionService],
  exports: [],
})
export class TransactionModule {}
