import { CalendarDays, Hotel, Plus } from "lucide-react";

export function AdminDashboardHeader() {
  const today = new Intl.DateTimeFormat("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <Hotel className="h-6 w-6 text-primary" />

          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Here's what's happening today.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-50"
        >
          <CalendarDays className="h-4 w-4" />
          {today}
        </button>

        {/* <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New Reservation
        </button> */}
      </div>
    </div>
  );
}
