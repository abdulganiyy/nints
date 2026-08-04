"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Wallet,
  Copy,
  Check,
  ArrowDownLeft,
  ArrowUpRight,
  Landmark,
  CreditCard,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BalanceCardProps {
  availableBalance?: number;
  ledgerBalance?: number;
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  monthlyIncome?: number;
  monthlyExpense?: number;
}

export default function BalanceCard({
  availableBalance = 1250000.5,
  ledgerBalance = 1260000.5,
  accountName = "ABDULGANIYY BALOGUN",
  accountNumber = "1234567890",
  bankName = "Paystack-Titan",
}: BalanceCardProps) {
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }),
    [],
  );

  async function copyAccount() {
    await navigator.clipboard.writeText(accountNumber);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card className="overflow-hidden border-0 bg-linear-to-br from-emerald-700 via-emerald-600 to-teal-600 text-white shadow-xl">
      <div className="p-8">
        {/* Top */}

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-100">
              <Wallet className="h-5 w-5" />

              <span>Available Balance</span>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <h1 className="text-4xl font-bold">
                {hidden ? "••••••••" : formatter.format(availableBalance)}
              </h1>

              <button
                onClick={() => setHidden(!hidden)}
                className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
              >
                {hidden ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>

            <p className="mt-3 text-sm text-emerald-100">
              Ledger Balance:{" "}
              <span className="font-semibold text-white">
                {hidden ? "••••••••" : formatter.format(ledgerBalance)}
              </span>
            </p>
          </div>

          <div className="rounded-2xl bg-white/15 px-4 py-2 text-sm backdrop-blur">
            Wallet
          </div>
        </div>

        {/* Virtual Account */}

        <div className="mt-10 rounded-2xl bg-white/10 p-5 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-100">
                Dedicated Virtual Account
              </p>

              <h3 className="mt-2 text-xl font-semibold">{accountNumber}</h3>

              <p className="mt-1 text-sm text-emerald-100">{accountName}</p>

              <p className="text-sm text-emerald-100">{bankName}</p>
            </div>

            <Button variant="secondary" size="icon" onClick={copyAccount}>
              {copied ? (
                <Check className="h-5 w-5" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Actions */}

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          <ActionButton
            href="/wallet/fund"
            icon={<ArrowDownLeft className="h-5 w-5" />}
            title="Fund"
          />

          <ActionButton
            href="/transfer"
            icon={<ArrowUpRight className="h-5 w-5" />}
            title="Transfer"
          />

          <ActionButton
            href="/withdraw"
            icon={<Landmark className="h-5 w-5" />}
            title="Withdraw"
          />
        </div>
      </div>
    </Card>
  );
}

function ActionButton({
  href,
  icon,
  title,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <Button
      variant="secondary"
      className="h-20 flex-col gap-2 rounded-2xl bg-white/15 text-white backdrop-blur hover:bg-white/25"
    >
      <Link href={href}>
        {icon}
        <span>{title}</span>
      </Link>
    </Button>
  );
}
