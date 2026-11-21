import React from "react";

import { Alert, Text } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  verifyEmailSchema,
  VerifyEmailFormData,
} from "../../schemas/auth.schema";

import {
  useVerifyEmail,
  useResendVerification,
} from "../../auth/auth.hooks";

import { FormInput } from "../../components/FormInput";

import { Screen } from "../../components/Screen";

import { Brand } from "../../components/Brand";

import { PageHeading } from "../../components/PageHeading";

import { PrimaryButton } from "../../components/PrimaryButton";

export default function VerifyEmailScreen() {

  const { email } = useLocalSearchParams<{
    email: string;
  }>();

  const verifyMutation = useVerifyEmail();

  const resendMutation = useResendVerification();

  const { control, handleSubmit } =
    useForm<VerifyEmailFormData>({
      resolver: zodResolver(verifyEmailSchema),

      defaultValues: {
        email: email ?? "",
        otp: "",
      },
    });

  const onSubmit = (data: VerifyEmailFormData) => {

    verifyMutation.mutate(data, {

      onSuccess: () => {

        router.replace("/(auth)/create-pin");

      },

      onError: (error: any) => {

        Alert.alert(
          "Verification failed",
          error.response?.data?.message ||
            "Invalid or expired verification code."
        );

      },

    });

  };

  return (
    <Screen>

      <Brand />

      <PageHeading
        title="Verify your email"
        subtitle={`Enter the verification code sent to ${email}.`}
      />

      <FormInput
        control={control}
        name="otp"
        label="Verification code"
        placeholder="000000"
        keyboardType="number-pad"
        maxLength={6}
      />

      <PrimaryButton
        title="Verify email"
        onPress={handleSubmit(onSubmit)}
        loading={verifyMutation.isPending}
      />

      <Text
        style={{ textAlign: "center", marginTop: 22 }}
        onPress={() => {
          if (!email || resendMutation.isPending) return;

          resendMutation.mutate(email, {
            onSuccess: () =>
              Alert.alert("Success", "A new code has been sent."),
            onError: () =>
              Alert.alert("Error", "Unable to resend verification code."),
          });
        }}
      >
        {resendMutation.isPending
          ? "Sending..."
          : "Didn't receive a code? Resend"}
      </Text>

    </Screen>
  );
}