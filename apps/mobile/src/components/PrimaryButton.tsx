import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from "react-native";
import { colors } from "../constants/theme";

export function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
}: {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, (disabled || loading) && styles.disabled, style]}
    >
      {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 54, backgroundColor: colors.green, borderRadius: 14, alignItems: "center", justifyContent: "center", paddingHorizontal: 18 },
  disabled: { opacity: 0.55 },
  text: { color: colors.white, fontSize: 15, fontWeight: "800" },
});
