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

  console.log(data);

  if (!data) return null;
  return (
    <main className="min-h-screen bg-slate-50">
      <DashboardHeader />
      <div className="mt-8 grid gap-6 lg:grid-cols-3 mx-auto max-w-7xl p-6">
        <div className="lg:col-span-2 space-y-6">
          <BalanceCard />
          <QuickActions />
          <TransactionHistory />
        </div>
      </div>
      <EmailVerificationModal email={data?.email} open={!data?.emailVerified} />
    </main>
  );
}
