"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Copy,
  Gift,
  Link as LinkIcon,
  Share2,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useReferral } from "@/hooks/useReferral";
import Link from "next/link";

export default function ReferralPage() {
  const { data, isLoading, isError, refetch } = useReferral();

  const [copied, setCopied] = useState(false);

  const copyReferralLink = async () => {
    if (!data?.referralLink) return;

    await navigator.clipboard.writeText(data.referralLink);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const shareReferralLink = async () => {
    if (!data?.referralLink) return;

    if (navigator.share) {
      await navigator.share({
        title: "Join NintPay",
        text: "Join NintPay using my referral link.",
        url: data.referralLink,
      });

      return;
    }

    await copyReferralLink();
  };

  if (isLoading) {
    return <ReferralSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <p className="font-semibold">Unable to load referral information</p>

            <p className="mt-2 text-sm text-muted-foreground">
              Please try again.
            </p>

            <Button
              className="mt-5"
              variant="outline"
              onClick={() => refetch()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Refer & Earn</h1>

        <p className="mt-2 text-muted-foreground">
          Invite friends to NintPay and earn rewards when they complete the
          required activities.
        </p>
      </div>

      {/* Referral Code */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Your Referral Code
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="rounded-xl border bg-muted/30 p-5">
            <p className="text-sm text-muted-foreground">
              Share this link with your friends
            </p>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-lg border bg-background px-4 py-3">
                <LinkIcon className="h-5 w-5 shrink-0 text-muted-foreground" />

                <span className="truncate text-sm font-medium">
                  {data.referralLink}
                </span>
              </div>

              <Button onClick={copyReferralLink}>
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={shareReferralLink}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>

            <div className="mt-4">
              <p className="text-xs text-muted-foreground">Referral Code</p>

              <p className="mt-1 font-mono text-lg font-bold tracking-wider">
                {data.referralCode}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Referrals"
          value={data.totalReferrals}
          icon={<Users className="h-5 w-5" />}
        />

        <StatCard
          title="Successful"
          value={data.completedReferrals}
          icon={<Check className="h-5 w-5" />}
        />

        <StatCard
          title="Pending"
          value={data.pendingReferrals}
          icon={<Users className="h-5 w-5" />}
        />

        <StatCard
          title="Total Earned"
          value={new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 2,
          }).format(Number(data.totalRewards))}
          icon={<Gift className="h-5 w-5" />}
        />
      </div>

      {/* Referral History */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Referral History</CardTitle>
        </CardHeader>

        <CardContent>
          {data.referrals.length === 0 ? (
            <div className="py-12 text-center">
              <Users className="mx-auto h-10 w-10 text-muted-foreground" />

              <p className="mt-4 font-medium">No referrals yet</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Share your referral link to start earning rewards.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {data.referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{referral.name}</p>

                    <p className="text-sm text-muted-foreground">
                      {formatDate(referral.joinedAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={
                        referral.status === "COMPLETED"
                          ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                          : "rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700"
                      }
                    >
                      {referral.status}
                    </span>

                    <span className="font-semibold">₦{referral.reward}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card> */}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{title}</p>

          <div className="rounded-lg bg-muted p-2">{icon}</div>
        </div>

        <p className="mt-3 text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function ReferralSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="animate-pulse space-y-6">
        <div>
          <div className="h-8 w-40 rounded bg-muted" />
          <div className="mt-3 h-4 w-80 rounded bg-muted" />
        </div>

        <div className="h-48 rounded-xl bg-muted" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-28 rounded-xl bg-muted" />
          ))}
        </div>

        <div className="h-72 rounded-xl bg-muted" />
      </div>
    </div>
  );
}
