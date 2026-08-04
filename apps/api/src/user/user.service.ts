import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { Prisma, PrismaClient } from '@prisma/client/extension';
import * as crypto from 'crypto';

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { phone: dto.phone }],
      },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (userExists)
      throw new ConflictException('Email or phone already exists');

    const hashedPassword = await argon2.hash(
      dto.password ?? process.env.SUPER_ADMIN_PASSWORD!,
    );

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullname: dto.fullname,
          email: dto.email,
          phone: dto.phone,
          password: hashedPassword,
        },
      });

      const roleIds = dto.roleIds?.length
        ? dto.roleIds
        : [await this.getDefaultRoleId(tx)];

      await tx.userRole.createMany({
        data: roleIds.map((roleId) => ({
          userId: user.id,
          roleId,
        })),
      });

      return tx.user.findUnique({
        where: { id: user.id },
        include: {
          userRoles: {
            include: {
              role: {
                include: {
                  rolePermissions: {
                    include: {
                      permission: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    });
  }

  private async getDefaultRoleId(tx: Prisma.TransactionClient) {
    const role = await tx.role.findUnique({
      where: {
        name: 'USER',
      },
    });

    if (!role) throw new InternalServerErrorException('Default role not found');

    return role.id;
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async updateUser(dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id: dto.id,
      },
      data: {
        ...dto,
      },
    });
  }

  async getUsers(query: GetUsersDto) {
    const { page = 1, limit = 1000, search } = query;

    const skip = (page - 1) * limit;

    let where: any = {
      deleted: false,
    };

    if (search) {
      where.OR = [
        { fullname: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: {
          ...where,
          userRoles: {
            some: {
              role: {
                name: query.roleName,
              },
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },

        select: {
          id: true,
          fullname: true,
          email: true,
          phone: true,
          createdAt: true,
        },
      }),

      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async verifyEmail(
    email: string,
    otp: string,
    db: PrismaExecutor = this.prisma,
  ) {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user || user.emailVerified) {
      throw new BadRequestException('Invalid verification attempt');
    }

    if (!user.emailOtpHash || !user.emailOtpExpiresAt) {
      throw new BadRequestException('No OTP found');
    }

    if (user.emailOtpExpiresAt < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

    if (otpHash !== user.emailOtpHash) {
      throw new BadRequestException('Invalid OTP');
    }

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailOtpHash: null,
        emailOtpExpiresAt: null,
      },
    });

    const { password: _, ...safeUser } = updatedUser;

    return safeUser;
  }

  softdelete(id: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
  }

  delete(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
