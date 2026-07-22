import Link from "next/link";
import {
  ArrowRight,
  Wallet,
  Smartphone,
  Wifi,
  Receipt,
  PiggyBank,
  Landmark,
  CreditCard,
  Globe,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "Digital Wallet",
    description:
      "Fund your wallet, transfer money, and manage your finances from one secure account.",
    icon: Wallet,
    color: "bg-emerald-100 text-emerald-600",
    available: true,
  },
  {
    title: "Airtime Top-up",
    description:
      "Buy airtime instantly for MTN, Airtel, Glo, and 9mobile anytime.",
    icon: Smartphone,
    color: "bg-blue-100 text-blue-600",
    available: true,
  },
  {
    title: "Data Bundles",
    description:
      "Purchase affordable internet data bundles for all major Nigerian networks.",
    icon: Wifi,
    color: "bg-purple-100 text-purple-600",
    available: true,
  },
  {
    title: "Bill Payments",
    description:
      "Pay electricity, cable TV, internet subscriptions and other supported bills.",
    icon: Receipt,
    color: "bg-orange-100 text-orange-600",
    available: true,
  },
  {
    title: "Savings Goals",
    description:
      "Create savings goals, lock funds, automate contributions, and monitor your progress.",
    icon: PiggyBank,
    color: "bg-pink-100 text-pink-600",
    available: true,
  },
  {
    title: "Quick Loans",
    description:
      "Apply for personal or business loans with transparent repayment schedules.",
    icon: CreditCard,
    color: "bg-indigo-100 text-indigo-600",
    available: true,
  },
  {
    title: "Bank Transfers",
    description:
      "Transfer money securely between wallets and supported Nigerian bank accounts.",
    icon: Landmark,
    color: "bg-cyan-100 text-cyan-600",
    available: true,
  },
  {
    title: "International Transfers",
    description:
      "Send money abroad and exchange currencies including Gulf currencies.",
    icon: Globe,
    color: "bg-slate-100 text-slate-600",
    available: false,
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            Everything You Need
          </Badge>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            One Platform.
            <span className="block text-emerald-600">
              Multiple Financial Services.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Manage your money with secure wallet services, airtime and data
            purchases, bill payments, savings, loans, and more—all from a single
            account.
          </p>
        </div>

        {/* Feature Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group relative rounded-3xl border-0 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {!feature.available && (
                  <Badge className="absolute right-6 top-6 bg-amber-100 text-amber-700 hover:bg-amber-100">
                    Coming Soon
                  </Badge>
                )}

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${feature.color}`}
                >
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mt-8 text-2xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>

                <Button
                  variant="ghost"
                  className="mt-8 px-0 text-emerald-600 hover:bg-transparent hover:text-emerald-700"
                  //   asChild={feature.available}
                  disabled={!feature.available}
                >
                  {feature.available ? (
                    <Link href="/register" className="inline-flex items-center">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <span>Available Soon</span>
                  )}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}

        <div className="mt-24 rounded-3xl bg-linear-to-r from-emerald-600 to-emerald-500 p-10 text-white">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div>
              <h3 className="text-3xl font-bold">
                Start Managing Your Money Today
              </h3>

              <p className="mt-4 max-w-2xl text-lg text-emerald-100">
                Open your free account and enjoy fast wallet funding, airtime
                purchases, savings, loans, and much more from one secure
                platform.
              </p>
            </div>

            <Button
              size="lg"
              className="bg-white text-emerald-700 hover:bg-slate-100"
            >
              <Link href="/register" className="inline-flex items-center">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
