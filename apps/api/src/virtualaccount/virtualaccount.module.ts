import { Module } from '@nestjs/common';
import { VirtualAccountService } from './virtualaccount.service';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [PaymentModule],
  providers: [VirtualAccountService],
  exports: [VirtualAccountService],
})
export class VirtualAccountModule {}
