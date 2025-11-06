// Category Type Definitions

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  order: number;
}

export interface CategoryDetail {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number | null;
  image: string;
  is_active: boolean;
  order: number;
  children_count: string;
  products_count: string;
  created_at: string;
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
