import React from "react";

import { Redirect, Slot, usePathname, useSegments } from "expo-router";

import { ActivityIndicator, View } from "react-native";

import { useAuthContext } from "./auth.context";

export function AuthGuard() {
  const { isAuthenticated, isLoading, hasCompletedOnboarding } =
    useAuthContext();

  const pathname = usePathname();
  const segments = useSegments();

  const isWelcomeScreen = pathname === "/";
  const inAuthGroup = segments[0] === "(auth)";
  const inTabsGroup = segments[0] === "(tabs)";

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#009966" />
      </View>
    );
  }

  // First-time user
  if (!hasCompletedOnboarding) {
    if (!isWelcomeScreen) {
      return <Redirect href="/" />;
    }

    return <Slot />;
  }

  // Returning unauthenticated user
  if (!isAuthenticated) {
    if (!inAuthGroup) {
      return <Redirect href="/(auth)/login" />;
    }

    return <Slot />;
  }

  // Authenticated user
  if (!inTabsGroup) {
    return <Redirect href="/(tabs)" />;
  }

  return <Slot />;
}
