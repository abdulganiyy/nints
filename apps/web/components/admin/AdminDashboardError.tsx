"use client";

import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

interface DashboardErrorProps {
  error?: unknown;
  onRetry?: () => void;
}

export function AdminDashboardError({ error, onRetry }: DashboardErrorProps) {
  const message =
    error instanceof Error
      ? error.message
      : "We couldn't load the dashboard data.";

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto flex min-h-[70vh] max-w-175 items-center justify-center">
        <div className="w-full rounded-xl border bg-white p-8 text-center shadow-sm">
          {/* Icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-7 w-7 text-red-600" />
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-xl font-semibold">
            Unable to load dashboard
          </h1>

          {/* Description */}
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            We couldn't retrieve the latest hotel information. This may be a
            temporary connection problem. Please try again.
          </p>

          {/* Error message - useful during development */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 rounded-lg bg-slate-50 p-3 text-left">
              <p className="wrap-break-word font-mono text-xs text-slate-600">
                {message}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                <RefreshCw className="h-4 w-4" />
                Try again
              </button>
            )}

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Reload page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
