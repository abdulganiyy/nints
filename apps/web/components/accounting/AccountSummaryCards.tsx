"use client";

import {
  Banknote,
  CircleDollarSign,
  CreditCard,
  Landmark,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { AccountSummary } from "@/types";

type Props = {
  summary?: AccountSummary;
  isLoading: boolean;
};

export default function AccountSummaryCards({
  summary,
  isLoading,
}: Props) {
  const cards = [
    {
      title: "Total Accounts",
      value: summary?.totalAccounts ?? 0,
      icon: Landmark,
    },
    {
      title: "Assets",
      value: summary?.assets ?? 0,
      icon: Banknote,
    },
    {
      title: "Liabilities",
      value: summary?.liabilities ?? 0,
      icon: CreditCard,
    },
    {
      title: "Equity",
      value: summary?.equity ?? 0,
      icon: CircleDollarSign,
    },
    {
      title: "Revenue",
      value: summary?.revenue ?? 0,
      icon: TrendingUp,
    },
    {
      title: "Expenses",
      value: summary?.expenses ?? 0,
      icon: TrendingDown,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  {card.title}
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {isLoading ? (
                    <span className="inline-block h-7 w-12 animate-pulse rounded bg-muted" />
                  ) : (
                    card.value.toLocaleString("en-NG")
                  )}
                </p>
              </div>

              <div className="rounded-xl bg-muted p-3">
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}