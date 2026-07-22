import Link from "next/link";
import {
  UserPlus,
  ShieldCheck,
  Wallet,
  Smartphone,
  PiggyBank,
  CreditCard,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    number: "01",
    title: "Create an Account",
    description:
      "Sign up in minutes using your email address or phone number and create your secure financial account.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Verify Your Identity",
    description:
      "Complete identity verification to secure your account and unlock available financial services.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Fund Your Wallet",
    description:
      "Add money using your dedicated virtual account or supported payment methods.",
    icon: Wallet,
  },
  {
    number: "04",
    title: "Choose a Service",
    description:
      "Buy airtime or data, pay bills, save towards your goals, transfer funds, or apply for eligible loans.",
    icon: Smartphone,
  },
];

const services = [
  "Digital Wallet",
  "Airtime Top-up",
  "Data Bundles",
  "Bill Payments",
  "Goal Savings",
  "Wallet Transfers",
  "Quick Loans",
  "Transaction History",
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            Simple Process
          </Badge>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Get Started in
            <span className="block text-emerald-600">Four Easy Steps</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We've made managing your finances simple. Create an account, verify
            your identity, fund your wallet, and start using our financial
            services.
          </p>
        </div>

        {/* Timeline */}

        <div className="relative mt-20">
          {/* Desktop Line */}

          <div className="absolute left-0 right-0 top-16 hidden h-1 bg-emerald-100 lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative">
                  <Card className="h-full rounded-3xl border-0 bg-slate-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    {/* Step Number */}

                    <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-bold text-white shadow-lg">
                      {step.number}
                    </div>

                    {/* Icon */}

                    <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                      <Icon className="h-8 w-8 text-emerald-600" />
                    </div>

                    <h3 className="mt-8 text-2xl font-semibold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-4 leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services Card */}

        <div className="mt-24 grid gap-12 lg:grid-cols-2">
          <Card className="rounded-3xl border-0 bg-emerald-600 p-10 text-white shadow-xl">
            <h3 className="text-3xl font-bold">
              Everything You Need in One App
            </h3>

            <p className="mt-5 text-lg text-emerald-100">
              After funding your wallet, you can immediately start using our
              available financial services.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-3 rounded-xl bg-white/10 p-4"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0" />

                  <span>{service}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Coming Soon */}

          <Card className="rounded-3xl border border-dashed border-emerald-300 bg-emerald-50 p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
              <PiggyBank className="h-8 w-8 text-emerald-600" />
            </div>

            <h3 className="mt-8 text-3xl font-bold text-slate-900">
              More Features Are Coming
            </h3>

            <p className="mt-5 leading-8 text-slate-600">
              We're continuously expanding the platform with more financial
              products to help you manage your money more efficiently.
            </p>

            <div className="mt-8 space-y-4">
              <ComingSoonItem title="International Money Transfers" />
              <ComingSoonItem title="Multi-Currency Exchange" />
              <ComingSoonItem title="Virtual Dollar Cards" />
              <ComingSoonItem title="Investment Products" />
              <ComingSoonItem title="Business Accounts" />
            </div>

            <Button className="mt-10 bg-emerald-600 hover:bg-emerald-700">
              <Link href="/register">
                Join the Waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </div>

        {/* Bottom Statistics */}

        <div className="mt-20 grid gap-6 rounded-3xl bg-slate-50 p-10 md:grid-cols-4">
          <Statistic value="24/7" label="Wallet Access" />

          <Statistic value="Instant" label="Airtime & Data" />

          <Statistic value="Secure" label="Transactions" />

          <Statistic value="Coming" label="Global Transfers" />
        </div>
      </div>
    </section>
  );
}

function ComingSoonItem({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-4">
      <CreditCard className="h-5 w-5 text-emerald-600" />

      <span className="font-medium text-slate-700">{title}</span>
    </div>
  );
}

function Statistic({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <h3 className="text-3xl font-bold text-emerald-600">{value}</h3>

      <p className="mt-2 text-slate-600">{label}</p>
    </div>
  );
}
