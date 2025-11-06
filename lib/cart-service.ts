import type {
  Cart,
  AddToCartRequest,
  UpdateCartItemRequest,
  ApplyCouponRequest,
  CartResponse,
  PaginatedCartResponse,
} from '@/types/cart';
import { TokenManager } from './token-manager';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    errors?: any;
  };
}

const AUTH_SCHEME = (process.env.NEXT_PUBLIC_AUTH_SCHEME || 'Bearer').trim();

class CartService {
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
   * Get My Cart
   * GET /lumira/api/v1/carts/auth/v1/cart/
   */
  async getCart(page?: number, pageSize?: number): Promise<ApiResponse<PaginatedCartResponse>> {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (pageSize) params.append('page_size', pageSize.toString());

    const query = params.toString();
    return this.request<PaginatedCartResponse>(
      `/lumira/api/v1/carts/auth/v1/cart/${query ? `?${query}` : ''}`
    );
  }

  /**
   * Add Product to Cart
   * POST /lumira/api/v1/carts/auth/v1/cart/add/
   */
  async addToCart(request: AddToCartRequest): Promise<ApiResponse<any>> {
    return this.request<any>('/lumira/api/v1/carts/auth/v1/cart/add/', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  /**
   * Clear Cart
   * POST /lumira/api/v1/carts/auth/v1/cart/clear/
   */
  async clearCart(): Promise<ApiResponse<any>> {
    return this.request<any>('/lumira/api/v1/carts/auth/v1/cart/clear/', {
      method: 'POST',
    });
  }

  /**
   * Apply Discount Coupon
   * POST /lumira/api/v1/carts/auth/v1/cart/coupon/apply/
   */
  async applyCoupon(request: ApplyCouponRequest): Promise<ApiResponse<any>> {
    return this.request<any>('/lumira/api/v1/carts/auth/v1/cart/coupon/apply/', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  /**
   * Remove Coupon
   * POST /lumira/api/v1/carts/auth/v1/cart/coupon/remove/
   */
  async removeCoupon(): Promise<ApiResponse<any>> {
    return this.request<any>('/lumira/api/v1/carts/auth/v1/cart/coupon/remove/', {
      method: 'POST',
    });
  }

  /**
   * Update Cart Item Quantity
   * PATCH /lumira/api/v1/carts/auth/v1/cart/items/{item_id}/
   */
  async updateCartItem(
    itemId: number,
    request: UpdateCartItemRequest
  ): Promise<ApiResponse<any>> {
    return this.request<any>(`/lumira/api/v1/carts/auth/v1/cart/items/${itemId}/`, {
      method: 'PATCH',
      body: JSON.stringify(request),
    });
  }

  /**
   * Remove Item from Cart
   * DELETE /lumira/api/v1/carts/auth/v1/cart/items/{item_id}/remove/
   */
  async removeCartItem(itemId: number): Promise<ApiResponse<any>> {
    return this.request<any>(`/lumira/api/v1/carts/auth/v1/cart/items/${itemId}/remove/`, {
      method: 'DELETE',
    });
  }
}

export const cartService = new CartService();
