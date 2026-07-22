"use client";

import { useMemo } from "react";
import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ExchangeRate {
  currency: string;
  country: string;
  flag: string;
  rate: number;
  change: number;
}

export default function LiveRates() {
  const rates: ExchangeRate[] = useMemo(
    () => [
      {
        currency: "AED",
        country: "United Arab Emirates",
        flag: "🇦🇪",
        rate: 420.15,
        change: 1.12,
      },
      {
        currency: "SAR",
        country: "Saudi Arabia",
        flag: "🇸🇦",
        rate: 112.32,
        change: -0.28,
      },
      {
        currency: "QAR",
        country: "Qatar",
        flag: "🇶🇦",
        rate: 115.44,
        change: 0.65,
      },
      {
        currency: "KWD",
        country: "Kuwait",
        flag: "🇰🇼",
        rate: 1378.95,
        change: 2.31,
      },
      {
        currency: "BHD",
        country: "Bahrain",
        flag: "🇧🇭",
        rate: 1112.82,
        change: -0.46,
      },
      {
        currency: "OMR",
        country: "Oman",
        flag: "🇴🇲",
        rate: 1095.7,
        change: 0.91,
      },
    ],
    [],
  );

  return (
    <section id="rates" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}

        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Exchange Rates
            </p>

            <h2 className="text-4xl font-bold text-slate-900">
              Today's Live Rates
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Competitive exchange rates updated regularly. Final rates may vary
              slightly depending on market conditions.
            </p>
          </div>

          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Rates
          </Button>
        </div>

        {/* Grid */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rates.map((item) => (
            <Card
              key={item.currency}
              className="rounded-3xl border-0 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{item.flag}</div>

                  <div>
                    <h3 className="text-xl font-bold">{item.currency}</h3>

                    <p className="text-sm text-slate-500">{item.country}</p>
                  </div>
                </div>

                {item.change >= 0 ? (
                  <span className="flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    {item.change}%
                  </span>
                ) : (
                  <span className="flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                    <ArrowDownRight className="mr-1 h-4 w-4" />
                    {Math.abs(item.change)}%
                  </span>
                )}
              </div>

              <div className="mt-8">
                <p className="text-sm text-slate-500">1 {item.currency}</p>

                <h2 className="mt-1 text-4xl font-bold text-slate-900">
                  ₦{item.rate.toLocaleString()}
                </h2>
              </div>

              <div className="mt-8 flex items-center justify-between border-t pt-5">
                <span className="text-sm text-slate-500">Updated just now</span>

                <Button variant="ghost" size="sm">
                  Exchange
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom */}

        <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-3xl bg-emerald-600 p-8 text-white md:flex-row">
          <div>
            <h3 className="text-2xl font-bold">Ready to exchange?</h3>

            <p className="mt-2 text-emerald-100">
              Lock today's rates and transfer money securely across the Gulf.
            </p>
          </div>

          <Button
            size="lg"
            className="bg-white text-emerald-700 hover:bg-slate-100"
          >
            View All Rates
          </Button>
        </div>
      </div>
    </section>
  );
}
