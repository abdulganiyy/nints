"use client";

import { AdminDashboardHeader } from "./AdminDashboardHeader";
import { DashboardStats } from "./AdminDashboardStats";
import { TodayActivity } from "./TodayActivity";
import { TransactionOverview } from "./TransactionOverview";
import { RecentTransactions } from "./RecentTransactions";

interface DashboardContentProps {
  data: any;
}

export function AdminDashboardContent({ data }: DashboardContentProps) {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <AdminDashboardHeader />

        {/* Main KPIs */}
        <DashboardStats
          overview={data?.overview}
          transactionStats={data?.transactionStats}
        />

        {/* Today's activity + transaction overview */}
        <div className="grid gap-6 xl:grid-cols-2">
          <TodayActivity data={data?.todayStats} />
          <TransactionOverview data={data?.transactionStats} />
        </div>

        {/* Recent transactions */}
        <RecentTransactions transactions={data?.recentTransactions ?? []} />
      </div>
    </div>
  );
}
