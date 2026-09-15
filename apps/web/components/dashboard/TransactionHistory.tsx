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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { LucideIcon } from "lucide-react";

type LedgerDirection = "DEBIT" | "CREDIT";

type Transaction = {
  id: string;
  reference: string;
  type: string;
  status: string;
  amount: string | number;
  currency: string;
  description?: string | null;
  metadata?: Record<string, any> | null;
  createdAt: string;
  ledgerEntries: {
    amount: string | number;
    direction: LedgerDirection;
    balanceBefore?: string | number | null;
    balanceAfter?: string | number | null;
  }[];
};

type TransactionUI = Transaction & {
  title: string;
  subtitle: string;
  direction: LedgerDirection;
  icon: LucideIcon;
};

function getTransactionUI(transaction: Transaction): TransactionUI {
  const entry = transaction.ledgerEntries[0];

  const direction = entry?.direction ?? "DEBIT";

  let title = "Transaction";
  let subtitle = transaction.description ?? transaction.reference;
  let icon: LucideIcon = MoreHorizontal;

  switch (transaction.type) {
    case "DEPOSIT":
      title = "Wallet Funding";
      subtitle = transaction.description ?? "Wallet funding";
      icon = ArrowDownLeft;
      break;

    case "TRANSFER":
      title = direction === "DEBIT" ? "Transfer Sent" : "Transfer Received";
      subtitle = transaction.description ?? "Wallet transfer";
      icon = direction === "DEBIT" ? ArrowUpRight : ArrowDownLeft;
      break;

    case "AIRTIME":
      title = "Airtime";
      subtitle =
        transaction.description ??
        (transaction.metadata?.phone
          ? transaction.metadata.phone
          : "Airtime purchase");
      icon = Smartphone;
      break;

    case "DATA":
      title = "Data Bundle";
      subtitle =
        transaction.description ??
        (transaction.metadata?.phone
          ? transaction.metadata.phone
          : "Data purchase");
      icon = Wifi;
      break;

    case "SAVINGS":
      title = "Savings";
      subtitle = transaction.description ?? "Savings deposit";
      icon = PiggyBank;
      break;

    case "LOAN":
      title = "Loan";
      subtitle = transaction.description ?? "Loan transaction";
      icon = CreditCard;
      break;

    case "LOAN_REPAYMENT":
      title = "Loan Repayment";
      subtitle = transaction.description ?? "Loan repayment";
      icon = CreditCard;
      break;

    case "ELECTRICITY":
      title = "Electricity";
      subtitle = transaction.description ?? "Electricity payment";
      icon = Receipt;
      break;

    case "CABLE":
      title = "Cable TV";
      subtitle = transaction.description ?? "Cable TV payment";
      icon = Receipt;
      break;

    default:
      title = transaction.type.replaceAll("_", " ");
      subtitle = transaction.description ?? transaction.reference;
      icon = MoreHorizontal;
  }

  return {
    ...transaction,
    title,
    subtitle,
    direction,
    icon,
  };
}

function formatAmount(amount: string | number) {
  return Number(amount).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

export default function TransactionHistory() {
  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await axios.get("/api/transaction");

      return res.data;
    },
  });

  if (isLoading) {
    return (
      <Card className="rounded-3xl border-0 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Recent Transactions</h2>

            <p className="text-sm text-slate-500">
              Your latest wallet activities
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-20 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="rounded-3xl border-0 p-6 shadow-sm">
        <h2 className="text-xl font-bold">Recent Transactions</h2>

        <div className="mt-8 rounded-2xl bg-red-50 p-6 text-center">
          <p className="font-medium text-red-700">
            Failed to load transactions
          </p>

          <p className="mt-1 text-sm text-red-500">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-3xl border-0 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Recent Transactions</h2>

          <p className="text-sm text-slate-500">
            Your latest wallet activities
          </p>
        </div>

        {/* <Button variant="ghost">
          <Link href="/transactions" className="inline-flex items-center">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button> */}
      </div>

      <div className="mt-8 space-y-4">
        {transactions.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center">
            <p className="font-medium">No transactions yet</p>

            <p className="mt-1 text-sm text-slate-500">
              Your wallet activities will appear here.
            </p>
          </div>
        ) : (
          transactions.map((transaction) => {
            const item = getTransactionUI(transaction);

            const Icon = item.icon;

            const isCredit = item.direction === "CREDIT";

            return (
              <Link
                key={transaction.id}
                href={`/transactions/${transaction.id}`}
                className="block"
              >
                <div className="group flex items-center justify-between rounded-2xl border p-4 transition hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-2xl p-3 ${
                        isCredit ? "bg-emerald-100" : "bg-red-100"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          isCredit ? "text-emerald-600" : "text-red-600"
                        }`}
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold">{item.title}</h3>

                      <p className="text-sm text-slate-500">{item.subtitle}</p>

                      <p className="mt-1 text-xs text-slate-400">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <h4
                      className={`text-lg font-bold ${
                        isCredit ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {isCredit ? "+" : "-"}
                      {transaction.currency === "NGN" ? "₦" : ""}
                      {formatAmount(transaction.amount)}
                    </h4>

                    <Badge
                      variant="secondary"
                      className={
                        transaction.status === "SUCCESS"
                          ? "bg-emerald-100 text-emerald-700"
                          : transaction.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : transaction.status === "FAILED"
                              ? "bg-red-100 text-red-700"
                              : "bg-slate-100 text-slate-700"
                      }
                    >
                      {formatStatus(transaction.status)}
                    </Badge>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* {transactions.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Button variant="outline">
            <Link href="/transactions">Load More</Link>
          </Button>
        </div>
      )} */}
    </Card>
  );
}
