import React from "react";
import { Text, StyleSheet, Alert } from "react-native";
import { Screen } from "../../components/Screen";
import { PageHeading } from "../../components/PageHeading";
import { PrimaryButton } from "../../components/PrimaryButton";
import { colors } from "../../constants/theme";

export default function FundWalletScreen() {
  return (
    <Screen>
      <Text style={styles.back} onPress={() => require("expo-router").router.back()}>‹  Back</Text>
      <PageHeading title="Fund your wallet" subtitle="Use your NintPay virtual account to transfer money into your wallet." />
      <Text style={styles.label}>BANK</Text><Text style={styles.value}>Your assigned bank</Text>
      <Text style={styles.label}>ACCOUNT NUMBER</Text><Text style={styles.value}>Will appear after account provisioning</Text>
      <Text style={styles.label}>ACCOUNT NAME</Text><Text style={styles.value}>Your verified NintPay account name</Text>
      <Text style={styles.note}>Your personal virtual account details will be loaded securely from the backend.</Text>
      <PrimaryButton title="Refresh account details" onPress={() => Alert.alert("Demo screen", "Connect this button to GET /wallet/virtual-account.")} />
    </Screen>
  );
}
const styles = StyleSheet.create({
  back: { color: colors.green, fontWeight: "800", marginTop: 12 },
  label: { color: colors.muted, fontSize: 10, fontWeight: "900", letterSpacing: 1, marginTop: 18 },
  value: { color: colors.ink, fontSize: 15, fontWeight: "700", marginTop: 6 },
  note: { color: colors.muted, fontSize: 12, lineHeight: 18, marginVertical: 25 },
});
