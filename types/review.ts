// Review Type Definitions

export interface Review {
  id: number;
  product?: number;
  customer_name: string;
  rating: number;
  title: string;
  comment: string;
  is_verified_purchase: boolean;
  created_at: string;
}

export interface CreateReviewRequest {
  product?: number;
  rating: number;
  title: string;
  comment: string;
}

export interface UpdateReviewRequest {
  product?: number;
  rating: number;
  title: string;
  comment: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    errors?: Record<string, string[]>;
  };
}

// Website Review Types
export type ReviewCategory = 'service' | 'delivery' | 'quality' | 'website' | 'general';

export interface WebsiteReview {
  id: number;
  customer_name: string;
  rating: number;
  title: string;
  comment: string;
  category: ReviewCategory;
  category_display: string;
  admin_response?: string;
  response_date?: string;
  has_admin_response?: string;
  created_at: string;
}

export interface CreateWebsiteReviewRequest {
  rating: number;
  title: string;
  comment: string;
  category: ReviewCategory;
}

export interface WebsiteReviewFilters {
  category?: ReviewCategory;
  rating?: number;
  featured?: boolean;
  page?: number;
  page_size?: number;
}
