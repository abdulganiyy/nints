"use client";

import { AlertCircle } from "lucide-react";

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
  onRetry?: () => void;
};

export default function TransactionFailedModal({
  open,
  result,
  onClose,
  onRetry,
}: Props) {
  const handleRetry = () => {
    onClose();
    onRetry?.();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <AlertCircle className="h-16 w-16 text-destructive" />

          <DialogTitle className="mt-3 text-2xl">
            {result.title ?? "Transaction Failed"}
          </DialogTitle>

          <p className="text-sm text-muted-foreground">
            {result.message ??
              "We couldn't complete this transaction. Please try again."}
          </p>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          {result.amount && (
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">Amount</p>

              <p className="mt-1 text-xl font-bold">
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

              <p className="mt-1 break-all text-sm font-medium">
                {result.reference}
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Close
          </Button>

          {onRetry && (
            <Button type="button" className="flex-1" onClick={handleRetry}>
              Try Again
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
