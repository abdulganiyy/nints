import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../components/Screen";
import { colors } from "../../constants/theme";

const rows = [
  ["person-outline", "Personal information"],
  ["shield-checkmark-outline", "Security and PIN"],
  ["notifications-outline", "Notifications"],
  ["help-circle-outline", "Help and support"],
  ["document-text-outline", "Terms and privacy"],
] as const;

export default function ProfileScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.userCard}>
        <View style={styles.avatar}><Ionicons name="person-outline" size={26} color={colors.green} /></View>
        <View><Text style={styles.name}>NintPay User</Text><Text style={styles.email}>user@example.com</Text></View>
      </View>
      <Text style={styles.section}>ACCOUNT SETTINGS</Text>
      {rows.map(([icon, label]) => (
        <TouchableOpacity key={label} style={styles.row} onPress={() => Alert.alert(label, "Connect this option to the relevant account screen.")}>
          <Ionicons name={icon} size={20} color={colors.green} />
          <Text style={styles.rowText}>{label}</Text>
          <Ionicons name="chevron-forward" size={18} color="#A0AAA5" />
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.logout} onPress={() => router.replace("/(auth)/login")}>
        <Ionicons name="log-out-outline" size={19} color={colors.danger} />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
      <Text style={styles.version}>NintPay • Version 1.0.0</Text>
    </Screen>
  );
}
const styles = StyleSheet.create({
  title: { color: colors.ink, fontSize: 27, fontWeight: "900", marginTop: 18, marginBottom: 22 },
  userCard: { flexDirection: "row", alignItems: "center", gap: 13, padding: 17, borderRadius: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, marginBottom: 28 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.greenLight, alignItems: "center", justifyContent: "center" },
  name: { color: colors.ink, fontSize: 15, fontWeight: "900" },
  email: { color: colors.muted, fontSize: 12, marginTop: 4 },
  section: { color: colors.muted, fontSize: 10, fontWeight: "900", letterSpacing: 1, marginBottom: 9 },
  row: { flexDirection: "row", alignItems: "center", gap: 13, paddingVertical: 17, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowText: { color: colors.ink, fontSize: 13, fontWeight: "700", flex: 1 },
  logout: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 19, marginTop: 12 },
  logoutText: { color: colors.danger, fontWeight: "800", fontSize: 13 },
  version: { textAlign: "center", color: "#A0AAA5", fontSize: 10, marginTop: 18 },
});
