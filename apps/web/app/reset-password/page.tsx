"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resetToken = params.get("token");

    if (!resetToken) {
      setInvalidLink(true);
      return;
    }

    setToken(resetToken);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!token) {
      setInvalidLink(true);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8 || password.length > 128) {
      setError("Password must be between 8 and 128 characters.");
      return;
    }

    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      setError("Use at least one letter and one number.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/reset-password", {
        token,
        password,
      });

      setSuccess(true);
    } catch (err: unknown) {
      const message =
        typeof err === "object" && err !== null && "response" in err
          ? (
              err as {
                response?: {
                  data?: { message?: string | string[] };
                };
              }
            ).response?.data?.message
          : undefined;

      setError(
        Array.isArray(message)
          ? message.join(" ")
          : typeof message === "string"
            ? message
            : "The reset link may have expired. Request a new one and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (invalidLink) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <section className="w-full max-w-md space-y-4 rounded-xl border p-6">
          <h1 className="text-2xl font-semibold">Invalid reset link</h1>
          <p className="text-sm text-muted-foreground">
            This link is missing its reset token. Request a new password reset
            link to continue.
          </p>
          <Button
            className="w-full"
            render={<Link href="/forgot-password">Request a new link</Link>}
          ></Button>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md space-y-6 rounded-xl border p-6 shadow-sm sm:p-8">
        {success ? (
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">
              Password reset successful
            </h1>
            <p className="text-sm text-muted-foreground">
              Your password has been updated. You can now sign in using your new
              password.
            </p>
            <Button className="w-full" onClick={() => router.push("/login")}>
              Go to sign in
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">Reset your password</h1>
              <p className="text-sm text-muted-foreground">
                Choose a new password for your NintPay account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  maxLength={128}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={8}
                  maxLength={128}
                  required
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Use at least 8 characters, including a letter and a number.
              </p>

              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading || !token}
              >
                {loading ? "Resetting..." : "Reset password"}
              </Button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
