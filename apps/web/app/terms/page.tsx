type Subsection = {
  title: string;
  paragraphs: string[];
  list?: string[];
  after?: string[];
};

type Section = {
  title: string;
  paragraphs: string[];
  list?: string[];
  after?: string[];
  subsections?: Subsection[];
};

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";

const sections: Section[] = [
  {
    title: "1. Introduction",
    paragraphs: [
      "Welcome to NintPay.",
      "These Terms and Conditions (“Terms”) govern your access to and use of the NintPay website, mobile application, digital wallet interface, payment services, airtime and data purchases, bill payments, and other financial services made available through NintPay.",
      "NintPay is a financial technology platform designed to make everyday financial transactions more accessible, convenient, and transparent.",
      "By creating an account, accessing our platform, or using any of our services, you agree to these Terms and our Privacy Policy.",
      "If you do not agree with these Terms, you must discontinue your use of NintPay.",
    ],
  },
  {
    title: "2. About NintPay",
    paragraphs: [
      "NintPay provides a digital platform through which eligible users can access supported payment and financial services.",
      "Depending on availability, eligibility, applicable law, and our partnerships with authorised service providers, NintPay may offer:",
    ],
    list: [
      "Digital wallet services and wallet interfaces.",
      "Deposits and withdrawals through supported payment channels.",
      "Transfers between eligible accounts.",
      "Virtual account funding.",
      "Airtime and mobile data purchases.",
      "Electricity, cable television, and other supported bill payments.",
      "Savings products offered through eligible partners.",
      "Currency exchange and international transfers through supported partners.",
      "Non-interest financing and other eligible financing products.",
      "Transaction records, spending insights, and financial-history features.",
    ],
    after: [
      "Not every service will necessarily be available to every user.",
      "Certain services may be provided by banks, payment service providers, licensed lenders, bill-payment aggregators, telecommunications companies, or other third-party partners.",
      "Where a partner is responsible for providing a regulated financial product, that partner’s identity, relevant terms, and regulatory status will be disclosed as required by applicable law.",
      "NintPay will not represent itself as a licensed bank, lender, payment provider, or other regulated institution unless it holds the relevant authorisation.",
    ],
  },
  {
    title: "3. Eligibility and Account Registration",
    paragraphs: ["To use NintPay, you must:"],
    list: [
      "Be at least 18 years old, unless a particular service lawfully permits otherwise.",
      "Provide accurate, complete, and current registration information.",
      "Provide a valid email address and telephone number where required.",
      "Complete identity verification and other Know Your Customer (KYC) requirements applicable to your account.",
      "Comply with applicable Nigerian laws and any other laws relevant to your use of the platform.",
      "Use NintPay for lawful purposes.",
    ],
    after: [
      "We may request additional documentation to verify your identity, address, source of funds, or other information required for security, compliance, or regulatory purposes.",
      "We reserve the right to reject, suspend, or restrict an application where permitted by law, including where verification fails or a material compliance concern arises.",
    ],
  },
  {
    title: "4. Account Security",
    paragraphs: [
      "You are responsible for maintaining the confidentiality of your password, transaction PIN, authentication codes, and other security credentials.",
      "You must:",
    ],
    list: [
      "Use a strong password and protect your transaction PIN.",
      "Avoid sharing authentication codes with other people.",
      "Notify us promptly if you suspect unauthorised access to your account.",
      "Ensure that your registered contact information remains current.",
      "Take reasonable precautions when accessing NintPay through public or shared devices.",
    ],
    after: [
      "You must not knowingly allow another person to use your account for fraudulent or unlawful activities.",
      "NintPay will never require you to disclose your password or transaction PIN through an unsolicited message.",
      "You may be responsible for losses resulting from your fraud, intentional misconduct, or failure to take reasonable security precautions, subject to applicable law and any mandatory consumer protections.",
      "We will investigate reported security incidents and take reasonable steps to protect affected accounts.",
    ],
  },
  {
    title: "5. Digital Wallet Services",
    paragraphs: [
      "Where wallet functionality is available, you may use your account to access supported funding, transfer, payment, or withdrawal services.",
      "The precise nature of the wallet arrangement depends on the financial institution or payment provider responsible for holding or processing the relevant funds.",
      "Where a third-party institution holds customer funds, its identity and relevant terms will be disclosed to you.",
      "Your displayed wallet balance is intended to reflect transactions recorded in our systems. Processing delays, pending transactions, reversals, or reconciliation adjustments may temporarily affect the displayed balance.",
      "We may correct a genuine transaction-recording error or duplicate credit, subject to applicable law, appropriate records, and any required notice or dispute process.",
      "We will not treat a genuine dispute as permission to arbitrarily remove funds from your account.",
      "Where legally required, restrictions may be placed on funds or transactions pursuant to a lawful instruction, fraud investigation, regulatory obligation, or applicable financial-services agreement.",
    ],
  },
  {
    title: "6. Deposits and Withdrawals",
    paragraphs: [
      "You may fund or withdraw from your account through payment channels supported by NintPay.",
      "Funding and withdrawal transactions may be subject to:",
    ],
    list: [
      "Transaction limits.",
      "Identity verification requirements.",
      "Payment-provider processing times.",
      "Bank or network availability.",
      "Applicable charges.",
      "Fraud-prevention and regulatory checks.",
    ],
    after: [
      "A transaction is not necessarily completed merely because you have initiated it.",
      "You should check the transaction status in the application before attempting the same payment again.",
      "Where a transaction fails after funds have been debited, we will investigate and arrange an appropriate reversal or refund where applicable.",
      "Processing times may depend on the relevant payment provider or financial institution.",
    ],
  },
  {
    title: "7. Transfers",
    paragraphs: [
      "Transfers are subject to the availability of the relevant payment network and the accuracy of the recipient information supplied.",
      "Before confirming a transfer, you should carefully verify the recipient’s name, account number, bank, and transfer amount.",
      "You authorise NintPay and the relevant payment provider to process a transfer when you confirm the transaction using the required authentication method.",
      "Where a transfer has been successfully completed, recovery may depend on the recipient’s cooperation, the receiving institution, applicable payment-network rules, and the law.",
      "NintPay does not guarantee that a completed transfer can always be reversed.",
      "We will provide reasonable assistance in investigating transfer errors, unauthorised transfers, and suspected fraud.",
      "You must not use NintPay to receive, transfer, conceal, or distribute proceeds of unlawful activity.",
    ],
  },
  {
    title: "8. Airtime, Data, and Bill Payments",
    paragraphs: [
      "NintPay may enable purchases of airtime, mobile data, electricity tokens, cable television subscriptions, and other supported services.",
      "These transactions may be fulfilled by third-party aggregators, telecommunications operators, electricity distribution companies, or other service providers.",
      "You are responsible for supplying accurate information, including:",
    ],
    list: [
      "The recipient’s telephone number.",
      "The telecommunications network.",
      "The electricity meter number.",
      "The cable television account or smartcard number.",
      "The biller or service provider.",
      "The selected package or payment amount.",
    ],
    after: [
      "Once a purchase has been fulfilled, it may not be reversible by NintPay.",
      "If a payment is debited but the service is not delivered, you should report the transaction through our support channels.",
      "We will investigate the transaction and, where appropriate, coordinate with the relevant provider to facilitate fulfilment or a refund.",
      "Refund eligibility depends on the transaction circumstances, provider rules, and applicable law.",
    ],
  },
  {
    title: "9. Transaction Charges and Pricing",
    paragraphs: [
      "Applicable transaction charges, service fees, exchange rates, and other costs will be disclosed before you confirm the relevant transaction, where required by law.",
      "Charges may vary by transaction type, payment method, provider, or service.",
      "You are responsible for reviewing the amount payable before authorising a transaction.",
      "NintPay will not intentionally conceal material transaction charges or introduce undisclosed charges contrary to applicable law.",
      "Where a third-party provider imposes a fee, we will disclose it where required and where the information is made available to us.",
    ],
  },
  {
    title: "10. Non-Interest Financing",
    paragraphs: [
      "NintPay may facilitate access to non-interest financing products through eligible financing arrangements.",
      "Depending on the product, financing may be structured using arrangements such as:",
    ],
    list: [
      "Qard Hasan, where applicable.",
      "Murabaha or another approved asset-based financing structure.",
      "Other financing structures permitted by applicable law and approved for the relevant product.",
    ],
    after: [
      "The actual structure will be specified in the applicable financing agreement.",
    ],
    subsections: [
      {
        title: "10.1 Eligibility",
        paragraphs: [
          "Financing is not guaranteed merely because you have a NintPay account or have completed transactions through the platform.",
          "Eligibility may depend on identity verification, affordability assessments, transaction history, repayment history, fraud checks, and other lawful criteria.",
        ],
      },
      {
        title: "10.2 Financing Agreement",
        paragraphs: [
          "Before accepting financing, you will receive the applicable agreement and material information, including, as relevant:",
        ],
        list: [
          "The financing provider.",
          "The financing amount or purchase price.",
          "Any applicable fees or profit amount.",
          "The repayment schedule.",
          "The due dates.",
          "Any consequences of late or missed payments.",
          "Early settlement provisions.",
          "Cancellation, complaints, and dispute procedures.",
        ],
        after: [
          "You must review and accept the applicable agreement before financing is disbursed or the relevant purchase is completed.",
        ],
      },
      {
        title: "10.3 Non-Interest Structure",
        paragraphs: [
          "A product described as non-interest must follow its disclosed contractual structure.",
          "The absence of conventional interest does not necessarily mean that every product is free of fees, costs, or other payment obligations.",
          "Any permissible fee or profit must be disclosed in advance and must be consistent with the applicable agreement and law.",
          "NintPay will not describe a financing product as Shariah-compliant unless the relevant structure has been appropriately reviewed and approved.",
        ],
      },
      {
        title: "10.4 Repayment",
        paragraphs: [
          "You agree to repay financing according to the agreement you accepted.",
          "Repayment arrangements may include supported bank transfers, authorised payment methods, or other expressly agreed mechanisms.",
          "We will not initiate an unauthorised debit merely because you have an outstanding financing obligation.",
          "Any automatic debit arrangement must be separately authorised where required.",
        ],
      },
      {
        title: "10.5 Missed Payments and Recovery",
        paragraphs: [
          "If you miss a payment, we may contact you through lawful communication channels to discuss repayment or available resolution options.",
          "Any collection activity must comply with applicable consumer-protection, privacy, and debt-recovery requirements.",
          "We will not engage in harassment, threats, public shaming, unlawful disclosure of your financial information, or other prohibited recovery practices.",
        ],
      },
      {
        title: "10.6 Credit Assessments",
        paragraphs: [
          "Where permitted by law, NintPay or an authorised financing partner may assess your financial history and repayment capacity to determine eligibility.",
          "A positive assessment does not guarantee financing, and an unsuccessful assessment does not necessarily mean that you will never qualify for a product.",
          "Further information about the use of personal information in these assessments is provided in our Privacy Policy.",
        ],
      },
    ],
  },
  {
    title: "11. Savings Products",
    paragraphs: [
      "NintPay may provide access to savings products through authorised financial partners.",
      "The applicable product terms will specify the institution responsible for the savings arrangement, the nature of the product, withdrawal conditions, any applicable charges, and the treatment of returns or profits.",
      "Savings balances, investment returns, or capital protection must not be assumed to be guaranteed unless expressly stated in the applicable agreement and permitted by law.",
      "You should review the relevant product documentation before placing funds into a savings product.",
    ],
  },
  {
    title: "12. Currency Exchange and International Transfers",
    paragraphs: [
      "Where available, currency exchange and international transfers may be provided through authorised financial institutions or other eligible partners.",
      "Transactions may be subject to:",
    ],
    list: [
      "Exchange-rate fluctuations.",
      "Provider charges.",
      "Currency availability.",
      "Minimum and maximum transaction limits.",
      "Identity verification and source-of-funds checks.",
      "International transfer requirements.",
      "Sanctions screening and other legal restrictions.",
    ],
    after: [
      "The applicable exchange rate and disclosed charges will be presented before you confirm a transaction, where required.",
      "A displayed indicative rate is not a final transaction rate unless expressly identified as such.",
      "International transfers may be delayed, rejected, or returned because of intermediary institutions, regulatory checks, incorrect recipient details, or other circumstances outside NintPay’s reasonable control.",
    ],
  },
  {
    title: "13. Prohibited Activities",
    paragraphs: ["You must not:"],
    list: [
      "Use NintPay for fraud, money laundering, terrorist financing, or other unlawful activities.",
      "Provide false identity or financial information.",
      "Operate an account on behalf of another person without appropriate authorisation.",
      "Attempt to bypass security controls, transaction limits, or verification procedures.",
      "Exploit software vulnerabilities or interfere with the platform.",
      "Use stolen payment instruments or unlawfully obtained funds.",
      "Manipulate promotions, rewards, referrals, or transaction systems.",
      "Use the platform to facilitate scams, unlawful gambling, or other prohibited transactions.",
      "Submit false payment disputes or fraudulent refund claims.",
      "Use NintPay in violation of applicable law or third-party service terms.",
    ],
    after: [
      "We may investigate suspected violations and take proportionate action, including restricting transactions, suspending access, or reporting suspected unlawful activity where required or permitted by law.",
    ],
  },
  {
    title: "14. Transaction Monitoring and Compliance",
    paragraphs: [
      "NintPay and its relevant partners may monitor transactions to detect fraud, investigate suspicious activity, meet legal obligations, and protect users.",
      "We may request additional information or documentation where reasonably necessary.",
      "Transactions may be delayed, declined, or restricted where required for security, regulatory compliance, or lawful instructions.",
      "Where the law prohibits disclosure, we may be unable to explain certain monitoring or restriction decisions in detail.",
    ],
  },
  {
    title: "15. Service Availability",
    paragraphs: [
      "We aim to maintain reliable access to NintPay but do not guarantee uninterrupted availability.",
      "Services may be temporarily unavailable because of maintenance, telecommunications failures, third-party outages, cybersecurity incidents, or other operational issues.",
      "Where reasonably practicable, we will take steps to restore affected services and communicate material service disruptions.",
      "Nothing in these Terms excludes liability that cannot lawfully be excluded.",
    ],
  },
  {
    title: "16. Suspension and Account Closure",
    paragraphs: [
      "You may request account closure through our designated support channels, subject to applicable verification and legal requirements.",
      "We may suspend or restrict an account where reasonably necessary to:",
    ],
    list: [
      "Protect your account or other users.",
      "Investigate suspected fraud or unlawful activity.",
      "Comply with a legal or regulatory obligation.",
      "Address material security concerns.",
      "Enforce these Terms lawfully.",
    ],
    after: [
      "Where appropriate and legally permitted, we will notify you of a suspension and provide information about available review or complaint procedures.",
      "Before closing an account, outstanding transactions, financing obligations, unresolved disputes, or applicable legal restrictions may need to be addressed.",
      "Account closure does not automatically extinguish lawful outstanding obligations.",
      "Funds will be handled in accordance with applicable law, the relevant financial-services arrangement, and any lawful restrictions.",
    ],
  },
  {
    title: "17. Privacy and Personal Information",
    paragraphs: [
      "Your use of NintPay is also governed by our Privacy Policy.",
      "The Privacy Policy explains how we collect, use, share, retain, and protect personal information, including information used for identity verification, payment processing, fraud prevention, and financing assessments.",
      "By using the platform, you acknowledge that personal information will be processed as described in the Privacy Policy and on the applicable lawful basis.",
      "Where consent is required, we will obtain it separately and appropriately.",
    ],
  },
  {
    title: "18. Third-Party Services",
    paragraphs: [
      "NintPay may integrate with external banks, payment providers, bill-payment aggregators, telecommunications companies, identity-verification services, and financing providers.",
      "These providers may have their own terms, privacy notices, service limitations, and complaint procedures.",
      "Where a third party is responsible for providing a service, we will identify the relevant provider where required and explain any material distinction between our role and the provider’s role.",
      "We will take reasonable care in selecting and managing our service providers, subject to our contractual responsibilities and applicable law.",
    ],
  },
  {
    title: "19. Intellectual Property",
    paragraphs: [
      "The NintPay name, logo, application design, software, website content, and other proprietary materials are owned by or licensed to their respective rights holders.",
      "You may use the platform for its intended purposes but may not reproduce, distribute, modify, reverse-engineer, or commercially exploit protected materials except as permitted by law or with the appropriate permission.",
    ],
  },
  {
    title: "20. Limitation of Liability",
    paragraphs: [
      "To the extent permitted by applicable law, NintPay will not be liable for indirect losses that are not reasonably foreseeable and arise from circumstances outside its reasonable control.",
      "This provision does not exclude liability for fraud, wilful misconduct, negligence where liability cannot lawfully be excluded, breach of applicable statutory duties, or other liability that cannot be limited by law.",
      "NintPay remains responsible for obligations attributable to its own acts or omissions under applicable law.",
      "Nothing in these Terms removes any consumer rights that cannot lawfully be waived.",
    ],
  },
  {
    title: "21. Complaints and Dispute Resolution",
    paragraphs: [
      "If you experience a problem with a transaction or service, please contact NintPay through the support channels listed in the application or on our website.",
      "When submitting a complaint, include your transaction reference, transaction date, amount, and a description of the issue. Do not send your password or transaction PIN.",
      "We will acknowledge, investigate, and respond to complaints within applicable regulatory timeframes.",
      "Where a complaint concerns a partner’s regulated service, we may refer or escalate it to the relevant provider while assisting you as appropriate.",
      "Nothing in this section prevents you from approaching a competent regulator, consumer-protection authority, or court.",
    ],
  },
  {
    title: "22. Changes to These Terms",
    paragraphs: [
      "We may update these Terms to reflect changes in our services, business operations, legal obligations, or security requirements.",
      "Material changes will be communicated through appropriate channels where required by law.",
      "Where a change requires your consent or renewed acceptance, we will obtain it before applying the change to the relevant service.",
      "The updated version will identify its effective date.",
    ],
  },
  {
    title: "23. Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of the Federal Republic of Nigeria, subject to applicable conflict-of-law rules and any mandatory rights or protections available to users.",
      "Disputes will be handled by a court or other competent dispute-resolution body with jurisdiction, subject to applicable law.",
    ],
  },
  {
    title: "24. Contact Information",
    paragraphs: [
      "For questions, complaints, or requests relating to these Terms, contact:",
    ],
    list: [
      "Platform: NintPay",
      "Legal Entity: NexIngene Consults",
      "Registered Address: Ilorin, Kwara State",
      "Email: info@nintpay.com",
      "Privacy Contact: info@nintpay.com",
      "Website: www.nintpay.com",
    ],
  },
];

