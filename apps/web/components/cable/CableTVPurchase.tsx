"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CablePlan } from "@/lib/utils";
import { cableSchema } from "@/schema";
import { TransactionResult } from "@/types";

import TransactionConfirmationModal from "@/components/transaction/TransactionConfirmationModal";
import TransactionSuccessModal from "@/components/transaction/TransactionSuccessModal";
import TransactionFailedModal from "@/components/transaction/TransactionFailedModal";

import CablePlans from "./CablePlans";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { usePurchaseCable } from "@/hooks/usePurchaseCable";

type DataFormValues = z.infer<typeof cableSchema>;

export default function CableTVPurchase({
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
    resolver: zodResolver(cableSchema as any),
    defaultValues: {
      iucNumber: "",
      provider: "",
      amount: 0,
      planCode: "",
    },
  });

  const selectedProvider = watch("provider");

  const [selectedPlan, setSelectedPlan] = useState<CablePlan | null>(null);
  const [formValues, setFormValues] = useState<DataFormValues | null>(null);

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failedOpen, setFailedOpen] = useState(false);

  const [result, setResult] = useState<TransactionResult | null>(null);

  const purchaseMutation = usePurchaseCable();

  const {
    data: plans = [],
    isLoading: plansLoading,
    isError: plansError,
  } = useQuery<CablePlan[]>({
    queryKey: ["cable-plans"],
    queryFn: async () => {
      const response = await axios.get("/api/vtu/cableplan");

      return Array.isArray(response.data) ? response.data : [];
    },
  });

  useEffect(() => {
    if (!selectedPlan) {
      return;
    }

    setValue("provider", selectedPlan.provider, {
      shouldValidate: true,
    });

    setValue("planCode", selectedPlan.plan_code, {
      shouldValidate: true,
    });

    setValue("amount", selectedPlan.amount, {
      shouldValidate: true,
    });
  }, [selectedPlan, setValue]);

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
            label: "Provider",
            value: values.provider,
          },
          {
            label: "IUC Number",
            value: values.iucNumber,
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
        identifier: selectedPlan!.provider,
        iuc: formValues.iucNumber,
        amount: String(formValues.amount),
        plan: formValues.planCode,
      });

      setConfirmationOpen(false);

      if (response.success) {
        setResult({
          status: "SUCCESS",
          title: "TV Subscription Purchase Successful",
          message: "TV Subscription has been sent successfully.",
          reference: response.reference,
          amount: String(response.amount ?? formValues.amount),
          details: [
            {
              label: "Provider",
              value: response.provider ?? formValues.provider,
            },
            {
              label: "Smart Card Number",
              value: response.iucNumber ?? formValues.iucNumber,
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
        title: "TV Subscription Purchase Failed",
        message:
          response.message ??
          "We couldn't complete your TV subscription purchase.",
        amount: String(response.amount ?? formValues.amount),
        details: [
          {
            label: "Provider",
            value: response.provider ?? formValues.provider,
          },
          {
            label: "Smart Card Number",
            value: response.iucNumber ?? formValues.iucNumber,
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
        title: "TV Subscription Purchase Failed",
        message:
          error?.response?.data?.message ??
          error?.message ??
          "We couldn't complete your TV subscription purchase.",
        amount: String(formValues.amount),
        details: [
          {
            label: "Provider",
            value: formValues.provider,
          },
          {
            label: "Smart Card Number",
            value: formValues.iucNumber,
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
      iucNumber: "",
      provider: "",
      amount: 0,
      planCode: "",
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
        <h1 className="text-3xl font-bold">Buy TV Subscription</h1>

        <p className="mt-2 text-muted-foreground">
          Purchase cable subscription instantly from your wallet.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Wallet balance: ₦{walletBalance.toLocaleString()}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="iucNumber"
              className="mb-2 block text-sm font-medium"
            >
              Smart Card Number
            </label>

            <Input
              id="iucNumber"
              {...register("iucNumber")}
              placeholder="1234567890"
              inputMode="numeric"
            />

            {errors.iucNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.iucNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Provider</label>

            <Controller
              name="provider"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    value={field.value ?? ""}
                    onValueChange={(value) => {
                      field.onChange(value);

                      if (selectedPlan && selectedPlan.provider !== value) {
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
                      <SelectValue placeholder="Select Provider" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Startimes">Startimes</SelectItem>

                      <SelectItem value="DSTV">DSTV</SelectItem>

                      <SelectItem value="GOTV">GOTV</SelectItem>
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
              Loading cable plans...
            </div>
          )}

          {plansError && (
            <div className="rounded-lg border border-red-200 p-4 text-sm text-red-500">
              Unable to load cable plans. Please refresh and try again.
            </div>
          )}

          {!plansLoading && !plansError && plans.length > 0 && (
            <CablePlans
              provider={selectedProvider}
              plans={plans}
              selectedPlan={selectedPlan}
              onSelectProvider={(value: string) => {
                setValue("provider", value, {
                  shouldValidate: true,
                });
              }}
              onSelectPlan={(plan: CablePlan) => {
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
          title="Confirm TV Subscription Purchase"
          loading={purchaseMutation.isPending}
          details={[
            {
              label: "Provider",
              value: formValues.provider,
            },
            {
              label: "Plan",
              value: formValues.planCode,
            },
            {
              label: "Smart Card Number",
              value: formValues.iucNumber,
            },
            {
              label: "Amount",
              value: Number(formValues.amount).toString(),
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
