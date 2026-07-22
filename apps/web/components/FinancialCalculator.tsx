"use client";

import { useMemo, useState } from "react";
import { Calculator, PiggyBank, CreditCard, Globe } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FinancialCalculator() {
  return (
    <section id="calculator" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Badge className="bg-emerald-100 text-emerald-700">
            Financial Calculator
          </Badge>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Plan Your Finances
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Estimate your savings growth, monthly loan repayments, and preview
            our upcoming currency exchange feature.
          </p>
        </div>

        <Tabs defaultValue="savings" className="mt-16">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="loan">Loan</TabsTrigger>

            <TabsTrigger value="exchange">Exchange</TabsTrigger>
          </TabsList>

          <TabsContent value="loan">
            <LoanCalculator />
          </TabsContent>

          <TabsContent value="exchange">
            <ExchangeComingSoon />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function SavingsCalculator() {
  const [amount, setAmount] = useState(100000);
  const [months, setMonths] = useState(12);
  const [rate, setRate] = useState(10);

  const interest = useMemo(() => {
    return (amount * (rate / 100) * months) / 12;
  }, [amount, rate, months]);

  const total = amount + interest;

  return (
    <Card className="mt-8 rounded-3xl p-8">
      <div className="flex items-center gap-3">
        <PiggyBank className="h-8 w-8 text-emerald-600" />
        <h3 className="text-2xl font-bold">Savings Calculator</h3>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <Field
            label="Savings Amount (₦)"
            value={amount}
            onChange={setAmount}
          />

          <Field
            label="Duration (Months)"
            value={months}
            onChange={setMonths}
          />

          <Field
            label="Estimated Annual Interest (%)"
            value={rate}
            onChange={setRate}
          />
        </div>

        <ResultCard
          title="Estimated Returns"
          items={[
            {
              label: "Principal",
              value: formatCurrency(amount),
            },
            {
              label: "Interest",
              value: formatCurrency(interest),
            },
            {
              label: "Total Value",
              value: formatCurrency(total),
            },
          ]}
        />
      </div>
    </Card>
  );
}

function LoanCalculator() {
  const [loan, setLoan] = useState(500000);
  const [months, setMonths] = useState(12);
  const [rate, setRate] = useState(0);

  const monthly = useMemo(() => {
    const interest = loan * (rate / 100);
    return (loan + interest) / months;
  }, [loan, months, rate]);

  return (
    <Card className="mt-8 rounded-3xl p-8">
      <div className="flex items-center gap-3">
        <CreditCard className="h-8 w-8 text-emerald-600" />
        <h3 className="text-2xl font-bold">Loan Calculator</h3>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <Field label="Loan Amount (₦)" value={loan} onChange={setLoan} />

          <Field
            label="Repayment Period (Months)"
            value={months}
            onChange={setMonths}
          />

          <Field
            label="Interest Rate (%)"
            value={rate}
            onChange={setRate}
            disabled
          />
        </div>

        <ResultCard
          title="Repayment Estimate"
          items={[
            {
              label: "Loan Amount",
              value: formatCurrency(loan),
            },
            {
              label: "Monthly Payment",
              value: formatCurrency(monthly),
            },
            {
              label: "Repayment Period",
              value: `${months} Months`,
            },
          ]}
        />
      </div>
    </Card>
  );
}

function ExchangeComingSoon() {
  return (
    <Card className="mt-8 rounded-3xl p-12 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <Globe className="h-10 w-10 text-emerald-600" />
      </div>

      <h3 className="mt-8 text-3xl font-bold">Currency Exchange</h3>

      <p className="mx-auto mt-6 max-w-xl text-slate-600">
        International money transfers and currency exchange will be available in
        a future release, including support for selected Gulf currencies.
      </p>

      <div className="mx-auto mt-10 max-w-lg rounded-2xl bg-emerald-50 p-6">
        <p className="font-medium text-emerald-700">Planned support:</p>

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {["AED", "SAR", "QAR", "KWD", "OMR", "BHD"].map((currency) => (
            <Badge key={currency}>{currency}</Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}

interface FieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

function Field({ label, value, onChange, disabled }: FieldProps) {
  return (
    <div>
      <Label>{label}</Label>

      <Input
        className="mt-2"
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
      />
    </div>
  );
}

interface ResultCardProps {
  title: string;
  items: {
    label: string;
    value: string;
  }[];
}

function ResultCard({ title, items }: ResultCardProps) {
  return (
    <div className="rounded-3xl bg-emerald-600 p-8 text-white">
      <Calculator className="h-8 w-8" />

      <h4 className="mt-6 text-2xl font-bold">{title}</h4>

      <div className="mt-8 space-y-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex justify-between border-b border-white/20 pb-4"
          >
            <span>{item.label}</span>

            <span className="font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(value);
}
