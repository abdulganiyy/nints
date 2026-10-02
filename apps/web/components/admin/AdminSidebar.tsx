"use client";

import { getSidebar } from "@/config/admin-sidebar";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { Bell, ChartNoAxesColumnIncreasing } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Sidebar = () => {
  const { data: user } = useUser();

  const pathName = usePathname();

  if (!user) return null;

  return (
    <div className="w-68 border-r-2 border-gray-100 bg-green-50 pl-4.25 pr-5.75">
      <div className="border-b-2 border-gray-100 px-5.5 flex items-center gap-2 text-primary mt-5 mb-14">
        <Avatar>
          <AvatarImage src="/logo.JPG" />
          <AvatarFallback className="bg-primary text-white">N</AvatarFallback>
        </Avatar>
        NintPay
      </div>

      {getSidebar(user?.permissions ?? ["*"]).map((section) => (
        <div key={section.label} className="mb-7.75">
          {!section.children && section?.href ? (
            <Link
              href={section.href}
              className={cn(
                "flex items-center gap-2 text-sm leading-5 rounded-sm py-1.75 px-5.5 text-[#878D97]",
                { "bg-primary text-white": pathName == section.href },
              )}
            >
              <ChartNoAxesColumnIncreasing size={12} />
              {section.label}
            </Link>
          ) : (
            <span className="text-sm leading-5 py-1.75 px-5.5 text-[#878D97]">
              {section.label}
            </span>
          )}
          <div className="flex flex-col mt-2">
            {section.children?.map((item) => (
              <Link
                key={item.href}
                href={item.href!}
                className={cn(
                  "flex items-center gap-2 text-sm leading-5 rounded-sm py-1.75 px-5.5 text-[#878D97]",
                  { "bg-primary text-white": pathName == item.href },
                )}
              >
                {item.icon ? (
                  <item.icon className="h-3 w-3" />
                ) : (
                  <Bell className="h-3 w-3" />
                )}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
