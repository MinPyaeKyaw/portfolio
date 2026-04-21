import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppUser } from '@/types/types';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: AppUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setUser: (user: AppUser) => void;
  setLoading: (loading: boolean) => void;
  login: (payload: {
    accessToken: string;
    refreshToken: string;
    user: AppUser;
  }) => void;
  logout: () => void;
  reset: () => void;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,

      setAccessToken: (token) =>
        set({ accessToken: token }),

      setRefreshToken: (token) =>
        set({ refreshToken: token }),

      setUser: (user) =>
        set({ user, isAuthenticated: true }),

      setLoading: (loading) =>
        set({ isLoading: loading }),

      login: ({ accessToken, refreshToken, user }) =>
        set({ accessToken, refreshToken, user, isAuthenticated: true }),

      logout: () =>
        set({ ...initialState }),

      reset: () =>
        set({ ...initialState }),
    }),
    {
      name: 'myanhon-auth',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
