import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { LedgerEntriesController } from './ledgerentry.controller';
import { LedgerEntriesService } from './ledgerentry.service';


@Module({
  imports: [PrismaModule],
  controllers: [LedgerEntriesController],
  providers: [LedgerEntriesService],
  exports: [],
})
export class LedgerEntriesModule {}
