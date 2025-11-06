// Payment Gateway Types
export interface PaymentGateway {
  id: number;
  name: string;
  gateway_type: string;
  is_active: boolean;
  fee_percentage: number;
  fee_fixed: number;
  min_amount: number;
  max_amount: number;
}

// Payment Transaction Types
export type PaymentStatus = 'pending' | 'success' | 'failed' | 'cancelled' | 'expired';
export type PaymentMethod = 'online' | 'cash' | 'transfer';

export interface PaymentTransaction {
  id: number;
  reference_code: string;
  gateway_reference?: string;
  tracking_code?: string;
  order_id: string;
  amount: number;
  fee_amount: number;
  total_amount: number;
  status: PaymentStatus;
  status_display: string;
  payment_method: PaymentMethod;
  payment_method_display: string;
  gateway_name?: string;
  gateway_type?: string;
  description?: string;
  payer_name?: string;
  payer_email?: string;
  payer_mobile?: string;
  card_number?: string;
  payment_url?: string;
  paid_at?: string;
  verified_at?: string;
  expires_at?: string;
  is_refundable?: boolean;
  refunded_amount?: number;
  refundable_amount?: number;
  created_at: string;
  updated_at?: string;
}

// Create Payment Request
export interface CreatePaymentRequest {
  gateway_type: string;
  order_id: string;
  amount: number;
  description?: string;
  return_url: string;
  payer_mobile?: string;
}

// Create Payment Response
export interface CreatePaymentResponse {
  id: number;
  reference_code: string;
  payment_url: string;
  expires_at: string;
}

// Verify Payment Request
export interface VerifyPaymentRequest {
  reference_code: string;
}

// Verify Payment Response
export interface VerifyPaymentResponse {
  success: boolean;
  transaction: PaymentTransaction;
  message?: string;
}
