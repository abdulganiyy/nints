import React from "react";
import { Sidebar } from "@/components/admin/AdminSidebar";
import { AdminDashboardNavbar } from "@/components/admin/AdminDashboardNavbar";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen flex">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <AdminDashboardNavbar />
        <div className="py-11.25 px-14.75">{children}</div>
      </div>
    </main>
  );
}
