import { RoleName } from '../../generated/prisma';
import { PERMISSIONS } from './permission.constant';

export const ROLE_PERMISSIONS = {
  [RoleName.SUPER_ADMIN]: [PERMISSIONS.ALL],

  [RoleName.ADMIN]: [
    PERMISSIONS.USER_VIEW,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
  ],

  [RoleName.USER]: [PERMISSIONS.USER_VIEW],
};
