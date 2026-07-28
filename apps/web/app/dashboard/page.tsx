"use client";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/logout`);
    },
    onSuccess: () => {
      router.replace("/register");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return (
    <main className="min-h-screen bg-slate-50">
      Dashboard
      <Button onClick={() => mutation.mutate()} variant="destructive">
        Logout
      </Button>
    </main>
  );
}
