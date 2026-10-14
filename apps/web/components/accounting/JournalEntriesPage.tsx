"use client";

import { useState } from "react";
import { Plus, RefreshCw, Search } from "lucide-react";
import { toast } from "sonner";

import {
  JournalEntry,
  JournalEntrySource,
  JournalEntryStatus,
} from "@/types";

import {
  useJournalEntries,
  useJournalEntrySummary,
  usePostJournalEntry,
  useReverseJournalEntry,
} from "@/hooks/useJournalEntries";

import JournalEntriesTable from "@/components/accounting/JournalEntriesTable";
import JournalEntryDetailsDialog from "@/components/accounting/JournalEntryDetailsDialog";
import CreateJournalEntryDialog from "@/components/accounting/CreateJournalEntryDialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const sources: {
  value: JournalEntrySource;
  label: string;
}[] = [
  { value: "MANUAL", label: "Manual" },
  { value: "WALLET_DEPOSIT", label: "Wallet Deposit" },
  { value: "WALLET_TRANSFER", label: "Wallet Transfer" },
  { value: "AIRTIME_PURCHASE", label: "Airtime Purchase" },
  { value: "DATA_PURCHASE", label: "Data Purchase" },
  { value: "BILL_PAYMENT", label: "Bill Payment" },
  { value: "WITHDRAWAL", label: "Withdrawal" },
  { value: "LOAN_DISBURSEMENT", label: "Loan Disbursement" },
  { value: "LOAN_REPAYMENT", label: "Loan Repayment" },
  { value: "REFERRAL_REWARD", label: "Referral Reward" },
  { value: "FEE", label: "Fee" },
];

