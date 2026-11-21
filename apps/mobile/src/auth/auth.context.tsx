import { createContext, useContext } from "react";

import { AuthUser } from "./auth.types";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  hasCompletedOnboarding:boolean;
}

export const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside AuthProvider"
    );
  }

  return context;
}