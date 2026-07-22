"use client";

import {
  Smartphone,
  Wifi,
  Tv,
  Zap,
  GraduationCap,
  Building2,
  ArrowRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    title: "Airtime",
    icon: Smartphone,
    providers: [
      { name: "MTN", color: "bg-yellow-100 text-yellow-700" },
      { name: "Airtel", color: "bg-red-100 text-red-700" },
      { name: "Glo", color: "bg-green-100 text-green-700" },
      { name: "9mobile", color: "bg-emerald-100 text-emerald-700" },
    ],
  },
  {
    title: "Data",
    icon: Wifi,
    providers: [
      { name: "MTN Data", color: "bg-yellow-100 text-yellow-700" },
      { name: "Airtel Data", color: "bg-red-100 text-red-700" },
      { name: "Glo Data", color: "bg-green-100 text-green-700" },
      { name: "9mobile Data", color: "bg-emerald-100 text-emerald-700" },
    ],
  },
  {
    title: "Electricity",
    icon: Zap,
    providers: [
      { name: "IKEDC", color: "bg-blue-100 text-blue-700" },
      { name: "EKEDC", color: "bg-indigo-100 text-indigo-700" },
      { name: "AEDC", color: "bg-orange-100 text-orange-700" },
      { name: "IBEDC", color: "bg-cyan-100 text-cyan-700" },
    ],
  },
  {
    title: "Cable TV",
    icon: Tv,
    providers: [
      { name: "DSTV", color: "bg-sky-100 text-sky-700" },
      { name: "GOtv", color: "bg-lime-100 text-lime-700" },
      { name: "Startimes", color: "bg-purple-100 text-purple-700" },
    ],
  },
  {
    title: "Education",
    icon: GraduationCap,
    providers: [
      { name: "WAEC", color: "bg-amber-100 text-amber-700" },
      { name: "NECO", color: "bg-teal-100 text-teal-700" },
      { name: "JAMB", color: "bg-pink-100 text-pink-700" },
    ],
  },
  {
    title: "Bank Transfers",
    icon: Building2,
    providers: [
      { name: "All Nigerian Banks", color: "bg-slate-100 text-slate-700" },
    ],
  },
];

export default function Providers() {
  return (
    <section id="providers" className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            Supported Providers
          </Badge>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Access Multiple Services
            <span className="block text-emerald-600">From One Wallet</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Pay bills, purchase airtime and internet data, transfer money and
            access financial services from one convenient platform.
          </p>
        </div>

        {/* Categories */}

        <div className="mt-20 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Card
                key={category.title}
                className="rounded-3xl border-0 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-emerald-100 p-4">
                    <Icon className="h-7 w-7 text-emerald-600" />
                  </div>

                  <h3 className="text-2xl font-semibold">{category.title}</h3>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {category.providers.map((provider) => (
                    <span
                      key={provider.name}
                      className={`rounded-full px-4 py-2 text-sm font-medium ${provider.color}`}
                    >
                      {provider.name}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom Banner */}

        <div className="mt-20 rounded-3xl bg-linear-to-r from-emerald-600 to-teal-600 p-10 text-white">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div>
              <h3 className="text-3xl font-bold">More Providers Coming Soon</h3>

              <p className="mt-4 max-w-2xl text-lg text-emerald-100">
                We're continuously expanding our network of supported service
                providers and financial partners to offer even more convenience.
              </p>
            </div>

            <Button
              size="lg"
              className="bg-white text-emerald-700 hover:bg-slate-100"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
