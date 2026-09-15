import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { JwtGuard } from '../common/guards/jwt.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { TransactionService } from './transaction.service';

@Controller('transaction')
@UseGuards(JwtGuard)
export class TransactionController {
  constructor(private walletService: TransactionService) {}

  @Get()
  getUserTransactions(@GetUser('userId') userId: string) {
    return this.walletService.getUserTransactions(userId);
  }
}
