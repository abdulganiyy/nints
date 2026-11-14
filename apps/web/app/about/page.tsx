import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-slate-950 px-6 py-24 text-center text-white">
          <div className="mx-auto max-w-4xl">
            <span className="mb-6 inline-block rounded-full bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-400">
              About Nints
            </span>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Get to Know <span className="text-emerald-500">Nints</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Learn more about our company, our vision, and the people behind
              the Nints platform.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                About Our Company
              </h2>

              <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  The official company information and background of Nints
                  will be provided here.
                </p>

                <p>
                  This section will introduce the company, explain its
                  purpose, and provide more information about the platform.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">
                  Our Mission
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  Our official mission statement will be added here.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">
                  Our Vision
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  Our official vision statement will be added here.
                </p>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-12 rounded-3xl bg-emerald-600 px-8 py-12 text-center text-white">
              <h2 className="text-2xl font-bold md:text-3xl">
                Want to Know More?
              </h2>

              <p className="mx-auto mt-4 max-w-xl leading-7 text-emerald-50">
                Get in touch with us for more information about Nints.
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex rounded-xl bg-white px-7 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}