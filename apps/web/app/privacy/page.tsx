
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "The final Privacy Policy should identify the categories of personal information Nints actually collects, how that information is obtained, and whether information is provided directly by users or generated through their use of the platform. The collection practices must be confirmed by the project owner.",
  },
  {
    title: "2. How We Use Information",
    content:
      "The approved policy should explain the purposes for which personal information is processed, the applicable legal bases where required, and how the information supports the platform's services. These purposes must reflect Nints' actual operations and approved practices.",
  },
  {
    title: "3. Information Sharing",
    content:
      "The final policy should identify the circumstances in which personal information may be shared, the categories of recipients involved, and the safeguards that apply. Any service providers, financial partners, or other recipients must be confirmed before publication.",
  },
  {
    title: "4. Data Security",
    content:
      "The approved policy should accurately describe the safeguards used to protect personal information against unauthorized access, loss, alteration, or disclosure. No specific security measure or guarantee is established by this placeholder.",
  },
  {
    title: "5. Data Retention and Your Privacy Rights",
    content:
      "The final policy should explain how long personal information is retained, the criteria used to determine retention periods, and the privacy rights available to users under applicable law. It should also explain how users can submit requests and how those requests are handled.",
  },
  {
    title: "6. Cookies and Similar Technologies",
    content:
      "The approved policy should explain whether Nints uses cookies or similar technologies, the purposes for which they are used, and the choices available to users. This section must reflect the technologies actually implemented by the platform.",
  },
  {
    title: "7. Policy Updates",
    content:
      "The final policy should explain how changes to the Privacy Policy will be communicated and when updates take effect. The notification process and any applicable requirements must be confirmed before publication.",
  },
  {
    title: "8. Contact Us",
    content:
      "The official contact details and procedures for privacy questions, complaints, and requests must be confirmed by the Nints project owner. No contact address or privacy representative should be published until the details have been verified.",
  },
];

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Learn about the privacy topics that the Nints Privacy Policy
              will address. This development draft contains fictional
              placeholders and does not describe verified data practices.
            </p>

            <p className="mt-5 text-sm text-slate-500">
              Last updated: To be confirmed
            </p>
          </div>
        </section>

        {/* Privacy content */}
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
                The actual data collection, processing, sharing, retention,
                and security practices of Nints must be verified. Obtain
                project-owner approval and appropriate privacy and legal
                review before publication.
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-10 border-b border-slate-100 pb-8">
              <p className="text-sm leading-7 text-slate-600">
                Protecting personal information is an important subject
                for any financial services platform. The sections below
                outline the topics that must be addressed in the final
                policy; they do not establish Nints&apos; actual practices.
              </p>
            </div>

            {/* Privacy sections */}
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
                Questions about our policies?
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                The official privacy contact details will be added once
                confirmed by the Nints project owner. You can also review
                the draft Terms and Conditions.
              </p>

              <div className="mt-5 flex flex-wrap gap-4">
                <Link
                  href="/terms"
                  className="inline-flex items-center justify-center rounded-lg border border-emerald-200 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                >
                  Terms and Conditions
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
