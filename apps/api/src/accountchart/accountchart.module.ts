import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ChartOfAccountsController } from './accountchart.controller';
import { ChartOfAccountsService } from './accountchart.service';

@Module({
  imports: [PrismaModule],
  controllers: [ChartOfAccountsController],
  providers: [ChartOfAccountsService],
  exports: [],
})
export class ChartOfAccountsModule {}
