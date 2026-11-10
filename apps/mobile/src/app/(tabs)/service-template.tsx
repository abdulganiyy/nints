import React, { useState } from "react";
import { Text, Alert, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Screen } from "../../components/Screen";
import { PageHeading } from "../../components/PageHeading";
import { Field } from "../../components/Field";
import { PrimaryButton } from "../../components/PrimaryButton";
import { colors } from "../../constants/theme";

export default function ServiceTemplate({ service = "Payment" }: { service?: string }) {
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!customer.trim() || !amount.trim() || Number(amount) <= 0) {
      return Alert.alert("Check your details", "Enter the required customer details and a valid amount.");
    }
    setLoading(true);
    // TODO: fetch plans/validate customer, show confirmation, then submit transaction.
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Demo only", "Connect this screen to your bill-payment API before processing real payments.");
    }, 350);
  };

  return (
    <Screen>
      <Text style={styles.back} onPress={() => router.back()}>‹  Back</Text>
      <PageHeading title={service} subtitle="Enter the details below. Review the information carefully before confirming a payment." />
      <Field label="Phone number / Customer ID" value={customer} onChangeText={setCustomer} placeholder="Enter phone number or smart-card/meter number" keyboardType="default" />
      <Field label="Amount (NGN)" value={amount} onChangeText={setAmount} placeholder="0.00" keyboardType="decimal-pad" />
      <Text style={styles.notice}>You will see the applicable fees and a final confirmation before any transaction is submitted.</Text>
      <PrimaryButton title="Continue" onPress={submit} loading={loading} />
    </Screen>
  );
}
const styles = StyleSheet.create({
  back: { color: colors.green, fontWeight: "800", fontSize: 14, marginTop: 12 },
  notice: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 0, marginBottom: 22 },
});
