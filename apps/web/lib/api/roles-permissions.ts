import axios from "axios";

export type Role = {
  id: string;
  name: string;
  usersCount: number;
  permissionsCount: number;
  isSystem: boolean;
};

export type Permission = {
  id: string;
  name: string;
};

export type CreateRolePayload = {
  name: string;
  permissionIds: string[];
};

export type UpdateRolePayload = {
  name?: string;
  permissionIds?: string[];
};

type ApiResponse<T> = {
  data: T;
};

export const rolesPermissionsApi = {
  /**
   * Get all roles
   */
  getRoles: async (): Promise<Role[]> => {
    const response = await axios.get("/api/role");

    return response.data;
  },

  /**
   * Get all permissions
   */
  getPermissions: async (): Promise<Permission[]> => {
    const response = await axios.get("/api/permission");

    return response.data;
  },

  /**
   * Get permissions assigned to a specific role
   */
  getRolePermissions: async (roleId: string): Promise<Permission[]> => {
    const response = await axios.get(`/api/role/${roleId}/permission`);

    return response.data.permissions;
  },

  /**
   * Create role
   */
  createRole: async (payload: CreateRolePayload): Promise<Role> => {
    const response = await axios.post("/api/role", payload);

    return response.data;
  },

  /**
   * Update role
   */
  updateRole: async (
    roleId: string,
    payload: UpdateRolePayload,
  ): Promise<Role> => {
    const response = await axios.patch(`/api/role/${roleId}`, payload);

    return response.data;
  },

  /**
   * Delete role
   */
  deleteRole: async (roleId: string): Promise<void> => {
    await axios.delete(`/api/role/${roleId}`);
  },

  /**
   * Clone role
   */
  cloneRole: async (roleId: string, name: string): Promise<Role> => {
    const response = await axios.post(`/api/role/${roleId}/clone`, {
      name,
    });

    return response.data;
  },
};
