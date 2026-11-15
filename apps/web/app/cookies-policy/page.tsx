
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Cookie, ShieldCheck, Settings, Info } from "lucide-react";

const cookieTopics = [
  {
    icon: Cookie,
    title: "What Are Cookies?",
    description:
      "Information about cookies and how they work will be provided here.",
  },
  {
    icon: Settings,
    title: "How We Use Cookies",
    description:
      "Details about the types of cookies used on the Nints platform will be added here.",
  },
  {
    icon: ShieldCheck,
    title: "Managing Your Cookie Preferences",
    description:
      "Information about managing and controlling cookie preferences will be provided here.",
  },
  {
    icon: Info,
    title: "More Information",
    description:
      "Additional details about cookies and related privacy practices will be added here.",
  },
];

export default function CookiesPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-slate-950 px-6 py-24 text-center text-white">
          <div className="mx-auto max-w-4xl">
            <span className="inline-block rounded-full bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-400">
              Privacy & Transparency
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
              Cookies <span className="text-emerald-500">Policy</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Learn about cookies and how they relate to your experience
              on the Nints platform.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Understanding Our Cookies Policy
              </h2>

              <p className="mt-6 leading-8 text-slate-600">
                The official Nints Cookies Policy will be provided here.
                This page will explain how cookies and similar technologies
                are used when accessing the platform.
              </p>
            </div>

            {/* Cookie Topics */}
            <div className="mt-12">
              <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
                What You Should Know
              </h2>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {cookieTopics.map((topic) => {
                  const Icon = topic.icon;

                  return (
                    <div
                      key={topic.title}
                      className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <Icon className="h-6 w-6" />
                      </div>

                      <h3 className="mt-6 text-xl font-semibold text-slate-900">
                        {topic.title}
                      </h3>

                      <p className="mt-3 leading-7 text-slate-600">
                        {topic.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Related Policy */}
            <div className="mt-12 rounded-3xl bg-emerald-600 px-8 py-12 text-center text-white">
              <h2 className="text-2xl font-bold md:text-3xl">
                Learn More About Your Privacy
              </h2>

              <p className="mx-auto mt-4 max-w-xl leading-7 text-emerald-50">
                Visit our Privacy Policy to learn more about how personal
                information is handled on the Nints platform.
              </p>

              <Link
                href="/privacy"
                className="mt-8 inline-flex rounded-xl bg-white px-7 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Read Privacy Policy
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
