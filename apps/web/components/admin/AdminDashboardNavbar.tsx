"use client";

import Link from "next/link";
import { Bell, Menu, Search, User, LogOut, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";

export const AdminDashboardNavbar = () => {
  const router = useRouter();

  const { data } = useUser();

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/logout`);
    },
    onSuccess: () => {
      router.replace("/login");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return (
    <div className="py-5 px-7.25 border-b flex justify-between text-[#627B87]">
      <div>
        {/* <Button variant="ghost" size="icon" className="">
          <Menu className="h-5 w-5" />
        </Button> */}
        {/* <Button variant="ghost" size="icon" className="">
          <Search className="h-5 w-5" />
        </Button> */}
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center gap-4">
            <span className="h-auto rounded-full p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={data?.profileImage} />

                <AvatarFallback className="bg-[#FFE6CC] text-black">
                  {data?.fullname?.trim()?.[0]?.toUpperCase() ?? "?"}
                </AvatarFallback>
              </Avatar>
            </span>
            <span className="text-[#1F384C]">{data?.fullname}</span>
            <ChevronDown />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Link
                href="/dashboard/profile"
                className="flex cursor-pointer items-center"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => mutation.mutate()}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {/* <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" /> */}
        </Button>
      </div>
    </div>
  );
};
