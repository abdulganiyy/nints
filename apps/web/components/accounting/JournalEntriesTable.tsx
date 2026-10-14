"use client";

import { Eye, MoreHorizontal } from "lucide-react";

import { JournalEntry, JournalEntryStatus } from "@/types";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  entries: JournalEntry[];
  isLoading: boolean;
  onView: (entry: JournalEntry) => void;
  onPost: (entry: JournalEntry) => void;
  onReverse: (entry: JournalEntry) => void;
};

const statusVariant: Record<
  JournalEntryStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  DRAFT: "secondary",
  POSTED: "default",
  REVERSED: "destructive",
};

function formatMoney(amount: string, currency = "NGN") {
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

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date ?? 0));
}

export default function JournalEntriesTable({
  entries,
  isLoading,
  onView,
  onPost,
  onReverse,
}: Props) {
  if (isLoading) {
    return (
      <div className="space-y-3 p-5">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="h-12 animate-pulse rounded bg-muted" />
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-medium">No journal entries found</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Try changing your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Description</TableHead>
            {/* <TableHead>Source</TableHead> */}
            <TableHead>Account Type</TableHead>

            <TableHead>Date Created</TableHead>
            <TableHead className="text-right">Debit</TableHead>
            <TableHead className="text-right">Credit</TableHead>
            {/* <TableHead>Status</TableHead> */}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-mono text-sm">
                {entry.transaction.reference}
              </TableCell>

              <TableCell>
                <div>
                  <p className="font-medium">{entry.transaction.description}</p>

                  {entry.transactionReference && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Transaction: {entry.transactionReference}
                    </p>
                  )}
                </div>
              </TableCell>

              {/* <TableCell>{entry.source?.replaceAll("_", " ")}</TableCell> */}

              <TableCell>{entry.account.type}</TableCell>

              <TableCell>{formatDate(entry.createdAt)}</TableCell>

              <TableCell className="text-right font-medium">
                {formatMoney(
                  entry.direction == "DEBIT" ? entry.amount : "0",
                  entry.currency,
                )}
              </TableCell>

              <TableCell className="text-right font-medium">
                {formatMoney(
                  entry.direction == "CREDIT" ? entry.amount : "0",
                  entry.currency,
                )}
              </TableCell>

              {/* <TableCell>
                <Badge variant={statusVariant[entry.status]}>
                  {entry.status}
                </Badge>
              </TableCell> */}

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Actions for ${entry.reference}`}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    }
                  ></DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(entry)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View details
                    </DropdownMenuItem>

                    {entry.status === "DRAFT" && (
                      <DropdownMenuItem onClick={() => onPost(entry)}>
                        Post journal
                      </DropdownMenuItem>
                    )}

                    {entry.status === "POSTED" && (
                      <DropdownMenuItem
                        onClick={() => onReverse(entry)}
                        className="text-destructive"
                      >
                        Reverse journal
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
