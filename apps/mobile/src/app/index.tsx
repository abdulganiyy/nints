import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Screen } from "../components/Screen";
import { Brand } from "../components/Brand";
import { PrimaryButton } from "../components/PrimaryButton";
import { colors } from "../constants/theme";

const features = [
  ["↗", "Airtime & data", "Top up and stay connected"],
  ["⚡", "Pay bills", "Electricity, cable TV and more"],
  ["⇄", "Airtime to cash", "Convert eligible airtime to cash"],
  ["◈", "Ethical financing", "Explore non-interest financing"],
];

export default function WelcomeScreen() {
  return (
    <Screen contentStyle={styles.content}>
      <Brand />
      <View style={styles.hero}>
        <View style={styles.orb} />
        <View style={styles.card}>
          <Text style={styles.eyebrow}>YOUR EVERYDAY FINANCIAL COMPANION</Text>
          <Text style={styles.heroTitle}>Your money.{ "\n" }Your control.</Text>
          <Text style={styles.cardCaption}>SIMPLE • CONVENIENT • TRANSPARENT</Text>
          <View style={styles.cardMark}><Text style={styles.cardMarkText}>N</Text></View>
        </View>
        <View style={styles.float}><Text style={styles.floatText}>✓  Simple and convenient</Text></View>
      </View>

      <View style={styles.intro}>
        <Text style={styles.title}>Welcome to <Text style={{ color: colors.green }}>NintPay</Text></Text>
        <Text style={styles.subtitle}>Manage everyday payments in one place, with clear and convenient financial tools.</Text>
      </View>

      <Text style={styles.section}>Everything you need, in one place</Text>
      <View style={styles.grid}>
        {features.map(([icon, title, desc]) => (
          <View key={title} style={styles.feature}>
            <View style={styles.featureIcon}><Text style={styles.icon}>{icon}</Text></View>
            <Text style={styles.featureTitle}>{title}</Text>
            <Text style={styles.featureDesc}>{desc}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <PrimaryButton title="Create an account" onPress={() => router.push("/(auth)/register")} />
        <TouchableOpacity style={styles.login} onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.loginText}>Already have an account? <Text style={{ color: colors.green, fontWeight: "800" }}>Log in</Text></Text>
        </TouchableOpacity>
        <Text style={styles.terms}>By continuing, you agree to our Terms of Service and Privacy Policy.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 10 },
  hero: { height: 225, marginTop: 28, justifyContent: "center", alignItems: "center" },
  orb: { position: "absolute", width: 210, height: 210, borderRadius: 105, backgroundColor: colors.greenLight },
  card: { width: "92%", height: 178, borderRadius: 22, backgroundColor: colors.ink, padding: 22, justifyContent: "space-between", transform: [{ rotate: "-3deg" }] },
  eyebrow: { color: "#B8D7CA", fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  heroTitle: { color: colors.white, fontSize: 31, lineHeight: 36, fontWeight: "900" },
  cardCaption: { color: "#B8D7CA", fontSize: 9, letterSpacing: 1, fontWeight: "700" },
  cardMark: { position: "absolute", right: 20, bottom: 20, width: 34, height: 34, borderRadius: 12, backgroundColor: colors.green, alignItems: "center", justifyContent: "center" },
  cardMarkText: { color: colors.white, fontSize: 21, fontWeight: "900" },
  float: { position: "absolute", bottom: 0, right: 2, backgroundColor: colors.white, borderRadius: 20, paddingHorizontal: 13, paddingVertical: 9, elevation: 4 },
  floatText: { color: colors.ink, fontSize: 11, fontWeight: "800" },
  intro: { marginTop: 30 },
  title: { color: colors.ink, fontSize: 28, fontWeight: "900", letterSpacing: -0.8 },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 22, marginTop: 10 },
  section: { color: colors.ink, fontSize: 15, fontWeight: "800", marginTop: 26, marginBottom: 13 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  feature: { width: "48%", flexGrow: 1, minHeight: 116, borderWidth: 1, borderColor: colors.border, borderRadius: 14, backgroundColor: colors.surface, padding: 13 },
  featureIcon: { width: 31, height: 31, borderRadius: 9, backgroundColor: colors.greenLight, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  icon: { color: colors.green, fontSize: 17, fontWeight: "800" },
  featureTitle: { color: colors.ink, fontSize: 13, fontWeight: "800" },
  featureDesc: { color: colors.muted, fontSize: 10, lineHeight: 15, marginTop: 4 },
  actions: { marginTop: 24 },
  login: { alignItems: "center", paddingVertical: 17 },
  loginText: { color: colors.muted, fontSize: 13 },
  terms: { textAlign: "center", color: "#9AA69F", fontSize: 10, lineHeight: 15 },
});
