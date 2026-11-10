import React, { useState } from "react";
import { Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Screen } from "../../components/Screen";
import { Brand } from "../../components/Brand";
import { PageHeading } from "../../components/PageHeading";
import { Field } from "../../components/Field";
import { PrimaryButton } from "../../components/PrimaryButton";
import { colors } from "../../constants/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!email.trim() || !password) return Alert.alert("Missing details", "Enter your email and password.");
    setLoading(true);
    // TODO: POST /auth/login and persist the returned access/refresh tokens securely.
    setTimeout(() => { setLoading(false); router.replace("/(tabs)"); }, 350);
  };

  return (
    <Screen>
      <Brand />
      <PageHeading title="Welcome back" subtitle="Log in to continue to your NintPay account." />
      <Field label="Email address" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
      <Field label="Password" value={password} onChangeText={setPassword} placeholder="Enter your password" secureTextEntry />
      <TouchableOpacity style={styles.forgot} onPress={() => Alert.alert("Password reset", "Connect this action to your password-reset flow.")}>
        <Text style={styles.link}>Forgot password?</Text>
      </TouchableOpacity>
      <PrimaryButton title="Log in" onPress={submit} loading={loading} />
      <TouchableOpacity style={styles.bottom} onPress={() => router.push("/(auth)/register")}>
        <Text style={styles.muted}>New to NintPay? <Text style={styles.link}>Create an account</Text></Text>
      </TouchableOpacity>
    </Screen>
  );
}
const styles = StyleSheet.create({
  forgot: { alignSelf: "flex-end", marginTop: -4, marginBottom: 22 },
  link: { color: colors.green, fontWeight: "800", fontSize: 13 },
  bottom: { alignItems: "center", padding: 20 },
  muted: { color: colors.muted, fontSize: 13 },
});
