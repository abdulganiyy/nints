import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplyReferralDto } from './dto/apply-referral.dto';
import { REFERRAL_CURRENCY, REFERRAL_REWARD } from './referral.constants';
import { Prisma } from '../../generated/prisma';
import { ConfigService } from '@nestjs/config';
import { GetReferralsDto } from './dto/get-referrals.dto';

@Injectable()
export class ReferralService {
  constructor(
    private readonly prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  private generateCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    let code = '';

    for (let i = 0; i < 8; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }

    return code;
  }

  async createReferralCode(userId: string) {
    const existing = await this.prisma.referralCode.findUnique({
      where: {
        userId,
      },
    });

    if (existing) {
      return existing;
    }

    for (let attempt = 0; attempt < 5; attempt++) {
      const code = this.generateCode();

      try {
        return await this.prisma.referralCode.create({
          data: {
            userId,
            code,
          },
        });
      } catch (error) {
        if (attempt === 4) {
          throw error;
        }
      }
    }

    throw new Error('Unable to generate referral code');
  }

  async getMyReferralCode(userId: string) {
    let referralCode = await this.prisma.referralCode.findUnique({
      where: {
        userId,
      },
    });

    if (!referralCode) {
      referralCode = await this.createReferralCode(userId);
    }

    return referralCode;
  }

  async applyReferral(
    referredUserId: string,
    dto: ApplyReferralDto,
    tx?: Prisma.TransactionClient,
  ) {
    const prisma = tx ?? this.prisma;

    const code = dto.code.trim().toUpperCase();

    const referralCode = await prisma.referralCode.findUnique({
      where: {
        code,
      },
      include: {
        user: true,
      },
    });

    if (!referralCode || !referralCode.isActive) {
      throw new NotFoundException('Invalid referral code');
    }

    if (referralCode.userId === referredUserId) {
      throw new BadRequestException('You cannot use your own referral code');
    }

    const existingReferral = await prisma.referral.findUnique({
      where: {
        referredUserId,
      },
    });

    if (existingReferral) {
      throw new ConflictException('You have already used a referral code');
    }

    return prisma.referral.create({
      data: {
        referrerId: referralCode.userId,
        referredUserId,
        code,
        status: 'PENDING',
      },
    });
  }

  async getMyReferralStats(userId: string) {
    const [referralCode, referrals, total, pending, completed, rewards] =
      await Promise.all([
        this.getMyReferralCode(userId),

        this.getMyReferrals(userId),

        this.prisma.referral.count({
          where: {
            referrerId: userId,
          },
        }),

        this.prisma.referral.count({
          where: {
            referrerId: userId,
            status: 'PENDING',
          },
        }),

        this.prisma.referral.count({
          where: {
            referrerId: userId,
            status: 'COMPLETED',
          },
        }),

        this.prisma.referralReward.aggregate({
          where: {
            userId,
            status: 'PAID',
          },
          _sum: {
            amount: true,
          },
        }),
      ]);

    const referralLink = `${this.configService.get(
      'FRONTEND_URL',
    )}/register?ref=${referralCode.code}`;

    return {
      referralLink,
      referralCode: referralCode.code,
      totalReferrals: total,
      pendingReferrals: pending,
      completedReferrals: completed,
      totalRewards: rewards._sum.amount ?? 0,
      currency: REFERRAL_CURRENCY,
      referrals,
    };
  }

