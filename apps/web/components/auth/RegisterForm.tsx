"use client";
import { useMutation } from "@tanstack/react-query";
import FormBuilder from "@/components/form/FormBuilder";
import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerFieldConfig } from "@/config";
import { phoneRegex } from "@/utils/constants";

export const registerSchema = z
  .object({
    fullName: z.string().min(6, "Fullname must be at least 6 characters"),
    email: z.email(),
    phoneNumber: z
      .string()
      .min(1, { message: "Phone number is required." })
      .regex(phoneRegex, { message: "Invalid phone number format." }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreed: z.boolean({
      error: "You need to accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();

  useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      agreed: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof registerSchema>) => {
      const res = await axios.post(`/api/register`, data);

      return res.data;
    },
    onSuccess: (data) => {
      // localStorage.setItem("user", JSON.stringify(data));
      // router.replace("/dashboard");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    mutation.mutate(values);
  }

  return (
    <FormBuilder
      title="Create Account"
      description="  Start using your digital wallet today."
      config={registerFieldConfig}
      schema={registerSchema}
      onSubmit={onSubmit}
      submitText="Create Account"
    />
  );
}
