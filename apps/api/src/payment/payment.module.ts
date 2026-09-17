import { Module } from '@nestjs/common';
import { PaymentProvider } from './payment.interface';
import { PaystackService } from './providers/paystack.provider';
import { PaymentQueue } from './payment.queue';
import { PaymentWorker } from './payment.worker';
import { VirtualAccountModule } from '../virtualaccount/virtualaccount.module';
import { BullModule } from '@nestjs/bullmq';
import { PAYMENT_QUEUE } from './payment.constants';
import { PaystackClient } from './providers/paystack.client';

@Module({
  imports: [
    BullModule.registerQueue({
      name: PAYMENT_QUEUE,
    }),
    VirtualAccountModule,
  ],
  controllers: [],
  providers: [
    { provide: PaymentProvider, useClass: PaystackService },
    PaymentQueue,
    PaymentWorker,
    PaystackClient,
  ],
  exports: [PaymentProvider, PaymentQueue],
})
export class PaymentModule {}
