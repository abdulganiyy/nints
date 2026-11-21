import React from "react";

import {
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";

import { router } from "expo-router";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, RegisterFormData } from "../../schemas/auth.schema";

import { useRegister } from "../../auth/auth.hooks";

import { FormInput } from "../../components/FormInput";

import { Screen } from "../../components/Screen";

import { Brand } from "../../components/Brand";

import { PageHeading } from "../../components/PageHeading";

import { PrimaryButton } from "../../components/PrimaryButton";

import { Controller } from "react-hook-form";
import { Checkbox } from "expo-checkbox";
import {  View, Pressable } from "react-native";

export default function RegisterScreen() {

  const registerMutation = useRegister();

  const {
    control,
    handleSubmit,
      formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      password: "",

    },
  });

  const onSubmit = (data: RegisterFormData) => {

    registerMutation.mutate(data, {

      onSuccess: () => {

        router.push({
          pathname: "/(auth)/verify-email",
          params: {
            email: data.email,
          },
        });

      },

      onError: (error: any) => {

        const message =
          error.response?.data?.message ||
          "Unable to create account. Please try again.";

        Alert.alert("Registration failed", message);

      },

    });

  };

  return (
    <Screen>
      <Brand />

      <PageHeading
        title="Create your account"
        subtitle="Enter your details to get started with NintPay."
      />

      <FormInput
        control={control}
        name="fullname"
        label="Full name"
        placeholder="Enter your full name"
        autoCapitalize="words"
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
        name="phone"
        label="Phone number"
        placeholder="08012345678"
        keyboardType="phone-pad"
      />

      <FormInput
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
      />

      <Controller
  control={control}
  name="agreed"
  render={({ field: { value, onChange } }) => (
    <View style={{ marginVertical: 16 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox
          value={value}
          onValueChange={onChange}
          color={value ? "#16A34A" : undefined}
        />

        <Text style={{ marginLeft: 10, flex: 1 }}>
          I agree to the{" "}
          <Text
            style={{ color: "#16A34A", fontWeight: "600" }}
            // onPress={() => router.push("/terms")}
          >
            Terms and Conditions
          </Text>
          {" "}and{" "}
          <Text
            style={{ color: "#16A34A", fontWeight: "600" }}
            // onPress={() => router.push("/privacy")}
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </View>

      {errors.agreed && (
        <Text style={{ color: "#DC2626", marginTop: 6 }}>
          {errors.agreed.message}
        </Text>
      )}
    </View>
  )}
/>

      <PrimaryButton
        title="Create account"
        onPress={handleSubmit(onSubmit)}
        loading={registerMutation.isPending}
        disabled={registerMutation.isPending}
      />

      <TouchableOpacity
        onPress={() => router.replace("/(auth)/login")}
      >
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Already have an account? Log in
        </Text>
      </TouchableOpacity>

    </Screen>
  );
}