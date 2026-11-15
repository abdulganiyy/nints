
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-slate-950 px-6 py-24 text-center text-white">
          <div className="mx-auto max-w-4xl">
            <span className="inline-block rounded-full bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-400">
              Get in Touch
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
              Contact <span className="text-emerald-500">Us</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Have questions or need assistance? Find out how to reach the
              Nints team.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 md:grid-cols-2">

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                We&apos;d Love to Hear From You
                </h2>

                <p className="mt-5 leading-8 text-slate-600">
                  Whether you have a question, need assistance, or want to
                  learn more about our platform, this is where you&apos;ll find
                  information about contacting us.
                </p>

                <div className="mt-10 space-y-5">

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-900">
                      Email Support
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Official support email address will be provided here.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-900">
                      Phone Support
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Official customer support phone number will be provided
                      here.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-900">
                      Office Address
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Official business address will be provided here.
                    </p>
                  </div>

                </div>
              </div>

              {/* Contact Form Placeholder */}
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                <h2 className="text-2xl font-bold text-slate-900">
                  Send Us a Message
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  Our official contact form and submission process will be
                  added here.
                </p>

                <div className="mt-8 space-y-5">
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Full Name
                    </label>
                    <div className="mt-2 h-12 rounded-xl border border-slate-200 bg-slate-50" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Email Address
                    </label>
                    <div className="mt-2 h-12 rounded-xl border border-slate-200 bg-slate-50" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Subject
                    </label>
                    <div className="mt-2 h-12 rounded-xl border border-slate-200 bg-slate-50" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Message
                    </label>
                    <div className="mt-2 h-32 rounded-xl border border-slate-200 bg-slate-50" />
                  </div>

                  <p className="text-xs text-slate-400">
                    Contact form functionality will be implemented after
                    the official requirements are provided.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
