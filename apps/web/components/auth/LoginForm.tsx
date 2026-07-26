"use client";

import { loginFieldConfig } from "@/config"
import { useMutation } from "@tanstack/react-query";
import FormBuilder from "../form/FormBuilder"
import z from "zod"
import axios from "axios";
import { toast } from "sonner";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

const LoginForm = () => {

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const res = await axios.post(`/api/login`, data);

      return res.data;
    },
    onSuccess: (data) => {
        // Check if the account trying to log in is in our database
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    mutation.mutate(values);
  }
    return (
        <FormBuilder
            title="Sign in to your Account"
            description="Sign in and use your digital wallet today."
            config={loginFieldConfig}
            schema={loginSchema}
            onSubmit={onSubmit}
            submitText="Sign In"
        />
    )
}

export default LoginForm;