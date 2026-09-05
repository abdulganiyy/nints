import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import * as crypto from 'crypto';

import { PrismaService } from '../prisma/prisma.service';

import { PaystackChargeSuccessEvent } from './type/paystack-charge-success.type';

@Injectable()
export class PaystackWebhookService {
  private readonly secretKey = process.env.PAYSTACK_SECRET_TEST_KEY!;

  constructor(private readonly prisma: PrismaService) {}

  async handle(
    rawBody: Buffer | undefined,
    body: PaystackChargeSuccessEvent,
    signature: string,
  ) {
    /**
     * 1. Verify Paystack signature
     */
    if (!this.verifySignature(rawBody, signature)) {
      throw new UnauthorizedException('Invalid Paystack signature');
    }

    /**
     * 2. Ignore events we don't care about
     */
    if (body.event !== 'charge.success') {
      return;
    }

    /**
     * 3. Only process successful transactions
     */
    if (body.data.status !== 'success') {
      return;
    }

    /**
     * 4. Only process DVA transfers here
     */
    if (body.data.channel !== 'dedicated_nuban') {
      return;
    }

    /**
     * 5. Process deposit
     */
    await this.processDedicatedAccountCredit(body);

    return {
      status: true,
    };
  }

  private verifySignature(
    rawBody: Buffer | undefined,
    signature: string,
  ): boolean {
    if (!rawBody || !signature) {
      return false;
    }

    const hash = crypto
      .createHmac('sha512', this.secretKey)
      .update(rawBody)
      .digest('hex');

    const hashBuffer = Buffer.from(hash, 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (hashBuffer.length !== signatureBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(hashBuffer, signatureBuffer);
  }

  private async processDedicatedAccountCredit(
    event: PaystackChargeSuccessEvent,
  ) {
    const data = event.data;

    const reference = data.reference;

    /**
     * Paystack sends amount in kobo.
     *
     * Example:
     *
     * 500000 = ₦5,000
     */
    const amount = data.amount / 100;

    if (amount <= 0) {
      throw new BadRequestException('Invalid transaction amount');
    }

    /**
     * Identify the virtual account.
     */
    const accountNumber = data.authorization?.receiver_bank_account_number;

    if (!accountNumber) {
      throw new BadRequestException('Receiver virtual account number missing');
    }

    /**
     * Everything below happens atomically.
     */
    return this.prisma.$transaction(
      async (tx) => {
        /**
         * 1. Idempotency check
         */
        const existingTransaction = await tx.transaction.findUnique({
          where: {
            reference,
          },
        });

        if (existingTransaction) {
          return existingTransaction;
        }

        /**
         * 2. Find virtual account
         */
        const virtualAccount = await tx.virtualAccount.findUnique({
          where: {
            accountNumber,
          },
        });

        if (!virtualAccount) {
          throw new BadRequestException(
            `Virtual account ${accountNumber} not found`,
          );
        }

        /**
         * 3. Find wallet
         */
        const wallet = await tx.wallet.findUnique({
          where: {
            id: virtualAccount.walletId,
          },
        });

        if (!wallet) {
          throw new BadRequestException('Wallet not found');
        }

        /**
         * 4. Check wallet status
         */
        if (wallet.status !== 'ACTIVE') {
          throw new BadRequestException('Wallet is not active');
        }

        /**
         * 5. Find accounting accounts
         */

        // Customer's wallet liability account
        const customerWalletAccount = await tx.account.findFirst({
          where: {
            name: `Wallet - ${wallet.userId}`,

            type: 'LIABILITY',
          },
        });

        if (!customerWalletAccount) {
          throw new BadRequestException(
            'Customer wallet ledger account not found',
          );
        }

        // Bank / Cash account
        const bankAccount = await tx.account.findFirst({
          where: {
            name: 'Bank / Cash',
            type: 'ASSET',
          },
        });

        if (!bankAccount) {
          throw new BadRequestException('Paystack clearing account not found');
        }

        /**
         * 6. Create transaction
         */
        const transaction = await tx.transaction.create({
          data: {
            type: 'DEPOSIT',

            status: 'SUCCESS',

            amount,

            currency: data.currency,

            reference,

            description: 'Wallet funding via Paystack virtual account',

            metadata: {
              paystackTransactionId: data.id,
              paystackCustomerId: data.customer?.id,
              paystackCustomerCode: data.customer?.customer_code,

              virtualAccountNumber: accountNumber,

              senderName: data.authorization?.sender_name,

              senderBank: data.authorization?.sender_bank,

              senderBankAccount: data.authorization?.sender_bank_account_number,

              channel: data.channel,

              fees: data.fees ?? null,
            },
          },
        });

        /**
         * 7. Create DOUBLE-ENTRY ledger
         *
         * DR Bank / Cash
         * CR Customer Wallet
         */

        await tx.ledgerEntry.createMany({
          data: [
            {
              transactionId: transaction.id,

              accountId: bankAccount.id,

              direction: 'DEBIT',

              amount,
            },

            {
              transactionId: transaction.id,

              accountId: customerWalletAccount.id,

              direction: 'CREDIT',

              amount,
            },
          ],
        });

        /**
         * 8. Update wallet balance
         */
        await tx.wallet.update({
          where: {
            id: wallet.id,
          },

          data: {
            balance: {
              increment: amount,
            },
          },
        });

        /**
         * 9. Return transaction
         */
        return transaction;
      },
      {
        isolationLevel: 'Serializable',
      },
    );
  }
}
