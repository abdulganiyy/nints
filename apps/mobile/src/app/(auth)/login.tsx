import React from "react";

import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginFormData } from "../../schemas/auth.schema";

import { useLogin } from "../../auth/auth.hooks";

import { FormInput } from "../../components/FormInput";

import { Screen } from "../../components/Screen";

import { Brand } from "../../components/Brand";

import { PageHeading } from "../../components/PageHeading";

import { PrimaryButton } from "../../components/PrimaryButton";
import axios, { AxiosError } from "axios";
import { colors } from "@/constants/theme";
import { tokenStorage } from "@/api/axios";

export default function LoginScreen() {
  const loginMutation = useLogin();

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: async (response) => {
        if (!response.user.emailVerified) {
          await tokenStorage.clearTokens();

          router.push({
            pathname: "/(auth)/verify-email",
            params: {
              email: data.email,
            },
          });

          return;
        }

        router.replace("/(tabs)");
      },

      onError: (error: unknown) => {
        let message = "Something went wrong. Please try again.";

        if (axios.isAxiosError(error)) {
          const responseMessage = error.response?.data?.message;

          if (Array.isArray(responseMessage)) {
            message = responseMessage.join("\n");
          } else if (
            typeof responseMessage === "string" &&
            responseMessage.trim()
          ) {
            message = responseMessage;
          } else if (!error.response) {
            message =
              "Unable to connect to the server. Check your internet connection.";
          } else {
            message = "Invalid email or password.";
          }
        }

        Alert.alert("Login failed", message);
      },
    });
  };

  return (
    <Screen>
      <Brand />

      <PageHeading
        title="Welcome back"
        subtitle="Log in to continue to your NintPay account."
      />

      <FormInput
        control={control}
        name="email"
        label="Email address"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <FormInput
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
      />

      <View style={styles.authlinks}>
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text
            style={{ textAlign: "left", marginBottom: 20, color: colors.green }}
          >
            Not signed up yet? Sign up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/forgot-password")}>
          <Text style={{ textAlign: "right", marginBottom: 20 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>

      <PrimaryButton
        title="Log in"
        onPress={handleSubmit(onSubmit)}
        loading={loginMutation.isPending}
        disabled={loginMutation.isPending}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  authlinks: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
