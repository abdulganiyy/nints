import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Screen } from "@/components/Screen";
import { PrimaryButton } from "@/components/PrimaryButton";
import { FormInput } from "@/components/FormInput";

import {
  forgotPasswordSchema,
  ForgotPasswordFormValues,
} from "@/schemas/auth.schema";

import { useForgotPassword } from "@/auth/auth.hooks";
import { colors } from "@/constants/theme";

export default function ForgotPasswordScreen() {
  const mutation = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        router.push({
          pathname: "/(auth)/reset-password",
          params: { email: values.email },
        });
      },
      onError: (error: any) => {
        Alert.alert(
          "Unable to continue",
          error?.response?.data?.message ??
            "Please try again later."
        );
      },
    });
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.back} onPress={() => router.back()}>
          ← Back
        </Text>

        <Text style={styles.icon}>🔐</Text>

        <Text style={styles.title}>Forgot password?</Text>

        <Text style={styles.description}>
          Enter the email address associated with your
          NintPay account. We'll send you a password-reset
          code.
        </Text>

        <FormInput
          control={control}
          name="email"
          label="Email address"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        //   error={errors.email?.message}
        />

        <PrimaryButton
          title={
            mutation.isPending
              ? "Sending..."
              : "Send reset code"
          }
          onPress={handleSubmit(onSubmit)}
          disabled={mutation.isPending}
        />

        <Text
          style={styles.login}
          onPress={() => router.replace("/(auth)/login")}
        >
          Remember your password? Sign in
        </Text>
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
  icon: {
    fontSize: 42,
    marginBottom: 20,
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
  login: {
    textAlign: "center",
    marginTop: 24,
    color: colors.green,
    fontWeight: "600",
  },
});