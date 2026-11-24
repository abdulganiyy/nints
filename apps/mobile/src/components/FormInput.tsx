import React from "react";

import {
  Controller,
  Control,
  FieldValues,
  Path,
} from "react-hook-form";

import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
} from "react-native";

import { colors } from "../constants/theme";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  maxLength?: number;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  ...inputProps
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>

          <TextInput
            style={[
              styles.input,
              error && styles.errorInput,
            ]}
            value={value ?? ""}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor="#A0AAA5"
            {...inputProps}
          />

          {error && (
            <Text style={styles.errorText}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    paddingHorizontal: 15,
    backgroundColor: colors.surface,
    color: colors.ink,
  },

  errorInput: {
    borderColor: colors.danger,
  },

  errorText: {
    color: colors.danger,
    fontSize: 11,
    marginTop: 5,
  },
});