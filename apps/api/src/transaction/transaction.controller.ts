import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { JwtGuard } from '../common/guards/jwt.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { TransactionService } from './transaction.service';
import { Roles } from '../common/decorators/roles.decorator';
import { GetTransactionsDto } from './dto/get-transactions.dto';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('transaction')
@UseGuards(JwtGuard,RolesGuard)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  getUserTransactions(@GetUser('userId') userId: string) {
    return this.transactionService.getUserTransactions(userId);
  }

  @Get('admin')
  @Roles('SUPER_ADMIN', 'ADMIN')
  getAllTransactions(@Query() query: GetTransactionsDto) {
    return this.transactionService.getAllTransactions(query);
  }
}
