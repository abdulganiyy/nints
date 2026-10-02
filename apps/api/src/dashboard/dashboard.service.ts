import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview() {
    const [
      users,
      verifiedUsers,
      activeUsers,
      wallets,
      transactions,
      pendingTransactions,
      successfulTransactions,
      failedTransactions,
    ] = await Promise.all([
      this.prisma.user.count(),

      this.prisma.user.count({
        where: {
          emailVerified: true,
        },
      }),

      this.prisma.user.count({
        where: {
          status: 'ACTIVE',
        },
      }),

      this.prisma.wallet.count(),

      this.prisma.transaction.count(),

      this.prisma.transaction.count({
        where: {
          status: 'PENDING',
        },
      }),

      this.prisma.transaction.count({
        where: {
          status: 'SUCCESS',
        },
      }),

      this.prisma.transaction.count({
        where: {
          status: 'FAILED',
        },
      }),
    ]);

    return {
      users: {
        total: users,
        verified: verifiedUsers,
        active: activeUsers,
      },

      wallets: {
        total: wallets,
      },

      transactions: {
        total: transactions,
        pending: pendingTransactions,
        successful: successfulTransactions,
        failed: failedTransactions,
      },
    };
  }

  async getTransactionStats() {
    const [total, successful, pending, failed] = await Promise.all([
      this.prisma.transaction.aggregate({
        _sum: {
          amount: true,
        },
        _count: {
          id: true,
        },
      }),

      this.prisma.transaction.aggregate({
        where: {
          status: 'SUCCESS',
        },
        _sum: {
          amount: true,
        },
        _count: {
          id: true,
        },
      }),

      this.prisma.transaction.aggregate({
        where: {
          status: 'PENDING',
        },
        _sum: {
          amount: true,
        },
        _count: {
          id: true,
        },
      }),

      this.prisma.transaction.aggregate({
        where: {
          status: 'FAILED',
        },
        _sum: {
          amount: true,
        },
        _count: {
          id: true,
        },
      }),
    ]);

    return {
      total: {
        count: total._count.id,
        amount: total._sum.amount ?? 0,
      },

      successful: {
        count: successful._count.id,
        amount: successful._sum.amount ?? 0,
      },

      pending: {
        count: pending._count.id,
        amount: pending._sum.amount ?? 0,
      },

      failed: {
        count: failed._count.id,
        amount: failed._sum.amount ?? 0,
      },
    };
  }

  async getTodayStats() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const [transactions, users, deposits] = await Promise.all([
      this.prisma.transaction.aggregate({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        _count: {
          id: true,
        },
        _sum: {
          amount: true,
        },
      }),

      this.prisma.user.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      }),

      this.prisma.transaction.aggregate({
        where: {
          type: 'DEPOSIT',
          status: 'SUCCESS',
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        _count: {
          id: true,
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    return {
      transactions: {
        count: transactions._count.id,
        amount: transactions._sum.amount ?? 0,
      },

      newUsers: users,

      deposits: {
        count: deposits._count.id,
        amount: deposits._sum.amount ?? 0,
      },
    };
  }
  async getRecentTransactions(limit = 10) {
    return this.prisma.transaction.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        reference: true,
        type: true,
        status: true,
        amount: true,
        currency: true,
        createdAt: true,

        // user: {
        //   select: {
        //     id: true,
        //     fullname: true,
        //     email: true,
        //     phone: true,
        //   },
        // },
      },
    });
  }

  async getDashboard() {
    const [overview, transactionStats, todayStats, recentTransactions] =
      await Promise.all([
        this.getOverview(),
        this.getTransactionStats(),
        this.getTodayStats(),
        this.getRecentTransactions(10),
      ]);

    return {
      overview,
      transactionStats,
      todayStats,
      recentTransactions,
    };
  }
}
