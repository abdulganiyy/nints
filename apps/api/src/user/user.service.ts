import { Injectable, BadRequestException, UseGuards } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (userExists)
      throw new BadRequestException('User details already exists');

    const hashedPassword = await argon2.hash(
      dto.password ?? process.env.SUPER_ADMIN_PASSWORD!,
    );

    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      } as any,
    });

    const userRole = await this.prisma.role.findUnique({
      where: { name: dto.roleName },
    });

    await this.prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: userRole!.id,
      },
    });

    return {
      message: 'User created successfully',
    };
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
