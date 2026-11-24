import React, { useCallback, useEffect, useState } from "react";

import { AuthContext } from "./auth.context";

import { AuthUser } from "./auth.types";

import { tokenStorage } from "../api/axios";

import { authApi } from "../api/auth.api";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_KEY = "@nintpay/onboarding_completed";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    const accessToken = await tokenStorage.getAccessToken();

    if (!accessToken) {
      setUser(null);
      return;
    }

    const currentUser = await authApi.getMe();

    setUser(currentUser);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const completed = await AsyncStorage.getItem(ONBOARDING_KEY);

        setHasCompletedOnboarding(completed === "true");

        await refreshUser();
      } catch {
        await tokenStorage.clearTokens();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);


    const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
    setHasCompletedOnboarding(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        refreshUser,
        hasCompletedOnboarding,
        completeOnboarding
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
