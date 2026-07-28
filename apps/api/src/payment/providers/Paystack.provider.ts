import { Injectable } from '@nestjs/common';
import { PaymentProvider } from '../payment.interface';

@Injectable()
export class PaystackService implements PaymentProvider {
  async createVirtualAccount(userId: string) {
    // Call Paystack API

    return {
      provider: 'PAYSTACK',

      bankName: 'Wema Bank',

      accountNumber: '1234567890',

      accountName: 'John Doe',
    };
  }
}
