import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, PrismaClient } from '../../generated/prisma';
import { Decimal } from '../../generated/prisma/runtime/client';

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

@Injectable()
export class WalletService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, db: PrismaExecutor = this.prismaService) {
    return db.wallet.upsert({
      where: {
        userId,
      },

      update: {},

      create: {
        userId,
        balance: 0,

        currency: 'NGN',

        status: 'ACTIVE',

        account: {
          create: {
            name: `Wallet - ${userId}`,
            type: 'LIABILITY',
            currency: 'NGN',
            balance: new Decimal(0),
            code: `2100-${userId}`,
          },
        },
      },

      include: {
        account: true,
      },
    });
  }

  async deposit(
    dto: {
      walletId: string;
      paystackReference: string;
      amount: string;
    },

    db: PrismaExecutor = this.prismaService,
  ) {
    const wallet = await db.wallet.findUnique({
      where: {
        id: dto.walletId,
      },

      include: {
        account: true,
      },
    });

    if (!wallet) {
      throw new Error('Wallet not found');
    }

    if (!wallet.account) {
      throw new Error('Wallet account not found');
    }

    const amount = new Decimal(dto.amount);

    if (amount.lessThanOrEqualTo(0)) {
      throw new Error('Deposit amount must be greater than zero');
    }

    /**
     * Generic platform asset account.
     *
     * 1100 = Bank / Cash
     */
    const bankAccount = await db.account.findUnique({
      where: {
        code: '1100',
      },
    });

    if (!bankAccount) {
      throw new Error('Bank / Cash account has not been configured');
    }

    const walletAccount = wallet.account;

    /**
     * ---------------------------------------
     * BANK / CASH ACCOUNT
     * ---------------------------------------
     *
     * Asset account increases with DEBIT.
     */
    const bankBalanceBefore = bankAccount.balance;

    const bankBalanceAfter = bankBalanceBefore.plus(amount);

    /**
     * ---------------------------------------
     * CUSTOMER WALLET ACCOUNT
     * ---------------------------------------
     *
     * Liability account increases with CREDIT.
     */
    const walletBalanceBefore = walletAccount.balance;

    const walletBalanceAfter = walletBalanceBefore.plus(amount);

    /**
     * Create financial transaction.
     */
    const transaction = await db.transaction.create({
      data: {
        reference: `DEP-${dto.paystackReference}`,

        // provider: 'PAYSTACK',

        // providerReference: dto.paystackReference,

        type: 'DEPOSIT',

        status: 'SUCCESS',

        amount,

        currency: 'NGN',
      },
    });

    /**
     * ---------------------------------------
     * DEBIT BANK / CASH
     * ---------------------------------------
     */
    await db.ledgerEntry.create({
      data: {
        transactionId: transaction.id,

        accountId: bankAccount.id,

        amount,

        direction: 'DEBIT',

        balanceBefore: bankBalanceBefore,

        balanceAfter: bankBalanceAfter,
      },
    });

    /**
     * ---------------------------------------
     * CREDIT CUSTOMER WALLET
     * ---------------------------------------
     */
    await db.ledgerEntry.create({
      data: {
        transactionId: transaction.id,

        accountId: walletAccount.id,

        amount,

        direction: 'CREDIT',

        balanceBefore: walletBalanceBefore,

        balanceAfter: walletBalanceAfter,
      },
    });

    /**
     * Update Bank / Cash balance.
     */
    await db.account.update({
      where: {
        id: bankAccount.id,
      },

      data: {
        balance: bankBalanceAfter,
      },
    });

    /**
     * Update Customer Wallet account balance.
     */
    await db.account.update({
      where: {
        id: walletAccount.id,
      },

      data: {
        balance: walletBalanceAfter,
      },
    });

    /**
     * Update Wallet's denormalized balance.
     */
    await db.wallet.update({
      where: {
        id: wallet.id,
      },

      data: {
        balance: walletBalanceAfter,
      },
    });

    return {
      transaction,

      wallet: {
        id: wallet.id,
        balance: walletBalanceAfter,
      },
    };
  }

  async withdraw(
    dto: {
      walletId: string;
      amount: string;
      providerReference: string;
    },
    db: PrismaExecutor = this.prismaService,
  ) {
    const amount = new Decimal(dto.amount);

    if (amount.lessThanOrEqualTo(0)) {
      throw new Error('Withdrawal amount must be greater than zero');
    }

    /**
     * Get customer wallet.
     */
    const wallet = await db.wallet.findUnique({
      where: {
        id: dto.walletId,
      },

      include: {
        account: true,
      },
    });

    if (!wallet) {
      throw new Error('Wallet not found');
    }

    if (!wallet.account) {
      throw new Error('Wallet account not found');
    }

    if (wallet.status !== 'ACTIVE') {
      throw new Error('Wallet is not active');
    }

    const walletAccount = wallet.account;

    /**
     * Check customer balance.
     *
     * Customer wallet is a LIABILITY account,
     * so the withdrawal reduces its balance.
     */
    const walletBalanceBefore = walletAccount.balance;

    if (walletBalanceBefore.lessThan(amount)) {
      throw new Error('Insufficient wallet balance');
    }

    const walletBalanceAfter = walletBalanceBefore.minus(amount);

    /**
     * Get generic Bank / Cash asset account.
     *
     * 1100 = Bank / Cash
     */
    const bankAccount = await db.account.findUnique({
      where: {
        code: '1100',
      },
    });

    if (!bankAccount) {
      throw new Error('Bank / Cash account has not been configured');
    }

    /**
     * Bank/Cash is an ASSET account.
     *
     * Withdrawal decreases the asset:
     *
     * CR Bank/Cash
     */
    const bankBalanceBefore = bankAccount.balance;

    const bankBalanceAfter = bankBalanceBefore.minus(amount);

    /**
     * Create transaction.
     */
    const transaction = await db.transaction.create({
      data: {
        reference: `WTH-${dto.providerReference}`,

        // provider: 'PAYSTACK',

        // providerReference: dto.providerReference,

        type: 'WITHDRAWAL',

        status: 'SUCCESS',

        amount,

        currency: 'NGN',
      },
    });

    /**
     * ---------------------------------------
     * DEBIT CUSTOMER WALLET
     * ---------------------------------------
     *
     * Liability decreases with DEBIT.
     */
    await db.ledgerEntry.create({
      data: {
        transactionId: transaction.id,

        accountId: walletAccount.id,

        amount,

        direction: 'DEBIT',

        balanceBefore: walletBalanceBefore,

        balanceAfter: walletBalanceAfter,
      },
    });

    /**
     * ---------------------------------------
     * CREDIT BANK / CASH
     * ---------------------------------------
     *
     * Asset decreases with CREDIT.
     */
    await db.ledgerEntry.create({
      data: {
        transactionId: transaction.id,

        accountId: bankAccount.id,

        amount,

        direction: 'CREDIT',

        balanceBefore: bankBalanceBefore,

        balanceAfter: bankBalanceAfter,
      },
    });

    /**
     * Update customer wallet account.
     */
    await db.account.update({
      where: {
        id: walletAccount.id,
      },

      data: {
        balance: walletBalanceAfter,
      },
    });

    /**
     * Update Bank / Cash account.
     */
    await db.account.update({
      where: {
        id: bankAccount.id,
      },

      data: {
        balance: bankBalanceAfter,
      },
    });

    /**
     * Keep wallet balance synchronized.
     */
    await db.wallet.update({
      where: {
        id: wallet.id,
      },

      data: {
        balance: walletBalanceAfter,
      },
    });

    return {
      transaction,

      wallet: {
        id: wallet.id,
        balance: walletBalanceAfter,
      },
    };
  }
}
