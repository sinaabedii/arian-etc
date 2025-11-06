// Ticket Service

import type {
  TicketCategory,
  Ticket,
  TicketDetail,
  CreateTicketRequest,
  AddMessageRequest,
  PaginatedResponse,
  ApiResponse,
} from '@/types/ticket';
import { TokenManager } from './token-manager';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://172.20.20.66:8088';
const AUTH_SCHEME = (process.env.NEXT_PUBLIC_AUTH_SCHEME || 'Bearer').trim();
const AUTH_USE_COOKIES = String(process.env.NEXT_PUBLIC_AUTH_USE_COOKIES || 'false').toLowerCase() === 'true';

class TicketService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Get CSRF token from cookie
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

      // Get CSRF token from cookie and add to headers
      const csrfToken = this.getCookie('csrftoken');
      if (csrfToken) {
        defaultHeaders['X-CSRFToken'] = csrfToken;
      }
      
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
   * Get Ticket Categories (public)
   * GET /lumira/api/v1/tickets/public/v1/categories/
   */
  async getTicketCategories(params?: {
    page?: number;
    page_size?: number;
  }): Promise<ApiResponse<PaginatedResponse<TicketCategory>>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    
    const query = queryParams.toString();
    const endpoint = `/lumira/api/v1/tickets/public/v1/categories/${query ? `?${query}` : ''}`;
    
    return this.request<PaginatedResponse<TicketCategory>>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Create Support Ticket (public)
   * POST /lumira/api/v1/tickets/public/v1/tickets/
   */
  async createTicket(ticketData: CreateTicketRequest): Promise<ApiResponse<TicketDetail>> {
    return this.request<TicketDetail>(
      '/lumira/api/v1/tickets/public/v1/tickets/',
      {
        method: 'POST',
        body: JSON.stringify(ticketData),
      }
    );
  }

  /**
   * List My Tickets (authenticated)
   * GET /lumira/api/v1/tickets/auth/v1/tickets/
   */
  async getMyTickets(params?: {
    page?: number;
    page_size?: number;
    status?: string;
    priority?: string;
  }): Promise<ApiResponse<PaginatedResponse<Ticket>>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.priority) queryParams.append('priority', params.priority);
    
    const query = queryParams.toString();
    const endpoint = `/lumira/api/v1/tickets/auth/v1/tickets/${query ? `?${query}` : ''}`;
    
    return this.request<PaginatedResponse<Ticket>>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get Ticket Detail (authenticated)
   * GET /lumira/api/v1/tickets/auth/v1/tickets/{id}/
   */
  async getTicketDetail(id: number): Promise<ApiResponse<TicketDetail>> {
    return this.request<TicketDetail>(
      `/lumira/api/v1/tickets/auth/v1/tickets/${id}/`,
      {
        method: 'GET',
      }
    );
  }

  /**
   * Add Message to Ticket (authenticated)
   * POST /lumira/api/v1/tickets/auth/v1/tickets/{id}/messages/
   */
  async addMessage(id: number, messageData: AddMessageRequest): Promise<ApiResponse<any>> {
    return this.request<any>(
      `/lumira/api/v1/tickets/auth/v1/tickets/${id}/messages/`,
      {
        method: 'POST',
        body: JSON.stringify(messageData),
      }
    );
  }
}

// Export singleton instance
export const ticketService = new TicketService();
