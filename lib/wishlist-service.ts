import type {
  WishlistItem,
  AddToWishlistRequest,
  PaginatedWishlistResponse,
  ApiResponse,
} from '@/types/wishlist';
import { TokenManager } from './token-manager';

const AUTH_SCHEME = (process.env.NEXT_PUBLIC_AUTH_SCHEME || 'Bearer').trim();

class WishlistService {
  private baseUrl: string;
  private defaultTimeoutMs = 12000;
  private defaultRetries = 2;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    { timeoutMs, retries }: { timeoutMs?: number; retries?: number } = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Add Authorization header with access token if available
    const accessToken = TokenManager.getAccessToken();
    if (accessToken) {
      defaultHeaders['Authorization'] = `${AUTH_SCHEME} ${accessToken}`;
    }
    
    const maxRetries = retries ?? this.defaultRetries;
    const timeout = timeoutMs ?? this.defaultTimeoutMs;

    let attempt = 0;
    while (attempt <= maxRetries) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            ...defaultHeaders,
            ...options.headers,
          },
          credentials: 'include',
          signal: controller.signal,
        });
        clearTimeout(timer);

        let data: any = null;
        try {
          data = await response.json();
        } catch (_e) {
          data = null;
        }

        if (!response.ok) {
          return {
            success: false,
            error: {
              message:
                (data && (data.message || data.detail)) ||
                `خطا ${response.status}: عملیات ناموفق بود`,
              errors: (data && data.errors) || data || undefined,
            },
          };
        }

        return { success: true, data } as ApiResponse<T>;
      } catch (error: any) {
        clearTimeout(timer);
        const isAbort = error?.name === 'AbortError';
        const isNetwork = /NetworkError|Failed to fetch|EOF|ECONNRESET|ETIMEDOUT/i.test(
          String(error?.message || error)
        );
        const canRetry = attempt < maxRetries && (isAbort || isNetwork);
        if (canRetry) {
          const backoff = 300 * Math.pow(2, attempt);
          await new Promise((r) => setTimeout(r, backoff));
          attempt += 1;
          continue;
        }
        console.error('API request error:', error);
        return {
          success: false,
          error: {
            message: isAbort
              ? 'مهلت پاسخ‌گویی به پایان رسید'
              : 'خطا در برقراری ارتباط با سرور',
          },
        };
      }
    }
    return { success: false, error: { message: 'خطای نامشخص' } };
  }

  /**
   * Get Wishlist
   * GET /lumira/api/v1/catalog/auth/v1/wishlist/
   */
  async getWishlist(
    page?: number,
    pageSize?: number
  ): Promise<ApiResponse<PaginatedWishlistResponse>> {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (pageSize) params.append('page_size', pageSize.toString());

    const query = params.toString();
    return this.request<PaginatedWishlistResponse>(
      `/lumira/api/v1/catalog/auth/v1/wishlist/${query ? `?${query}` : ''}`
    );
  }

  /**
   * Add to Wishlist
   * POST /lumira/api/v1/catalog/auth/v1/wishlist/add/
   */
  async addToWishlist(request: AddToWishlistRequest): Promise<ApiResponse<WishlistItem>> {
    return this.request<WishlistItem>('/lumira/api/v1/catalog/auth/v1/wishlist/add/', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  /**
   * Remove from Wishlist
   * DELETE /lumira/api/v1/catalog/auth/v1/wishlist/{id}/
   */
  async removeFromWishlist(id: number): Promise<ApiResponse<any>> {
    return this.request<any>(`/lumira/api/v1/catalog/auth/v1/wishlist/${id}/`, {
      method: 'DELETE',
    });
  }
}

export const wishlistService = new WishlistService();
