"use client";

import { CheckCircle2, Copy, Check } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { TransactionResult } from "@/types";

type Props = {
  open: boolean;
  result: TransactionResult;
  onClose: () => void;
  onDone?: () => void;
};

export default function TransactionSuccessModal({
  open,
  result,
  onClose,
  onDone,
}: Props) {
  const [copied, setCopied] = useState(false);

  const copyReference = async () => {
    if (!result.reference) return;

    await navigator.clipboard.writeText(result.reference);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleDone = () => {
    onClose();
    onDone?.();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleDone()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500" />

          <DialogTitle className="mt-3 text-2xl">
            {result.title ?? "Transaction Successful"}
          </DialogTitle>

          <p className="text-sm text-muted-foreground">
            {result.message ?? "Your transaction was completed successfully."}
          </p>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          {result.amount && (
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">Amount</p>

              <p className="mt-1 text-2xl font-bold">
                {" "}
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  maximumFractionDigits: 2,
                }).format(Number(result.amount))}
              </p>
            </div>
          )}

          {result.details?.map((detail) => (
            <div
              key={detail.label}
              className="flex items-center justify-between gap-4 border-b py-2 last:border-0"
            >
              <span className="text-sm text-muted-foreground">
                {detail.label}
              </span>

              <span className="text-right text-sm font-medium">
                {detail.label == "Amount"
                  ? new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                      maximumFractionDigits: 2,
                    }).format(+detail.value)
                  : detail.value}
              </span>
            </div>
          ))}

          {result.reference && (
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">
                Transaction Reference
              </p>

              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium">
                  {result.reference}
                </span>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={copyReference}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        <Button type="button" className="mt-4 w-full" onClick={handleDone}>
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
}
