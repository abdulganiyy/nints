import { ArrowRight, Landmark, BadgeCheck, Globe2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const countries = [
  {
    flag: "🇦🇪",
    name: "United Arab Emirates",
    currency: "AED",
    description:
      "Send money directly to UAE bank accounts with competitive exchange rates.",
    banks: "All major UAE banks",
  },
  {
    flag: "🇸🇦",
    name: "Saudi Arabia",
    currency: "SAR",
    description: "Fast and secure transfers to recipients across Saudi Arabia.",
    banks: "Major Saudi banks",
  },
  {
    flag: "🇶🇦",
    name: "Qatar",
    currency: "QAR",
    description:
      "Transfer funds safely to personal and business accounts in Qatar.",
    banks: "Leading Qatari banks",
  },
  {
    flag: "🇰🇼",
    name: "Kuwait",
    currency: "KWD",
    description:
      "Reliable transfers with transparent fees and live exchange rates.",
    banks: "Kuwaiti banks",
  },
  {
    flag: "🇧🇭",
    name: "Bahrain",
    currency: "BHD",
    description: "Quick money transfers to Bahrain using secure banking rails.",
    banks: "Bahrain banks",
  },
  {
    flag: "🇴🇲",
    name: "Oman",
    currency: "OMR",
    description: "Convenient transfers to supported banks throughout Oman.",
    banks: "Omani banks",
  },
];

export default function SupportedCountries() {
  return (
    <section id="countries" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Supported Countries
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Send Money Across the Gulf
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Exchange Nigerian Naira into Gulf currencies and transfer funds
            securely to supported bank accounts.
          </p>
        </div>

        {/* Countries */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {countries.map((country) => (
            <Card
              key={country.currency}
              className="group rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="text-6xl">{country.flag}</div>

                <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  {country.currency}
                </span>
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                {country.name}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {country.description}
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Landmark className="h-5 w-5 text-emerald-600" />

                  <span className="text-sm text-slate-700">
                    {country.banks}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 text-emerald-600" />

                  <span className="text-sm text-slate-700">
                    Secure Bank Transfers
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Globe2 className="h-5 w-5 text-emerald-600" />

                  <span className="text-sm text-slate-700">
                    Real-time Exchange Rates
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                className="mt-8 p-0 text-emerald-600 hover:bg-transparent hover:text-emerald-700"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}

        <div className="mt-24 rounded-3xl bg-linear-to-r from-slate-900 to-slate-800 px-10 py-14 text-white">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div>
              <h3 className="text-3xl font-bold">More Countries Coming Soon</h3>

              <p className="mt-3 max-w-2xl text-slate-300">
                We're continuously expanding our transfer network to support
                additional destinations and currencies while maintaining fast,
                secure, and reliable transfers.
              </p>
            </div>

            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              View Exchange Rates
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
