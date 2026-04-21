import { useMemo, type ReactNode } from "react";
import { AuthContext } from "./auth-context-base";
import { useAuthStore } from "@/stores/auth-store";

/**
 * Bridges the Zustand auth store into React Context so existing components
 * that call useAuth() continue to work without changes.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const logout = useAuthStore((s) => s.logout);

  const value = useMemo(
    () => ({
      user,
      userEmail: user?.email ?? null,
      isAuthenticated,
      isLoading,
      logout,
    }),
    [user, isAuthenticated, isLoading, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
