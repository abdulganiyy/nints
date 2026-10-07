"use client";

import {
  ArrowDownToLine,
  ArrowUpRight,
  CreditCard,
  Users,
  Wallet,
} from "lucide-react";

interface DashboardStatsProps {
  overview?: any;
  transactionStats?: any;
}

export function DashboardStats({
  overview,
  transactionStats,
}: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Users",
      value: formatNumber(overview?.users?.total),
      description: `${formatNumber(overview?.users?.active)} active users`,
      icon: Users,
    },
    {
      title: "Wallets",
      value: formatNumber(overview?.wallets?.total),
      description: "Customer wallets",
      icon: Wallet,
    },
    {
      title: "Transactions",
      value: formatNumber(transactionStats?.total?.count),
      description: "All transactions",
      icon: CreditCard,
    },
    {
      title: "Transaction Volume",
      value: formatCurrency(transactionStats?.successful?.amount),
      description: "Successful transactions",
      icon: ArrowUpRight,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                  {stat.value}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {stat.description}
                </p>
              </div>

              <div className="rounded-lg bg-slate-100 p-2.5">
                <Icon className="h-5 w-5 text-slate-600" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatNumber(value: number | undefined) {
  return new Intl.NumberFormat("en-NG").format(value ?? 0);
}

function formatCurrency(value: number | string | undefined) {
  return `₦${new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value ?? 0))}`;
}
