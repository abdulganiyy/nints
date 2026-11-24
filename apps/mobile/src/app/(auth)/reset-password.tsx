import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Screen } from "@/components/Screen";
import { PrimaryButton } from "@/components/PrimaryButton";
import { FormInput } from "@/components/FormInput";

import {
  resetPasswordSchema,
  ResetPasswordFormValues,
} from "@/schemas/auth.schema";

import { useResetPassword } from "@/auth/auth.hooks";
import { colors } from "@/constants/theme";

export default function ResetPasswordScreen() {
  const { email } = useLocalSearchParams<{
    email: string;
  }>();

  const mutation = useResetPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email ?? "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ResetPasswordFormValues) => {
    mutation.mutate(
      {
        email: values.email,
        otp: values.otp,
        password: values.password,
      },
      {
        onSuccess: () => {
          Alert.alert(
            "Password updated",
            "Your password has been changed successfully.",
            [
              {
                text: "Sign in",
                onPress: () =>
                  router.replace("/(auth)/login"),
              },
            ]
          );
        },
        onError: (error: any) => {
          Alert.alert(
            "Password reset failed",
            error?.response?.data?.message ??
              "The code may have expired. Please try again."
          );
        },
      }
    );
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.back} onPress={() => router.back()}>
          ← Back
        </Text>

        <Text style={styles.title}>Create new password</Text>

        <Text style={styles.description}>
          Enter the 6-digit code sent to {email}, then
          create a new password for your account.
        </Text>

        <FormInput
          control={control}
          name="otp"
          label="Verification code"
          placeholder="000000"
          keyboardType="number-pad"
          maxLength={6}
        //   error={errors.otp?.message}
        />

        <FormInput
          control={control}
          name="password"
          label="New password"
          placeholder="Enter new password"
          secureTextEntry
        //   error={errors.password?.message}
        />

        <FormInput
          control={control}
          name="confirmPassword"
          label="Confirm new password"
          placeholder="Confirm new password"
          secureTextEntry
        //   error={errors.confirmPassword?.message}
        />

        <PrimaryButton
          title={
            mutation.isPending
              ? "Updating..."
              : "Reset password"
          }
          onPress={handleSubmit(onSubmit)}
          disabled={mutation.isPending}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  back: {
    fontSize: 15,
    marginBottom: 40,
    color: colors.ink,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    color: colors.ink,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.muted,
    marginBottom: 30,
  },
});