function renderLinkedText(text: string) {
  const parts = text.split(/(info@nintpay\.com|www\.nintpay\.com)/gi);

  return parts.map((part, index) => {
    if (part.toLowerCase() === "info@nintpay.com") {
      return (
        <a
          key={index}
          href="mailto:info@nintpay.com"
          className="text-emerald-700 underline decoration-emerald-300 underline-offset-4 transition hover:text-emerald-900"
        >
          {part}
        </a>
      );
    }

    if (part.toLowerCase() === "www.nintpay.com") {
      return (
        <a
          key={index}
          href="https://www.nintpay.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 underline decoration-emerald-300 underline-offset-4 transition hover:text-emerald-900"
        >
          {part}
        </a>
      );
    }

    return part;
  });
}

function ContentBlock({
  paragraphs = [],
  list = [],
}: {
  paragraphs?: string[];
  list?: string[];
}) {
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p
          key={`paragraph-${index}`}
          className="mt-4 text-base leading-8 text-slate-600"
        >
          {renderLinkedText(paragraph)}
        </p>
      ))}

      {list.length > 0 && (
        <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-slate-600">
          {list.map((item, index) => (
            <li key={`item-${index}`}>{renderLinkedText(item)}</li>
          ))}
        </ul>
      )}
    </>
  );
}

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
              Legal · NintPay
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
              Terms and Conditions
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              These Terms and Conditions govern your access to and use of
              the NintPay platform and its supported financial services.
            </p>

            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-500">
              <p>Effective date: 30th October, 2026</p>
              <p>Last updated: 30th October, 2026</p>
            </div>
          </div>
        </section>

        {/* Legal content */}
        <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <div className="mb-10 border-b border-slate-100 pb-8">
              <p className="text-sm leading-7 text-slate-600">
                Please read these Terms and Conditions carefully before
                creating an account or using NintPay services.
              </p>
            </div>

            {/* Terms sections */}
            <div className="space-y-12">
              {sections.map((section) => (
                <article key={section.title} className="scroll-mt-28">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                    {section.title}
                  </h2>

                  <ContentBlock
                    paragraphs={section.paragraphs}
                    list={section.list}
                  />

                  {section.after && (
                    <ContentBlock paragraphs={section.after} />
                  )}

                  {section.subsections && (
                    <div className="mt-8 space-y-8 border-l-2 border-emerald-100 pl-5 md:pl-7">
                      {section.subsections.map((subsection) => (
                        <div key={subsection.title}>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {subsection.title}
                          </h3>

                          <ContentBlock
                            paragraphs={subsection.paragraphs}
                            list={subsection.list}
                          />

                          {subsection.after && (
                            <ContentBlock paragraphs={subsection.after} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Acceptance statement */}
            <div className="mt-12 border-t border-slate-200 pt-8">
              <p className="text-base leading-8 text-slate-600">
                By creating a NintPay account or using our services, you
                confirm that you have had the opportunity to review these
                Terms and agree to the provisions applicable to your use
                of the platform.
              </p>
            </div>

            {/* Related pages */}
            <div className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="text-lg font-semibold text-slate-900">
                Related Information
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                To understand how NintPay handles your personal
                information, please review our Privacy Policy.
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
