"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { detectNetwork, NigerianNetwork } from "@/lib/utils";
import { dataSchema } from "@/schema";
import { TransactionResult } from "@/types";

import { usePurchaseData } from "@/hooks/usePurchaseData";

import TransactionConfirmationModal from "@/components/transaction/TransactionConfirmationModal";
import TransactionSuccessModal from "@/components/transaction/TransactionSuccessModal";
import TransactionFailedModal from "@/components/transaction/TransactionFailedModal";

import DataPlans from "./DataPlans";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

type DataFormValues = z.infer<typeof dataSchema>;

type Plan = {
  plan_code: string;
  label: string;
  network: string;
  amount: number;
};

export default function DataPurchase({
  walletBalance,
}: {
  walletBalance: number;
}) {
  const {
    register,
    watch,
    setValue,
    getValues,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DataFormValues>({
    resolver: zodResolver(dataSchema as any),
    defaultValues: {
      phoneNumber: "",
      network: "",
      amount: 0,
      planCode: "",
    },
  });

  const phoneNumber = watch("phoneNumber");
  const selectedNetwork = watch("network");

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [formValues, setFormValues] = useState<DataFormValues | null>(null);

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failedOpen, setFailedOpen] = useState(false);

  const [result, setResult] = useState<TransactionResult | null>(null);

  const purchaseMutation = usePurchaseData();

  /**
   * Fetch available data plans.
   */
  const {
    data: plans = [],
    isLoading: plansLoading,
    isError: plansError,
  } = useQuery<Plan[]>({
    queryKey: ["data-plans"],
    queryFn: async () => {
      const response = await axios.get("/api/vtu/dataplan");

      return Array.isArray(response.data) ? response.data : [];
    },
  });

  /**
   * Automatically detect the network from the phone number.
   */
  useEffect(() => {
    if (!phoneNumber) {
      return;
    }

    const detectedNetwork = detectNetwork(phoneNumber);

    if (!detectedNetwork) {
      return;
    }

    setValue("network", detectedNetwork, {
      shouldValidate: true,
    });

    /**
     * If the detected network changes, the previously
     * selected plan is no longer valid.
     */
    if (
      selectedPlan &&
      selectedPlan.network.toLowerCase() !== detectedNetwork.toLowerCase()
    ) {
      setSelectedPlan(null);
      setValue("planCode", "");
      setValue("amount", 0);
    }
  }, [phoneNumber, selectedPlan, setValue]);

  /**
   * When a plan is selected, update the form values.
   */
  useEffect(() => {
    if (!selectedPlan) {
      return;
    }

    setValue("network", selectedPlan.network, {
      shouldValidate: true,
    });

    setValue("planCode", selectedPlan.plan_code, {
      shouldValidate: true,
    });

    setValue("amount", selectedPlan.amount, {
      shouldValidate: true,
    });
  }, [selectedPlan, setValue]);

  /**
   * Submit form -> open confirmation modal.
   */
  const onSubmit = (values: DataFormValues) => {
    if (!values.planCode || !values.amount) {
      return;
    }

    if (values.amount > walletBalance) {
      setResult({
        status: "FAILED",
        title: "Insufficient Balance",
        message: "You do not have enough money in your wallet.",
        amount: values.amount.toString(),
        details: [
          {
            label: "Network",
            value: values.network,
          },
          {
            label: "Phone Number",
            value: values.phoneNumber,
          },
        ],
      });

      setFailedOpen(true);

      return;
    }

    setFormValues(values);
    setConfirmationOpen(true);
  };

  /**
   * Confirm and actually purchase the data.
   */
  const handleConfirm = async () => {
    if (!formValues) {
      return;
    }

    try {
      const response = await purchaseMutation.mutateAsync({
        network: formValues.network,
        phoneNumber: formValues.phoneNumber,
        amount: String(formValues.amount),
        planCode: formValues.planCode,
      });

      setConfirmationOpen(false);

      if (response.success) {
        setResult({
          status: "SUCCESS",
          title: "Data Purchase Successful",
          message: "Data has been sent successfully.",
          reference: response.reference,
          amount: String(response.amount ?? formValues.amount),
          details: [
            {
              label: "Network",
              value: response.network ?? formValues.network,
            },
            {
              label: "Phone Number",
              value: response.phoneNumber ?? formValues.phoneNumber,
            },
            {
              label: "Plan",
              value: formValues.planCode,
            },
          ],
        });

        setSuccessOpen(true);

        return;
      }

      setResult({
        status: "FAILED",
        title: "Data Purchase Failed",
        message: response.message ?? "We couldn't complete your data purchase.",
        amount: String(response.amount ?? formValues.amount),
        details: [
          {
            label: "Network",
            value: response.network ?? formValues.network,
          },
          {
            label: "Phone Number",
            value: response.phoneNumber ?? formValues.phoneNumber,
          },
          {
            label: "Plan",
            value: formValues.planCode,
          },
        ],
      });

      setFailedOpen(true);
    } catch (error: any) {
      setConfirmationOpen(false);

      setResult({
        status: "FAILED",
        title: "Data Purchase Failed",
        message:
          error?.response?.data?.message ??
          error?.message ??
          "We couldn't complete your data purchase.",
        amount: String(formValues.amount),
        details: [
          {
            label: "Network",
            value: formValues.network,
          },
          {
            label: "Phone Number",
            value: formValues.phoneNumber,
          },
          {
            label: "Plan",
            value: formValues.planCode,
          },
        ],
      });

      setFailedOpen(true);
    }
  };

  /**
   * Prevent closing confirmation while purchase is processing.
   */
  const handleConfirmationClose = () => {
    if (purchaseMutation.isPending) {
      return;
    }

    setConfirmationOpen(false);
  };

  /**
   * Successful transaction cleanup.
   */
  const handleSuccessClose = () => {
    setSuccessOpen(false);
    setResult(null);
    setFormValues(null);
    setSelectedPlan(null);

    reset({
      phoneNumber: "",
      network: "",
      amount: 0,
      planCode: "",
    });
  };

  /**
   * Failed transaction cleanup.
   */
  const handleFailedClose = () => {
    setFailedOpen(false);
    setResult(null);
  };

  /**
   * Retry the same transaction.
   */
  const handleRetry = () => {
    setFailedOpen(false);
    setConfirmationOpen(true);
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      {/* Back */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      {/* Header */}
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold">Buy Data</h1>

        <p className="mt-2 text-muted-foreground">
          Purchase data instantly from your wallet.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Wallet balance: ₦{walletBalance.toLocaleString()}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="mb-2 block text-sm font-medium"
            >
              Phone Number
            </label>

            <Input
              id="phoneNumber"
              {...register("phoneNumber")}
              placeholder="08031234567"
              inputMode="numeric"
            />

            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Network */}
          <div>
            <label className="mb-2 block text-sm font-medium">Network</label>

            <Controller
              name="network"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    value={field.value ?? ""}
                    onValueChange={(value) => {
                      field.onChange(value);

                      /**
                       * Clear the selected plan when
                       * manually changing network.
                       */
                      if (selectedPlan && selectedPlan.network !== value) {
                        setSelectedPlan(null);
                        setValue("planCode", "");
                        setValue("amount", 0);
                      }
                    }}
                  >
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select Network" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={NigerianNetwork.MTN}>MTN</SelectItem>

                      <SelectItem value={NigerianNetwork.AIRTEL}>
                        AIRTEL
                      </SelectItem>

                      <SelectItem value={NigerianNetwork.GLO}>GLO</SelectItem>

                      <SelectItem value={NigerianNetwork.NINEMOBILE}>
                        9MOBILE
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <p className="mt-1 text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Plans */}
          {plansLoading && (
            <div className="rounded-lg border p-4 text-sm text-muted-foreground">
              Loading data plans...
            </div>
          )}

          {plansError && (
            <div className="rounded-lg border border-red-200 p-4 text-sm text-red-500">
              Unable to load data plans. Please refresh and try again.
            </div>
          )}

          {!plansLoading && !plansError && plans.length > 0 && (
            <DataPlans
              network={selectedNetwork}
              plans={plans}
              selectedPlan={selectedPlan}
              onSelectNetwork={(network: string) => {
                setValue("network", network, {
                  shouldValidate: true,
                });

                /**
                 * Clear plan when changing network.
                 */
                if (selectedPlan && selectedPlan.network !== network) {
                  setSelectedPlan(null);
                  setValue("planCode", "");
                  setValue("amount", 0);
                }
              }}
              onSelectPlan={(plan: Plan) => {
                setSelectedPlan(plan);
              }}
            />
          )}

          {errors.planCode && (
            <p className="text-sm text-red-500">{errors.planCode.message}</p>
          )}

          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}

          {/* Submit */}
          <Button
            className="w-full"
            type="submit"
            disabled={
              purchaseMutation.isPending || !selectedPlan || !selectedNetwork
            }
          >
            Continue
          </Button>
        </div>
      </form>

      {/* Confirmation */}
      {formValues && (
        <TransactionConfirmationModal
          open={confirmationOpen}
          title="Confirm Data Purchase"
          loading={purchaseMutation.isPending}
          details={[
            {
              label: "Network",
              value: formValues.network,
            },
            {
              label: "Plan",
              value: formValues.planCode,
            },
            {
              label: "Phone Number",
              value: formValues.phoneNumber,
            },
            {
              label: "Amount",
              value: `₦${Number(formValues.amount).toLocaleString()}`,
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
