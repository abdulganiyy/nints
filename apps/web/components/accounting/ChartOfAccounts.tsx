"use client";

import { useState } from "react";
import { Plus, Search, RefreshCw } from "lucide-react";

import { Account, AccountType } from "@/types";

import {
  useAccounts,
  useAccountSummary,
  useCreateAccount,
  useDeactivateAccount,
  useUpdateAccount,
} from "@/hooks/useAccounts";

import AccountSummaryCards from "@/components/accounting/AccountSummaryCards";
import AccountsTable from "@/components/accounting/AccountsTable";
import AccountFormDialog from "@/components/accounting/AccountFormDialog";

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

import { toast } from "sonner";

export default function ChartOfAccounts() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<AccountType | "ALL">("ALL");
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE" | "ALL">("ALL");

  const [page, setPage] = useState(1);
  const limit = 10;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [accountToDeactivate, setAccountToDeactivate] = useState<Account | null>(null);

  const accountQuery = {
    page,
    limit,
    search: search.trim() || undefined,
    type,
    status,
  };

  const accountsQuery = useAccounts(accountQuery);
  const summaryQuery = useAccountSummary();

  const createMutation = useCreateAccount();
  const updateMutation = useUpdateAccount();
  const deactivateMutation = useDeactivateAccount();

  const accounts = accountsQuery.data?.data ?? [];
  const pagination = accountsQuery.data;

  const isSaving =
    createMutation.isPending || updateMutation.isPending;

  const openCreateDialog = () => {
    setSelectedAccount(null);
    setDialogOpen(true);
  };

  const openEditDialog = (account: Account) => {
    setSelectedAccount(account);
    setDialogOpen(true);
  };

  const handleSave = async (
    payload: Parameters<typeof createMutation.mutateAsync>[0],
  ) => {
    try {
      if (selectedAccount) {
        await updateMutation.mutateAsync({
          id: selectedAccount.id,
          payload,
        });

        toast.success("Account updated successfully.");
      } else {
        await createMutation.mutateAsync(payload);

        toast.success("Account created successfully.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to save account.",
      );

      throw error;
    }
  };

  const handleDeactivate = async () => {
    if (!accountToDeactivate) return;

    try {
      await deactivateMutation.mutateAsync(accountToDeactivate.id);

      toast.success("Account deactivated successfully.");
      setAccountToDeactivate(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to deactivate account.",
      );
    }
  };

  const handleRefresh = async () => {
    await Promise.all([
      accountsQuery.refetch(),
      summaryQuery.refetch(),
    ]);
  };

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Chart of Accounts
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage the accounts used to record NintPay's financial transactions.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={accountsQuery.isFetching || summaryQuery.isFetching}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>

          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Add Account
          </Button>
        </div>
      </div>

      {/* Summary */}
      <AccountSummaryCards
        summary={summaryQuery.data}
        isLoading={summaryQuery.isLoading}
      />

      {/* Search and filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_200px_180px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search code, account name..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                className="pl-9"
              />
            </div>

            <Select
              value={type}
              onValueChange={(value) => {
                setType(value as AccountType | "ALL");
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Account type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All account types</SelectItem>
                <SelectItem value="ASSET">Assets</SelectItem>
                <SelectItem value="LIABILITY">Liabilities</SelectItem>
                <SelectItem value="EQUITY">Equity</SelectItem>
                <SelectItem value="REVENUE">Revenue</SelectItem>
                <SelectItem value="EXPENSE">Expenses</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={status}
              onValueChange={(value) => {
                setStatus(value as "ACTIVE" | "INACTIVE" | "ALL");
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Account status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All statuses</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Accounts table */}
      <Card>
        <CardContent className="p-0">
          {accountsQuery.isError ? (
            <div className="p-10 text-center">
              <p className="font-medium">
                Unable to load accounts
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Please check your connection and try again.
              </p>

              <Button
                variant="outline"
                className="mt-4"
                onClick={() => accountsQuery.refetch()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <AccountsTable
                accounts={accounts}
                isLoading={accountsQuery.isLoading}
                onEdit={openEditDialog}
                onDeactivate={setAccountToDeactivate}
              />

              <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  {pagination
                    ? `Showing ${accounts.length} of ${pagination.total} accounts`
                    : "Loading accounts..."}
                </p>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1 || accountsQuery.isFetching}
                    onClick={() => setPage((current) => current - 1)}
                  >
                    Previous
                  </Button>

                  <span className="flex items-center px-2 text-sm">
                    Page {page} of {Math.max(1, pagination?.totalPages ?? 1)}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={
                      accountsQuery.isFetching ||
                      page >= (pagination?.totalPages ?? 1)
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

      {/* Create/Edit dialog */}
      <AccountFormDialog
        open={dialogOpen}
        account={selectedAccount}
        accounts={accounts}
        isSubmitting={isSaving}
        onOpenChange={setDialogOpen}
        onSubmit={handleSave}
      />

      {/* Deactivation confirmation */}
      <AlertDialog
        open={Boolean(accountToDeactivate)}
        onOpenChange={(open) => {
          if (!open && !deactivateMutation.isPending) {
            setAccountToDeactivate(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deactivate this account?
            </AlertDialogTitle>

            <AlertDialogDescription>
              {accountToDeactivate
                ? `${accountToDeactivate.code} — ${accountToDeactivate.name} will no longer be available for new postings. Existing ledger history must remain intact.`
                : "This account will be deactivated."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deactivateMutation.isPending}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={
                deactivateMutation.isPending ||
                Boolean(accountToDeactivate?.isSystem)
              }
              onClick={(event) => {
                event.preventDefault();
                void handleDeactivate();
              }}
            >
              {deactivateMutation.isPending
                ? "Deactivating..."
                : "Deactivate Account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}