"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createAccount,
  deactivateAccount,
  getAccountSummary,
  getAccounts,
  updateAccount,
} from "@/services/account.service";

import {
  AccountQuery,
  CreateAccountPayload,
  UpdateAccountPayload,
} from "@/types";

export const accountKeys = {
  all: ["accounting", "accounts"] as const,

  list: (params: AccountQuery) =>
    [...accountKeys.all, "list", params] as const,

  summary: () =>
    [...accountKeys.all, "summary"] as const,
};

export function useAccounts(params: AccountQuery = {}) {
  return useQuery({
    queryKey: accountKeys.list(params),
    queryFn: () => getAccounts(params),
  });
}

export function useAccountSummary() {
  return useQuery({
    queryKey: accountKeys.summary(),
    queryFn: getAccountSummary,
  });
}

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAccountPayload) =>
      createAccount(payload),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: accountKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: accountKeys.summary(),
        }),
      ]);
    },
  });
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateAccountPayload;
    }) => updateAccount(id, payload),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: accountKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: accountKeys.summary(),
        }),
      ]);
    },
  });
}

export function useDeactivateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivateAccount,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: accountKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: accountKeys.summary(),
        }),
      ]);
    },
  });
}