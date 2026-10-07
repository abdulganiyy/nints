import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { RoleService } from './role.service';
import { UpdateRolePermissionsDto } from './dto/update-role-permissions.dto';

import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions as RequirePermission } from '../common/decorators/permissions.decorator';
import { PERMISSIONS } from '../constants/permission.constant';
import { JwtGuard } from '../common/guards/jwt.guard';

@UseGuards(JwtGuard, PermissionsGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Get(':id/permission')
  getPermissions(@Param('id') id: string) {
    return this.roleService.getPermissions(id);
  }

  @Patch(':id/permission')
  updatePermissions(
    @Param('id') id: string,
    @Body() dto: UpdateRolePermissionsDto,
  ) {
    return this.roleService.updatePermissions(id, dto.permissions);
  }

  @Get(':id/user')
  getUsers(@Param('id') id: string) {
    return this.roleService.getUsers(id);
  }
}
