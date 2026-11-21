import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryProvider } from "../providers/query.provider";

import { AuthProvider } from "../auth/auth.provider";

import { AuthGuard } from "../auth/auth.guard";


export default function RootLayout() {
  return (
    <>
    <QueryProvider>
      <AuthProvider>
      <StatusBar style="dark" />
        <AuthGuard />
      </AuthProvider>
      </QueryProvider>
    </>
  );
}
