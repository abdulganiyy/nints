"use client";

import {
  CheckCircle2,
  Clock3,
  Rocket,
  Wallet,
  Smartphone,
  Wifi,
  Receipt,
  PiggyBank,
  CreditCard,
  Building2,
  Globe,
  Landmark,
  BarChart3,
  Users,
  QrCode,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const currentFeatures = [
  {
    title: "Digital Wallet",
    icon: Wallet,
  },
  {
    title: "Airtime",
    icon: Smartphone,
  },
  {
    title: "Data Bundles",
    icon: Wifi,
  },
  {
    title: "Bill Payments",
    icon: Receipt,
  },
  {
    title: "Savings",
    icon: PiggyBank,
  },
  {
    title: "Loans",
    icon: CreditCard,
  },
];

const upcomingFeatures = [
  {
    title: "International Transfers",
    icon: Globe,
  },
  {
    title: "Currency Exchange",
    icon: Landmark,
  },
  {
    title: "Virtual Dollar Cards",
    icon: CreditCard,
  },
  {
    title: "Business Wallet",
    icon: Building2,
  },
];

const futureFeatures = [
  {
    title: "Investments",
    icon: BarChart3,
  },
  {
    title: "Group Savings",
    icon: Users,
  },
  {
    title: "QR Payments",
    icon: QrCode,
  },
  {
    title: "Advanced Security",
    icon: ShieldCheck,
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            Product Roadmap
          </Badge>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Building the Future of
            <span className="block text-emerald-600">Digital Finance</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We're continuously improving the platform by introducing new
            financial services and expanding access for individuals and
            businesses.
          </p>
        </div>

        {/* Timeline */}

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          <RoadmapCard
            title="Available Today"
            subtitle="Use these services immediately."
            icon={<CheckCircle2 className="h-7 w-7" />}
            iconColor="bg-emerald-100 text-emerald-600"
            features={currentFeatures}
          />

          <RoadmapCard
            title="Coming Soon"
            subtitle="Currently under development."
            icon={<Clock3 className="h-7 w-7" />}
            iconColor="bg-amber-100 text-amber-600"
            features={upcomingFeatures}
          />

          <RoadmapCard
            title="Future Vision"
            subtitle="Planned innovations."
            icon={<Rocket className="h-7 w-7" />}
            iconColor="bg-indigo-100 text-indigo-600"
            features={futureFeatures}
          />
        </div>

        {/* Bottom CTA */}

        <div className="mt-20 rounded-3xl bg-linear-to-r from-emerald-600 to-teal-600 p-10 text-white">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div>
              <h3 className="text-3xl font-bold">Join Us on the Journey</h3>

              <p className="mt-4 max-w-2xl text-lg text-emerald-100">
                Create your account today and enjoy our current services while
                being among the first to access upcoming features as they
                launch.
              </p>
            </div>

            <Button
              size="lg"
              className="bg-white text-emerald-700 hover:bg-slate-100"
            >
              <Link href="/register">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface Feature {
  title: string;
  icon: React.ElementType;
}

interface RoadmapCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
  features: Feature[];
}

function RoadmapCard({
  title,
  subtitle,
  icon,
  iconColor,
  features,
}: RoadmapCardProps) {
  return (
    <Card className="rounded-3xl border-0 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${iconColor}`}
      >
        {icon}
      </div>

      <h3 className="mt-6 text-2xl font-bold text-slate-900">{title}</h3>

      <p className="mt-3 text-slate-500">{subtitle}</p>

      <div className="mt-8 space-y-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="flex items-center gap-4 rounded-xl bg-slate-50 p-4"
            >
              <div className="rounded-lg bg-white p-2 shadow-sm">
                <Icon className="h-5 w-5 text-emerald-600" />
              </div>

              <span className="font-medium text-slate-700">
                {feature.title}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
