import React, { useState } from "react";
import { Text, View, Alert, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Screen } from "../../components/Screen";
import { Brand } from "../../components/Brand";
import { PageHeading } from "../../components/PageHeading";
import { Field } from "../../components/Field";
import { PrimaryButton } from "../../components/PrimaryButton";
import { colors } from "../../constants/theme";

export default function VerifyEmailScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verify = () => {
    if (!/^\d{6}$/.test(otp)) return Alert.alert("Invalid code", "Enter the 6-digit verification code.");
    setLoading(true);
    // TODO: POST /auth/verify-email with email and OTP.
    setTimeout(() => { setLoading(false); router.replace("/(auth)/create-pin"); }, 350);
  };

  return (
    <Screen>
      <Brand />
      <PageHeading title="Verify your email" subtitle={`We sent a 6-digit verification code to ${email || "your email address"}.`} />
      <Field label="Verification code" value={otp} onChangeText={setOtp} placeholder="000000" keyboardType="number-pad" maxLength={6} />
      <Text style={styles.note}>The code should expire after a short period. Request a new one if it expires.</Text>
      <PrimaryButton title="Verify email" onPress={verify} loading={loading} />
      <View style={styles.resend}><Text style={styles.muted}>Didn’t receive a code? </Text><Text style={styles.link} onPress={() => Alert.alert("Resend code", "Connect this action to your resend verification endpoint.")}>Resend code</Text></View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  note: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: -4, marginBottom: 22 },
  resend: { flexDirection: "row", justifyContent: "center", marginTop: 22 },
  muted: { color: colors.muted, fontSize: 13 },
  link: { color: colors.green, fontSize: 13, fontWeight: "800" },
});
