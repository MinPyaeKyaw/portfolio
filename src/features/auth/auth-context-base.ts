import { createContext } from "react";
import type { AppUser } from "@/types/types";

export type AuthContextValue = {
  user: AppUser | null;
  userEmail: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
