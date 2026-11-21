import { Alert } from "react-native";

import { router } from "expo-router";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  createPinSchema,
  CreatePinFormData,
} from "../../schemas/auth.schema";

import { useCreatePin } from "../../auth/auth.hooks";

import { FormInput } from "../../components/FormInput";

import { Screen } from "../../components/Screen";

import { Brand } from "../../components/Brand";

import { PageHeading } from "../../components/PageHeading";

import { PrimaryButton } from "../../components/PrimaryButton";

import { useAuthContext } from "../../auth/auth.context";

export default function CreatePinScreen() {

  const createPinMutation = useCreatePin();

  const { refreshUser } = useAuthContext();

  const { control, handleSubmit } =
    useForm<CreatePinFormData>({
      resolver: zodResolver(createPinSchema),

      defaultValues: {
        pin: "",
        confirmPin: "",
      },
    });

  const onSubmit = async (data: CreatePinFormData) => {

    createPinMutation.mutate(
      { pin: data.pin },

      {
        onSuccess: async () => {

          await refreshUser();

          router.replace("/(tabs)");

        },

        onError: (error: any) => {

          Alert.alert(
            "PIN creation failed",
            error.response?.data?.message ||
              "Unable to create your transaction PIN."
          );

        },
      }
    );

  };

  return (
    <Screen>

      <Brand />

      <PageHeading
        title="Secure your transactions"
        subtitle="Create a 4-digit PIN to authorize transactions on NintPay."
      />

      <FormInput
        control={control}
        name="pin"
        label="Transaction PIN"
        placeholder="••••"
        keyboardType="number-pad"
        secureTextEntry
        maxLength={4}
      />

      <FormInput
        control={control}
        name="confirmPin"
        label="Confirm transaction PIN"
        placeholder="••••"
        keyboardType="number-pad"
        secureTextEntry
        maxLength={4}
      />

      <PrimaryButton
        title="Create PIN and continue"
        onPress={handleSubmit(onSubmit)}
        loading={createPinMutation.isPending}
      />

    </Screen>
  );
}