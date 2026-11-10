import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/theme";

export function Brand() {
  return (
    <View style={styles.row}>
      <View style={styles.logo}><Text style={styles.n}>N</Text></View>
      <Text style={styles.word}>nintpay</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 9 },
  logo: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.green, alignItems: "center", justifyContent: "center" },
  n: { color: colors.white, fontWeight: "900", fontSize: 23 },
  word: { color: colors.ink, fontSize: 22, fontWeight: "800", letterSpacing: -0.8 },
});
