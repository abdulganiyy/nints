import React from "react";

import { Redirect, Slot, useSegments } from "expo-router";

import { ActivityIndicator, View } from "react-native";

import { useAuthContext } from "./auth.context";

export function AuthGuard() {
  const {
    isAuthenticated,
    isLoading,
  } = useAuthContext();

  const segments = useSegments();

  const inAuthGroup = segments[0] === "(auth)";

  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <ActivityIndicator size="large" color="#009966" />
      </View>
    );
  }

  if (!isAuthenticated && !inAuthGroup) {
    return <Redirect href="/(auth)/login" />;
  }

  if (isAuthenticated && inAuthGroup) {
    return <Redirect href="/(tabs)" />;
  }

  return <Slot />;
}