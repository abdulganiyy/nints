import axios from "axios";

export interface VirtualAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface WalletBalance {
  balance: string;
  currency: string;
  virtualAccount:VirtualAccount;
}

export interface FundingQuote {
  amount: string;
  fee: string;
  totalToTransfer: string;
  amountCredited: string;
  currency: string;
}

export async function getWalletBalance(): Promise<WalletBalance> {
  const response = await axios.get<WalletBalance>("/api/wallet");
  return response.data;
}

export async function getVirtualAccount(): Promise<VirtualAccount> {
  const response = await axios.get<VirtualAccount>(
    "/wallet/virtual-account",
  );

  return response.data;
}

export async function getFundingQuote(
  amount: string,
): Promise<FundingQuote> {
  const response = await axios.get<FundingQuote>(
    "/wallet/funding/quote",
    {
      params: { amount },
    },
  );

  return response.data;
}
