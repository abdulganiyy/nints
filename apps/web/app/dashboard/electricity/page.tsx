"use client";

import ElectricityPurchase from "@/components/electricity/ElectricityPurchase";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type WalletResponse = {
  balance: number;
};

export default function ElectricityPage() {
  const { data, isLoading, isError, error } = useQuery<WalletResponse>({
    queryKey: ["wallet"],
    queryFn: async () => {
      const response = await axios.get<WalletResponse>("/api/wallet");

      return response.data;
    },
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto w-full max-w-2xl py-8">
          <p className="text-muted-foreground">Loading wallet...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto w-full max-w-2xl py-8">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h2 className="font-semibold text-red-700">
              Unable to load wallet
            </h2>

            <p className="mt-1 text-sm text-red-600">
              {error instanceof Error
                ? error.message
                : "Something went wrong while loading your wallet."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <ElectricityPurchase walletBalance={data?.balance ?? 0} />
    </main>
  );
}
