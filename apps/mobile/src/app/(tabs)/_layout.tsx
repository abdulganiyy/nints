import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.green,
      tabBarInactiveTintColor: "#98A49E",
      tabBarLabelStyle: { fontSize: 11, fontWeight: "700", paddingBottom: 3 },
      tabBarStyle: { height: 64, paddingTop: 8, borderTopColor: colors.border },
    }}>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="transactions" options={{ title: "Activity", tabBarIcon: ({ color, size }) => <Ionicons name="receipt-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="airtime" options={{ href: null }} />
      <Tabs.Screen name="data" options={{ href: null }} />
      <Tabs.Screen name="electricity" options={{ href: null }} />
      <Tabs.Screen name="cable-tv" options={{ href: null }} />
      <Tabs.Screen name="service-template" options={{ href: null }} />
      <Tabs.Screen name="fund-wallet" options={{ href: null }} />
      <Tabs.Screen name="financing" options={{ href: null }} />
    </Tabs>
  );
}
