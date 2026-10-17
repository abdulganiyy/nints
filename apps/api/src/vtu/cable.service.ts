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
export class CableService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly vtuProvider: VtuProvider,
  ) {}

  async rechargeCableTV(params: {
    userId: string;
    plan: string;
    identifier: string;
    amount?: string;
    iuc: string;
  }) {
    const { userId, plan, identifier, iuc, amount } = params;

    const reference = `CAB-${randomUUID()}`;
    const purchaseAmount = new Prisma.Decimal(amount!);

    /**
     * STEP 1
     *
     * Atomically reserve/debit the customer's balance
     * and create a PENDING transaction.
     */
    const transaction = await this.prisma.$transaction(async (tx) => {
      const serviceFeeRevenueAccount = await tx.account.findFirst({
        where: {
          type: 'REVENUE',
          code: '4200',
          name: 'Service Fee Revenue',
        },
      });

      if (!serviceFeeRevenueAccount) {
        throw new InternalServerErrorException(
          'Service Fee Revenue account not found',
        );
      }

      const vtuProviderAccount = await tx.account.findFirst({
        where: {
          type: 'ASSET',
          code: '1200',
          name: 'VTU Provider',
        },
      });

      if (!vtuProviderAccount) {
        throw new InternalServerErrorException(
          'VTU Provider account not found',
        );
      }

      const wallet = await tx.wallet.findUnique({
        where: {
          userId,
        },
        include: {
          account: true,
          user: true,
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

      await tx.wallet.update({
        where: {
          id: wallet.id,

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

          type: 'BILL_PAYMENT',

          status: 'PENDING',

          amount: purchaseAmount,

          currency: 'NGN',

          metadata: {
            plan,
            identifier,
          },
        },
      });

      return {
        transaction,
        accountId: account.id,
        walletId: wallet.id,
        balanceBefore,
        balanceAfter,
        serviceFeeRevenueAccount,
        vtuProviderAccount,
        user: wallet.user,
      };
    });

    /**
     * STEP 2
     *
     * Call Peyflex OUTSIDE the Prisma transaction.
     */
    let providerResponse: any;

    try {
      providerResponse = await this.vtuProvider.rechargeCableTV({
        plan,
        phone: transaction.user.phone!,
        identifier: identifier.toLowerCase(),
        iuc,
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
        walletId: transaction.walletId,
        accountId: transaction.accountId,
        amount: purchaseAmount,
      });

      throw new InternalServerErrorException(
        'Unable to complete cable tv subscription purchase',
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
        const providerCost = new Prisma.Decimal(providerResponse.charged);

        const feeAmount = purchaseAmount.minus(providerCost);

        await tx.account.updateMany({
          where: {
            id: transaction.vtuProviderAccount.id,
            balance: {
              gte: providerCost,
            },
          },
          data: {
            balance: {
              decrement: providerCost,
            },
          },
        });

        await tx.account.updateMany({
          where: {
            name: 'Service Fee Revenue',
          },
          data: {
            balance: {
              increment: feeAmount,
            },
          },
        });

        const vtuProviderBalanceBefore = transaction.vtuProviderAccount.balance;
        const vtuProviderBalanceAfter =
          vtuProviderBalanceBefore.minus(providerCost);

        const revenueBalanceBefore =
          transaction.serviceFeeRevenueAccount.balance;

        const revenueBalanceAfter = revenueBalanceBefore.plus(feeAmount);

        await tx.ledgerEntry.createMany({
          data: [
            {
              transactionId: transaction.transaction.id,

              accountId: transaction.serviceFeeRevenueAccount.id,

              direction: 'CREDIT',

              amount: feeAmount,

              balanceBefore: revenueBalanceBefore,

              balanceAfter: revenueBalanceAfter,
            },
            {
              transactionId: transaction.transaction.id,

              accountId: transaction.vtuProviderAccount.id,

              direction: 'CREDIT',

              amount: providerCost,

              balanceBefore: vtuProviderBalanceBefore,

              balanceAfter: vtuProviderBalanceAfter,
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
              phoneNumber: transaction.user.phone!,
              identifier,
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
      vtuProviderAccountId: transaction.vtuProviderAccount.id,
      walletId: transaction.walletId,
      amount: purchaseAmount,
      phoneNumber: transaction.user.phone!,
      identifier,
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
    walletId: string;
    vtuProviderAccountId: string;
    amount: Prisma.Decimal;
    phoneNumber: string;
    identifier: string;
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

      await tx.wallet.update({
        where: {
          id: params.walletId,
        },
        data: {
          balance: balanceAfter,
        },
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
            identifier: params.identifier,
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
