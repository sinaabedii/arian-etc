import type {
  BlogCategory,
  BlogPost,
  BlogPostDetail,
  BlogComment,
  CreateCommentRequest,
  PaginatedResponse,
  ApiResponse,
} from '@/types/blog';
import { TokenManager } from './token-manager';

const AUTH_SCHEME = (process.env.NEXT_PUBLIC_AUTH_SCHEME || 'Bearer').trim();

class BlogService {
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
   * Get Blog Categories
   * GET /lumira/api/v1/blog/public/v1/categories/
   */
  async getCategories(): Promise<ApiResponse<BlogCategory[]>> {
    return this.request<BlogCategory[]>(
      '/lumira/api/v1/blog/public/v1/categories/',
      { method: 'GET' }
    );
  }

  /**
   * Get Blog Posts
   * GET /lumira/api/v1/blog/public/v1/posts/
   */
  async getPosts(params?: {
    category?: string;
    tag?: string;
    featured?: boolean;
    page?: number;
    page_size?: number;
  }): Promise<ApiResponse<PaginatedResponse<BlogPost>>> {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.tag) queryParams.append('tag', params.tag);
    if (params?.featured) queryParams.append('featured', 'true');
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());

    const query = queryParams.toString();
    const endpoint = `/lumira/api/v1/blog/public/v1/posts/${query ? `?${query}` : ''}`;

    return this.request<PaginatedResponse<BlogPost>>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get Featured Blog Posts
   * GET /lumira/api/v1/blog/public/v1/posts/featured/
   */
  async getFeaturedPosts(): Promise<ApiResponse<BlogPost[]>> {
    return this.request<BlogPost[]>(
      '/lumira/api/v1/blog/public/v1/posts/featured/',
      { method: 'GET' }
    );
  }

  /**
   * Get Blog Post Detail
   * GET /lumira/api/v1/blog/public/v1/posts/{slug}/
   */
  async getPostDetail(slug: string): Promise<ApiResponse<BlogPostDetail>> {
    return this.request<BlogPostDetail>(
      `/lumira/api/v1/blog/public/v1/posts/${slug}/`,
      { method: 'GET' }
    );
  }

  /**
   * Get My Comments (authenticated)
   * GET /lumira/api/v1/blog/auth/v1/comments/
   */
  async getMyComments(params?: {
    page?: number;
    page_size?: number;
  }): Promise<ApiResponse<PaginatedResponse<BlogComment>>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());

    const query = queryParams.toString();
    const endpoint = `/lumira/api/v1/blog/auth/v1/comments/${query ? `?${query}` : ''}`;

    return this.request<PaginatedResponse<BlogComment>>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Create Comment (authenticated)
   * POST /lumira/api/v1/blog/auth/v1/comments/create/
   */
  async createComment(commentData: CreateCommentRequest): Promise<ApiResponse<BlogComment>> {
    return this.request<BlogComment>(
      '/lumira/api/v1/blog/auth/v1/comments/create/',
      {
        method: 'POST',
        body: JSON.stringify(commentData),
      }
    );
  }
}

// Export singleton instance
export const blogService = new BlogService();
