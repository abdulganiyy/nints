import React, { useState } from "react";
import { Text, Alert, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Screen } from "../../components/Screen";
import { Brand } from "../../components/Brand";
import { PageHeading } from "../../components/PageHeading";
import { Field } from "../../components/Field";
import { PrimaryButton } from "../../components/PrimaryButton";
import { colors } from "../../constants/theme";

export default function CreatePinScreen() {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!/^\d{4}$/.test(pin)) return Alert.alert("Invalid PIN", "Your transaction PIN must contain 4 digits.");
    if (pin !== confirmPin) return Alert.alert("PINs do not match", "Enter the same PIN in both fields.");
    setLoading(true);
    // TODO: POST PIN to backend over TLS. Hash server-side; never persist raw PIN locally.
    setTimeout(() => { setLoading(false); router.replace("/(tabs)"); }, 350);
  };

  return (
    <Screen>
      <Brand />
      <PageHeading title="Create your transaction PIN" subtitle="This PIN will help protect transactions made from your NintPay account." />
      <Field label="4-digit PIN" value={pin} onChangeText={setPin} placeholder="••••" keyboardType="number-pad" secureTextEntry maxLength={4} />
      <Field label="Confirm PIN" value={confirmPin} onChangeText={setConfirmPin} placeholder="••••" keyboardType="number-pad" secureTextEntry maxLength={4} />
      <Text style={styles.note}>Do not share your PIN with anyone, including NintPay support.</Text>
      <PrimaryButton title="Create PIN and continue" onPress={submit} loading={loading} />
    </Screen>
  );
}
const styles = StyleSheet.create({
  note: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: -4, marginBottom: 22 },
});
