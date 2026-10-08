"use client";

import {
  LayoutGrid,
  MessageCircleMore,
  UsersRound,
  Monitor,
  Share,
} from "lucide-react";

export type SidebarItem = {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  permission?: string;
  children?: SidebarItem[];
};

export const sidebarConfig: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutGrid, href: "/admin/dashboard" },
  {
    label: "Management",
    children: [
      {
        icon: UsersRound,
        label: "Users",
        href: "/admin/dashboard/user",
      },
      {
        icon: Share,
        label: "Referrals",
        href: "/admin/dashboard/referral",
        // permission: "users.view",
      },
      {
        icon: Monitor,
        label: "Transactions",
        href: "/admin/dashboard/transaction",
      },
    ],
  },

  {
    label: "Other",
    children: [
      {
        icon: MessageCircleMore,
        label: "Settings",
        href: "/admin/dashboard/setting",
      },
    ],
  },
];

function hasPermission(permissions: string[], required?: string) {
  if (!required) return true;

  return permissions.includes("*") || permissions.includes(required);
}

function filterSidebar(
  items: SidebarItem[],
  permissions: string[],
): SidebarItem[] {
  return items
    .map((item) => {
      // Leaf node
      if (!item.children) {
        return hasPermission(permissions, item.permission) ? item : null;
      }

      // Group
      const visibleChildren = filterSidebar(item.children, permissions);

      if (visibleChildren.length === 0) {
        return null;
      }

      return {
        ...item,
        children: visibleChildren,
      };
    })
    .filter(Boolean) as SidebarItem[];
}

export function getSidebar(permissions: string[]) {
  return filterSidebar(sidebarConfig, permissions);
}