function formatMoney(amount: string) {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return `NGN ${amount}`;
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function JournalEntriesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<JournalEntryStatus | "ALL">("ALL");
  const [source, setSource] = useState<JournalEntrySource | "ALL">("ALL");
  const [page, setPage] = useState(1);

  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [entryToPost, setEntryToPost] = useState<JournalEntry | null>(null);
  const [entryToReverse, setEntryToReverse] = useState<JournalEntry | null>(null);

  const [createOpen, setCreateOpen] = useState(false);

  const limit = 10;

  const query = {
    page,
    limit,
    search: search.trim() || undefined,
    status,
    source,
  };

  const entriesQuery = useJournalEntries(query);
  const summaryQuery = useJournalEntrySummary();

  const postMutation = usePostJournalEntry();
  const reverseMutation = useReverseJournalEntry();

  const entries = entriesQuery.data?.data ?? [];
  const pagination = entriesQuery.data?.meta;
  const summary = summaryQuery.data;

  const handlePost = async () => {
    if (!entryToPost) return;

    try {
      await postMutation.mutateAsync(entryToPost.id);

      toast.success("Journal entry posted successfully.");
      setEntryToPost(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to post journal entry.",
      );
    }
  };

  const handleReverse = async () => {
    if (!entryToReverse) return;

    try {
      await reverseMutation.mutateAsync({
        id: entryToReverse.id,
        reason: "Reversal initiated from the accounting dashboard",
      });

      toast.success("Reversal requested successfully.");
      setEntryToReverse(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to reverse journal entry.",
      );
    }
  };

  const refresh = async () => {
    await Promise.all([
      entriesQuery.refetch(),
      summaryQuery.refetch(),
    ]);
  };

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Journal Entries
          </h1>

          <p className="mt-2 text-muted-foreground">
            Review accounting records, debits, credits, and transaction postings.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={refresh}
            disabled={entriesQuery.isFetching || summaryQuery.isFetching}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>

          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Journal Entry
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Entries"
          value={summary?.totalEntries ?? 0}
          loading={summaryQuery.isLoading}
        />

        {/* <SummaryCard
          title="Posted"
          value={summary?.postedEntries ?? 0}
          loading={summaryQuery.isLoading}
        />

        <SummaryCard
          title="Draft"
          value={summary?.draftEntries ?? 0}
          loading={summaryQuery.isLoading}
        />

        <SummaryCard
          title="Reversed"
          value={summary?.reversedEntries ?? 0}
          loading={summaryQuery.isLoading}
        /> */}
      </div>

      {/* Debit and credit overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Total Debits
            </p>

            <p className="mt-2 text-2xl font-bold">
              {summary
                ? formatMoney(summary.totalDebits)
                : summaryQuery.isLoading
                  ? "Loading..."
                  : "—"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Total Credits
            </p>

            <p className="mt-2 text-2xl font-bold">
              {summary
                ? formatMoney(summary.totalCredits)
                : summaryQuery.isLoading
                  ? "Loading..."
                  : "—"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_180px_220px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search reference or description..."
                className="pl-9"
              />
            </div>

            <Select
              value={status}
              onValueChange={(value) => {
                setStatus(value as JournalEntryStatus | "ALL");
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All statuses</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="POSTED">Posted</SelectItem>
                <SelectItem value="REVERSED">Reversed</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={source}
              onValueChange={(value) => {
                setSource(value as JournalEntrySource | "ALL");
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Source" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All sources</SelectItem>

                {sources.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {entriesQuery.isError ? (
            <div className="p-10 text-center">
              <p className="font-medium">
                Unable to load journal entries
              </p>

              <Button
                variant="outline"
                className="mt-4"
                onClick={() => entriesQuery.refetch()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <JournalEntriesTable
                entries={entries}
                isLoading={entriesQuery.isLoading}
                onView={setSelectedEntry}
                onPost={setEntryToPost}
                onReverse={setEntryToReverse}
              />

              <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  {pagination
                    ? `${entries.length} of ${pagination.total} journal entries`
                    : "Loading journal entries..."}
                </p>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1 || entriesQuery.isFetching}
                    onClick={() => setPage((current) => current - 1)}
                  >
                    Previous
                  </Button>

                  <span className="text-sm">
                    Page {page} of {Math.max(1, pagination?.total ?? 1)}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={
                      entriesQuery.isFetching ||
                      page >= (pagination?.total ?? 1)
                    }
                    onClick={() => setPage((current) => current + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <JournalEntryDetailsDialog
        entry={selectedEntry}
        open={Boolean(selectedEntry)}
        onOpenChange={(open) => {
          if (!open) setSelectedEntry(null);
        }}
      />

      <CreateJournalEntryDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
      />

      {/* Post confirmation */}
      <AlertDialog
        open={Boolean(entryToPost)}
        onOpenChange={(open) => {
          if (!open && !postMutation.isPending) {
            setEntryToPost(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Post this journal entry?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Posting makes the journal entry part of the official ledger.
              Confirm that its accounts, amounts, date, and description are correct.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={postMutation.isPending}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={postMutation.isPending}
              onClick={(event) => {
                event.preventDefault();
                void handlePost();
              }}
            >
              {postMutation.isPending ? "Posting..." : "Post Journal"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reverse confirmation */}
      <AlertDialog
        open={Boolean(entryToReverse)}
        onOpenChange={(open) => {
          if (!open && !reverseMutation.isPending) {
            setEntryToReverse(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Reverse this journal entry?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This should create a new, linked reversal journal with the debit
              and credit lines reversed. The original posted journal must remain
              unchanged for audit purposes.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={reverseMutation.isPending}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={reverseMutation.isPending}
              onClick={(event) => {
                event.preventDefault();
                void handleReverse();
              }}
            >
              {reverseMutation.isPending ? "Reversing..." : "Confirm Reversal"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  loading,
}: {
  title: string;
  value: number;
  loading: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <p className="mt-2 text-2xl font-bold">
          {loading ? "—" : value.toLocaleString("en-NG")}
        </p>
      </CardContent>
    </Card>
  );
}