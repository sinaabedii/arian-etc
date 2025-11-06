import type {
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
  PaginatedResponse,
  ApiResponse,
  WebsiteReview,
  CreateWebsiteReviewRequest,
  WebsiteReviewFilters,
} from '@/types/review';
import { TokenManager } from './token-manager';

const AUTH_SCHEME = (process.env.NEXT_PUBLIC_AUTH_SCHEME || 'Bearer').trim();

class ReviewService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      
      const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      // Add Authorization header with access token if available
      const accessToken = TokenManager.getAccessToken();
      if (accessToken) {
        defaultHeaders['Authorization'] = `${AUTH_SCHEME} ${accessToken}`;
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
        credentials: 'include',
      });

      // Handle 204 No Content
      if (response.status === 204) {
        return { success: true };
      }

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            message: data.message || data.detail || 'خطا در برقراری ارتباط با سرور',
            errors: data.errors || data,
          },
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      console.error('API request error:', error);
      return {
        success: false,
        error: { message: error.message || 'خطا در برقراری ارتباط با سرور' },
      };
    }
  }

  /**
   * Get My Reviews (authenticated)
   * GET /lumira/api/v1/catalog/auth/v1/reviews/
   */
  async getMyReviews(params?: {
    page?: number;
    page_size?: number;
  }): Promise<ApiResponse<PaginatedResponse<Review>>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());

    const query = queryParams.toString();
    const endpoint = `/lumira/api/v1/catalog/auth/v1/reviews/${query ? `?${query}` : ''}`;

    return this.request<PaginatedResponse<Review>>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Create Review (authenticated)
   * POST /lumira/api/v1/catalog/auth/v1/reviews/create/
   */
  async createReview(reviewData: CreateReviewRequest): Promise<ApiResponse<Review>> {
    return this.request<Review>(
      '/lumira/api/v1/catalog/auth/v1/reviews/create/',
      {
        method: 'POST',
        body: JSON.stringify(reviewData),
      }
    );
  }

  /**
   * Update Review (authenticated)
   * PUT /lumira/api/v1/catalog/auth/v1/reviews/{id}/
   */
  async updateReview(id: number, reviewData: UpdateReviewRequest): Promise<ApiResponse<Review>> {
    return this.request<Review>(
      `/lumira/api/v1/catalog/auth/v1/reviews/${id}/`,
      {
        method: 'PUT',
        body: JSON.stringify(reviewData),
      }
    );
  }

  /**
   * Delete Review (authenticated)
   * DELETE /lumira/api/v1/catalog/auth/v1/reviews/{id}/delete/
   */
  async deleteReview(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(
      `/lumira/api/v1/catalog/auth/v1/reviews/${id}/delete/`,
      {
        method: 'DELETE',
      }
    );
  }

  /**
   * Get Product Reviews (public)
   * GET /lumira/api/v1/catalog/public/v1/reviews/?product={product_id}
   */
  async getProductReviews(productId: number, params?: {
    page?: number;
    page_size?: number;
  }): Promise<ApiResponse<PaginatedResponse<Review>>> {
    const queryParams = new URLSearchParams();
    queryParams.append('product', productId.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());

    const query = queryParams.toString();
    const endpoint = `/lumira/api/v1/catalog/public/v1/reviews/${query ? `?${query}` : ''}`;

    return this.request<PaginatedResponse<Review>>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Create Product Review (authenticated)
   * POST /lumira/api/v1/catalog/auth/v1/reviews/create/
   */
  async createProductReview(productId: number, reviewData: Omit<CreateReviewRequest, 'product'>): Promise<ApiResponse<Review>> {
    return this.request<Review>(
      '/lumira/api/v1/catalog/auth/v1/reviews/create/',
      {
        method: 'POST',
        body: JSON.stringify({
          ...reviewData,
          product: productId,
        }),
      }
    );
  }

  /**
   * Get Website Reviews (public)
   * GET /lumira/api/v1/contacts/public/v1/website-reviews/
   */
  async getWebsiteReviews(filters?: WebsiteReviewFilters): Promise<ApiResponse<PaginatedResponse<WebsiteReview>>> {
    const queryParams = new URLSearchParams();
    
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.rating) queryParams.append('rating', filters.rating.toString());
    if (filters?.featured !== undefined) queryParams.append('featured', filters.featured.toString());
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.page_size) queryParams.append('page_size', filters.page_size.toString());

    const query = queryParams.toString();
    const endpoint = `/lumira/api/v1/contacts/public/v1/website-reviews/${query ? `?${query}` : ''}`;

    return this.request<PaginatedResponse<WebsiteReview>>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get Website Review Detail (public)
   * GET /lumira/api/v1/contacts/public/v1/website-reviews/{id}/
   */
  async getWebsiteReviewDetail(id: number): Promise<ApiResponse<WebsiteReview>> {
    return this.request<WebsiteReview>(
      `/lumira/api/v1/contacts/public/v1/website-reviews/${id}/`,
      {
        method: 'GET',
      }
    );
  }

  /**
   * Create Website Review (authenticated)
   * POST /lumira/api/v1/contacts/public/v1/website-reviews/create/
   */
  async createWebsiteReview(reviewData: CreateWebsiteReviewRequest): Promise<ApiResponse<WebsiteReview>> {
    return this.request<WebsiteReview>(
      '/lumira/api/v1/contacts/public/v1/website-reviews/create/',
      {
        method: 'POST',
        body: JSON.stringify(reviewData),
      }
    );
  }
}

// Export singleton instance
export const reviewService = new ReviewService();
