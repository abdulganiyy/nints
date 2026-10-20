import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { JwtGuard } from '../common/guards/jwt.guard';
import { WalletService } from './wallet.service';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('wallet')
@UseGuards(JwtGuard)
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get()
  getUserWallet(@GetUser() user: any) {
    return this.walletService.getUserWallet(user.userId);
  }


  @Post('withdraw')
  withdraw(
    @Body()
    dto: {
      walletId: string;
      amount: string;
      providerReference: string;
    },
  ) {
    return this.walletService.withdraw(dto);
  }
}
