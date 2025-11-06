// Auth related types based on backend API

export interface User {
  id: string | number;
  name: string;
  email: string;
  phone_number?: string;
  national_id?: string;
  role: "admin" | "customer";
  avatar?: string;
  customer_type?: number;
  is_active?: boolean;
  primary_address?: number;
  created_at?: string;
}

export interface LoginRequest {
  national_id: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user?: User;
}

export interface RegisterRequest {
  national_id: string;
  name: string;
  phone_number: string;
  otp_code: string;
  password: string;
  confirm_password: string;
  email: string;
}

export interface RegisterResponse {
  access: string;
  refresh: string;
  user?: User;
}

export interface ResetPasswordRequest {
  phone_number: string;
  otp_code: string;
  new_password: string;
  confirm_password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface SendOTPRequest {
  phone_number: string;
  purpose: 1 | 2; // 1: Registration, 2: Password Reset
}

export interface SendOTPResponse {
  message: string;
  otp_code?: string; // For development/testing only
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface TokenRefreshRequest {
  refresh: string;
}

export interface TokenRefreshResponse {
  access: string;
}

export interface LogoutResponse {
  message: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  detail?: string;
}

export interface ProfileResponse {
  id: number;
  name: string;
  national_id: string;
  phone_number: string;
  email: string;
  customer_type: number;
  is_active: boolean;
  primary_address: number;
  created_at: string;
}

export interface UpdateProfileRequest {
  name: string;
  phone_number: string;
  email: string;
  is_active?: boolean;
  primary_address?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
}
