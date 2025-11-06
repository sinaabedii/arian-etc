// Cart Types

export interface CartItem {
  id: number;
  product_id: number;
  product_name: string;
  product_slug: string;
  product_price: string;
  product_image?: string;
  quantity: number;
  subtotal: string;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total_price: string;
  discount_amount?: string;
  coupon_code?: string;
  final_price: string;
  items_count: number;
}

export interface AddToCartRequest {
  product_id: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface ApplyCouponRequest {
  code: string;
}

export interface CartResponse {
  success: boolean;
  message?: string;
  cart?: Cart;
}

export interface PaginatedCartResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CartItem[];
}
