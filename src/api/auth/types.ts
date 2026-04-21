import type { AppUser } from '@/types/types';

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
  redirectTo?: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult extends AuthTokens {
  user: AppUser;
}

export interface GoogleAuthUrlPayload {
  callbackURL?: string;
}

export interface GoogleAuthUrlResult {
  url: string;
}
