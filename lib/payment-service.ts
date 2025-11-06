import {
  PaymentGateway,
  PaymentTransaction,
  CreatePaymentRequest,
  CreatePaymentResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse
} from '@/types/payment';
import { TokenManager } from './token-manager';

const AUTH_SCHEME = (process.env.NEXT_PUBLIC_AUTH_SCHEME || 'Bearer').trim();

class PaymentService {
  private baseUrl: string;
  private apiBase = '/lumira/api/v1/payments/auth/v1';

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const msg = (errorData && (errorData.detail || errorData.message || errorData.error)) || `HTTP error! status: ${response.status}`;
      throw new Error(msg);
    }

    return response.json();
  }

  /**
   * Get list of all active payment gateways
   */
  async getGateways(): Promise<PaymentGateway[]> {
    const response = await this.request<any>(`${this.apiBase}/gateways/`, {
      method: 'GET',
    });
    // API returns nested array [[{...}]], flatten it
    return Array.isArray(response?.[0]) ? response[0] : response;
  }

  /**
   * Create a new payment request
   */
  async createPayment(data: CreatePaymentRequest): Promise<CreatePaymentResponse> {
    return this.request<CreatePaymentResponse>(`${this.apiBase}/create/`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * Get list of all payment transactions for authenticated user
   */
  async getTransactions(): Promise<PaymentTransaction[]> {
    const response = await this.request<any>(`${this.apiBase}/transactions/`, {
      method: 'GET',
    });
    // API returns nested array [[{...}]], flatten it
    return Array.isArray(response?.[0]) ? response[0] : response;
  }

  /**
   * Get detailed information about a specific payment transaction
   */
  async getTransaction(referenceCode: string): Promise<PaymentTransaction> {
    return this.request<PaymentTransaction>(`${this.apiBase}/transactions/${referenceCode}/`, {
      method: 'GET',
    });
  }

  /**
   * Verify payment completion after customer returns from gateway
   */
  async verifyPayment(data: VerifyPaymentRequest): Promise<VerifyPaymentResponse> {
    return this.request<VerifyPaymentResponse>(`${this.apiBase}/verify/`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

export const paymentService = new PaymentService();
