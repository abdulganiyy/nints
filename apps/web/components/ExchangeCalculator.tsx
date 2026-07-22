"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownUp, TrendingUp, Wallet } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
}

const currencies: CurrencyRate[] = [
  {
    code: "AED",
    name: "UAE Dirham",
    rate: 420,
  },
  {
    code: "SAR",
    name: "Saudi Riyal",
    rate: 112,
  },
  {
    code: "QAR",
    name: "Qatari Riyal",
    rate: 115,
  },
  {
    code: "KWD",
    name: "Kuwaiti Dinar",
    rate: 1380,
  },
  {
    code: "BHD",
    name: "Bahraini Dinar",
    rate: 1115,
  },
  {
    code: "OMR",
    name: "Omani Rial",
    rate: 1098,
  },
];

const FEE_PERCENT = 0.5;

export default function ExchangeCalculator() {
  const [amount, setAmount] = useState(100000);

  const [currency, setCurrency] = useState("AED");

  const selectedCurrency = useMemo(
    () => currencies.find((c) => c.code === currency)!,
    [currency],
  );

  const fee = useMemo(() => {
    return (amount * FEE_PERCENT) / 100;
  }, [amount]);

  const exchangeAmount = useMemo(() => {
    return amount - fee;
  }, [amount, fee]);

  const receiveAmount = useMemo(() => {
    return exchangeAmount / selectedCurrency.rate;
  }, [exchangeAmount, selectedCurrency.rate]);

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Exchange Calculator
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Know Exactly What Your Recipient Gets
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Live exchange calculation with transparent fees.
          </p>
        </div>

        <Card className="mx-auto max-w-4xl rounded-3xl border-0 p-8 shadow-xl">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* LEFT */}

            <div>
              <label className="text-sm font-medium text-slate-500">
                You Send
              </label>

              <Input
                type="number"
                min={1000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-2 h-14 text-2xl"
              />

              <div className="mt-6 rounded-2xl bg-slate-100 p-4">
                <div className="flex justify-between">
                  <span>Currency</span>

                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-transparent font-semibold outline-none"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700">
                Start Transfer
              </Button>
            </div>

            {/* RIGHT */}

            <div className="rounded-3xl bg-slate-900 p-8 text-white">
              <div className="flex items-center gap-3">
                <Wallet />

                <h3 className="text-xl font-semibold">Transfer Summary</h3>
              </div>

              <div className="mt-10 space-y-5">
                <SummaryRow
                  label="Amount"
                  value={`₦${amount.toLocaleString()}`}
                />

                <SummaryRow label="Fee" value={`₦${fee.toLocaleString()}`} />

                <SummaryRow
                  label="Exchange Rate"
                  value={`1 ${selectedCurrency.code} = ₦${selectedCurrency.rate}`}
                />

                <SummaryRow
                  label="Amount Exchanged"
                  value={`₦${exchangeAmount.toLocaleString()}`}
                />

                <div className="border-t border-slate-700 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg">Recipient Gets</span>

                    <span className="text-3xl font-bold text-emerald-400">
                      {receiveAmount.toFixed(2)} {selectedCurrency.code}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-emerald-500/10 p-5">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <TrendingUp className="h-5 w-5" />
                    Live Market Rate
                  </div>

                  <p className="mt-2 text-sm text-slate-300">
                    Rates are refreshed periodically and the final quote is
                    locked when you confirm your transfer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}

          <div className="mt-12 flex justify-center">
            <ArrowDownUp className="h-10 w-10 text-emerald-600" />
          </div>
        </Card>
      </div>
    </section>
  );
}

interface SummaryRowProps {
  label: string;
  value: string;
}

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-400">{label}</span>

      <span className="font-semibold">{value}</span>
    </div>
  );
}
