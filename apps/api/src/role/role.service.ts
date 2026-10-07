import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { RoleName } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const [roles, permissionCount] = await this.prisma.$transaction([
      this.prisma.role.findMany({
        where: {
          name: {
            not: RoleName.SUPER_ADMIN,
          },
        },
        orderBy: {
          name: 'asc',
        },

        include: {
          _count: {
            select: {
              userRoles: true,
              rolePermissions: true,
            },
          },
        },
      }),

      this.prisma.permission.count(),
    ]);

    return roles.map((role) => {
      const isSuperAdmin = role.name === RoleName.SUPER_ADMIN;

      return {
        id: role.id,
        name: role.name,

        usersCount: role._count.userRoles,

        permissionsCount: isSuperAdmin
          ? permissionCount
          : role._count.rolePermissions,

        allPermissions: isSuperAdmin,

        createdAt: role.createdAt,
        updatedAt: role.updatedAt,
      };
    });
  }

  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({
      where: {
        id,
      },

      include: {
        _count: {
          select: {
            userRoles: true,
            rolePermissions: true,
          },
        },
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const permissionCount = await this.prisma.permission.count();

    return {
      id: role.id,
      name: role.name,

      isSystem: true,

      usersCount: role._count.userRoles,

      permissionsCount:
        role.name === RoleName.SUPER_ADMIN
          ? permissionCount
          : role._count.rolePermissions,

      allPermissions: role.name === RoleName.SUPER_ADMIN,

      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    };
  }

  async getPermissions(roleId: string) {
    const role = await this.prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    if (role.name === RoleName.SUPER_ADMIN) {
      const permissions = await this.prisma.permission.findMany({
        orderBy: {
          name: 'asc',
        },
      });

      return {
        role: {
          id: role.id,
          name: role.name,
        },

        allPermissions: true,

        permissions,
      };
    }

    const rolePermissions = await this.prisma.rolePermission.findMany({
      where: {
        roleId,
      },

      include: {
        permission: true,
      },

      orderBy: {
        permission: {
          name: 'asc',
        },
      },
    });

    return {
      role: {
        id: role.id,
        name: role.name,
      },

      allPermissions: false,

      permissions: rolePermissions.map(({ permission }) => permission),
    };
  }

  async updatePermissions(roleId: string, permissionNames: string[]) {
    const role = await this.prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    if (role.name === RoleName.SUPER_ADMIN) {
      throw new BadRequestException(
        'SUPER_ADMIN automatically has all permissions and cannot be modified',
      );
    }

    const uniquePermissionNames = [...new Set(permissionNames)];

    if (uniquePermissionNames.length === 0) {
      await this.prisma.rolePermission.deleteMany({
        where: {
          roleId,
        },
      });

      return this.getPermissions(roleId);
    }

    const permissions = await this.prisma.permission.findMany({
      where: {
        name: {
          in: uniquePermissionNames,
        },
      },
    });

    if (permissions.length !== uniquePermissionNames.length) {
      const existingNames = new Set(
        permissions.map((permission) => permission.name),
      );

      const invalidPermissions = uniquePermissionNames.filter(
        (name) => !existingNames.has(name),
      );

      throw new BadRequestException({
        message: 'Invalid permissions',
        permissions: invalidPermissions,
      });
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.rolePermission.deleteMany({
        where: {
          roleId,
        },
      });

      await tx.rolePermission.createMany({
        data: permissions.map((permission) => ({
          roleId,
          permissionId: permission.id,
        })),
        skipDuplicates: true,
      });
    });

    return this.getPermissions(roleId);
  }

  async getUsers(roleId: string) {
    const role = await this.prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const userRoles = await this.prisma.userRole.findMany({
      where: {
        roleId,
      },

      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
          },
        },
      },

      orderBy: {
        user: {
          fullname: 'asc',
        },
      },
    });

    return userRoles.map(({ user }) => user);
  }
}
