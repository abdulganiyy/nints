
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Introduction",
    content:
      "Welcome to Nints. These sample Terms and Conditions demonstrate how the terms governing use of the Nints platform may be presented. This document is a development placeholder and does not constitute the approved legal terms of Nints.",
  },
  {
    title: "2. Eligibility and Accounts",
    content:
      "The final terms should explain who is eligible to use Nints, the requirements for creating an account, and the responsibilities associated with maintaining accurate account information. All eligibility and verification requirements must be confirmed by the project owner.",
  },
  {
    title: "3. Platform Services",
    content:
      "Nints is presented as a financial services platform with features such as wallets and bill payments. The final terms must identify the services actually offered, explain their applicable conditions, and describe any relevant limitations.",
  },
  {
    title: "4. User Responsibilities",
    content:
      "The approved terms should explain users' responsibilities when using the platform, including complying with applicable laws, providing accurate information, and protecting their account credentials. The final requirements must be reviewed and approved before publication.",
  },
  {
    title: "5. Payments and Transactions",
    content:
      "The final terms should explain how transactions are processed, how applicable fees are disclosed, and how transaction errors, failed payments, and disputes are handled. Applicable transaction conditions must be confirmed by the project owner. This placeholder does not establish specific fees or guarantees.",
  },
  {
    title: "6. Service Availability",
    content:
      "The final terms should describe relevant maintenance arrangements, possible service interruptions, and any limitations affecting platform availability. This development draft does not guarantee uninterrupted access to Nints.",
  },
  {
    title: "7. Suspension or Termination",
    content:
      "The approved terms should explain the circumstances and procedures under which account access or platform services may be restricted or terminated, including any applicable notice requirements and user rights.",
  },
  {
    title: "8. Changes to These Terms",
    content:
      "The final terms should explain how changes will be communicated to users and when revised terms become effective. The notification process and applicable requirements must be confirmed before publication.",
  },
  {
    title: "9. Contact and Support",
    content:
      "The official contact details and procedures for questions, complaints, and disputes must be confirmed by the Nints project owner before this page is published.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-emerald-50/40">
        {/* Hero section */}
        <section className="border-b border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white">
          <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
            >
              <span aria-hidden="true">←</span>
              Back to Home
            </Link>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Legal · Development Draft
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
              Terms and Conditions
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              An overview of the terms that may govern the use of the Nints
              platform. This sample document contains fictional placeholder
              content and is not an agreement governing actual use of Nints.
            </p>

            <p className="mt-5 text-sm text-slate-500">
              Last updated: To be confirmed
            </p>
          </div>
        </section>

        {/* Legal content */}
        <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            {/* Draft warning */}
            <div
              role="note"
              className="mb-10 rounded-xl border border-amber-300 bg-amber-50 p-5 text-amber-950"
            >
              <h2 className="font-semibold">
                Development draft — not for publication
              </h2>

              <p className="mt-2 text-sm leading-7">
                This page is for design and development purposes only.
                The content must be reviewed and approved by the project
                owner and an appropriately qualified legal professional
                before publication or reliance.
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-10 border-b border-slate-100 pb-8">
              <p className="text-sm leading-7 text-slate-600">
                Please note that the sections below describe topics that
                require final wording and approval. They should not be
                interpreted as establishing actual contractual terms.
              </p>
            </div>

            {/* Terms sections */}
            <div className="space-y-10">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="scroll-mt-28"
                >
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                    {section.title}
                  </h2>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    {section.content}
                  </p>
                </article>
              ))}
            </div>

            {/* Related pages */}
            <div className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="text-lg font-semibold text-slate-900">
                Need more information?
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                For this development draft, you can return to the homepage
                or review the Privacy Policy page.
              </p>

              <div className="mt-5 flex flex-wrap gap-4">
                <Link
                  href="/privacy"
                  className="inline-flex items-center justify-center rounded-lg border border-emerald-200 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
