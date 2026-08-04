"use client";

import Link from "next/link";
import {
  Bell,
  Menu,
  Search,
  Settings,
  User,
  LogOut,
  CreditCard,
  Shield,
} from "lucide-react";

import { format } from "date-fns";

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

interface DashboardHeaderProps {
  name?: string;
  avatar?: string;
}

export default function DashboardHeader({
  name = "Abdulganiyy",
  avatar,
}: DashboardHeaderProps) {
  const router = useRouter();

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
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Left */}

        <div className="flex items-center gap-4">
          {/* Mobile Menu */}

          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back, {name} 👋
            </h1>

            <p className="text-sm text-slate-500">
              {format(new Date(), "EEEE, MMMM d, yyyy")}
            </p>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-2">
          {/* Search Mobile */}

          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          {/* Settings */}

          <Button variant="ghost" size="icon">
            <Link href="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>

          {/* User */}

          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="h-auto rounded-full p-1">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={avatar} />

                  <AvatarFallback className="bg-emerald-600 text-white">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Link
                  href="/profile"
                  className="flex cursor-pointer items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link
                  href="/cards"
                  className="flex cursor-pointer items-center"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Cards
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link
                  href="/security"
                  className="flex cursor-pointer items-center"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Security
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
        </div>
      </div>
    </header>
  );
}
