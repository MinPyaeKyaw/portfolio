import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import { authKeys } from './key';
import {
  deleteMyAccount,
  exchangeSession,
  forgotPassword,
  getGoogleAuthUrl,
  getMe,
  resetPassword,
  signIn,
  signUp,
} from './service';
import type {
  ForgotPasswordPayload,
  GoogleAuthUrlPayload,
  ResetPasswordPayload,
  SignInPayload,
  SignUpPayload,
} from './types';

export const useMe = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: authKeys.me,
    queryFn: () => getMe(),
    select: (response) => response.data.data,
    enabled: isAuthenticated,
  });
};

export const useUserSignUp = () => {
  const login = useAuthStore((s) => s.login);
  return useMutation({
    mutationFn: (data: SignUpPayload) => signUp(data),
    onSuccess: (response) => {
      login(response.data.data);
    },
  });
};

export const useUserSignIn = () => {
  const login = useAuthStore((s) => s.login);
  return useMutation({
    mutationFn: (data: SignInPayload) => signIn(data),
    onSuccess: (response) => {
      login(response.data.data);
    },
  });
};

export const useUserSignOut = () => {
  const queryClient = useQueryClient();
  const logout = useAuthStore((s) => s.logout);
  return useMutation({
    mutationFn: async () => {
      logout();
      queryClient.clear();
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const logout = useAuthStore((s) => s.logout);
  return useMutation({
    mutationFn: () => deleteMyAccount(),
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
  });
};

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (data: ForgotPasswordPayload) => forgotPassword(data),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: (data: ResetPasswordPayload) => resetPassword(data),
  });

export const useGoogleAuthUrl = () =>
  useMutation({
    mutationFn: (data?: GoogleAuthUrlPayload) => getGoogleAuthUrl(data),
  });

export const useExchangeSession = () => {
  const login = useAuthStore((s) => s.login);
  return useMutation({
    mutationFn: () => exchangeSession(),
    onSuccess: (response) => {
      login(response.data.data);
    },
  });
};
