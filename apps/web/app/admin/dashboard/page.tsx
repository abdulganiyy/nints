"use client";

import { AdminDashboardSkeleton } from "@/components/admin/AdminDashboardSkeleton";
import { AdminDashboardContent } from "@/components/admin/AdminDashboardContent";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { useUser } from "@/hooks/useUser";
import { AdminDashboardError } from "@/components/admin/AdminDashboardError";

export default function AdminPage() {
  const { isLoading: isUserLoading } = useUser();

  if (isUserLoading) {
    return <AdminDashboardSkeleton />;
  }

  return <DashboardData />;
}

function DashboardData() {
  const { data, isLoading, isError, error, refetch } = useAdminDashboard();

  if (isLoading) {
    return <AdminDashboardSkeleton />;
  }

  if (isError || !data) {
    return <AdminDashboardError error={error} onRetry={() => refetch()} />;
  }

  return <AdminDashboardContent data={data} />;
}
