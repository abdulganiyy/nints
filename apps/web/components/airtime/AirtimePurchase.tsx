"use client";

import { useState } from "react";
import { z } from "zod";

import FormBuilder from "@/components/form/FormBuilder";

import TransactionConfirmationModal from "@/components/transaction/TransactionConfirmationModal";
import TransactionSuccessModal from "@/components/transaction/TransactionSuccessModal";
import TransactionFailedModal from "@/components/transaction/TransactionFailedModal";

import { airtimeFieldsConfig } from "@/config";
import { airtimeSchema } from "@/schema";

import { AirtimeNetwork } from "@/types";

import { TransactionResult } from "@/types";

import { usePurchaseAirtime } from "@/hooks/usePurchaseAirtime";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type AirtimeFormValues = z.infer<typeof airtimeSchema>;

type PurchaseValues = AirtimeFormValues & {
  network: AirtimeNetwork;
};

export default function AirtimePurchase({
  walletBalance,
}: {
  walletBalance: number;
}) {
  const [formValues, setFormValues] = useState<PurchaseValues | null>(null);

  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const [successOpen, setSuccessOpen] = useState(false);

  const [failedOpen, setFailedOpen] = useState(false);

  const [result, setResult] = useState<TransactionResult | null>(null);

  const purchaseMutation = usePurchaseAirtime();

  /**
   * First stage:
   *
   * User submits phone number + amount.
   *
   * We don't purchase anything yet.
   * We simply open the confirmation modal.
   */
  const handleSubmit = (values: AirtimeFormValues) => {
    setFormValues(values);

    setConfirmationOpen(true);
  };

  /**
   * Second stage:
   *
   * User has confirmed the transaction.
   *
   * Now we call the backend.
   */
  const handleConfirm = async () => {
    if (!formValues) return;

    try {
      const response = await purchaseMutation.mutateAsync({
        network: formValues.network,

        phoneNumber: formValues.phoneNumber,

        // Form value is a number.
        // API currently expects a string.
        amount: formValues.amount.toString(),
      });

      setConfirmationOpen(false);

      console.log(response);

      if (response.success) {
        setResult({
          status: "SUCCESS",

          title: "Airtime Purchase Successful",

          message: "Airtime has been sent successfully.",

          reference: response.reference,

          amount: response.amount.toString(),

          details: [
            {
              label: "Network",
              value: response.network,
            },
            {
              label: "Phone Number",
              value: response.phoneNumber,
            },
          ],
        });

        setSuccessOpen(true);
      } else {
        setResult({
          status: "FAILED",

          title: "Airtime Purchase Failed",

          message: "We couldn't complete your airtime purchase.",

          amount: response.amount.toString(),

          details: [
            {
              label: "Network",
              value: response.network,
            },
            {
              label: "Phone Number",
              value: response.phoneNumber,
            },
          ],
        });

        setFailedOpen(true);
      }
    } catch (error: any) {
      setConfirmationOpen(false);

      setResult({
        status: "FAILED",

        title: "Airtime Purchase Failed",

        message:
          error?.response?.data?.message ??
          "We couldn't complete your airtime purchase.",

        amount: formValues.amount.toString(),

        details: [
          {
            label: "Network",
            value: formValues.network,
          },
          {
            label: "Phone Number",
            value: formValues.phoneNumber,
          },
        ],
      });

      setFailedOpen(true);
    }
  };

  const handleConfirmationClose = () => {
    if (purchaseMutation.isPending) {
      return;
    }

    setConfirmationOpen(false);
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);

    setResult(null);
    setFormValues(null);
  };

  const handleFailedClose = () => {
    setFailedOpen(false);

    setResult(null);
  };

  const handleRetry = () => {
    setFailedOpen(false);

    setConfirmationOpen(true);
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      {/* Header */}
      <Link href="/dashboard" className="inline-flex gap-2">
        <ArrowLeft /> Back
      </Link>
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold">Buy Airtime</h1>

        <p className="mt-2 text-muted-foreground">
          Purchase airtime instantly from your wallet.
        </p>
      </div>

      {/* Airtime form */}
      <FormBuilder
        config={airtimeFieldsConfig}
        schema={airtimeSchema}
        onSubmit={handleSubmit}
        submitText="Continue"
      />

      {/* Confirmation */}
      {formValues && (
        <TransactionConfirmationModal
          open={confirmationOpen}
          title="Confirm Airtime Purchase"
          amount={formValues.amount}
          loading={purchaseMutation.isPending}
          details={[
            {
              label: "Network",
              value: formValues.network,
            },
            {
              label: "Phone Number",
              value: formValues.phoneNumber,
            },
            {
              label: "Amount",
              value: formValues.amount.toString(),
            },
          ]}
          onCancel={handleConfirmationClose}
          onConfirm={handleConfirm}
        />
      )}

      {/* Success */}
      {result && (
        <TransactionSuccessModal
          open={successOpen}
          result={result}
          onClose={handleSuccessClose}
        />
      )}

      {/* Failed */}
      {result && (
        <TransactionFailedModal
          open={failedOpen}
          result={result}
          onClose={handleFailedClose}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
