"use client";
import { useEffect, useState } from "react";
import { Mail, RefreshCw, LogOut, CheckCircle2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface EmailVerificationModalProps {
  email: string;
  open: boolean;
  onCheckVerification?: () => Promise<void>;
  onResend?: () => Promise<void>;
  onLogout?: () => Promise<void>;
}

const EmailVerificationModal = ({
  email,
  open,
  onCheckVerification,
  onResend,
  onLogout,
}: EmailVerificationModalProps) => {
  const [seconds, setSeconds] = useState(60);

  const router = useRouter();

  const logoutMutation = useMutation({
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

  const verifyMutation = useMutation({
    mutationFn: async function verify() {
      const response = await axios.get(`api/me`);

      return response.data;
    },
  });

  useEffect(() => {
    verifyMutation.mutate();
  }, [email]);

  const resendVerificationMutation = useMutation({
    mutationFn: async function resendVerification() {
      setSeconds(60);

      const response = await axios.post(`api/resend-verification`, {
        email,
      });

      return response.data;
    },
    onSuccess: (data: any) => {
      toast(data.message);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  useEffect(() => {
    if (!open) return;

    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, open]);

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-md"
        showCloseButton={false}
        // onEscapeKeyDown={(e) => e.preventDefault()}
        // onPointerDownOutside={(e) => e.preventDefault()}
        // onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <Mail className="h-10 w-10 text-emerald-600" />
          </div>

          <DialogTitle className="text-center text-2xl">
            Verify Your Email
          </DialogTitle>

          <div className="space-y-2 pt-2 text-center">
            <p>We've sent a verification email to</p>

            <p className="font-semibold text-foreground">{email}</p>

            <p>
              Verify your email address before using your wallet, transfers,
              airtime, savings and other financial services.
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-3 pt-4">
          <Button
            className="w-full"
            onClick={() => verifyMutation.mutateAsync()}
            disabled={verifyMutation.isPending}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />

            {verifyMutation.isPending
              ? "Checking..."
              : "I've Verified My Email"}
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => resendVerificationMutation.mutate()}
            disabled={seconds > 0 || resendVerificationMutation.isPending}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${resendVerificationMutation.isPending ? "animate-spin" : ""}`}
            />

            {seconds > 0
              ? `Resend in ${seconds}s`
              : "Resend Verification Email"}
          </Button>

          <Button
            variant="destructive"
            className="w-full"
            onClick={() => logoutMutation.mutate()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerificationModal;
