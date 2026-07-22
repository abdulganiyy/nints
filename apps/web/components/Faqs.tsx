"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "How do I fund my wallet?",
    answer:
      "You can fund your wallet using your dedicated virtual account or any other supported funding method available on your account. Once payment is confirmed, your wallet balance is updated automatically.",
  },
  {
    question: "Which services are currently available?",
    answer:
      "You can currently use your wallet, buy airtime and data, pay supported bills, save towards your financial goals, transfer funds where supported, and apply for eligible loans.",
  },
  {
    question: "Can I buy airtime and data for someone else?",
    answer:
      "Yes. Simply enter the recipient's phone number when purchasing airtime or data.",
  },
  {
    question: "How do Savings Goals work?",
    answer:
      "Create a savings goal, choose how much you'd like to save, set a target date, and contribute manually or automatically until you reach your goal.",
  },
  {
    question: "Can I withdraw money from my savings?",
    answer:
      "Withdrawal depends on the savings product you selected. Flexible savings can usually be withdrawn at any time, while locked savings may have restrictions until maturity.",
  },
  {
    question: "How do loans work?",
    answer:
      "Eligible users can apply for loans directly from the app. Approval, loan limits, repayment schedules, and any applicable fees are shown before you accept an offer.",
  },
  {
    question: "Is my money secure?",
    answer:
      "We use identity verification, secure authentication, encryption, and continuous monitoring to help protect customer accounts and transactions.",
  },
  {
    question: "Will international transfers be available?",
    answer:
      "Yes. We plan to introduce international money transfers and currency exchange in a future release. Announcements will be shared through the app and our official communication channels when they become available.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            Frequently Asked Questions
          </Badge>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Everything You Need to Know
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Find answers to common questions about your wallet, payments,
            savings, loans, and other financial services.
          </p>
        </div>

        {/* FAQ */}

        <div className="mt-16 rounded-3xl bg-white p-8 shadow-lg">
          <Accordion className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-base leading-8 text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Card */}

        <div className="mt-16 rounded-3xl bg-linear-to-r from-emerald-600 to-emerald-500 p-10 text-center text-white">
          <h3 className="text-3xl font-bold">Still Have Questions?</h3>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
            Our support team is here to help with wallet funding, airtime and
            data purchases, savings, loans, and any other questions about using
            the platform.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary">
              <Link href="/contact">Contact Support</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white hover:text-emerald-600"
            >
              <Link href="/register">Create Free Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
