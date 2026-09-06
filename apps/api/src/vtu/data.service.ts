import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { VtuProvider } from './provider.interface';

@Injectable()
export class DataService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly vtuProvider: VtuProvider,
  ) {}

  async purchaseData(params: {
    walletId: string;
    phoneNumber: string;
    network: string;
    planCode: string;
    amount: string;
  }) {
    const { walletId, phoneNumber, network, planCode, amount } = params;

    const reference = `DATA-${randomUUID()}`;

    const purchaseAmount = new Prisma.Decimal(amount);

    /**
     * STEP 1
     *
     * Atomically debit the customer's wallet
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
       * Atomic balance check + debit.
       *
       * This prevents two simultaneous requests
       * from spending the same balance.
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

      await tx.wallet.update({
        where: {
          id: wallet.id,
        },
        data: {
          balance: {
            decrement: purchaseAmount,
          },
        },
      });

      /**
       * Get the updated balance.
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
       * Create transaction as PENDING.
       */
      const transaction = await tx.transaction.create({
        data: {
          reference,

          type: 'DATA_PURCHASE',

          status: 'PENDING',

          amount: purchaseAmount,

          currency: 'NGN',

          metadata: {
            phoneNumber,
            network,
            plan_code: planCode,
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
      providerResponse = await this.vtuProvider.purchaseData({
        mobile_number: phoneNumber,
        amount: purchaseAmount,
        plan_code: planCode,

        network,

        reference,
      });
    } catch (error) {
      /**
       * Do NOT immediately refund here.
       *
       * A timeout could mean Peyflex processed the
       * data purchase but our application did not
       * receive the response.
       *
       * Keep transaction PENDING and reconcile it.
       */
      await this.markProviderUnknown(transaction.transaction.id);

      throw new InternalServerErrorException(
        'Unable to determine data purchase status',
      );
    }

    /**
     * STEP 3
     *
     * Peyflex explicitly succeeded.
     */
    if (providerResponse.success) {
      await this.prisma.$transaction(async (tx) => {
        /**
         * Create the accounting ledger entry.
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
         * Mark transaction SUCCESS.
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

              plan_code: planCode,

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
     * Peyflex explicitly failed.
     *
     * Refund the wallet.
     */
    await this.refundFailedDataPurchase({
      transactionId: transaction.transaction.id,

      accountId: transaction.accountId,

      bankAccountId: transaction.bankAccount.id,

      amount: purchaseAmount,

      phoneNumber,

      network,

      plan_code: planCode,

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
   * Refund a failed data purchase.
   */
  private async refundFailedDataPurchase(params: {
    transactionId: string;

    bankAccountId: string;

    accountId: string;

    amount: Prisma.Decimal;

    phoneNumber: string;

    network: string;

    plan_code: string;

    providerReference?: string;

    message?: string;
  }) {
    await this.prisma.$transaction(async (tx) => {
      /**
       * Retrieve transaction.
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
       * If another process already handled
       * this transaction, don't refund again.
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
       * Refund account.
       */
      await tx.wallet.update({
        where: {
          id: account.walletId!,
        },

        data: {
          balance: balanceAfter,
        },
      });

      await tx.account.update({
        where: {
          id: params.accountId,
        },

        data: {
          balance: balanceAfter,
        },
      });

      /**
       * Compensating CREDIT entry.
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
       * Mark transaction FAILED.
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

            variationCode: params.plan_code,

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
   * Provider timeout / unknown result.
   */
  private async markProviderUnknown(transactionId: string) {
    await this.prisma.transaction.update({
      where: {
        id: transactionId,
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
