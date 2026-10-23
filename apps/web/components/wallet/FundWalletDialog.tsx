"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDownToLine,
  Check,
  Copy,
  LoaderCircle,
  RefreshCw,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

import {
  getFundingQuote,
  getVirtualAccount,
  getWalletBalance,
} from "@/services/funding.service";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { calculateFundingQuote } from "@/utils/helper-function";

interface FundWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatMoney(value: string | number, currency = "NGN") {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "—";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function isValidAmount(value: string) {
  if (!/^\d+(\.\d{1,2})?$/.test(value)) {
    return false;
  }

  const amount = Number(value);

  return Number.isFinite(amount) && amount > 0;
}

export function FundWalletDialog({
  open,
  onOpenChange,
}: FundWalletDialogProps) {
  const [amount, setAmount] = useState("5000");
  const [copied, setCopied] = useState(false);

  const validAmount = isValidAmount(amount);

  const walletQuery = useQuery({
    queryKey: ["wallet", "balance"],
    queryFn: getWalletBalance,
    enabled: open,
    refetchInterval: open ? 15_000 : false,
    refetchOnWindowFocus: true,
  });

  //   const accountQuery = useQuery({
  //     queryKey: ["wallet", "virtual-account"],
  //     queryFn: getVirtualAccount,
  //     enabled: open,
  //     staleTime: 60_000,
  //   });

  //   const quoteQuery = useQuery({
  //     queryKey: ["wallet", "funding-quote", amount],
  //     queryFn: () => getFundingQuote(amount),
  //     enabled: open && validAmount,
  //     staleTime: 15_000,
  //     retry: false,
  //   });

  const wallet = walletQuery.data;
  //   const account = accountQuery.data;
  //   const quote = quoteQuery.data;

  const amountNumber = useMemo(() => Number(amount), [amount]);

  useEffect(() => {
    if (!open) {
      setCopied(false);
    }
  }, [open]);

  async function copyAccountNumber() {
    if (!wallet?.virtualAccount.accountNumber) {
      return;
    }

    try {
      await navigator.clipboard.writeText(wallet.virtualAccount.accountNumber);
      setCopied(true);
      toast.success("Account number copied");

      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Unable to copy account number");
    }
  }

  async function refreshBalance() {
    try {
      await walletQuery.refetch();
      toast.success("Wallet balance refreshed");
    } catch {
      toast.error("Could not refresh wallet balance");
    }
  }

  const loadingAccount = walletQuery.isLoading;

  const balanceError = walletQuery.isError;

  const quote = useMemo(() => {
    const parsedAmount = Number(amount);

    if (!amount.trim() || !Number.isFinite(parsedAmount)) {
      return null;
    }

    return calculateFundingQuote(parsedAmount);
  }, [amount]);


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Fund your wallet
          </DialogTitle>

          <DialogDescription>
            Transfer money to your NintPay virtual account. Your wallet will be
            credited after the deposit is confirmed.
          </DialogDescription>
        </DialogHeader>

        {/* Actual wallet balance from the backend */}
        <section className="rounded-xl border bg-muted/30 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">
                Current wallet balance
              </p>

              {walletQuery.isLoading ? (
                <div className="mt-2 h-8 w-36 animate-pulse rounded bg-muted" />
              ) : balanceError ? (
                <p className="mt-2 text-sm text-destructive">
                  Unable to load balance
                </p>
              ) : (
                <p className="mt-1 text-2xl font-semibold tracking-tight">
                  {formatMoney(wallet!.balance ?? 0, wallet!.currency ?? "NGN")}
                </p>
              )}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Refresh wallet balance"
              onClick={refreshBalance}
              disabled={walletQuery.isFetching}
            >
              {walletQuery.isFetching ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>
        </section>

        {/* Amount to fund */}
        <section className="space-y-3">
          <Label htmlFor="funding-amount">How much do you want to add?</Label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              ₦
            </span>

            <Input
              id="funding-amount"
              type="number"
              inputMode="decimal"
              min="1"
              step="0.01"
              placeholder="Enter amount"
              className="pl-8 text-lg"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[1000, 5000, 10000, 20000].map((value) => (
              <Button
                key={value}
                type="button"
                size="sm"
                variant={amount === String(value) ? "default" : "outline"}
                onClick={() => setAmount(String(value))}
              >
                ₦{value.toLocaleString("en-NG")}
              </Button>
            ))}
          </div>

          {!validAmount && amount !== "" && (
            <p className="text-sm text-destructive">
              Enter a valid amount greater than zero.
            </p>
          )}
        </section>

        <Separator />

        {/* Virtual account details */}
        <section className="space-y-3">
          <div>
            <h3 className="font-medium">Transfer to this account</h3>
            <p className="text-sm text-muted-foreground">
              Use this account to fund your NintPay wallet.
            </p>
          </div>

          {loadingAccount ? (
            <div className="space-y-3 rounded-xl border p-4">
              <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              <div className="h-6 w-40 animate-pulse rounded bg-muted" />
              <div className="h-4 w-48 animate-pulse rounded bg-muted" />
            </div>
          ) : balanceError ? (
            <div className="rounded-lg border border-destructive/30 p-4">
              <p className="text-sm text-destructive">
                Could not load your virtual account details.
              </p>

              <Button
                className="mt-2"
                variant="outline"
                size="sm"
                onClick={() => walletQuery.refetch()}
              >
                Try again
              </Button>
            </div>
          ) : wallet ? (
            <div className="space-y-3 rounded-xl border p-4">
              <div>
                <p className="text-xs text-muted-foreground">Bank</p>
                <p className="font-medium">{wallet.virtualAccount.bankName}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Account name</p>
                <p className="font-medium">
                  {wallet.virtualAccount.accountName}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Account number
                  </p>
                  <p className="text-lg font-semibold tracking-wide">
                    {wallet.virtualAccount.accountNumber}
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={copyAccountNumber}
                >
                  {copied ? (
                    <Check className="mr-2 h-4 w-4" />
                  ) : (
                    <Copy className="mr-2 h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
          ) : null}
        </section>

        <Separator />

        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              Funding amount
            </span>
            <span className="font-medium">
              ₦
              {(quote?.amount ?? 0).toLocaleString("en-NG", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              Transaction fee
            </span>
            <span className="font-medium">
              ₦
              {(quote?.fee ?? 0).toLocaleString("en-NG", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="flex justify-between gap-4 border-t pt-3">
            <span className="font-semibold">Total to transfer</span>
            <span className="font-semibold">
              ₦
              {(quote?.totalToTransfer ?? 0).toLocaleString("en-NG", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            Amount credited to wallet: ₦
            {(quote?.amountCredited ?? 0).toLocaleString("en-NG", {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="rounded-lg bg-muted/40 p-3">
          <div className="flex gap-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

            <p className="text-xs leading-5 text-muted-foreground">
              Your balance changes only after NintPay confirms your deposit. Use
              the virtual account assigned to you and transfer the exact quoted
              amount.
            </p>
          </div>
        </div>

        <Button
          type="button"
          className="w-full"
          variant="outline"
          onClick={async () => {
            await Promise.all([
              walletQuery.refetch(),
              //   accountQuery.refetch(),
              //   validAmount ? quoteQuery.refetch() : Promise.resolve(),
            ]);
          }}
          disabled={
            walletQuery.isFetching
            //  ||
            // accountQuery.isFetching ||
            // quoteQuery.isFetching
          }
        >
          <ArrowDownToLine className="mr-2 h-4 w-4" />
          Refresh funding details
        </Button>
      </DialogContent>
    </Dialog>
  );
}
