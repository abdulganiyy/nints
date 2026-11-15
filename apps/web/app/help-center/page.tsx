
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, Wallet, CreditCard, ShieldCheck, UserRound, ArrowRight } from "lucide-react";

const helpCategories = [
  {
    icon: UserRound,
    title: "Account & Registration",
    description: "Get help with creating and managing your Nints account.",
  },
  {
    icon: Wallet,
    title: "Wallet & Transactions",
    description: "Learn about wallet funding, withdrawals, and transfers.",
  },
  {
    icon: CreditCard,
    title: "Payments & Services",
    description: "Find assistance with airtime, data, and bill payments.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Privacy",
    description: "Learn how account security and personal information are handled.",
  },
];

export default function HelpCenterPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-slate-950 px-6 py-24 text-center text-white">
          <div className="mx-auto max-w-4xl">
            <span className="inline-block rounded-full bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-400">
              Nints Support
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
              How Can We <span className="text-emerald-500">Help You?</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Find information and assistance to help you make the most of
              the Nints platform.
            </p>

            {/* Search Placeholder */}
            <div className="mx-auto mt-10 flex max-w-2xl items-center gap-3 rounded-2xl bg-white px-5 py-4 text-left shadow-lg">
              <Search className="h-5 w-5 shrink-0 text-slate-400" />
              <span className="text-sm text-slate-400">
                Search for help and information...
              </span>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900">
                Browse Help Topics
              </h2>

              <p className="mt-4 text-slate-600">
                Explore different areas of the platform.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {helpCategories.map((category) => {
                const Icon = category.icon;

                return (
                  <div
                    key={category.title}
                    className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-slate-900">
                      {category.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {category.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-5xl rounded-3xl bg-emerald-600 px-8 py-14 text-center text-white">
            <h2 className="text-2xl font-bold md:text-3xl">
              Still Need Assistance?
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-emerald-50">
              Get in touch with the Nints team for further assistance.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Contact Support
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
