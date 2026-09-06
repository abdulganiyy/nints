import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TransactionStatus } from '../../generated/prisma';
import { Prisma } from '../../generated/prisma';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { VtuProvider } from './provider.interface';

@Injectable()
export class AirtimeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly vtuProvider: VtuProvider,
  ) {}

  async purchaseAirtime(params: {
    walletId: string;
    phoneNumber: string;
    network: string;
    amount: string;
  }) {
    const { walletId, phoneNumber, network, amount } = params;

    const reference = `AIR-${randomUUID()}`;
    const purchaseAmount = new Prisma.Decimal(amount);

    /**
     * STEP 1
     *
     * Atomically reserve/debit the customer's balance
     * and create a PENDING transaction.
     */
    const transaction = await this.prisma.$transaction(async (tx) => {
      // 1. Get Bank/Cash account
      const bankAccount = await tx.account.findFirst({
        where: {
          type: 'ASSET',
          code: '1100',
          name: 'Bank / Cash',
        },
      });

      if (!bankAccount) {
        throw new InternalServerErrorException('Bank/Cash account not found');
      }

      const wallet = await tx.wallet.findUnique({
        where: {
          id: walletId,
        },
        include: {
          account: true,
        },
      });

      if (!wallet?.account) {
        throw new BadRequestException('Wallet account not found');
      }

      const account = wallet.account;

      /**
       * IMPORTANT:
       *
       * Do NOT do:
       *
       * if (account.balance >= amount)
       *    update balance
       *
       * because two concurrent requests can both pass
       * the balance check.
       *
       * Instead, make the balance deduction conditional.
       */
      const result = await tx.account.updateMany({
        where: {
          id: account.id,
          balance: {
            gte: purchaseAmount,
          },
        },
        data: {
          balance: {
            decrement: purchaseAmount,
          },
        },
      });

      if (result.count !== 1) {
        throw new BadRequestException('Insufficient wallet balance');
      }

      /**
       * We need the balance AFTER the atomic debit.
       */
      const updatedAccount = await tx.account.findUnique({
        where: {
          id: account.id,
        },
      });

      if (!updatedAccount) {
        throw new InternalServerErrorException('Account not found after debit');
      }

      const balanceAfter = updatedAccount.balance;
      const balanceBefore = balanceAfter.plus(purchaseAmount);

      /**
       * Create the transaction as PENDING.
       */
      const transaction = await tx.transaction.create({
        data: {
          reference,

          type: 'AIRTIME_PURCHASE',

          status: 'PENDING',

          amount: purchaseAmount,

          currency: 'NGN',

          metadata: {
            phoneNumber,
            network,
          },
        },
      });

      return {
        transaction,
        accountId: account.id,
        balanceBefore,
        balanceAfter,
        bankAccount,
      };
    });

    /**
     * STEP 2
     *
     * Call Peyflex OUTSIDE the Prisma transaction.
     */
    let providerResponse;

    try {
      providerResponse = await this.vtuProvider.purchaseAirtime({
        mobile_number: phoneNumber,
        amount: purchaseAmount,
        network,
        reference,
      });
    } catch (error) {
      /**
       * Network/API error.
       *
       * The transaction remains PENDING initially.
       *
       * We should refund/reconcile it rather than
       * blindly assuming the purchase failed.
       */
      await this.handleProviderError({
        transactionId: transaction.transaction.id,
        walletId,
        accountId: transaction.accountId,
        amount: purchaseAmount,
      });

      throw new InternalServerErrorException(
        'Unable to complete airtime purchase',
      );
    }

    /**
     * STEP 3
     *
     * Peyflex successfully processed the purchase.
     */
    if (providerResponse.success) {
      await this.prisma.$transaction(async (tx) => {
        /**
         * Create the actual accounting entry.
         */
        await tx.ledgerEntry.createMany({
          data: [
            {
              transactionId: transaction.transaction.id,

              accountId: transaction.bankAccount.id,

              direction: 'CREDIT',

              amount,

              balanceBefore: transaction.balanceBefore,

              balanceAfter: transaction.balanceAfter,
            },

            {
              transactionId: transaction.transaction.id,

              accountId: transaction.accountId,

              amount: purchaseAmount,

              direction: 'DEBIT',

              balanceBefore: transaction.balanceBefore,

              balanceAfter: transaction.balanceAfter,
            },
          ],
        });

        /**
         * Mark transaction successful.
         */
        await tx.transaction.update({
          where: {
            id: transaction.transaction.id,
          },
          data: {
            status: 'SUCCESS',

            metadata: {
              phoneNumber,
              network,
              provider: 'peyflex',
              providerReference: providerResponse.providerReference,
              message: providerResponse.message,
            },
          },
        });
      });

      return {
        success: true,

        reference,

        providerReference: providerResponse.providerReference,

        message: providerResponse.message,
      };
    }

    /**
     * STEP 4
     *
     * Peyflex explicitly rejected/failed the purchase.
     *
     * Refund the customer's money.
     */
    await this.refundFailedPurchase({
      transactionId: transaction.transaction.id,
      accountId: transaction.accountId,
      bankAccountId: transaction.bankAccount.id,

      amount: purchaseAmount,
      phoneNumber,
      network,
      providerReference: providerResponse.providerReference,
      message: providerResponse.message,
    });

    return {
      success: false,

      reference,

      providerReference: providerResponse.providerReference,

      message: providerResponse.message,
    };
  }

  /**
   * Refund a failed provider transaction.
   */
  private async refundFailedPurchase(params: {
    transactionId: string;
    accountId: string;
    bankAccountId: string;

    amount: Prisma.Decimal;
    phoneNumber: string;
    network: string;
    providerReference?: string;
    message?: string;
  }) {
    await this.prisma.$transaction(async (tx) => {
      /**
       * Prevent processing the same transaction twice.
       */
      const transaction = await tx.transaction.findUnique({
        where: {
          id: params.transactionId,
        },
      });

      if (!transaction) {
        throw new InternalServerErrorException('Transaction not found');
      }

      /**
       * Idempotency protection.
       *
       * If this transaction was already completed,
       * don't refund it again.
       */
      if (transaction.status !== 'PENDING') {
        return;
      }

      /**
       * Get current account balance.
       */
      const account = await tx.account.findUnique({
        where: {
          id: params.accountId,
        },
      });

      if (!account) {
        throw new InternalServerErrorException('Account not found');
      }

      const balanceBefore = account.balance;
      const balanceAfter = balanceBefore.plus(params.amount);

      /**
       * Refund the wallet.
       */
      await tx.account.update({
        where: {
          id: params.accountId,
        },
        data: {
          balance: balanceAfter,
        },
      });

      /**
       * Compensating ledger entry.
       *
       * Original:
       *
       * DEBIT ₦5,000
       *
       * Refund:
       *
       * CREDIT ₦5,000
       */

      await tx.ledgerEntry.createMany({
        data: [
          {
            transactionId: params.transactionId,

            accountId: params.bankAccountId,

            direction: 'DEBIT',

            amount: params.amount,

            balanceBefore,

            balanceAfter,
          },

          {
            transactionId: params.transactionId,

            accountId: params.accountId,

            amount: params.amount,

            direction: 'CREDIT',

            balanceBefore,

            balanceAfter,
          },
        ],
      });
      /**
       * Mark the transaction as FAILED.
       */
      await tx.transaction.update({
        where: {
          id: params.transactionId,
        },
        data: {
          status: 'FAILED',

          metadata: {
            phoneNumber: params.phoneNumber,
            network: params.network,
            provider: 'peyflex',
            providerReference: params.providerReference,
            message: params.message,
            refunded: true,
          },
        },
      });
    });
  }

  /**
   * Provider/network error.
   *
   * This case is slightly different from an explicit
   * Peyflex failure.
   */
  private async handleProviderError(params: {
    transactionId: string;
    walletId: string;
    accountId: string;
    amount: Prisma.Decimal;
  }) {
    /**
     * IMPORTANT:
     *
     * A timeout does NOT necessarily mean Peyflex failed.
     *
     * Peyflex could have processed the airtime and your
     * application simply didn't receive the response.
     *
     * Therefore, in production, this should normally remain
     * PENDING until a provider status/reconciliation check
     * confirms the result.
     */
    await this.prisma.transaction.update({
      where: {
        id: params.transactionId,
      },
      data: {
        status: 'PENDING',

        metadata: {
          provider: 'peyflex',
          providerStatus: 'UNKNOWN',
          requiresReconciliation: true,
        },
      },
    });
  }
}
