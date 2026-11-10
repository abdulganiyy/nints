import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "../constants/theme";

export function PageHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { marginTop: 28, marginBottom: 26 },
  title: { color: colors.ink, fontSize: 28, lineHeight: 34, fontWeight: "900", letterSpacing: -0.8 },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 9 },
});
