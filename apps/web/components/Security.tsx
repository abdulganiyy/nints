import {
  ShieldCheck,
  Lock,
  Fingerprint,
  Bell,
  BadgeCheck,
  FileCheck2,
  ArrowRight,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: "Bank-Level Security",
    description:
      "Every transaction is protected using enterprise-grade encryption and secure communication channels.",
  },
  {
    icon: Fingerprint,
    title: "Identity Verification",
    description:
      "KYC verification helps prevent fraud and ensures compliance with financial regulations.",
  },
  {
    icon: Lock,
    title: "Protected Accounts",
    description:
      "Your wallet and account are safeguarded with strong authentication and secure session management.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description:
      "Receive real-time alerts for deposits, transfers, withdrawals, and account activities.",
  },
  {
    icon: BadgeCheck,
    title: "Fraud Monitoring",
    description:
      "Advanced risk monitoring continuously checks transactions for suspicious activities.",
  },
  {
    icon: FileCheck2,
    title: "Regulatory Compliance",
    description:
      "We follow AML and KYC requirements to provide a secure and compliant money transfer experience.",
  },
];

export default function Security() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Security First
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Your Money is Protected Every Step of the Way
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We combine modern security technology, identity verification, and
            continuous monitoring to keep your money and personal information
            safe.
          </p>
        </div>

        {/* Features */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {securityFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 transition group-hover:bg-emerald-600">
                  <Icon className="h-8 w-8 text-emerald-600 group-hover:text-white" />
                </div>

                <h3 className="mt-8 text-2xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Trust Banner */}

        <div className="mt-24 rounded-3xl bg-linear-to-r from-emerald-600 to-emerald-500 p-10 text-white shadow-2xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-3xl font-bold">
                Trusted by Customers for Secure Transfers
              </h3>

              <p className="mt-4 max-w-xl text-lg leading-8 text-emerald-100">
                Every transfer is encrypted, monitored, and processed through
                trusted banking partners, giving you confidence every time you
                send money.
              </p>

              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5" />
                  End-to-end encrypted transactions
                </li>

                <li className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5" />
                  Continuous fraud detection
                </li>

                <li className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5" />
                  Secure wallet infrastructure
                </li>

                <li className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5" />
                  Identity verification (KYC)
                </li>
              </ul>

              <Button
                size="lg"
                className="mt-10 bg-white text-emerald-700 hover:bg-slate-100"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Right Side */}

            <Card className="rounded-3xl border-0 bg-white p-8 text-slate-900 shadow-xl">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-emerald-600" />

                <h4 className="text-2xl font-bold">Security Highlights</h4>
              </div>

              <div className="mt-8 space-y-6">
                <SecurityItem label="Data Encryption" value="AES-256" />

                <SecurityItem label="Authentication" value="2FA Supported" />

                <SecurityItem label="KYC Verification" value="Required" />

                <SecurityItem label="Fraud Monitoring" value="24/7" />

                <SecurityItem label="Transfer Alerts" value="Instant" />

                <SecurityItem label="Compliance" value="AML / KYC" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SecurityItemProps {
  label: string;
  value: string;
}

function SecurityItem({ label, value }: SecurityItemProps) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
      <span className="text-slate-600">{label}</span>

      <span className="font-semibold text-emerald-600">{value}</span>
    </div>
  );
}
