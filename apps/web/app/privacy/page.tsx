type Subsection = {
  title: string;
  paragraphs: string[];
  list?: string[];
  ending?: string | string[];
};

type Section = {
  title: string;
  paragraphs: string[];
  list?: string[];
  ending?: string | string[];
  subsections?: Subsection[];
};


import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";

const sections: Section[] = [
  {
    title: "Introduction",
    paragraphs: [
      "NintPay respects your privacy and is committed to protecting the personal information entrusted to us.",
      "This Privacy Policy explains how NintPay collects, uses, stores, discloses, and protects personal information when you access our website, mobile application, digital wallet interface, and related financial services.",
      "It also explains your privacy rights and how you can exercise them.",
      "This Policy is intended to operate in accordance with the Nigeria Data Protection Act 2023 and other applicable data-protection laws.",
      "Please read this Policy carefully before using our services.",
    ],
  },
  {
    title: "Who We Are",
    paragraphs: [
      "NintPay is a financial technology platform designed to provide access to digital payments and related financial services.",
      "For the purposes of applicable data-protection law, the entity responsible for deciding how and why personal information is processed will generally act as the data controller for that processing.",
      "In some circumstances, a bank, payment provider, financing institution, or other partner may act as an independent data controller or as a data processor.",
      "Legal Entity: NexIngene Consults",
      "Registered Address: Ilorin, Kwara State",
      "Privacy Contact: info@nintpay.com",
      "Website: www.nintpay.com",
      "Where responsibility for processing differs between NintPay and a partner, we will provide relevant information through the applicable service documentation or privacy notice.",
    ],
  },
  {
    title: "Personal Information We Collect",
    paragraphs: [
      "The information we collect depends on the services you use and the information required by law.",
    ],
    subsections: [
      {
        title: "3.1 Identity and Account Information",
        paragraphs: ["This may include:"],
        list: [
          "Full name.",
          "Date of birth.",
          "Email address.",
          "Telephone number.",
          "Residential address, where required.",
          "Username and account identifiers.",
          "Password hashes and authentication records.",
          "Identity-verification results.",
          "Government-issued identification details where required.",
          "Verification status and relevant compliance records.",
        ],
        ending:
          "We do not need to collect every category of information listed above from every user.",
      },
      {
        title: "3.2 Financial and Transaction Information",
        paragraphs: [
          "When you use NintPay’s financial features, we may process:",
        ],
        list: [
          "Wallet identifiers and displayed balances.",
          "Deposit and withdrawal records.",
          "Transfer details.",
          "Transaction amounts, dates, references, and statuses.",
          "Payment-provider references.",
          "Virtual account details.",
          "Airtime and data purchases.",
          "Electricity and other bill-payment records.",
          "Fees and charges.",
          "Refunds, reversals, and disputes.",
          "Savings-product information, where applicable.",
          "Financing applications, repayment records, and outstanding obligations, where applicable.",
        ],
        ending:
          "We collect or receive this information as necessary to operate the relevant service, maintain accurate transaction records, prevent fraud, and meet applicable legal obligations.",
      },
      {
        title: "3.3 Device and Technical Information",
        paragraphs: [
          "When you use our website or application, we may collect:",
        ],
        list: [
          "Device type and operating system.",
          "Browser type.",
          "IP address.",
          "Application version.",
          "Login timestamps.",
          "Session and security logs.",
          "Crash reports and diagnostic information.",
          "Records of interactions with relevant application features.",
        ],
        ending:
          "We use this information to maintain service reliability, investigate technical problems, improve security, and prevent abuse.",
      },
      {
        title: "3.4 Verification and Compliance Information",
        paragraphs: [
          "Where required for identity verification, fraud prevention, anti-money-laundering compliance, or access to particular services, we may process:",
        ],
        list: [
          "Verification documents.",
          "Verification outcomes.",
          "Relevant sanctions or watchlist screening results.",
          "Information about suspicious or disputed transactions.",
          "Source-of-funds information where legally required.",
          "Other information reasonably necessary for regulatory compliance.",
        ],
        ending:
          "Sensitive information will only be processed where an appropriate lawful basis and any additional legal requirements are satisfied.",
      },
      {
        title: "3.5 Support and Communication Information",
        paragraphs: [
          "When you contact us, we may collect your messages, complaints, attachments, transaction references, and the information necessary to investigate your request.",
          "We may also retain records of our responses and actions taken to resolve the issue.",
        ],
      },
      {
        title: "3.6 Information from Third Parties",
        paragraphs: ["Depending on the service, we may receive information from:"],
        list: [
          "Banks and payment service providers.",
          "Virtual account providers.",
          "Identity-verification providers.",
          "Airtime and bill-payment aggregators.",
          "Telecommunications or utility providers.",
          "Financing partners.",
          "Credit-reference agencies, where lawfully engaged.",
          "Fraud-prevention and compliance service providers.",
          "Other authorised partners involved in delivering the requested service.",
        ],
        ending:
          "We will use such information only for appropriate purposes and in accordance with applicable law.",
      },
    ],
  },
  {
    title: "How We Use Your Information",
    paragraphs: ["We may use your personal information to:"],
    list: [
      "Create and manage your NintPay account.",
      "Verify your identity and authenticate your access.",
      "Process deposits, withdrawals, transfers, and payments.",
      "Fulfil airtime, data, electricity, and other bill purchases.",
      "Maintain accurate financial records and transaction histories.",
      "Provide customer support and resolve disputes.",
      "Detect and prevent fraud, account takeover, and other unlawful activity.",
      "Meet applicable financial, tax, and regulatory obligations.",
      "Assess eligibility for financing products, where applicable.",
      "Calculate affordability or credit-risk indicators, where lawfully permitted.",
      "Administer savings, currency exchange, and other supported products.",
      "Maintain platform security and investigate incidents.",
      "Improve application reliability and user experience.",
      "Communicate important service updates and security notices.",
      "Send promotional communications where permitted and, when required, with your consent.",
      "Establish, exercise, or defend legal claims.",
    ],
    ending:
      "We will not use personal information for a purpose incompatible with the original purpose of collection unless permitted by law and any required notice or consent has been provided.",
  },
  {
    title: "Lawful Bases for Processing",
    paragraphs: [
      "We process personal information only where an appropriate lawful basis applies.",
      "Depending on the circumstances, this may include:",
    ],
    subsections: [
      {
        title: "5.1 Performance of a Contract",
        paragraphs: [
          "We process information necessary to create your account, execute your transactions, provide requested services, and perform our contractual obligations.",
        ],
      },
      {
        title: "5.2 Legal Obligations",
        paragraphs: [
          "We may process information to comply with applicable financial regulations, identity-verification requirements, tax obligations, lawful regulatory requests, and recordkeeping duties.",
        ],
      },
      {
        title: "5.3 Legitimate Interests",
        paragraphs: [
          "Where permitted by law, we may process information for legitimate interests such as protecting accounts, preventing fraud, maintaining platform security, and improving operational reliability.",
          "We will consider the impact on your rights and interests before relying on this basis.",
        ],
      },
      {
        title: "5.4 Consent",
        paragraphs: [
          "Where consent is the appropriate lawful basis, we will request it and explain the relevant purpose.",
          "You may withdraw consent at any time where processing relies on consent. Withdrawal does not invalidate processing lawfully conducted before withdrawal.",
          "Withdrawal may affect our ability to provide a particular optional service, but we will explain the consequences where relevant.",
        ],
      },
      {
        title: "5.5 Other Lawful Bases",
        paragraphs: [
          "Other lawful bases may apply where recognised by applicable data-protection law.",
          "We will not assume that consent is the only lawful basis for every financial or regulatory processing activity.",
        ],
      },
    ],
  },
  {
    title: "Credit Scoring and Financing Assessments",
    paragraphs: [
      "NintPay may use transaction and repayment information to support eligibility assessments for non-interest financing products.",
      "Depending on the product and applicable law, relevant information may include:",
    ],
    list: [
      "The frequency and consistency of eligible transactions.",
      "The duration of your account relationship.",
      "Successful and reversed transactions.",
      "Repayment history.",
      "Outstanding financing obligations.",
      "Affordability indicators.",
      "Verified information obtained from authorised partners.",
    ],
    ending: [
      "For example, eligible airtime, data, electricity, and bill-payment activity may contribute to an assessment of account activity.",
      "However, purchasing more services does not automatically guarantee a higher score, financing approval, or a particular financing amount.",
      "We aim to use relevant information fairly, consistently, and for appropriate purposes.",
      "Where an automated assessment produces a decision with legal or similarly significant effects, we will apply the safeguards required by applicable law, including relevant information about the process and any applicable rights to human intervention, explanation, or challenge.",
      "You may contact us to request information about an assessment or to dispute inaccurate information used in it.",
      "We will not use a credit score as a substitute for any legally required affordability assessment or other eligibility checks.",
    ],
  },
  {
    title: "How We Share Personal Information",
    paragraphs: [
      "We do not sell your personal information to advertisers.",
      "We may share relevant information with the following categories of recipients where necessary and lawful.",
    ],
    subsections: [
      {
        title: "7.1 Payment and Banking Partners",
        paragraphs: [
          "We may share transaction and identity information with banks, payment service providers, virtual account providers, and other authorised financial institutions to process payments and maintain transaction records.",
        ],
      },
      {
        title: "7.2 Bill-Payment and Telecommunications Providers",
        paragraphs: [
          "We may share the information required to fulfil airtime, data, electricity, cable television, and other supported bill payments.",
        ],
      },
      {
        title: "7.3 Financing Partners",
        paragraphs: [
          "Where financing is offered through a partner, we may share relevant identity, transaction, affordability, and repayment information to support application assessment, financing administration, and repayment management.",
          "The partner’s identity and relevant data-processing arrangements should be disclosed for the applicable financing product.",
        ],
      },
      {
        title: "7.4 Technology and Security Providers",
        paragraphs: [
          "We may use service providers for cloud hosting, database management, customer support, analytics, identity verification, cybersecurity, and related technical operations.",
          "These providers may process information on our behalf under appropriate contractual and security arrangements.",
        ],
      },
      {
        title: "7.5 Regulators and Law-Enforcement Authorities",
        paragraphs: [
          "We may disclose information where required by law, a valid legal process, or a competent authority, or where disclosure is otherwise lawfully necessary to investigate fraud, protect rights, or meet applicable obligations.",
        ],
      },
      {
        title: "7.6 Professional Advisers",
        paragraphs: [
          "We may disclose relevant information to lawyers, auditors, accountants, insurers, or other professional advisers where reasonably necessary and subject to appropriate confidentiality requirements.",
        ],
      },
      {
        title: "7.7 Corporate Transactions",
        paragraphs: [
          "If NintPay undergoes a merger, restructuring, acquisition, or sale of relevant business assets, personal information may be transferred as part of that transaction where lawful and subject to appropriate safeguards.",
        ],
      },
    ],
    ending:
      "We do not authorise third parties to use personal information for unrelated purposes merely because they receive it from us.",
  },
  {
    title: "Cookies and Similar Technologies",
    paragraphs: [
      "Our website may use cookies, local storage, session identifiers, and similar technologies.",
      "These technologies may be used to:",
    ],
    list: [
      "Maintain login sessions.",
      "Protect account security.",
      "Remember preferences.",
      "Diagnose technical problems.",
      "Understand website performance.",
      "Measure the effectiveness of optional analytics.",
    ],
    ending: [
      "Strictly necessary technologies may be required for the website to function.",
      "Where consent is required for optional cookies or analytics, we will provide an appropriate choice mechanism.",
      "You may also manage cookies through your browser settings, although disabling certain cookies may affect functionality.",
    ],
  },
  {
    title: "Data Security",
    paragraphs: [
      "NintPay will implement appropriate technical and organisational safeguards designed to protect personal information against unauthorised access, disclosure, alteration, loss, or destruction.",
      "Depending on the processing activity, safeguards may include:",
    ],
    list: [
      "Access controls and role-based permissions.",
      "Password hashing and secure authentication.",
      "Encryption where appropriate.",
      "Secure communications.",
      "Transaction monitoring and fraud detection.",
      "Audit logs.",
      "Security testing and vulnerability management.",
      "Backup and recovery procedures.",
      "Staff confidentiality obligations.",
      "Security requirements for relevant service providers.",
    ],
    ending: [
      "No electronic system can be guaranteed to be completely secure.",
      "If a personal-data breach occurs, we will assess the incident and take the actions required by applicable law, including notification to the relevant authority or affected individuals where legally required.",
    ],
  },
  {
    title: "Data Retention",
    paragraphs: [
      "We retain personal information only for as long as reasonably necessary for the purposes described in this Policy, subject to applicable legal requirements.",
      "Retention periods may depend on:",
    ],
    list: [
      "The duration of your account relationship.",
      "The type of transaction.",
      "Financial and regulatory recordkeeping requirements.",
      "Fraud investigations.",
      "Unresolved complaints or disputes.",
      "Legal claims.",
      "Other applicable statutory obligations.",
    ],
    ending: [
      "Certain financial or compliance records may need to be retained after you close your account.",
      "When information is no longer required, we will take appropriate steps to delete it, anonymise it, or otherwise dispose of it securely, subject to legal retention obligations.",
      "We will establish and maintain appropriate retention schedules for the different categories of information we process.",
    ],
  },
  {
    title: "International Transfers",
    paragraphs: [
      "Some technology providers or financial partners may process personal information outside Nigeria.",
      "Where personal information is transferred internationally, NintPay will comply with applicable data-protection requirements governing international transfers.",
      "Depending on the circumstances, this may involve assessing the destination, identifying an applicable legal transfer mechanism, and implementing appropriate safeguards.",
      "Further information about relevant transfers may be requested through our privacy contact.",
    ],
  },
  {
    title: "Your Privacy Rights",
    paragraphs: [
      "Subject to applicable law and any relevant limitations, you may have the right to:",
    ],
    list: [
      "Request access to personal information we hold about you.",
      "Request correction of inaccurate or incomplete information.",
      "Request deletion of information where the law permits.",
      "Request restriction of certain processing activities.",
      "Object to certain processing activities.",
      "Request portability of eligible information.",
      "Withdraw consent where consent is the applicable lawful basis.",
      "Challenge certain decisions based solely on automated processing.",
      "Lodge a complaint with the relevant data-protection authority.",
      "Seek a remedy where your data-protection rights have been violated.",
    ],
    ending: [
      "Some requests may be refused or limited where we have a lawful obligation to retain or process the information.",
      "For example, closing your account does not necessarily require us to erase transaction records that must be retained by law.",
      "We will explain the outcome of your request and any applicable restrictions.",
    ],
  },
  {
    title: "How to Exercise Your Rights",
    paragraphs: [
      "To submit a privacy request, contact:",
      "Privacy Email: info@nintpay.com",
      "Please include sufficient information for us to understand your request and verify your identity where necessary.",
      "We may request additional information to prevent unauthorised disclosure.",
      "We will respond within the timeframe required by applicable law.",
      "If you are dissatisfied with our response, you may pursue the complaint or remedy available under applicable data-protection law, including approaching the Nigeria Data Protection Commission where appropriate.",
    ],
  },
  {
    title: "Children’s Privacy",
    paragraphs: [
      "NintPay’s general financial services are intended for adults aged 18 and above unless a particular service lawfully permits otherwise.",
      "We do not knowingly collect children’s personal information for adult-only financial services.",
      "If we discover that personal information has been collected in circumstances that violate applicable requirements for children’s data, we will take appropriate steps to address the issue.",
    ],
  },
  {
    title: "Marketing Communications",
    paragraphs: [
      "We may send service-related communications concerning transactions, security, account verification, regulatory requirements, and material changes to our services.",
      "These communications are distinct from optional promotional messages.",
      "Where required, we will obtain consent before sending direct marketing communications.",
      "You may opt out of promotional communications through the available unsubscribe mechanism or by contacting us.",
      "Opting out of marketing will not prevent us from sending essential service or security notices.",
    ],
  },
  {
    title: "Third-Party Websites and Services",
    paragraphs: [
      "NintPay may provide links to third-party websites or integrate external services.",
      "Those third parties may operate under their own privacy policies and contractual terms.",
      "We encourage you to review the relevant notices before providing information directly to a third party.",
      "This Policy applies to personal information processed by NintPay within the scope described here and does not automatically govern every independent third-party service.",
    ],
  },
  {
    title: "Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy to reflect changes in our services, technology, data-processing activities, business arrangements, or legal obligations.",
      "Where required, we will notify you of material changes and obtain consent where legally necessary.",
      "The latest version will display its effective date and last-updated date.",
      "We encourage you to review this Policy periodically.",
    ],
  },
  {
    title: "Complaints",
    paragraphs: [
      "If you believe that NintPay has mishandled your personal information, you may contact us using the privacy contact details below.",
      "Please describe the issue and provide relevant information so we can investigate.",
      "We will assess your complaint and respond within the applicable timeframe.",
      "You may also contact the Nigeria Data Protection Commission or pursue another remedy available under applicable law.",
    ],
  },
  {
    title: "Contact Us",
    paragraphs: [
      "For questions about this Privacy Policy, personal-data processing, or your privacy rights, contact:",
      "Platform: NintPay",
      "Legal Entity: NexIngene Consults",
      "Registered Address: Ilorin, Kwara State",
      "Privacy Email: info@nintpay.com",
      "Support Email: info@nintpay.com",
      "Website: www.nintpay.com",
      "We are committed to handling privacy requests fairly and transparently and to protecting the personal information entrusted to us.",
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
  ending,
}: {
  paragraphs?: string[];
  list?: string[];
  ending?: string | string[];
}) {
  const endingParagraphs = Array.isArray(ending)
    ? ending
    : ending
      ? [ending]
      : [];

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

      {endingParagraphs.map((paragraph, index) => (
        <p
          key={`ending-${index}`}
          className="mt-4 text-base leading-8 text-slate-600"
        >
          {renderLinkedText(paragraph)}
        </p>
      ))}
    </>
  );
}

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
              Legal · Privacy
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
              Privacy Policy
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Learn how NintPay collects, uses, stores, shares, and protects
              your personal information, as well as the privacy rights
              available to you.
            </p>

            <p className="mt-5 text-sm text-slate-500">
              Effective Date: 30th October, 2026
              <span className="mx-2">·</span>
              Last Updated: 30th October, 2026
            </p>
          </div>
        </section>

        {/* Privacy content */}
        <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            {/* Introduction */}
            <div className="mb-10 border-b border-slate-100 pb-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                NintPay Privacy Policy
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                This Privacy Policy explains how NintPay handles personal
                information and describes the rights available to individuals
                under applicable data-protection laws.
              </p>
            </div>

            {/* Privacy sections */}
            <div className="space-y-10">
              {sections.map((section) => (
                <article key={section.title} className="scroll-mt-28">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                    {section.title}
                  </h2>

                  <ContentBlock
                    paragraphs={section.paragraphs}
                    list={section.list}
                    ending={section.ending}
                  />

                  {section.subsections && (
                    <div className="mt-6 space-y-8">
                      {section.subsections.map((subsection) => (
                        <div key={subsection.title}>
                          <h3 className="text-lg font-semibold text-slate-800">
                            {subsection.title}
                          </h3>

                          <ContentBlock
                            paragraphs={subsection.paragraphs}
                            list={subsection.list}
                            ending={subsection.ending}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Related pages */}
            <div className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="text-lg font-semibold text-slate-900">
                Questions about our policies?
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                For privacy questions or requests, contact us at{" "}
                <a
                  href="mailto:info@nintpay.com"
                  className="font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-4 transition hover:text-emerald-900"
                >
                  info@nintpay.com
                </a>
                . You can also review our Terms and Conditions.
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
