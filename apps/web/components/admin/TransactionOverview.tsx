"use client";

import { CheckCircle2, Clock3, XCircle } from "lucide-react";

interface TransactionOverviewProps {
  data?: any;
}

export function TransactionOverview({ data }: TransactionOverviewProps) {
  const items = [
    {
      title: "Successful",
      count: data?.successful?.count ?? 0,
      amount: data?.successful?.amount ?? 0,
      icon: CheckCircle2,
    },
    {
      title: "Pending",
      count: data?.pending?.count ?? 0,
      amount: data?.pending?.amount ?? 0,
      icon: Clock3,
    },
    {
      title: "Failed",
      count: data?.failed?.count ?? 0,
      amount: data?.failed?.amount ?? 0,
      icon: XCircle,
    },
  ];

  return (
    <section className="rounded-xl border bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="font-semibold text-slate-900">Transaction Status</h2>

        <p className="mt-1 text-sm text-slate-500">
          Current transaction processing status
        </p>
      </div>

      <div className="divide-y">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-slate-500" />

                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {item.title}
                  </p>

                  <p className="text-xs text-slate-500">
                    {formatNumber(item.count)} transactions
                  </p>
                </div>
              </div>

              <p className="text-sm font-semibold text-slate-900">
                {formatCurrency(item.amount)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-NG").format(value);
}

function formatCurrency(value: number | string) {
  return `₦${new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value))}`;
}
