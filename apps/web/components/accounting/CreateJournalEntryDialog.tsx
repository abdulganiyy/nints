"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCreateJournalEntry } from "@/hooks/useJournalEntries";
import { getAccounts } from "@/services/account.service";

type Account = {
  id: string;
  code: string;
  name: string;
  type: "ASSET" | "LIABILITY" | "EQUITY" | "REVENUE" | "EXPENSE";
  status: "ACTIVE" | "INACTIVE";
};

type JournalLineForm = {
  id: string;
  accountId: string;
  description: string;
  debit: string;
  credit: string;
};

type CreateJournalEntryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const createEmptyLine = (): JournalLineForm => ({
  id: crypto.randomUUID(),
  accountId: "",
  description: "",
  debit: "",
  credit: "",
});

/**

* Converts a decimal amount into integer minor units (kobo for NGN).
* Using integer arithmetic avoids common floating-point comparison errors.
*
* Accepts values such as "100", "100.50", and "0.25".
  */
function toMinorUnits(value: string): number | null {
  const normalized = value.trim();

  if (!normalized) return 0;

  if (!/^\d+(.\d{1,2})?$/.test(normalized)) {
    return null;
  }

  const [whole, fraction = ""] = normalized.split(".");
  const amount = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));

  if (!Number.isSafeInteger(amount)) {
    return null;
  }

  return amount;
}

