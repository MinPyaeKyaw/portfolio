import { createContext } from "react";

export type AuthContextValue = {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
