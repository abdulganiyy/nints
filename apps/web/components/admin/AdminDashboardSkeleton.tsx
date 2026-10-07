import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-slate-200", className)} />
  );
}

function SkeletonCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border bg-white shadow-sm", className)}>
      {children}
    </div>
  );
}

export function AdminDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-44" />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-32" />
                </div>

                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>

              <div className="mt-4">
                <Skeleton className="h-3 w-40" />
              </div>
            </SkeletonCard>
          ))}
        </div>

        {/* Quick Actions */}
        <SkeletonCard className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-11 w-full" />
            ))}
          </div>
        </SkeletonCard>

        {/* Arrivals / Departures / Room Status */}
        <div className="grid gap-6 xl:grid-cols-3">
          {/* Arrivals */}
          <SkeletonCard>
            <DashboardSectionHeader />

            <div className="divide-y">
              {Array.from({ length: 4 }).map((_, index) => (
                <GuestRowSkeleton key={index} />
              ))}
            </div>
          </SkeletonCard>

          {/* Departures */}
          <SkeletonCard>
            <DashboardSectionHeader />

            <div className="divide-y">
              {Array.from({ length: 4 }).map((_, index) => (
                <GuestRowSkeleton key={index} />
              ))}
            </div>
          </SkeletonCard>

          {/* Room Status */}
          <SkeletonCard>
            <DashboardSectionHeader />

            <div className="p-5">
              <Skeleton className="h-3 w-full rounded-full" />

              <div className="mt-6 space-y-5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-2.5 w-2.5 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>

                    <Skeleton className="h-4 w-8" />
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t pt-4">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            </div>
          </SkeletonCard>
        </div>

        {/* Charts / Alerts */}
        <div className="grid gap-6 xl:grid-cols-3">
          {/* Occupancy */}
          <SkeletonCard className="p-5">
            <DashboardTitleSkeleton />

            <div className="mt-6 flex h-40 items-end gap-2">
              {[55, 70, 45, 75, 60, 85, 72].map((height, index) => (
                <div key={index} className="flex flex-1 items-end">
                  <Skeleton
                    className="w-full rounded-t-md"
                    // style={{
                    //   height: `${height}%`,
                    // }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between">
              {Array.from({ length: 7 }).map((_, index) => (
                <Skeleton key={index} className="h-3 w-6" />
              ))}
            </div>

            <div className="mt-5 border-t pt-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </SkeletonCard>

          {/* Revenue */}
          <SkeletonCard className="p-5">
            <DashboardTitleSkeleton />

            <div className="mt-6 space-y-2">
              <Skeleton className="h-9 w-40" />
              <Skeleton className="h-3 w-48" />
            </div>

            <div className="mt-6 space-y-5">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index}>
                  <div className="mb-2 flex justify-between">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>

                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* Alerts */}
          <SkeletonCard className="p-5">
            <DashboardTitleSkeleton />

            <div className="mt-5 space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <Skeleton className="h-9 w-9 rounded-lg" />

                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-40 max-w-full" />
                    <Skeleton className="h-3 w-32 max-w-full" />
                  </div>
                </div>
              ))}
            </div>
          </SkeletonCard>
        </div>

        {/* Recent Payments */}
        <SkeletonCard className="overflow-hidden">
          <div className="flex items-center justify-between border-b p-5">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-52" />
            </div>

            <Skeleton className="h-4 w-24" />
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-175">
              {/* Table Header */}
              <div className="grid grid-cols-6 gap-4 bg-slate-50 px-5 py-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-3 w-20" />
                ))}
              </div>

              {/* Table Rows */}
              <div className="divide-y">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-6 items-center gap-4 px-5 py-4"
                  >
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="ml-auto h-4 w-24" />
                    <Skeleton className="ml-auto h-6 w-14 rounded-full" />
                    <Skeleton className="ml-auto h-4 w-4 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SkeletonCard>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Helper Skeletons                                                           */
/* -------------------------------------------------------------------------- */

function DashboardSectionHeader() {
  return (
    <div className="flex items-start justify-between border-b p-5">
      <div className="flex gap-3">
        <Skeleton className="h-9 w-9 rounded-lg" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-44" />
        </div>
      </div>

      <Skeleton className="h-3 w-14" />
    </div>
  );
}

function DashboardTitleSkeleton() {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-3 w-24" />
      </div>

      <Skeleton className="h-5 w-5 rounded-full" />
    </div>
  );
}

function GuestRowSkeleton() {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-36" />
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}
