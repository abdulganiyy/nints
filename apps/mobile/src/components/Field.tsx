import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";
import { colors } from "../constants/theme";

export function Field({
  label,
  error,
  ...props
}: TextInputProps & { label: string; error?: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="#A0AAA5"
        style={[styles.input, error ? styles.invalid : null]}
        {...props}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 16 },
  label: { color: colors.ink, fontWeight: "700", fontSize: 13, marginBottom: 8 },
  input: { height: 54, borderWidth: 1, borderColor: colors.border, borderRadius: 13, paddingHorizontal: 15, color: colors.ink, backgroundColor: colors.surface, fontSize: 15 },
  invalid: { borderColor: colors.danger },
  error: { color: colors.danger, fontSize: 11, marginTop: 5 },
});
