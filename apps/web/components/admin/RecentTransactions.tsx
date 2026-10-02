"use client";

import { ArrowDownLeft, ArrowUpRight, CircleAlert } from "lucide-react";

interface RecentTransactionsProps {
  transactions: any[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <section className="rounded-xl border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h2 className="font-semibold text-slate-900">Recent Transactions</h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest activity on NintPay
          </p>
        </div>

        <button
          type="button"
          className="text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50 text-left">
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                User
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                Reference
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                Type
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                Amount
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TransactionRow({ transaction }: { transaction: any }) {
  return (
    <tr className="hover:bg-slate-50">
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium text-slate-900">
            {transaction.user?.fullName ?? "Unknown user"}
          </p>

          <p className="text-xs text-slate-500">
            {transaction.user?.email ?? transaction.user?.phone}
          </p>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="font-mono text-xs text-slate-600">
          {transaction.reference}
        </span>
      </td>

      <td className="px-6 py-4">
        <TransactionType type={transaction.type} />
      </td>

      <td className="px-6 py-4">
        <span className="text-sm font-medium text-slate-900">
          {formatCurrency(transaction.amount, transaction.currency)}
        </span>
      </td>

      <td className="px-6 py-4">
        <TransactionStatus status={transaction.status} />
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
        {formatDate(transaction.createdAt)}
      </td>
    </tr>
  );
}

function TransactionType({ type }: { type: string }) {
  const isDeposit = type === "DEPOSIT";

  const Icon = isDeposit ? ArrowDownLeft : ArrowUpRight;

  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-slate-500" />

      <span className="text-sm text-slate-700">
        {formatTransactionType(type)}
      </span>
    </div>
  );
}

function TransactionStatus({ status }: { status: string }) {
  const styles: Record<string, string> = {
    SUCCESS: "bg-emerald-50 text-emerald-700",
    PENDING: "bg-amber-50 text-amber-700",
    FAILED: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function formatTransactionType(type: string) {
  return type
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatCurrency(value: number | string, currency = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
  }).format(Number(value));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
