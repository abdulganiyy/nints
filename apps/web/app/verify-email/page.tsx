"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  Clock3,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  console.log(email, token);

  const verifyMutation = useMutation({
    mutationFn: verify,
  });

  const resendVerificationMutation = useMutation({
    mutationFn: resendVerification,
    onSuccess: (data: any) => {
      toast(data.message);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  useEffect(() => {
    if (!token || !email) return;
    verifyMutation.mutate();
  }, [token, email]);

  async function verify() {
    const response = await axios.post(`api/verify-email`, {
      otp: token,
      email,
    });

    return response.data;
  }

  async function resendVerification() {
    const response = await axios.post(`api/resend-verification`, {
      email,
    });

    return response.data;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <Card className="w-full max-w-lg rounded-3xl p-10 text-center shadow-xl">
        {verifyMutation.isPending && (
          <>
            <Loader2 className="mx-auto h-16 w-16 animate-spin text-emerald-600" />

            <h1 className="mt-8 text-3xl font-bold">Verifying Email</h1>

            <p className="mt-4 text-slate-600">
              Please wait while we verify your email address...
            </p>
          </>
        )}

        {verifyMutation.isSuccess && (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>

            <h1 className="mt-8 text-3xl font-bold">Email Verified</h1>

            <p className="mt-4 text-slate-600">
              Your account has been activated.
            </p>

            <Button className="mt-10 w-full">
              <Link href="/dashboard" className="inline-flex items-center">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </>
        )}

        {verifyMutation.isError && (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
              <Clock3 className="h-10 w-10 text-yellow-600" />
            </div>

            <h1 className="mt-8 text-3xl font-bold">Link Expired</h1>

            <p className="mt-4 text-slate-600">
              This verification link has expired.
            </p>

            <Button
              className="mt-10 w-full"
              onClick={() => resendVerificationMutation.mutate()}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Send Another Email
            </Button>
          </>
        )}

        {verifyMutation.isError && (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>

            <h1 className="mt-8 text-3xl font-bold">Invalid Link</h1>

            <p className="mt-4 text-slate-600">
              This verification link is invalid or has already been used.
            </p>

            <Button className="mt-10 w-full">
              <Link href="/verify-email">Request New Email</Link>
            </Button>
          </>
        )}

        {verifyMutation.isError && (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <RefreshCw className="h-10 w-10 text-red-600" />
            </div>

            <h1 className="mt-8 text-3xl font-bold">Connection Error</h1>

            <p className="mt-4 text-slate-600">
              Unable to verify your email right now.
            </p>

            <Button className="mt-10 w-full" onClick={verify}>
              Retry
            </Button>
          </>
        )}

      </Card>
    </main>
  );
}
