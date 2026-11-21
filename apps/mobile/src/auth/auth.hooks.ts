import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { authApi } from "../api/auth.api";

import { tokenStorage } from "../api/axios";

import {
  RegisterDto,
  LoginDto,
  VerifyEmailDto,
  CreatePinDto,
} from "./auth.types";

import { AuthResponse } from "./auth.types";

export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterDto) =>
      authApi.register(data),
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: LoginDto
    ) => {
      const response = await authApi.login(data);

      await tokenStorage.saveTokens(
        response.accessToken,
        // response.refreshToken
      );

      return response;
    },

    onSuccess: (response: AuthResponse) => {
      queryClient.setQueryData(
        authKeys.me(),
        response.user
      );
    },
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (data: VerifyEmailDto) =>
      authApi.verifyEmail(data),
  });
}

export function useResendVerification() {
  return useMutation({
    mutationFn: (email: string) =>
      authApi.resendVerification(email),
  });
}

export function useCreatePin() {
  return useMutation({
    mutationFn: (data: CreatePinDto) =>
      authApi.createPin(data),
  });
}

export function useMe(enabled = true) {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authApi.getMe,
    enabled,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        await authApi.logout();
      } finally {
        await tokenStorage.clearTokens();
      }
    },

    onSuccess: async () => {
      queryClient.clear();
    },
  });
}