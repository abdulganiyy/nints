import { api } from "@/utils/api";

import {
  CreateJournalEntryPayload,
  JournalEntry,
  JournalEntryQuery,
  JournalEntrySummary,
  PaginatedJournalEntries,
} from "@/types";
import axios from "axios";

export async function getJournalEntries(
  params: JournalEntryQuery = {},
): Promise<PaginatedJournalEntries> {
  const { data } = await axios.get<PaginatedJournalEntries>(
    "/api/admin/accounting/ledger-entry",
    { params },
  );

  return data;
}

export async function getJournalEntry(
  id: string,
): Promise<JournalEntry> {
  const { data } = await axios.get<JournalEntry>(
    `/api/admin/accounting/ledger-entry/${id}`,
  );

  return data;
}

export async function getJournalEntrySummary(): Promise<JournalEntrySummary> {
  const { data } = await axios.get<JournalEntrySummary>(
    "/api/admin/accounting/ledger-entry/summary",
  );

  return data;
}

export async function createJournalEntry(
  payload: CreateJournalEntryPayload,
): Promise<JournalEntry> {
  const { data } = await axios.post<JournalEntry>(
    "/api/admin/accounting/ledger-entry",
    payload,
  );

  return data;
}

export async function postJournalEntry(
  id: string,
): Promise<JournalEntry> {
  const { data } = await axios.post<JournalEntry>(
    `/api/api/admin/accounting/ledger-entry/${id}/post`,
  );

  return data;
}

export async function reverseJournalEntry(
  id: string,
  reason: string,
): Promise<JournalEntry> {
  const { data } = await axios.post<JournalEntry>(
    `/api/admin/accounting/ledger-entry/${id}/reverse`,
    { reason },
  );

  return data;
}