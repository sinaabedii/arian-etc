import type {
  Category,
  CategoryDetail,
  PaginatedResponse,
  ApiResponse,
} from '@/types/category';
import { TokenManager } from './token-manager';

const AUTH_SCHEME = (process.env.NEXT_PUBLIC_AUTH_SCHEME || 'Bearer').trim();

class CategoryService {
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
   * Get Categories List
   * GET /lumira/api/v1/catalog/public/v1/categories/
   */
  async getCategories(params?: {
    page?: number;
    page_size?: number;
  }): Promise<ApiResponse<PaginatedResponse<Category>>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());

    const query = queryParams.toString();
    const endpoint = `/lumira/api/v1/catalog/public/v1/categories/${query ? `?${query}` : ''}`;

    return this.request<PaginatedResponse<Category>>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get Category Detail by Slug
   * GET /lumira/api/v1/catalog/public/v1/categories/{slug}/
   */
  async getCategoryDetail(slug: string): Promise<ApiResponse<CategoryDetail>> {
    return this.request<CategoryDetail>(
      `/lumira/api/v1/catalog/public/v1/categories/${slug}/`,
      {
        method: 'GET',
      }
    );
  }
}

// Export singleton instance
export const categoryService = new CategoryService();
