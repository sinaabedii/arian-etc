// Wishlist Types

export interface WishlistItem {
  id: number;
  product: number;
  product_name: string;
  product_slug: string;
  product_price: string;
  product_discount_price: string | null;
  product_image: string | null;
  created_at: string;
}

export interface AddToWishlistRequest {
  product: number;
}

export interface PaginatedWishlistResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: WishlistItem[];
}

export interface WishlistResponse {
  success: boolean;
  message?: string;
  data?: WishlistItem | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    errors?: any;
  };
}
