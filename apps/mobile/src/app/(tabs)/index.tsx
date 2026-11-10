import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../components/Screen";
import { colors } from "../../constants/theme";

const services = [
  { title: "Airtime", icon: "phone-portrait-outline", route: "/(tabs)/airtime" },
  { title: "Data", icon: "wifi-outline", route: "/(tabs)/data" },
  { title: "Electricity", icon: "flash-outline", route: "/(tabs)/electricity" },
  { title: "Cable TV", icon: "tv-outline", route: "/(tabs)/cable-tv" },
];

export default function DashboardScreen() {
  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.top}>
        <View><Text style={styles.greeting}>Good day,</Text><Text style={styles.name}>Welcome to NintPay</Text></View>
        <TouchableOpacity style={styles.avatar} onPress={() => router.push("/(tabs)/profile")}><Ionicons name="person-outline" size={21} color={colors.green} /></TouchableOpacity>
      </View>

      <View style={styles.balanceCard}>
        <View style={styles.balanceTop}><Text style={styles.balanceLabel}>WALLET BALANCE</Text><Ionicons name="eye-outline" size={20} color="#C6E8D9" /></View>
        <Text style={styles.balance}>₦ 0.00</Text>
        <View style={styles.walletBottom}><Text style={styles.walletCaption}>NGN WALLET</Text><Text style={styles.walletCaption}>••••  ••••</Text></View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.action} onPress={() => router.push("/(tabs)/fund-wallet")}><View style={styles.actionIcon}><Ionicons name="add" size={22} color={colors.green} /></View><Text style={styles.actionText}>Add money</Text></TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => router.push("/(tabs)/transactions")}><View style={styles.actionIcon}><Ionicons name="time-outline" size={22} color={colors.green} /></View><Text style={styles.actionText}>History</Text></TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => router.push("/(tabs)/financing")}><View style={styles.actionIcon}><Ionicons name="wallet-outline" size={22} color={colors.green} /></View><Text style={styles.actionText}>Financing</Text></TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}><Text style={styles.section}>Pay for services</Text><Text style={styles.seeAll}>View all</Text></View>
      <View style={styles.serviceGrid}>
        {services.map((s) => (
          <TouchableOpacity key={s.title} style={styles.service} onPress={() => router.push(s.route as any)}>
            <View style={styles.serviceIcon}><Ionicons name={s.icon as any} size={23} color={colors.green} /></View>
            <Text style={styles.serviceTitle}>{s.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionHeader}><Text style={styles.section}>Recent activity</Text><TouchableOpacity onPress={() => router.push("/(tabs)/transactions")}><Text style={styles.seeAll}>See all</Text></TouchableOpacity></View>
      <View style={styles.empty}><View style={styles.emptyIcon}><Ionicons name="receipt-outline" size={24} color={colors.green} /></View><Text style={styles.emptyTitle}>No transactions yet</Text><Text style={styles.emptyText}>Your payments and wallet activity will appear here.</Text></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 12 },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 22 },
  greeting: { color: colors.muted, fontSize: 13 },
  name: { color: colors.ink, fontSize: 19, fontWeight: "900", marginTop: 3 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.greenLight, alignItems: "center", justifyContent: "center" },
  balanceCard: { backgroundColor: colors.ink, borderRadius: 20, padding: 21, minHeight: 158 },
  balanceTop: { flexDirection: "row", justifyContent: "space-between" },
  balanceLabel: { color: "#B8D7CA", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  balance: { color: colors.white, fontSize: 32, fontWeight: "900", marginTop: 16 },
  walletBottom: { flexDirection: "row", justifyContent: "space-between", marginTop: 17 },
  walletCaption: { color: "#B8D7CA", fontSize: 10, fontWeight: "700" },
  actionRow: { flexDirection: "row", justifyContent: "space-around", marginVertical: 22 },
  action: { alignItems: "center", gap: 7 },
  actionIcon: { width: 49, height: 49, borderRadius: 16, backgroundColor: colors.greenLight, alignItems: "center", justifyContent: "center" },
  actionText: { color: colors.ink, fontSize: 11, fontWeight: "700" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 13, marginTop: 8 },
  section: { color: colors.ink, fontSize: 16, fontWeight: "900" },
  seeAll: { color: colors.green, fontSize: 12, fontWeight: "800" },
  serviceGrid: { flexDirection: "row", flexWrap: "wrap", gap: 11, marginBottom: 23 },
  service: { width: "48%", flexGrow: 1, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 15, padding: 15, minHeight: 100, justifyContent: "center" },
  serviceIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.greenLight, alignItems: "center", justifyContent: "center", marginBottom: 9 },
  serviceTitle: { color: colors.ink, fontSize: 13, fontWeight: "800" },
  empty: { alignItems: "center", padding: 25, borderWidth: 1, borderColor: colors.border, borderRadius: 16, backgroundColor: colors.surface },
  emptyIcon: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.greenLight, alignItems: "center", justifyContent: "center", marginBottom: 10 },
  emptyTitle: { color: colors.ink, fontWeight: "800", fontSize: 14 },
  emptyText: { color: colors.muted, fontSize: 11, textAlign: "center", marginTop: 5, lineHeight: 17 },
});
