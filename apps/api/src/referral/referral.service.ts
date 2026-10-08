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

  async processFirstDepositReward(userId: string, transactionId: string) {
    const referral = await this.prisma.referral.findUnique({
      where: {
        referredUserId: userId,
      },
    });

    if (!referral) {
      return null;
    }

    if (referral.status === 'CANCELLED') {
      return null;
    }

    const eventKey = `FIRST_DEPOSIT:${transactionId}`;

    const existingReward = await this.prisma.referralReward.findUnique({
      where: {
        eventKey,
      },
    });

    if (existingReward) {
      return existingReward;
    }

    const reward = await this.prisma.referralReward.create({
      data: {
        referralId: referral.id,
        userId: referral.referrerId,
        type: 'FIRST_DEPOSIT',
        amount: REFERRAL_REWARD.FIRST_DEPOSIT,
        currency: REFERRAL_CURRENCY,
        status: 'PENDING',
        eventKey,
        transactionId,
      },
    });

    await this.prisma.referral.update({
      where: {
        id: referral.id,
      },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });

    return reward;
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
}
