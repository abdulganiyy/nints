import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Screen } from "../../components/Screen";
import { PrimaryButton } from "../../components/PrimaryButton";
import { colors } from "../../constants/theme";

export default function FinancingScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Non-interest financing</Text>
      <Text style={styles.subtitle}>Explore transparent financing options designed around agreed terms rather than interest-based lending.</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Financing options</Text>
        <Text style={styles.cardText}>Eligible options, amounts, fees, repayment schedules and terms will be displayed here when available.</Text>
      </View>
      <PrimaryButton title="Check eligibility" onPress={() => require("react-native").Alert.alert("Coming soon", "Eligibility checks will be connected to the NintPay financing service.")} />
      <Text style={styles.disclaimer}>Availability is subject to eligibility, assessment and the applicable product agreement.</Text>
    </Screen>
  );
}
const styles = StyleSheet.create({
  title: { color: colors.ink, fontSize: 27, fontWeight: "900", marginTop: 18 },
  subtitle: { color: colors.muted, fontSize: 13, lineHeight: 21, marginTop: 9 },
  card: { backgroundColor: colors.greenLight, borderRadius: 16, padding: 18, marginVertical: 24 },
  cardTitle: { color: colors.ink, fontSize: 16, fontWeight: "900" },
  cardText: { color: colors.muted, fontSize: 12, lineHeight: 19, marginTop: 8 },
  disclaimer: { color: colors.muted, fontSize: 11, lineHeight: 17, marginTop: 18 },
});
