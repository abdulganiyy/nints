import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';

import * as crypto from 'crypto';

import { PrismaService } from '../prisma/prisma.service';

import { PaystackChargeSuccessEvent } from './type/paystack-charge-success.type';
import { ReferralService } from '../referral/referral.service';

@Injectable()
export class PaystackWebhookService {
  private readonly secretKey = process.env.PAYSTACK_SECRET_KEY!;

  private readonly logger = new Logger(PaystackWebhookService.name);

  constructor(
    private readonly prisma: PrismaService,
    private referralService: ReferralService,
  ) {}

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

    const amount = data.amount / 100;

    if (amount <= 0) {
      throw new BadRequestException('Invalid transaction amount');
    }

    const accountNumber = data.authorization?.receiver_bank_account_number;

    if (!accountNumber) {
      throw new BadRequestException('Receiver virtual account number missing');
    }

    /**
     * Everything below happens atomically.
     */
    const result: any = await this.prisma.$transaction(
      async (tx) => {
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

        const wallet = await tx.wallet.findUnique({
          where: {
            id: virtualAccount.walletId,
          },
          include: {
            account: true,
          },
        });

        if (!wallet) {
          throw new BadRequestException('Wallet not found');
        }

        if (wallet.status !== 'ACTIVE') {
          throw new BadRequestException('Wallet is not active');
        }

        const existingTransaction = await tx.transaction.findUnique({
          where: {
            reference,
          },
        });

        if (existingTransaction) {
          return {
            transaction: existingTransaction,
            userId: wallet.userId,
          };
        }

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

        const bankAccount = await tx.account.findFirst({
          where: {
            name: 'Bank / Cash',
            type: 'ASSET',
          },
        });

        if (!bankAccount) {
          throw new BadRequestException('Paystack clearing account not found');
        }

        const transactionFeeRevenueAccount = await tx.account.findFirst({
          where: {
            name: 'Transaction Fee Revenue',
            type: 'REVENUE',
          },
        });

        if (!transactionFeeRevenueAccount) {
          throw new BadRequestException(
            'Transaction Fee Revenue account not found',
          );
        }

        const totalFee = (data.fees ?? 0) / 100 + 100;

        const walletAmount = amount - totalFee;

        if (walletAmount <= 0) {
          return {};
        }

        const transaction = await tx.transaction.create({
          data: {
            type: 'DEPOSIT',

            status: 'SUCCESS',

            amount: walletAmount,

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

        await tx.ledgerEntry.createMany({
          data: [
            {
              transactionId: transaction.id,

              accountId: bankAccount.id,

              direction: 'DEBIT',

              amount: walletAmount + 100,
            },

            {
              transactionId: transaction.id,

              accountId: customerWalletAccount.id,

              direction: 'CREDIT',

              amount: walletAmount,
            },
            {
              transactionId: transaction.id,

              accountId: transactionFeeRevenueAccount.id,

              direction: 'CREDIT',

              amount: 100,
            },
          ],
        });

        await tx.wallet.update({
          where: {
            id: wallet.id,
          },

          data: {
            balance: {
              increment: walletAmount,
            },
          },
        });

        await tx.account.update({
          where: {
            id: wallet.account?.id,
          },

          data: {
            balance: {
              increment: walletAmount,
            },
          },
        });

        await tx.account.update({
          where: {
            id: bankAccount.id,
          },
          data: {
            balance: {
              increment: walletAmount + 100,
            },
          },
        });

        return {
          transaction,
          userId: wallet.userId,
        };
      },
      {
        isolationLevel: 'Serializable',
      },
    );

    // This point is reached only after the Prisma transaction commits.
    if (
      result.transaction.status === 'SUCCESS' &&
      Number(result.transaction.amount) > 0
    ) {
      try {
        await this.referralService.processFirstDepositReward(
          result.userId,
          result.transaction.id,
        );
      } catch (error) {
        this.logger.error(
          `Referral reward processing failed for deposit ${result.transaction.id}`,
          error instanceof Error ? error.stack : String(error),
        );
      }
    }

    return result.transaction;
  }
}