function formatAmount(minorUnits: number): string {
  return (minorUnits / 100).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CreateJournalEntryDialog({
  open,
  onOpenChange,
}: CreateJournalEntryDialogProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [accountsError, setAccountsError] = useState<string | null>(null);

  const [description, setDescription] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [currency, setCurrency] = useState("NGN");
  const [lines, setLines] = useState<JournalLineForm[]>([
    createEmptyLine(),
    createEmptyLine(),
  ]);

  const createMutation = useCreateJournalEntry();

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    async function loadAccounts() {
      setAccountsLoading(true);
      setAccountsError(null);

      try {
        const result = await getAccounts();

        if (!cancelled) {
          setAccounts(result.data);
        }
      } catch {
        if (!cancelled) {
          setAccountsError(
            "Unable to load accounts. Please close the dialog and try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setAccountsLoading(false);
        }
      }
    }

    void loadAccounts();

    return () => {
      cancelled = true;
    };
  }, [open]);

  const totals = useMemo(() => {
    let debit = 0;
    let credit = 0;
    let valid = true;

    for (const line of lines) {
      const debitAmount = toMinorUnits(line.debit);
      const creditAmount = toMinorUnits(line.credit);

      if (debitAmount === null || creditAmount === null) {
        valid = false;
        continue;
      }

      debit += debitAmount;
      credit += creditAmount;
    }

    return {
      debit,
      credit,
      valid,
      balanced: valid && debit > 0 && debit === credit,
    };
  }, [lines]);

  const updateLine = (
    id: string,
    field: keyof Omit<JournalLineForm, "id">,
    value: string,
  ) => {
    setLines((current) =>
      current.map((line) => {
        if (line.id !== id) return line;

        const updated = { ...line, [field]: value };

        // A line cannot have both a debit and a credit amount.
        if (field === "debit" && value.trim() !== "") {
          updated.credit = "";
        }

        if (field === "credit" && value.trim() !== "") {
          updated.debit = "";
        }

        return updated;
      }),
    );
  };

  const addLine = () => {
    setLines((current) => [...current, createEmptyLine()]);
  };

  const removeLine = (id: string) => {
    setLines((current) => current.filter((line) => line.id !== id));
  };

  const resetForm = () => {
    setDescription("");
    setEffectiveDate(new Date().toISOString().slice(0, 10));
    setCurrency("NGN");
    setLines([createEmptyLine(), createEmptyLine()]);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (createMutation.isPending) return;

    onOpenChange(nextOpen);

    if (!nextOpen) {
      resetForm();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!description.trim()) {
      toast.error("Enter a journal description.");
      return;
    }

    if (!effectiveDate) {
      toast.error("Select an effective date.");
      return;
    }

    if (lines.length < 2) {
      toast.error("A journal entry must contain at least two lines.");
      return;
    }

    if (!totals.valid) {
      toast.error("Enter valid amounts with no more than two decimal places.");
      return;
    }

    if (!totals.balanced) {
      toast.error(
        "Total debits must equal total credits and be greater than zero.",
      );
      return;
    }

    const invalidLine = lines.find((line) => {
      const debit = toMinorUnits(line.debit);
      const credit = toMinorUnits(line.credit);

      const hasAccount = Boolean(line.accountId);
      const hasAmount =
        (debit !== null && debit > 0) || (credit !== null && credit > 0);

      const validDebitCredit =
        debit !== null &&
        credit !== null &&
        !(debit > 0 && credit > 0) &&
        (debit > 0 || credit > 0);

      return !hasAccount || !hasAmount || !validDebitCredit;
    });

    if (invalidLine) {
      toast.error(
        "Each journal line needs an account and either a debit or a credit amount.",
      );
      return;
    }

    const accountIds = lines.map((line) => line.accountId);

    // Duplicate account lines can be legitimate in some journals, so they
    // are allowed here. The backend must still validate the entry.

    try {
      await createMutation.mutateAsync({
        description: description.trim(),
        effectiveDate,
        currency,
        lines: lines.map((line) => {
          const direction = line.debit.trim()
            ? ("DEBIT" as const)
            : ("CREDIT" as const);
          const debit = line.debit.trim();
          const credit = line.credit.trim();

          if (Boolean(debit) === Boolean(credit)) {
            throw new Error("Enter either a debit or a credit for each line.");
          }

          return {
            accountId: line.accountId,
            description: line.description.trim() || undefined,
            direction,
            amount: debit || credit,
          };
        }),
      });

      toast.success("Journal entry created as a draft.");
      resetForm();
      onOpenChange(false);
    } catch {
      // The mutation hook should display API errors if it already handles them.
      // This message provides feedback if it does not.
      toast.error("Failed to create journal entry.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] min-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Journal Entry</DialogTitle>
          <DialogDescription>
            Record a balanced accounting entry. This creates a draft; posting
            should be performed separately after review.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="journal-description">Description</Label>
              <Textarea
                id="journal-description"
                placeholder="e.g. Record initial owner capital injection"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                maxLength={500}
                required
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="effective-date">Effective date</Label>
                <Input
                  id="effective-date"
                  type="date"
                  value={effectiveDate}
                  onChange={(event) => setEffectiveDate(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="journal-currency">Currency</Label>
                <Select
                  value={currency}
                  onValueChange={(value: string | null) =>
                    setCurrency(value as string)
                  }
                >
                  <SelectTrigger id="journal-currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NGN">NGN — Nigerian Naira</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-semibold">Journal lines</h3>
                <p className="text-sm text-muted-foreground">
                  Every line must have an account and a debit or credit amount.
                </p>
              </div>

              <Button type="button" variant="outline" onClick={addLine}>
                <Plus className="mr-2 h-4 w-4" />
                Add line
              </Button>
            </div>

            {accountsLoading && (
              <p className="text-sm text-muted-foreground">
                Loading accounts...
              </p>
            )}

            {accountsError && (
              <div className="rounded-md border border-destructive/40 p-3 text-sm text-destructive">
                {accountsError}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="ml-3"
                  onClick={() => {
                    setAccountsError(null);
                    setAccountsLoading(true);

                    void getAccounts()
                      .then((result) => {
                        setAccounts(
                          result.data.filter(
                            (account) => account.status === "ACTIVE",
                          ),
                        );
                      })
                      .catch(() => {
                        setAccountsError("Unable to load accounts.");
                      })
                      .finally(() => setAccountsLoading(false));
                  }}
                >
                  Retry
                </Button>
              </div>
            )}

            {!accountsLoading && !accountsError && accounts.length === 0 && (
              <p className="rounded-md border p-3 text-sm text-muted-foreground">
                No active accounts were found. Create or activate accounts in
                the Chart of Accounts first.
              </p>
            )}

            <div className="space-y-4">
              {lines.map((line, index) => (
                <div
                  key={line.id}
                  className="grid grid-cols-1 items-start gap-3 rounded-lg border p-4 md:grid-cols-12"
                >
                  <div className="text-sm font-medium md:col-span-12">
                    Line {index + 1}
                  </div>

                  <div className="space-y-2 md:col-span-4">
                    <Label>Account</Label>
                    <Select
                      value={line.accountId}
                      onValueChange={(value) =>
                        updateLine(line.id, "accountId", value as string)
                      }
                      disabled={accountsLoading || accounts.length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.code} — {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-3">
                    <Label>Description (optional)</Label>
                    <Input
                      value={line.description}
                      onChange={(event) =>
                        updateLine(line.id, "description", event.target.value)
                      }
                      placeholder="Line description"
                      maxLength={250}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Debit (₦)</Label>
                    <Input
                      inputMode="decimal"
                      value={line.debit}
                      onChange={(event) =>
                        updateLine(line.id, "debit", event.target.value)
                      }
                      placeholder="0.00"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Credit (₦)</Label>
                    <Input
                      inputMode="decimal"
                      value={line.credit}
                      onChange={(event) =>
                        updateLine(line.id, "credit", event.target.value)
                      }
                      placeholder="0.00"
                    />
                  </div>

                  <div className="flex justify-end md:col-span-1 md:pt-8">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove line ${index + 1}`}
                      disabled={lines.length <= 2}
                      onClick={() => removeLine(line.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 rounded-lg bg-muted p-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Total debit</p>
              <p className="text-lg font-semibold">
                {currency} {formatAmount(totals.debit)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total credit</p>
              <p className="text-lg font-semibold">
                {currency} {formatAmount(totals.credit)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Balance status</p>
              <p
                className={`text-lg font-semibold ${
                  totals.balanced ? "text-green-600" : "text-destructive"
                }`}
              >
                {totals.balanced
                  ? "Balanced"
                  : totals.valid
                    ? "Not balanced"
                    : "Invalid amount"}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={createMutation.isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                createMutation.isPending ||
                accountsLoading ||
                accounts.length === 0 ||
                !totals.balanced
              }
            >
              {createMutation.isPending ? "Creating draft..." : "Create draft"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
