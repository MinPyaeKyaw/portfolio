import type { ApiResponse } from '@/types/types';
import apiClient from '../api-client';
import type {
  AuthResult,
  AuthTokens,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  SignInPayload,
  SignUpPayload,
} from './types';
import type { AppUser } from '@/types/types';

export const signUp = (data: SignUpPayload) =>
  apiClient.post<ApiResponse<AuthResult>>('/api/user-auth/sign-up', data);

export const signIn = (data: SignInPayload) =>
  apiClient.post<ApiResponse<AuthResult>>('/api/user-auth/sign-in', data);

export const refreshTokens = (refreshToken: string) =>
  apiClient.post<ApiResponse<AuthTokens>>(
    '/api/user-auth/refresh-token',
    undefined,
    { headers: { 'x-refresh-token': refreshToken } }
  );

export const getMe = () =>
  apiClient.get<ApiResponse<AppUser>>('/api/user-auth/me');

export const forgotPassword = (data: ForgotPasswordPayload) =>
  apiClient.post<ApiResponse<null>>('/api/user-auth/forgot-password', data);

export const resetPassword = (data: ResetPasswordPayload) =>
  apiClient.post<ApiResponse<null>>('/api/user-auth/reset-password', data);
