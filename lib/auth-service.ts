// Authentication service for backend API communication

import { TokenManager } from './token-manager';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SendOTPRequest,
  SendOTPResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  TokenRefreshResponse,
  LogoutResponse,
  ProfileResponse,
  UpdateProfileRequest,
  ApiResponse,
  ApiError,
} from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://172.20.20.66:8088';
const AUTH_SCHEME = (process.env.NEXT_PUBLIC_AUTH_SCHEME || 'Bearer').trim();
const AUTH_USE_COOKIES = String(process.env.NEXT_PUBLIC_AUTH_USE_COOKIES || 'false').toLowerCase() === 'true';

class AuthService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Get cookie value by name
   */
  private getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      return cookieValue || null;
    }
    return null;
  }

  /**
   * Generic request handler with error handling
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;

      const makeConfig = (): RequestInit => {
        const defaultHeaders: HeadersInit = {
          'Content-Type': 'application/json',
        };
        
        // Get CSRF token from cookie and add to headers
        const csrfToken = this.getCookie('csrftoken');
        if (csrfToken) {
          defaultHeaders['X-CSRFToken'] = csrfToken;
        }
        
        // Add Authorization header with access token if available
        const accessToken = TokenManager.getAccessToken();
        if (accessToken) {
          defaultHeaders['Authorization'] = `${AUTH_SCHEME} ${accessToken}`;
        } else {
        }
        
        const base: RequestInit = {
          ...options,
          headers: {
            ...defaultHeaders,
            ...options.headers,
          },
          credentials: 'include', // Always include cookies
        };
        return base;
      };

      const tryFetch = async (config: RequestInit) => {
        const response = await fetch(url, config);
        let data: any = null;
        try {
          data = await response.json();
        } catch {
          // ignore json parse errors (empty body)
        }
        return { response, data };
      };

      let { response, data } = await tryFetch(makeConfig());

      // If unauthorized on a protected endpoint, try to refresh once
      if (response.status === 401 && !endpoint.includes('/public/')) {
        const refreshed = await this.refreshToken();
        if (refreshed.success) {
          ({ response, data } = await tryFetch(makeConfig()));
        } else {
          // Clear user data on refresh failure
          TokenManager.clearAll();
        }
      }

      if (!response.ok) {
        const error: ApiError = {
          message: (data && (data.message || data.detail)) || 'خطایی رخ داده است',
          errors: data?.errors,
          detail: data?.detail,
        };
        return { success: false, error };
      }

      return { success: true, data };
    } catch (error: any) {
      console.error('API request error:', error);
      return {
        success: false,
        error: { message: error.message || 'خطا در برقراری ارتباط با سرور' },
      };
    }
  }

  /**
   * Login user
   * POST /lumira/api/v1/customers/public/v1/login/
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>(
      '/lumira/api/v1/customers/public/v1/login/',
      {
        method: 'POST',
        body: JSON.stringify(credentials),
      }
    );

    // Store tokens and user data if login successful
    if (response.success && response.data) {
      // Store access and refresh tokens
      if (response.data.access) {
        TokenManager.setAccessToken(response.data.access, false);
      }
      if (response.data.refresh) {
        TokenManager.setRefreshToken(response.data.refresh, false);
      }
      
      // Try to get full profile data
      const profileResponse = await this.getProfile();
      if (profileResponse.success && profileResponse.data) {
        TokenManager.setUserData(profileResponse.data, false);
      } else {
        // Fallback to response data if profile fails
        const anyData: any = response.data as any;
        const user = anyData.user || anyData.profile || anyData;
        if (user && user.id) {
          TokenManager.setUserData(user, false);
        }
      }
    }

    return response;
  }

  /**
   * Register new user
   * POST /lumira/api/v1/customers/public/v1/register/
   */
  async register(userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    const response = await this.request<RegisterResponse>(
      '/lumira/api/v1/customers/public/v1/register/',
      {
        method: 'POST',
        body: JSON.stringify(userData),
      }
    );

    // Store tokens and user data if registration successful
    if (response.success && response.data) {
      // Store access and refresh tokens
      if (response.data.access) {
        TokenManager.setAccessToken(response.data.access, false);
      }
      if (response.data.refresh) {
        TokenManager.setRefreshToken(response.data.refresh, false);
      }
      
      const anyData: any = response.data as any;
      const user = anyData.user || anyData.profile || anyData;
      if (user && user.id) {
        TokenManager.setUserData(user, false);
      }
    }

    return response;
  }

  /**
   * Send OTP code
   * POST /lumira/api/v1/customers/public/v1/send-otp/
   */
  async sendOTP(otpData: SendOTPRequest): Promise<ApiResponse<SendOTPResponse>> {
    return this.request<SendOTPResponse>(
      '/lumira/api/v1/customers/public/v1/send-otp/',
      {
        method: 'POST',
        body: JSON.stringify(otpData),
      }
    );
  }

  /**
   * Reset password
   * POST /lumira/api/v1/customers/public/v1/reset-password/
   */
  async resetPassword(resetData: ResetPasswordRequest): Promise<ApiResponse<ResetPasswordResponse>> {
    return this.request<ResetPasswordResponse>(
      '/lumira/api/v1/customers/public/v1/reset-password/',
      {
        method: 'POST',
        body: JSON.stringify(resetData),
      }
    );
  }

  /**
   * Change password (authenticated)
   * POST /lumira/api/v1/customers/auth/v1/change-password/
   */
  async changePassword(passwordData: ChangePasswordRequest): Promise<ApiResponse<ChangePasswordResponse>> {
    return this.request<ChangePasswordResponse>(
      '/lumira/api/v1/customers/auth/v1/change-password/',
      {
        method: 'POST',
        body: JSON.stringify(passwordData),
      }
    );
  }

  /**
   * Refresh access token
   * POST /lumira/api/v1/customers/public/v1/token/refresh/
   */
  async refreshToken(): Promise<ApiResponse<TokenRefreshResponse>> {
    const refreshToken = TokenManager.getRefreshToken();
    
    const response = await this.request<TokenRefreshResponse>(
      '/lumira/api/v1/customers/public/v1/token/refresh/',
      {
        method: 'POST',
        body: JSON.stringify({ refresh: refreshToken || '' }),
      }
    );

    // Store new access token if refresh successful
    if (response.success && response.data?.access) {
      TokenManager.setAccessToken(response.data.access, false);
    }

    return response;
  }

  /**
   * Logout user
   * POST /lumira/api/v1/customers/auth/v1/logout/
   */
  async logout(): Promise<ApiResponse<LogoutResponse>> {
    const response = await this.request<LogoutResponse>(
      '/lumira/api/v1/customers/auth/v1/logout/',
      {
        method: 'POST',
      }
    );

    // Clear tokens regardless of response
    TokenManager.clearAll();

    return response;
  }

  /**
   * Check if user is authenticated
   * Since we use cookies, we check if user data exists
   */
  isAuthenticated(): boolean {
    const user = TokenManager.getUserData();
    return user !== null && user.id !== undefined;
  }

  /**
   * Get current user data from storage
   */
  getCurrentUser(): any | null {
    return TokenManager.getUserData();
  }

  /**
   * Auto-refresh token if needed
   * With cookie-based auth, we just try to refresh
   */
  async autoRefreshToken(): Promise<boolean> {
    // Try to get profile to verify session is still valid
    const profileResponse = await this.getProfile();
    
    if (profileResponse.success) {
      // Update user data if we got it
      if (profileResponse.data) {
        const user = TokenManager.getUserData() || {};
        TokenManager.setUserData({ ...user, ...profileResponse.data }, true);
      }
      return true;
    }
    
    // If profile fails, try refresh
    const response = await this.refreshToken();
    return response.success;
  }

  /**
   * Get user profile
   */
  async getProfile(): Promise<ApiResponse<ProfileResponse>> {
    return this.request<ProfileResponse>(
      '/lumira/api/v1/customers/auth/v1/profile/',
      {
        method: 'GET',
      }
    );
  }

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<ProfileResponse>> {
    const response = await this.request<ProfileResponse>(
      '/lumira/api/v1/customers/auth/v1/profile/',
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    // Update stored user data if successful
    if (response.success && response.data) {
      const currentUser = TokenManager.getUserData();
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          name: response.data.name,
          email: response.data.email,
          phone_number: response.data.phone_number,
          national_id: response.data.national_id,
          customer_type: response.data.customer_type,
          is_active: response.data.is_active,
          primary_address: response.data.primary_address,
        };
        TokenManager.setUserData(updatedUser, true);
      }
    }

    return response;
  }
}

// Export singleton instance
export const authService = new AuthService();
