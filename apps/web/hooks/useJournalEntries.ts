"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createJournalEntry,
  getJournalEntries,
  getJournalEntry,
  getJournalEntrySummary,
  postJournalEntry,
  reverseJournalEntry,
} from "@/services/journal-entry.service";

import {
  CreateJournalEntryPayload,
  JournalEntryQuery,
} from "@/types";

export const journalEntryKeys = {
  all: ["accounting", "journal-entries"] as const,

  list: (params: JournalEntryQuery) =>
    [...journalEntryKeys.all, "list", params] as const,

  detail: (id: string) =>
    [...journalEntryKeys.all, "detail", id] as const,

  summary: () =>
    [...journalEntryKeys.all, "summary"] as const,
};

export function useJournalEntries(
  params: JournalEntryQuery = {},
) {
  return useQuery({
    queryKey: journalEntryKeys.list(params),
    queryFn: () => getJournalEntries(params),
  });
}

export function useJournalEntry(id: string | null) {
  return useQuery({
    queryKey: journalEntryKeys.detail(id ?? ""),
    queryFn: () => getJournalEntry(id!),
    enabled: Boolean(id),
  });
}

export function useJournalEntrySummary() {
  return useQuery({
    queryKey: journalEntryKeys.summary(),
    queryFn: getJournalEntrySummary,
  });
}

export function useCreateJournalEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateJournalEntryPayload) =>
      createJournalEntry(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: journalEntryKeys.all,
      });
    },
  });
}

export function usePostJournalEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postJournalEntry,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: journalEntryKeys.all,
      });
    },
  });
}

export function useReverseJournalEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      reason,
    }: {
      id: string;
      reason: string;
    }) => reverseJournalEntry(id, reason),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: journalEntryKeys.all,
      });
    },
  });
}