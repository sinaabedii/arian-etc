import type {
  Product,
  ProductDetail,
  ProductFilters,
  PaginatedResponse,
  ApiResponse,
} from '@/types/product';
import { TokenManager } from './token-manager';

const AUTH_SCHEME = (process.env.NEXT_PUBLIC_AUTH_SCHEME || 'Bearer').trim();

class ProductService {
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
          // Non-JSON response
          data = null;
        }

        if (!response.ok) {
          return {
            success: false,
            error: {
              message:
                (data && (data.message || data.detail)) ||
                `خطا ${response.status}: عدم موفقیت در برقراری ارتباط با سرور`,
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
          // Exponential backoff
          const backoff = 300 * Math.pow(2, attempt);
          await new Promise((r) => setTimeout(r, backoff));
          attempt += 1;
          continue;
        }
        console.error('API request error:', error);
        return {
          success: false,
          error: {
            message:
              (isAbort
                ? 'مهلت پاسخ‌گویی سرور به پایان رسید. لطفاً مجدداً تلاش کنید.'
                : 'خطا در برقراری ارتباط با سرور. لطفاً اتصال اینترنت یا سرور را بررسی کنید.') +
              (attempt ? ` (تلاش‌ها: ${attempt + 1})` : ''),
          },
        };
      }
    }
    // Fallback; should not reach
    return { success: false, error: { message: 'خطای نامشخص در ارتباط با سرور' } };
  }

  /**
   * Get Products List with Filters
   * GET /lumira/api/v1/catalog/public/v1/products/
   */
  async getProducts(filters?: ProductFilters): Promise<ApiResponse<PaginatedResponse<Product>>> {
    const queryParams = new URLSearchParams();
    
    if (filters?.brand) queryParams.append('brand', filters.brand);
    if (filters?.category) queryParams.append('category', filters.category.toString());
    if (filters?.category_slug) queryParams.append('category_slug', filters.category_slug);
    if (filters?.is_featured !== undefined) queryParams.append('is_featured', filters.is_featured.toString());
    if (filters?.max_price) queryParams.append('max_price', filters.max_price.toString());
    if (filters?.min_price) queryParams.append('min_price', filters.min_price.toString());
    if (filters?.ordering) queryParams.append('ordering', filters.ordering);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.page_size) queryParams.append('page_size', filters.page_size.toString());
    if (filters?.search) queryParams.append('search', filters.search);
    if (filters?.stock_status) queryParams.append('stock_status', filters.stock_status.toString());

    const query = queryParams.toString();
    const endpoint = `/lumira/api/v1/catalog/public/v1/products/${query ? `?${query}` : ''}`;

    return this.request<PaginatedResponse<Product>>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get Product Detail by Slug
   * GET /lumira/api/v1/catalog/public/v1/products/{slug}/
   */
  async getProductDetail(slug: string): Promise<ApiResponse<ProductDetail>> {
    return this.request<ProductDetail>(
      `/lumira/api/v1/catalog/public/v1/products/${slug}/`,
      {
        method: 'GET',
      }
    );
  }

  /**
   * Get Related Products
   * GET /lumira/api/v1/catalog/public/v1/products/{slug}/related/
   */
  async getRelatedProducts(slug: string): Promise<ApiResponse<Product[]>> {
    return this.request<Product[]>(
      `/lumira/api/v1/catalog/public/v1/products/${slug}/related/`,
      {
        method: 'GET',
      }
    );
  }

  /**
   * Get Featured Products
   * GET /lumira/api/v1/catalog/public/v1/products/featured/
   */
  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    return this.request<Product[]>(
      '/lumira/api/v1/catalog/public/v1/products/featured/',
      {
        method: 'GET',
      }
    );
  }

  /**
   * Get Latest Products
   * GET /lumira/api/v1/catalog/public/v1/products/latest/
   */
  async getLatestProducts(): Promise<ApiResponse<Product[]>> {
    return this.request<Product[]>(
      '/lumira/api/v1/catalog/public/v1/products/latest/',
      {
        method: 'GET',
      }
    );
  }
}

// Export singleton instance
export const productService = new ProductService();
