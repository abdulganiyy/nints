"use client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BalanceCard from "@/components/dashboard/BalanceCard";
import QuickActions from "@/components/dashboard/QuickActions";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EmailVerificationModal from "@/components/dashboard/EmailVerificationModal";

export default function DashboardPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axios.get("api/me");

      return res.data;
    },
  });

  if (isLoading) {
  return (
    <main className="min-h-screen bg-slate-50 animate-pulse">
      {/* Header Skeleton */}
      <div className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-slate-200" />
            <div className="space-y-2">
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="h-3 w-24 rounded bg-slate-100" />
            </div>
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-200" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 p-6">
        {/* Balance Card Skeleton */}
        <div className="h-44 rounded-2xl bg-slate-200" />

        {/* Quick Actions Skeleton */}
        <div className="space-y-4">
          <div className="h-5 w-32 rounded bg-slate-200" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-xl bg-white shadow-sm"
              />
            ))}
          </div>
        </div>

        {/* Transaction History Skeleton */}
        <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm">
          <div className="h-5 w-40 rounded bg-slate-200" />

          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-3">
              <div className="h-10 w-10 rounded-full bg-slate-200" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 rounded bg-slate-200" />
                <div className="h-3 w-20 rounded bg-slate-100" />
              </div>
              <div className="h-4 w-20 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

if (isError) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
          <span className="text-2xl">!</span>
        </div>

        <h2 className="text-lg font-semibold text-slate-900">
          Unable to load your dashboard
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Something went wrong while fetching your account information. Please
          check your connection and try again.
        </p>
      </div>
    </main>
  );
}

  if (!data) return null;

  return (
    <main className="min-h-screen bg-slate-50">
      <DashboardHeader roles={data.roles} avatar={data.profileImage} name={data.fullname} />
      <div className="mt-8 grid gap-6 lg:grid-cols-3 mx-auto max-w-7xl p-6">
        <div className="lg:col-span-2 space-y-6">
          <BalanceCard />
          <QuickActions />
          <TransactionHistory />
        </div>
      </div>
      <EmailVerificationModal email={data.email} open={!data.emailVerified} />
    </main>
  );
}
