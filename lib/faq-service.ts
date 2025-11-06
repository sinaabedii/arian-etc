// FAQ and Contact Service

import type {
  FAQCategory,
  FAQ,
  FAQDetail,
  ContactMessage,
  PaginatedResponse,
  ApiResponse,
} from '@/types/faq';
import { TokenManager } from './token-manager';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://172.20.20.66:8088';
const AUTH_SCHEME = (process.env.NEXT_PUBLIC_AUTH_SCHEME || 'Bearer').trim();

class FAQService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Generic request handler
   */
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
      
      const config: RequestInit = {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
        credentials: 'include',
      };

      const response = await fetch(url, config);
      
      let data: any = null;
      try {
        data = await response.json();
      } catch {
        // Empty response body
      }

      if (!response.ok) {
        return {
          success: false,
          error: {
            message: data?.message || data?.detail || 'خطایی رخ داده است',
            errors: data?.errors,
          },
        };
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
   * Get FAQ Categories
   * GET /lumira/api/v1/contacts/public/v1/faq-categories/
   */
  async getFAQCategories(params?: {
    page?: number;
    page_size?: number;
  }): Promise<ApiResponse<PaginatedResponse<FAQCategory>>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    
    const query = queryParams.toString();
    const endpoint = `/lumira/api/v1/contacts/public/v1/faq-categories/${query ? `?${query}` : ''}`;
    
    return this.request<PaginatedResponse<FAQCategory>>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get FAQ Category Detail
   * GET /lumira/api/v1/contacts/public/v1/faq-categories/{slug}/
   */
  async getFAQCategoryDetail(slug: string): Promise<ApiResponse<FAQCategory>> {
    return this.request<FAQCategory>(
      `/lumira/api/v1/contacts/public/v1/faq-categories/${slug}/`,
      {
        method: 'GET',
      }
    );
  }

  /**
   * Get FAQs List
   * GET /lumira/api/v1/contacts/public/v1/faqs/
   */
  async getFAQs(params?: {
    category?: string;
    page?: number;
    page_size?: number;
  }): Promise<ApiResponse<PaginatedResponse<FAQ>>> {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    
    const query = queryParams.toString();
    const endpoint = `/lumira/api/v1/contacts/public/v1/faqs/${query ? `?${query}` : ''}`;
    
    return this.request<PaginatedResponse<FAQ>>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get FAQ Detail
   * GET /lumira/api/v1/contacts/public/v1/faqs/{id}/
   */
  async getFAQDetail(id: number): Promise<ApiResponse<FAQDetail>> {
    return this.request<FAQDetail>(
      `/lumira/api/v1/contacts/public/v1/faqs/${id}/`,
      {
        method: 'GET',
      }
    );
  }

  /**
   * Mark FAQ as Helpful
   * POST /lumira/api/v1/contacts/public/v1/faqs/{id}/helpful/
   */
  async markFAQHelpful(id: number): Promise<ApiResponse<{ message: string; helpful_count: number }>> {
    return this.request<{ message: string; helpful_count: number }>(
      `/lumira/api/v1/contacts/public/v1/faqs/${id}/helpful/`,
      {
        method: 'POST',
      }
    );
  }

  /**
   * Submit Contact Message
   * POST /lumira/api/v1/contacts/public/v1/messages/
   */
  async submitContactMessage(message: ContactMessage): Promise<ApiResponse<any>> {
    return this.request<any>(
      '/lumira/api/v1/contacts/public/v1/messages/',
      {
        method: 'POST',
        body: JSON.stringify(message),
      }
    );
  }
}

// Export singleton instance
export const faqService = new FAQService();
