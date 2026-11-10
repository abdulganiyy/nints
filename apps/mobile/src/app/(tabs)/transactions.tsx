import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../components/Screen";
import { colors } from "../../constants/theme";

export default function TransactionsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Activity</Text>
      <Text style={styles.subtitle}>Keep track of your wallet and payments.</Text>
      <View style={styles.filters}><Text style={styles.filterActive}>All</Text><Text style={styles.filter}>Money in</Text><Text style={styles.filter}>Money out</Text></View>
      <View style={styles.empty}>
        <View style={styles.icon}><Ionicons name="receipt-outline" size={26} color={colors.green} /></View>
        <Text style={styles.emptyTitle}>Nothing to show yet</Text>
        <Text style={styles.emptyText}>When you make a payment or receive money, it will show up here.</Text>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  title: { color: colors.ink, fontSize: 27, fontWeight: "900", marginTop: 18 },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: 7 },
  filters: { flexDirection: "row", gap: 10, marginTop: 25, marginBottom: 20 },
  filterActive: { color: colors.white, backgroundColor: colors.green, overflow: "hidden", borderRadius: 20, paddingHorizontal: 17, paddingVertical: 9, fontSize: 12, fontWeight: "800" },
  filter: { color: colors.muted, backgroundColor: colors.surface, overflow: "hidden", borderRadius: 20, paddingHorizontal: 17, paddingVertical: 9, fontSize: 12, fontWeight: "700" },
  empty: { flex: 1, minHeight: 330, alignItems: "center", justifyContent: "center", paddingHorizontal: 30 },
  icon: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.greenLight, alignItems: "center", justifyContent: "center", marginBottom: 14 },
  emptyTitle: { color: colors.ink, fontWeight: "900", fontSize: 16 },
  emptyText: { color: colors.muted, textAlign: "center", fontSize: 12, lineHeight: 18, marginTop: 7 },
});
