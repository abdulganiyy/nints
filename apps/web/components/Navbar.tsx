"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  Wallet,
  ChevronDown,
  Smartphone,
  PiggyBank,
  CreditCard,
  Globe,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  {
    label: "Services",
    children: [
      { name: "Wallet", href: "#services", icon: Wallet },
      { name: "Airtime & Data", href: "#providers", icon: Smartphone },
      { name: "Savings", href: "#savings", icon: PiggyBank },
      { name: "Loans", href: "#loans", icon: CreditCard },
    ],
  },
  {
    label: "Calculator",
    href: "#calculator",
  },
  {
    label: "Security",
    href: "#security",
  },
  {
    label: "Roadmap",
    href: "#roadmap",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
];

export default function Navbar() {
  const [openServices, setOpenServices] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Wallet className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">Nints</h2>

            {/* <p className="text-xs text-slate-500">Wallet • Savings • Loans</p> */}
          </div>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 lg:flex">
          {/* Services Dropdown */}

          <div
            className="relative"
            onMouseEnter={() => setOpenServices(true)}
            onMouseLeave={() => setOpenServices(false)}
          >
            <button className="flex items-center gap-1 font-medium text-slate-700 transition hover:text-emerald-600">
              Services
              <ChevronDown className="h-4 w-4" />
            </button>

            {openServices && (
              <div className="absolute left-0 mt-4 w-72 rounded-2xl border bg-white p-3 shadow-xl">
                {navigation[0].children?.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-4 rounded-xl p-3 transition hover:bg-slate-50"
                    >
                      <div className="rounded-lg bg-emerald-100 p-2">
                        <Icon className="h-5 w-5 text-emerald-600" />
                      </div>

                      <span>{item.name}</span>
                    </Link>
                  );
                })}

                <div className="mt-3 rounded-xl bg-slate-100 p-4">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <Globe className="h-5 w-5" />

                    <span className="font-semibold">Coming Soon</span>
                  </div>

                  <p className="mt-2 text-sm text-slate-600">
                    International Money Transfers & Currency Exchange
                  </p>
                </div>
              </div>
            )}
          </div>

          {navigation.slice(1).map((item) => (
            <Link
              key={item.label}
              href={item.href!}
              className="font-medium text-slate-700 transition hover:text-emerald-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost">
            <Link href="/login">Sign In</Link>
          </Button>

          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/register">Get Started</Link>
          </Button>
        </div>

        {/* Mobile */}

        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="lg:hidden" />
            }
          >
            {/* <Button variant="ghost" size="icon" className="lg:hidden"> */}
            <Menu className="h-6 w-6" />
            {/* </Button> */}
          </SheetTrigger>

          <SheetContent side="right">
            <div className="mt-10 space-y-6 p-4">
              <Link href="/" className="flex items-center gap-3">
                <Wallet className="h-8 w-8 text-emerald-600" />

                <div>
                  <h2 className="font-bold">Nints</h2>

                  <p className="text-xs text-slate-500">Smart Finance</p>
                </div>
              </Link>

              <div className="border-t pt-6">
                <p className="mb-4 font-semibold text-slate-500">Services</p>

                <div className="space-y-3">
                  {navigation[0].children?.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-100"
                      >
                        <Icon className="h-5 w-5 text-emerald-600" />

                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                {navigation.slice(1).map((item) => (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className="block font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="rounded-2xl bg-emerald-50 p-5">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-emerald-600" />

                  <span className="font-semibold">Coming Soon</span>
                </div>

                <p className="mt-2 text-sm text-slate-600">
                  International Transfers and Multi-Currency Exchange.
                </p>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Link href="/login">Sign In</Link>
                </Button>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/register">Create Free Account</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
