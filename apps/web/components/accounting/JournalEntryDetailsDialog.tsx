"use client";

import {
  JournalEntry,
} from "@/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  entry: JournalEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function money(amount: string, currency: string) {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return `${currency} ${amount}`;
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function JournalEntryDetailsDialog({
  entry,
  open,
  onOpenChange,
}: Props) {
  if (!entry) return null;

  const balanced =
    Number(entry.totalDebit) === Number(entry.totalCredit);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Journal Entry Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Journal Reference
            </p>

            <p className="mt-1 font-mono font-medium">
              {entry.id}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Status
            </p>

            <div className="mt-1">
              <Badge>
                {entry.transaction.status}
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Description
            </p>

            <p className="mt-1 font-medium">
              {entry.transaction.description}
            </p>
          </div>
{/* 
          <div>
            <p className="text-sm text-muted-foreground">
              Source
            </p>

            <p className="mt-1 font-medium">
              {entry.source.replaceAll("_", " ")}
            </p>
          </div> */}

          <div>
            <p className="text-sm text-muted-foreground">
             Date Created
            </p>

            <p className="mt-1 font-medium">
              {new Date(entry.createdAt).toLocaleDateString("en-NG")}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Created By
            </p>

            <p className="mt-1 font-medium">
              {entry.createdBy?.name ?? "System"}
            </p>
          </div>
        </div>

        <div className="mt-5">
        

          {entry.transaction.reference && (
            <div className="mt-5 rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Related Transaction Reference
              </p>

              <p className="mt-1 break-all font-mono text-sm">
                {entry.transaction.reference}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}