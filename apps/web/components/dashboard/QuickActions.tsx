"use client";

import Link from "next/link";
import {
  ArrowLeftRight,
  Smartphone,
  Wifi,
  Receipt,
  PiggyBank,
  CreditCard,
  Landmark,
  ScanLine,
  Globe,
  Gift,
  MoreHorizontal,
} from "lucide-react";

import { Card } from "@/components/ui/card";

interface Action {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  comingSoon?: boolean;
}

const actions: Action[] = [
  {
    title: "Transfer",
    description: "Send money",
    href: "/transfer",
    icon: ArrowLeftRight,
  },
  {
    title: "Airtime",
    description: "Recharge phone",
    href: "/airtime",
    icon: Smartphone,
  },
  {
    title: "Data",
    description: "Buy internet",
    href: "/data",
    icon: Wifi,
  },
  {
    title: "Bills",
    description: "Utilities & TV",
    href: "/bills",
    icon: Receipt,
  },
  {
    title: "Savings",
    description: "Grow savings",
    href: "/savings",
    icon: PiggyBank,
  },
  {
    title: "Loan",
    description: "Borrow funds",
    href: "/loan",
    icon: CreditCard,
  },
  {
    title: "Bank",
    description: "Withdraw",
    href: "/withdraw",
    icon: Landmark,
  },
  {
    title: "QR Pay",
    description: "Scan & Pay",
    href: "/qr-pay",
    icon: ScanLine,
    comingSoon: true,
  },
  {
    title: "Exchange",
    description: "NGN → AED",
    href: "/exchange",
    icon: Globe,
    comingSoon: true,
  },
  {
    title: "Rewards",
    description: "Cashback",
    href: "/rewards",
    icon: Gift,
  },
  {
    title: "More",
    description: "All services",
    href: "/services",
    icon: MoreHorizontal,
  },
];

export default function QuickActions() {
  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Quick Actions</h2>

          <p className="text-sm text-slate-500">
            Access your most used services
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.comingSoon ? "#" : action.href}
              className={action.comingSoon ? "pointer-events-none" : undefined}
            >
              <Card className="group relative h-full rounded-3xl border-0 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {action.comingSoon && (
                  <span className="absolute right-3 top-3 rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                    Soon
                  </span>
                )}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 transition-colors group-hover:bg-emerald-600">
                  <Icon className="h-7 w-7 text-emerald-600 transition-colors group-hover:text-white" />
                </div>

                <h3 className="mt-5 font-semibold text-slate-900">
                  {action.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {action.description}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
