import { get, post } from '@/lib/axios';
import type { User, AuthTokens, ApiResponse } from '@/types';

// ─── Request Types ─────────────────────────────────────────────────────────────

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}

// ─── Response Types ────────────────────────────────────────────────────────────

export type AuthSessionResponse = ApiResponse<{ user: User; tokens: AuthTokens }>;
export type MeResponse = ApiResponse<User>;

// ─── API ───────────────────────────────────────────────────────────────────────

export const authApi = {
  login:           (data: LoginDto)           => post<AuthSessionResponse>('/auth/login', data),
  register:        (data: RegisterDto)        => post<AuthSessionResponse>('/auth/register', data),
  logout:          ()                         => post<ApiResponse<null>>('/auth/logout'),
  me:              ()                         => get<MeResponse>('/auth/me'),
  forgotPassword:  (data: ForgotPasswordDto)  => post<ApiResponse<null>>('/auth/forgot-password', data),
  resetPassword:   (data: ResetPasswordDto)   => post<ApiResponse<null>>('/auth/reset-password', data),
};
