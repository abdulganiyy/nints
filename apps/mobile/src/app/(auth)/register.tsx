import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Screen } from "../../components/Screen";
import { Brand } from "../../components/Brand";
import { PageHeading } from "../../components/PageHeading";
import { Field } from "../../components/Field";
import { PrimaryButton } from "../../components/PrimaryButton";
import { colors } from "../../constants/theme";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!fullName.trim() || !email.trim() || !phone.trim() || password.length < 8) {
      Alert.alert("Check your details", "Complete all fields. Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    // TODO: POST /auth/register, then route after successful API response.
    setTimeout(() => {
      setLoading(false);
      router.push({ pathname: "/(auth)/verify-email", params: { email } });
    }, 350);
  };

  return (
    <Screen>
      <Brand />
      <PageHeading title="Create your account" subtitle="A few details and you’ll be ready to get started with NintPay." />
      <Field label="Full name" value={fullName} onChangeText={setFullName} placeholder="Enter your full name" autoCapitalize="words" />
      <Field label="Email address" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
      <Field label="Phone number" value={phone} onChangeText={setPhone} placeholder="08012345678" keyboardType="phone-pad" />
      <Field label="Password" value={password} onChangeText={setPassword} placeholder="At least 8 characters" secureTextEntry />
      <Text style={styles.hint}>Use a strong password you do not use on other services.</Text>
      <PrimaryButton title="Create account" onPress={submit} loading={loading} />
      <TouchableOpacity style={styles.bottom} onPress={() => router.replace("/(auth)/login")}>
        <Text style={styles.bottomText}>Already registered? <Text style={styles.link}>Log in</Text></Text>
      </TouchableOpacity>
    </Screen>
  );
}
const styles = StyleSheet.create({
  hint: { color: colors.muted, fontSize: 11, marginTop: -7, marginBottom: 20 },
  bottom: { alignItems: "center", padding: 20 },
  bottomText: { color: colors.muted, fontSize: 13 },
  link: { color: colors.green, fontWeight: "800" },
});
