"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ElectricityPlan } from "@/lib/utils";
import { electricitySchema } from "@/schema";
import { TransactionResult } from "@/types";

import TransactionConfirmationModal from "@/components/transaction/TransactionConfirmationModal";
import TransactionSuccessModal from "@/components/transaction/TransactionSuccessModal";
import TransactionFailedModal from "@/components/transaction/TransactionFailedModal";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { usePurchaseElectricity } from "@/hooks/usePurchaseElectricity";

type DataFormValues = z.infer<typeof electricitySchema>;

export default function ElectricityPurchase({
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
    resolver: zodResolver(electricitySchema as any),
    defaultValues: {
      meter: "",
      provider: "",
      amount: 0,
      plan: "",
      type: "PREPAID",
    },
  });

  const selectedProvider = watch("provider");

  const [selectedPlan, setSelectedPlan] = useState<ElectricityPlan | null>(
    null,
  );
  const [formValues, setFormValues] = useState<DataFormValues | null>(null);

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failedOpen, setFailedOpen] = useState(false);

  const [result, setResult] = useState<TransactionResult | null>(null);

  const purchaseMutation = usePurchaseElectricity();

  const {
    data: plans = [],
    isLoading: plansLoading,
    isError: plansError,
  } = useQuery<ElectricityPlan[]>({
    queryKey: ["electricity-plans"],
    queryFn: async () => {
      const response = await axios.get("/api/vtu/electricityplan");

      return Array.isArray(response.data) ? response.data : [];
    },
  });

  useEffect(() => {
    if (!selectedPlan) {
      return;
    }

    setValue("provider", selectedPlan.plan_name, {
      shouldValidate: true,
    });

    setValue("plan", selectedPlan.plan_code, {
      shouldValidate: true,
    });
  }, [selectedPlan, setValue]);

  const onSubmit = (values: DataFormValues) => {
    if (!values.plan || !values.amount) {
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
            label: "Provider",
            value: values.provider,
          },
          {
            label: "Meter Number",
            value: values.meter,
          },
        ],
      });

      setFailedOpen(true);

      return;
    }

    if (values.amount > selectedPlan!.max_amount) {
      setResult({
        status: "FAILED",
        title: `Adjust amount to continue`,
        message: `You cant subscribe more than ₦${selectedPlan!.max_amount}`,
        amount: values.amount.toString(),
        details: [
          {
            label: "Provider",
            value: values.provider,
          },
          {
            label: "Meter Number",
            value: values.meter,
          },
        ],
      });

      setFailedOpen(true);

      return;
    }

    if (values.amount < selectedPlan!.min_amount) {
      setResult({
        status: "FAILED",
        title: `Adjust amount to continue`,
        message: `You cant subscribe below ₦${selectedPlan!.min_amount.toString()}`,
        amount: values.amount.toString(),
        details: [
          {
            label: "Provider",
            value: values.provider,
          },
          {
            label: "Meter Number",
            value: values.meter,
          },
        ],
      });

      setFailedOpen(true);

      return;
    }

    setFormValues(values);
    setConfirmationOpen(true);
  };

  const handleConfirm = async () => {
    if (!formValues) {
      return;
    }

    try {
      const response = await purchaseMutation.mutateAsync({
        provider: selectedPlan!.provider,
        meter: formValues.meter,
        amount: String(formValues.amount),
        plan: formValues.plan,
        type: formValues.type.toLowerCase(),
      });

      setConfirmationOpen(false);

      if (response.success) {
        setResult({
          status: "SUCCESS",
          title: "Electricity Purchase Successful",
          message: "Electricity has been sent successfully.",
          reference: response.reference,
          amount: String(response.amount ?? formValues.amount),
          details: [
            {
              label: "Provider",
              value: response.provider ?? formValues.provider,
            },
            {
              label: "Meter Number",
              value: response.meterNumber ?? formValues.meter,
            },
            {
              label: "Plan",
              value: formValues.plan,
            },
          ],
        });

        setSuccessOpen(true);

        return;
      }

      setResult({
        status: "FAILED",
        title: "Electricity Purchase Failed",
        message:
          response.message ?? "We couldn't complete your electricity purchase.",
        amount: String(response.amount ?? formValues.amount),
        details: [
          {
            label: "Provider",
            value: response.provider ?? formValues.provider,
          },
          {
            label: "Meter Number",
            value: response.meterNumber ?? formValues.meter,
          },
          {
            label: "Plan",
            value: formValues.plan,
          },
        ],
      });

      setFailedOpen(true);
    } catch (error: any) {
      setConfirmationOpen(false);

      setResult({
        status: "FAILED",
        title: "Electricity Purchase Failed",
        message:
          error?.response?.data?.message ??
          error?.message ??
          "We couldn't complete your electricity purchase.",
        amount: String(formValues.amount),
        details: [
          {
            label: "Provider",
            value: formValues.provider,
          },
          {
            label: "Meter Number",
            value: formValues.meter,
          },
          {
            label: "Plan",
            value: formValues.plan,
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
    setSelectedPlan(null);

    reset({
      meter: "",
      provider: "",
      amount: 0,
      plan: "",
      type: "PREPAID",
    });
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
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold">Buy Electricity Subscription</h1>

        <p className="mt-2 text-muted-foreground">
          Purchase electricity subscription instantly from your wallet.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Wallet balance: ₦{walletBalance.toLocaleString()}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div>
            <label htmlFor="meter" className="mb-2 block text-sm font-medium">
              Meter Number
            </label>

            <Input
              id="meterNumber"
              {...register("meter")}
              placeholder="31234567456"
              inputMode="numeric"
            />

            {errors.meter && (
              <p className="mt-1 text-sm text-red-500">
                {errors.meter.message}
              </p>
            )}
          </div>

          {/* Plans */}
          {plansLoading && (
            <div className="rounded-lg border p-4 text-sm text-muted-foreground">
              Loading electricity plans...
            </div>
          )}

          {plansError && (
            <div className="rounded-lg border border-red-200 p-4 text-sm text-red-500">
              Unable to load electricity plans. Please refresh and try again.
            </div>
          )}

          {!plansLoading && !plansError && plans.length > 0 && (
            <Controller
              name="provider"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    value={field.value ?? ""}
                    onValueChange={(value) => {
                      field.onChange(value);

                      const selected = plans.find(
                        (plan: ElectricityPlan) => plan.plan_name == value,
                      );

                      if (!selected) return;

                      setSelectedPlan(selected);
                    }}
                  >
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select Provider" />
                    </SelectTrigger>

                    <SelectContent>
                      {plans.map((plan) => {
                        return (
                          <SelectItem
                            key={plan.plan_name}
                            value={plan.plan_name}
                          >
                            {plan.plan_name}
                          </SelectItem>
                        );
                      })}
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
          )}

          <div>
            <label htmlFor="type" className="mb-2 block text-sm font-medium">
              Type
            </label>

            <Controller
              name="type"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    value={field.value ?? "PREPAID"}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="PREPAID">PREPAID</SelectItem>
                      <SelectItem value="POSTPAID">POSTPAID</SelectItem>
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

            {errors.type && (
              <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Amount
            </label>

            <Input
              id="amount"
              {...register("amount")}
              placeholder=""
              inputMode="numeric"
            />

            {errors.amount && (
              <p className="mt-1 text-sm text-red-500">
                {errors.amount.message}
              </p>
            )}
          </div>

          {errors.plan && (
            <p className="text-sm text-red-500">{errors.plan.message}</p>
          )}

          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}

          {/* Submit */}
          <Button
            className="w-full"
            type="submit"
            disabled={
              purchaseMutation.isPending || !selectedPlan || !selectedProvider
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
          title="Confirm Electricity Purchase"
          loading={purchaseMutation.isPending}
          details={[
            {
              label: "Provider",
              value: formValues.provider,
            },
            {
              label: "Plan",
              value: formValues.plan,
            },
            {
              label: "Meter Number",
              value: formValues.meter,
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
