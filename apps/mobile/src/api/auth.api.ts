import { api } from "./axios";

import {
  RegisterDto,
  LoginDto,
  VerifyEmailDto,
  CreatePinDto,
  AuthResponse,
  AuthUser,
} from "../auth/auth.types";

export const authApi = {

  register: async (data: RegisterDto) => {
    const response = await api.post(
      "/auth/register",
      data
    );

    return response.data;
  },

  login: async (
    data: LoginDto
  ): Promise<AuthResponse> => {
    const response = await api.post(
      "/auth/login",
      data
    );

    return response.data;
  },

  verifyEmail: async (data: VerifyEmailDto) => {
    const response = await api.post(
      "/auth/verify-email",
      data
    );

    return response.data;
  },

  resendVerification: async (email: string) => {
    const response = await api.post(
      "/auth/resend-verification",
      { email }
    );

    return response.data;
  },

  createPin: async (data: CreatePinDto) => {
    const response = await api.post(
      "/auth/pin",
      data
    );

    return response.data;
  },

  getMe: async (): Promise<AuthUser> => {
    const response = await api.get("/auth/me");

    console.log(response.data)

    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");

    return response.data;
  },
};