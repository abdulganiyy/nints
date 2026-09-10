"use client";

import { AlertTriangle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { TransactionDetail } from "@/types";

type Props = {
  open: boolean;
  title?: string;
  amount?: number;
  details: TransactionDetail[];
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function TransactionConfirmationModal({
  open,
  title = "Confirm Transaction",
  amount,
  details,
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  console.log(amount, details);
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />

            <DialogTitle>{title}</DialogTitle>
          </div>
        </DialogHeader>

        {amount && (
          <div className="rounded-lg bg-muted p-5 text-center">
            <p className="text-sm text-muted-foreground">Amount</p>

            <p className="mt-1 text-3xl font-bold">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
                maximumFractionDigits: 2,
              }).format(Number(amount))}
            </p>
          </div>
        )}

        <div className="space-y-3">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="flex justify-between gap-4 border-b py-2 last:border-0"
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
        </div>

        <div className="flex gap-3 pt-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            disabled={loading}
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            type="button"
            className="flex-1"
            disabled={loading}
            onClick={onConfirm}
          >
            {loading ? "Processing..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
