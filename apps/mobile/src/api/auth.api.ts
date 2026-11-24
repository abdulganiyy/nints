import { api } from "./axios";

import {
  RegisterDto,
  LoginDto,
  VerifyEmailDto,
  CreatePinDto,
  AuthResponse,
  AuthUser,
  ForgotPasswordDto,
  ResetPasswordDto,
} from "../auth/auth.types";

export const authApi = {
  register: async (data: RegisterDto) => {
    const response = await api.post("/auth/register", {
      ...data,
      platform: "mobile",
    });

    return response.data;
  },

  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", data);

    return response.data;
  },

  verifyEmail: async (data: VerifyEmailDto) => {
    const response = await api.post("/auth/verify-email", data);

    return response.data;
  },

  resendVerification: async (email: string) => {
    const response = await api.post("/auth/resend-verification", {
      email,
      platform: "mobile",
    });

    return response.data;
  },

  createPin: async (data: CreatePinDto) => {
    const response = await api.post("/auth/pin", data);

    return response.data;
  },

  getMe: async (): Promise<AuthUser> => {
    const response = await api.get("/auth/me");

    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");

    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordDto) => {
    const response = await api.post("/auth/forgot-password", {
      ...data,
      platform: "mobile",
    });

    return response.data;
  },

  resetPassword: async (data: ResetPasswordDto) => {
    const {otp,password} = data;
    const response = await api.post("/auth/reset-password", {token:otp,password});

    return response.data;
  },
};
