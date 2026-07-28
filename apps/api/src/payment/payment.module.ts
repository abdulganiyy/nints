import { Module } from '@nestjs/common';
import { PaymentProvider } from './payment.interface';
import { PaystackService } from './providers/Paystack.provider';

@Module({
  controllers: [],
  providers: [{ provide: PaymentProvider, useClass: PaystackService }],
  exports: [PaymentProvider],
})
export class PaymentModule {}
