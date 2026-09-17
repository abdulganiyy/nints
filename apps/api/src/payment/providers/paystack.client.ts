import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaystackClient {
  private readonly client: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.client = axios.create({
      baseURL: 'https://api.paystack.co',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.configService.getOrThrow<string>('PAYSTACK_SECRET_KEY')}`,
      },
    });
  }

  async createCustomer(data: {
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
  }) {
    const response = await this.client.post('/customer', {
      ...data,
    });

    return response;
  }

  async createVirtualAccount(customerId: string) {
    const response = await this.client.post('/dedicated_account', {
      customer: customerId,
      preferred_bank: this.configService.getOrThrow<string>('PAYSTACK_BANK'),
    });

    return response;
  }
}
