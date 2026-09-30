"use client";
import { updateProfileFieldConfig } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormBuilder from "@/components/form/FormBuilder";
import z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { UploadResult } from "@/lib/upload";
import { updateProfileSchema } from "@/schema";
import { useUser } from "@/hooks/useUser";
import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  const { data: user } = useUser();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof updateProfileSchema>) => {
      const { photo, ...rest } = data;

      const res = await axios.patch(`/api/profile`, {
        ...rest,
        profileImage: photo
          ? (photo[0] as unknown as UploadResult)?.url
          : undefined,
      });

      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  async function onSubmit(values: z.infer<typeof updateProfileSchema>) {
    mutation.mutateAsync(values);
  }

  const defaultValues = useMemo(() => {
    return {
      fullname: user?.fullname,
      email: user?.email,
      phone: user?.phone,
      photo: user?.profileImage ? [{ url: user?.profileImage }] : [],
    };
  }, [user]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>
      <h2 className="text-[#1F384C] text-lg leading-5.75">
        Profile Management
      </h2>
      <FormBuilder
        config={updateProfileFieldConfig}
        schema={updateProfileSchema}
        onSubmit={onSubmit}
        submitText="Update Profile"
        values={defaultValues}
      />
    </div>
  );
}