  async getMyReferrals(userId: string) {
    const referrals = await this.prisma.referral.findMany({
      where: {
        referrerId: userId,
      },
      include: {
        referredUser: {
          select: {
            id: true,
            fullname: true,
            createdAt: true,
          },
        },
        rewards: {
          select: {
            amount: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return referrals.map((referral) => ({
      ...referral,
      rewardAmount: referral.rewards.reduce(
        (sum, reward) => sum.plus(reward.amount),
        new Prisma.Decimal(0),
      ),
    }));
  }

  async processFirstDepositReward(
    userId: string,
    depositTransactionId: string,
  ) {
    const eventKey = `FIRST_DEPOSIT:${depositTransactionId}`;

    return this.prisma.$transaction(
      async (tx) => {
        // 1. Idempotency check
        const existingReward = await tx.referralReward.findUnique({
          where: { eventKey },
        });

        if (existingReward) {
          return existingReward;
        }

        // 2. Find and validate referral
        const referral = await tx.referral.findUnique({
          where: { referredUserId: userId },
        });

        if (!referral || referral.status !== 'PENDING') {
          return null;
        }

        // 3. Verify the originating deposit exists and succeeded
        const deposit = await tx.transaction.findUnique({
          where: { id: depositTransactionId },
        });

        if (
          !deposit ||
          deposit.status !== 'SUCCESS' ||
          deposit.type !== 'DEPOSIT'
        ) {
          throw new BadRequestException(
            'A successful deposit is required for this reward',
          );
        }

        // 4. Find and validate the referrer's wallet
        const wallet = await tx.wallet.findUnique({
          where: { userId: referral.referrerId },
          include: { account: true },
        });

        if (!wallet) {
          throw new BadRequestException('Referrer wallet not found');
        }

        if (wallet.status !== 'ACTIVE') {
          throw new BadRequestException('Referrer wallet is not active');
        }

        const customerWalletAccount = wallet.account;

        if (!customerWalletAccount) {
          throw new BadRequestException(
            'Customer wallet ledger account not found',
          );
        }

        const referralExpenseAccount = await tx.account.findFirst({
          where: {
            code: '5100',
            name: 'Referral Reward Expense',
            type: 'EXPENSE',
          },
        });

        if (!referralExpenseAccount) {
          throw new BadRequestException(
            'Referral Reward Expense account not found',
          );
        }

        const rewardAmount = REFERRAL_REWARD.FIRST_DEPOSIT;

        // 5. Create a separate financial transaction for the reward
        const rewardTransaction = await tx.transaction.create({
          data: {
            type: 'REFERRAL_REWARD',
            status: 'SUCCESS',
            amount: rewardAmount,
            currency: REFERRAL_CURRENCY,
            reference: `REF-${depositTransactionId}`,
            description: 'First deposit referral reward',
            metadata: {
              eventKey,
              referralId: referral.id,
              referredUserId: userId,
              depositTransactionId,
            },
          },
        });

        // 6. Create the reward record
        const reward = await tx.referralReward.create({
          data: {
            referralId: referral.id,
            userId: referral.referrerId,
            type: 'FIRST_DEPOSIT',
            amount: rewardAmount,
            currency: REFERRAL_CURRENCY,
            status: 'PAID',
            eventKey,
            transactionId: rewardTransaction.id,
          },
        });

        // 7. Record double-entry accounting
        await tx.ledgerEntry.createMany({
          data: [
            {
              transactionId: rewardTransaction.id,
              accountId: referralExpenseAccount.id,
              direction: 'DEBIT',
              amount: rewardAmount,
            },
            {
              transactionId: rewardTransaction.id,
              accountId: customerWalletAccount.id,
              direction: 'CREDIT',
              amount: rewardAmount,
            },
          ],
        });

        // 8. Update balances
        await tx.wallet.update({
          where: { id: wallet.id },
          data: {
            balance: { increment: rewardAmount },
          },
        });

        await tx.account.update({
          where: { id: customerWalletAccount.id },
          data: {
            balance: { increment: rewardAmount },
          },
        });

        await tx.account.update({
          where: { id: referralExpenseAccount.id },
          data: {
            balance: { increment: rewardAmount },
          },
        });

        // 9. Complete referral
        await tx.referral.update({
          where: { id: referral.id },
          data: {
            status: 'COMPLETED',
            completedAt: new Date(),
          },
        });

        return reward;
      },
      {
        isolationLevel: 'Serializable',
      },
    );
  }
  async getMyRewards(userId: string) {
    return this.prisma.referralReward.findMany({
      where: {
        userId,
      },
      include: {
        referral: {
          select: {
            id: true,
            code: true,
            referredUserId: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createReferralForUser(
    tx: any,
    referredUserId: string,
    referralCode?: string,
  ) {
    if (!referralCode) {
      return null;
    }

    const code = referralCode.trim().toUpperCase();

    const referral = await tx.referralCode.findUnique({
      where: {
        code,
      },
    });

    if (!referral) {
      throw new NotFoundException('Invalid referral code');
    }

    if (referral.userId === referredUserId) {
      throw new BadRequestException('You cannot use your own referral code');
    }

    return tx.referral.create({
      data: {
        referrerId: referral.userId,
        referredUserId,
        code,
        status: 'PENDING',
      },
    });
  }

  async validateReferralCode(code: string) {
    const referralCode = await this.prisma.referralCode.findUnique({
      where: {
        code: code.trim().toUpperCase(),
      },
      select: {
        code: true,
        isActive: true,
      },
    });

    return {
      valid: Boolean(referralCode && referralCode.isActive),
    };
  }
  async getAllReferrals(query: GetReferralsDto) {
    const { page = 1, limit = 1000, search } = query;

    const skip = (page - 1) * limit;

    let where: any = {};

    if (search) {
      where.OR = [
        {
          code: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          referrer: {
            fullname: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          referrer: {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          referredUser: {
            fullname: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          referredUser: {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    const [referrals, total] = await this.prisma.$transaction([
      this.prisma.referral.findMany({
        where,
        skip,
        take: +limit,
        orderBy: {
          createdAt: 'desc',
        },

        select: {
          id: true,
          code: true,
          status: true,
          createdAt: true,
          completedAt: true,

          referrer: {
            select: {
              id: true,
              fullname: true,
              email: true,
            },
          },

          referredUser: {
            select: {
              id: true,
              fullname: true,
              email: true,
            },
          },

          rewards: {
            select: {
              id: true,
              type: true,
              amount: true,
              currency: true,
              status: true,
              createdAt: true,
              paidAt: true,
            },
          },
        },
      }),

      this.prisma.referral.count({
        where,
      }),
    ]);

    return {
      data: referrals,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
