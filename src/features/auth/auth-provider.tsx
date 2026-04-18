import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AuthContext } from "./auth-context-base";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const login = useCallback((email: string) => {
    setUserEmail(email.trim());
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setUserEmail(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      userEmail,
      login,
      logout,
    }),
    [isAuthenticated, userEmail, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
