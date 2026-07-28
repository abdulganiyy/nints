"use client";

import { loginFieldConfig } from "@/config";
import { useMutation } from "@tanstack/react-query";
import FormBuilder from "../form/FormBuilder";
import z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const res = await axios.post(`api/login`, data);

      return res.data;
    },
    onSuccess: () => {
      router.replace("/dashboard");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    mutation.mutateAsync(values);
  }
  return (
    <div className="rounded-3xl bg-white p-4 shadow-x min-w-xll">
      <FormBuilder
        title="Sign in to your Account"
        description="Sign in and use your digital wallet today."
        config={loginFieldConfig}
        schema={loginSchema}
        onSubmit={onSubmit}
        submitText="Sign In"
        footer={
          <p className="text-slate-500 text-center">
            Don't have an account yet?{" "}
            <Link href="/register" className="font-semibold text-emerald-600">
              Register
            </Link>
          </p>
        }
      />
    </div>
  );
};

export default LoginForm;
