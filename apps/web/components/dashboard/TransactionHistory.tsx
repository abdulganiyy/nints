"use client";

import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Smartphone,
  Wifi,
  PiggyBank,
  CreditCard,
  Receipt,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type TransactionStatus = "completed" | "pending" | "failed";

interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  type: "credit" | "debit";
  status: TransactionStatus;
  icon: React.ElementType;
}

const transactions: Transaction[] = [
  {
    id: "1",
    title: "Wallet Funding",
    subtitle: "Paystack",
    amount: 250000,
    type: "credit",
    date: "Today • 09:45 AM",
    status: "completed",
    icon: ArrowDownLeft,
  },
  {
    id: "2",
    title: "Transfer",
    subtitle: "John Doe",
    amount: 15000,
    type: "debit",
    date: "Today • 08:20 AM",
    status: "completed",
    icon: ArrowUpRight,
  },
  {
    id: "3",
    title: "MTN Airtime",
    subtitle: "08012345678",
    amount: 2000,
    type: "debit",
    date: "Yesterday",
    status: "completed",
    icon: Smartphone,
  },
  {
    id: "4",
    title: "Savings Deposit",
    subtitle: "Emergency Fund",
    amount: 10000,
    type: "debit",
    date: "Yesterday",
    status: "completed",
    icon: PiggyBank,
  },
  {
    id: "5",
    title: "Loan Repayment",
    subtitle: "Monthly Installment",
    amount: 35000,
    type: "debit",
    date: "2 days ago",
    status: "pending",
    icon: CreditCard,
  },
  {
    id: "6",
    title: "Electricity",
    subtitle: "IKEDC",
    amount: 12500,
    type: "debit",
    date: "3 days ago",
    status: "failed",
    icon: Receipt,
  },
  {
    id: "7",
    title: "Data Bundle",
    subtitle: "MTN 20GB",
    amount: 6000,
    type: "debit",
    date: "4 days ago",
    status: "completed",
    icon: Wifi,
  },
];

export default function TransactionHistory() {
  return (
    <Card className="rounded-3xl border-0 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Recent Transactions</h2>

          <p className="text-sm text-slate-500">
            Your latest wallet activities
          </p>
        </div>

        <Button variant="ghost">
          <Link href="/transactions">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-8 space-y-4">
        {transactions.map((transaction) => {
          const Icon = transaction.icon;

          return (
            <Link key={transaction.id} href={`/transactions/${transaction.id}`}>
              <div className="group flex items-center justify-between rounded-2xl border p-4 transition hover:bg-slate-50">
                <div className="flex items-center gap-4">
                  <div
                    className={`rounded-2xl p-3 ${
                      transaction.type === "credit"
                        ? "bg-emerald-100"
                        : "bg-red-100"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        transaction.type === "credit"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold">{transaction.title}</h3>

                    <p className="text-sm text-slate-500">
                      {transaction.subtitle}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {transaction.date}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <h4
                    className={`text-lg font-bold ${
                      transaction.type === "credit"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}₦
                    {transaction.amount.toLocaleString()}
                  </h4>

                  <Badge
                    variant="secondary"
                    className={
                      transaction.status === "completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : transaction.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="outline">
          <Link href="/transactions">Load More</Link>
        </Button>
      </div>
    </Card>
  );
}
