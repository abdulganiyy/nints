"use client";

import { ArrowDownToLine, CreditCard, UserPlus } from "lucide-react";

interface TodayActivityProps {
  data?: any;
}

export function TodayActivity({ data }: TodayActivityProps) {
  const items = [
    {
      title: "New Users",
      value: formatNumber(data?.newUsers),
      icon: UserPlus,
    },
    {
      title: "Transactions",
      value: formatNumber(data?.transactions?.count),
      icon: CreditCard,
    },
    {
      title: "Deposits",
      value: formatCurrency(data?.deposits?.amount),
      icon: ArrowDownToLine,
    },
  ];

  return (
    <section className="rounded-xl border bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="font-semibold text-slate-900">Today&apos;s Activity</h2>

        <p className="mt-1 text-sm text-slate-500">
          Overview of activity for today
        </p>
      </div>

      <div className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex items-center gap-4 p-5">
              <div className="rounded-lg bg-slate-100 p-2.5">
                <Icon className="h-5 w-5 text-slate-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">{item.title}</p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
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
