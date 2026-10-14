
import {
  Account,
  AccountQuery,
  AccountSummary,
  CreateAccountPayload,
  PaginatedAccounts,
  UpdateAccountPayload,
} from "@/types";
import axios from "axios";

export async function getAccounts(
  params: AccountQuery = {},
): Promise<PaginatedAccounts> {
  const { data } = await axios.get<PaginatedAccounts>(
    "/api/admin/accounting/account",
    { params },
  );

  return data;
}

export async function getAccountSummary(): Promise<AccountSummary> {
  const { data } = await axios.get<AccountSummary>(
    "/api/admin/accounting/account/summary",
  );

  return data;
}

export async function createAccount(
  payload: CreateAccountPayload,
): Promise<Account> {
  const { data } = await axios.post<Account>(
    "/api/admin/accounting/account",
    payload,
  );

  return data;
}

export async function updateAccount(
  id: string,
  payload: UpdateAccountPayload,
): Promise<Account> {
  const { data } = await axios.patch<Account>(
    `/api/admin/accounting/account/${id}`,
    payload,
  );

  return data;
}

export async function deactivateAccount(
  id: string,
): Promise<Account> {
  const { data } = await axios.patch<Account>(
    `/api/admin/accounting/account/${id}/deactivate`,
  );

  return data;
}