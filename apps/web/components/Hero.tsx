"use client";

import Link from "next/link";
import {
  ArrowRight,
  Wallet,
  Smartphone,
  PiggyBank,
  CreditCard,
  Globe,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const services = ["Wallet", "Airtime", "Data", "Bills", "Savings", "Loans"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-emerald-50 via-white to-white">
      {/* Background */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-100 blur-3xl opacity-40" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-100 blur-3xl opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}

          <div>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              Your Everyday Financial Super App
            </Badge>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Manage Your Money
              <span className="block text-emerald-600">Smarter Every Day</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
              Fund your wallet, buy airtime and data, pay bills, save towards
              your goals, and access loans—all in one secure platform built for
              Nigerians.
            </p>

            {/* Service Chips */}

            <div className="mt-8 flex flex-wrap gap-3">
              {services.map((service) => (
                <Badge
                  key={service}
                  variant="secondary"
                  className="rounded-full px-4 py-2"
                >
                  {service}
                </Badge>
              ))}
            </div>

            {/* CTA */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/register" className="inline-flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button variant="outline" size="lg">
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>

            {/* Trust */}

            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              <TrustItem
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Secure"
              />

              <TrustItem icon={<Wallet className="h-5 w-5" />} title="Wallet" />

              <TrustItem
                icon={<PiggyBank className="h-5 w-5" />}
                title="Savings"
              />

              <TrustItem
                icon={<CreditCard className="h-5 w-5" />}
                title="Loans"
              />
            </div>
          </div>

          {/* Right */}

          <div className="relative">
            <div className="rounded-3xl border bg-white p-8 shadow-2xl">
              {/* Wallet */}

              <div className="rounded-2xl bg-emerald-600 p-6 text-white">
                <p className="text-sm opacity-80">Wallet Balance</p>

                <h2 className="mt-2 text-4xl font-bold">₦245,000.00</h2>

                <p className="mt-3 text-sm">Available Balance</p>
              </div>

              {/* Quick Services */}

              <div className="mt-8">
                <h3 className="font-semibold text-slate-900">Quick Services</h3>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <ServiceButton icon={<Smartphone />} title="Airtime" />

                  <ServiceButton icon={<Wallet />} title="Wallet" />

                  <ServiceButton icon={<PiggyBank />} title="Savings" />

                  <ServiceButton icon={<CreditCard />} title="Loans" />
                </div>
              </div>

              {/* Coming Soon */}

              <div className="mt-8 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 p-5">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-emerald-600" />

                  <span className="font-semibold text-emerald-700">
                    Coming Soon
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-600">
                  International Money Transfers & Multi-Currency Exchange.
                </p>
              </div>

              {/* Stats */}

              <div className="mt-8 grid grid-cols-3 gap-4 border-t pt-8">
                <Stat title="Wallet" value="24/7" />

                <Stat title="Bills" value="Instant" />

                <Stat title="Support" value="Always" />
              </div>
            </div>

            {/* Floating Card */}

            <div className="absolute -left-10 top-12 hidden rounded-2xl border bg-white p-4 shadow-xl lg:block">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />

                <div>
                  <p className="font-semibold">Savings Goal</p>

                  <p className="text-sm text-slate-500">₦450,000 Saved</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-8 bottom-10 hidden rounded-2xl border bg-white p-4 shadow-xl lg:block">
              <div className="flex items-center gap-3">
                <Wallet className="h-10 w-10 text-emerald-600" />

                <div>
                  <p className="font-semibold">Airtime Purchased</p>

                  <p className="text-sm text-slate-500">MTN ₦2,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}

        <div className="mt-24 grid gap-8 rounded-3xl border bg-white p-10 shadow-sm md:grid-cols-4">
          <Metric value="Wallet" label="Secure Digital Wallet" />

          <Metric value="Savings" label="Goal-Based Savings" />

          <Metric value="Loans" label="Quick Loan Access" />

          <Metric value="Soon" label="International Transfers" />
        </div>
      </div>
    </section>
  );
}

function TrustItem({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-sm">
      <div className="text-emerald-600">{icon}</div>
      <span className="text-sm font-medium">{title}</span>
    </div>
  );
}

function ServiceButton({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <button className="rounded-2xl border p-5 transition hover:border-emerald-500 hover:bg-emerald-50">
      <div className="text-emerald-600">{icon}</div>

      <p className="mt-3 font-medium">{title}</p>
    </button>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-xl font-bold text-slate-900">{value}</p>

      <p className="text-sm text-slate-500">{title}</p>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-emerald-600">{value}</h3>

      <p className="mt-2 text-slate-600">{label}</p>
    </div>
  );
}
