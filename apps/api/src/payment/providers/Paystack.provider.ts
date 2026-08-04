import { Injectable, Logger } from '@nestjs/common';
import { PaymentProvider } from '../payment.interface';
import axios from 'axios';
import { PrismaService } from '../../prisma/prisma.service';
import { VirtualAccountService } from '../../virtualaccount/virtualaccount.service';
import { AxiosError } from 'axios';

@Injectable()
export class PaystackService implements PaymentProvider {
  private readonly logger = new Logger(PaystackService.name);

  constructor(
    private prismaService: PrismaService,
    private virtualaccountService: VirtualAccountService,
  ) {}

  async createCustomer(data: {
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
  }) {
    const response = await axios.post(
      'https://api.paystack.co/customer',

      {
        ...data,
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_TEST_KEY}`,
        },
      },
    );

    return response.data.data.customer_code;
  }

  async createVirtualAccount(customerId: string) {
    const response = await axios.post(
      'https://api.paystack.co/dedicated_account',

      {
        customer: customerId,
        preferred_bank: 'titan-paystack',
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_TEST_KEY}`,
        },
      },
    );

    return {
      provider: response.data.data.bank.id,

      bankName: response.data.data.bank.name,

      accountNumber: response.data.data.account_number,

      accountName: response.data.data.account_name,
    };
  }

  async provisionAccount(userId: string) {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { id: userId },
        select: {
          paystackCustomerId: true,
          email: true,
          fullname: true,
          phone: true,
          wallet: {
            select: {
              id: true,
            },
          },
        },
      });

      let customer_code =
        user.paystackCustomerId ??
        (await this.createCustomer({
          email: user.email,
          first_name: user.fullname.split(' ')[0],
          last_name: user.fullname.split(' ')[1],
          phone: user.phone ?? undefined,
        }));

      await this.prismaService.user.update({
        where: { id: userId },
        data: {
          status: 'ACTIVE',
          paystackCustomerId: customer_code,
        },
      });

      const createdAccount = await this.createVirtualAccount(customer_code);

      await this.virtualaccountService.create(user.wallet!.id, createdAccount);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(error.message);
      } else if (error instanceof AxiosError) {
        this.logger.error(error.response?.data);
      } else {
        this.logger.error('Error provisioning paystack account', String(error));
      }
    }
  }
}
