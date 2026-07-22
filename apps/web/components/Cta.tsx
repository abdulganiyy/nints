import Link from "next/link";
import {
  ArrowRight,
  Wallet,
  Smartphone,
  PiggyBank,
  CreditCard,
  Globe,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  "Free Wallet",
  "Instant Airtime",
  "Data Bundles",
  "Bill Payments",
  "Goal Savings",
  "Quick Loans",
];

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}

      <div className="absolute inset-0 bg-linear-to-r from-emerald-700 via-emerald-600 to-teal-600" />

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-md">
          <div className="grid items-center gap-16 p-10 lg:grid-cols-2 lg:p-16">
            {/* Left */}

            <div>
              <Badge className="border-0 bg-white/20 text-white hover:bg-white/20">
                Your Financial Journey Starts Here
              </Badge>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
                One App.
                <br />
                Every Financial Need.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-emerald-50">
                Join thousands of users managing their money with a secure
                digital wallet, airtime and data purchases, bill payments,
                savings goals, and flexible loan options—all in one place.
              </p>

              {/* Buttons */}

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-slate-100"
                >
                  <Link href="/register" className="inline-flex items-center">
                    Create Free Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-white hover:text-emerald-700"
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>

              {/* Feature list */}

              <div className="mt-12 grid grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-white" />

                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}

            <div className="rounded-3xl bg-white p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-900">
                  Why Choose Us?
                </h3>

                <Wallet className="h-10 w-10 text-emerald-600" />
              </div>

              <div className="mt-8 space-y-5">
                <Benefit
                  icon={<Wallet className="h-6 w-6" />}
                  title="Secure Digital Wallet"
                  description="Manage your funds safely with a dedicated wallet."
                />

                <Benefit
                  icon={<Smartphone className="h-6 w-6" />}
                  title="Instant Airtime & Data"
                  description="Top up all major Nigerian networks in seconds."
                />

                <Benefit
                  icon={<PiggyBank className="h-6 w-6" />}
                  title="Goal-Based Savings"
                  description="Save consistently towards personal financial goals."
                />

                <Benefit
                  icon={<CreditCard className="h-6 w-6" />}
                  title="Simple Loan Access"
                  description="Apply for eligible loans directly from your account."
                />

                <Benefit
                  icon={<Globe className="h-6 w-6" />}
                  title="International Transfers"
                  description="Coming soon with multi-currency support."
                  soon
                />
              </div>

              <div className="mt-8 rounded-2xl bg-emerald-50 p-5">
                <p className="text-sm font-medium text-emerald-700">
                  More financial services are on the way, including
                  international transfers, currency exchange, and virtual cards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  soon?: boolean;
}

function Benefit({ icon, title, description, soon }: BenefitProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border p-5 transition hover:border-emerald-300 hover:bg-emerald-50">
      <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
        {icon}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-slate-900">{title}</h4>

          {soon && (
            <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
              Coming Soon
            </span>
          )}
        </div>

        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  );
}
