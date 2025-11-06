// Product Type Definitions

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  category_name: string;
  short_description: string;
  price: string;
  discount_price: string | null;
  final_price: string;
  discount_percentage: number;
  has_discount: boolean;
  stock_status: 1 | 2 | 3 | 4; // 1: موجود، 2: ناموجود، 3: به‌زودی، 4: تماس بگیرید
  is_in_stock: boolean;
  brand: string;
  is_featured: boolean;
  primary_image: string;
  created_at: string;
}

export interface ProductImage {
  id: number;
  image: string;
  alt_text: string;
  is_primary: boolean;
  order: number;
}

export interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  sku: string;
  category: number;
  category_name: string;
  description: string;
  short_description: string;
  price: string;
  discount_price: string | null;
  final_price: string;
  discount_percentage: number;
  has_discount: boolean;
  stock_quantity: number;
  stock_status: 1 | 2 | 3 | 4;
  is_in_stock: boolean;
  brand: string;
  model_number: string;
  weight: string;
  dimensions: string;
  is_featured: boolean;
  is_active: boolean;
  view_count: number;
  order_count: number;
  images: ProductImage[];
  created_at: string;
}

export interface ProductFilters {
  brand?: string;
  category?: number;
  category_slug?: string;
  is_featured?: boolean;
  max_price?: number;
  min_price?: number;
  ordering?: string;
  page?: number;
  page_size?: number;
  search?: string;
  stock_status?: 1 | 2 | 3 | 4;
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

// Helper type for stock status
export type StockStatusType = {
  value: 1 | 2 | 3 | 4;
  label: string;
  color: string;
  bgColor: string;
};

export const STOCK_STATUS: Record<number, StockStatusType> = {
  1: { value: 1, label: 'موجود', color: 'text-green-700', bgColor: 'bg-green-100' },
  2: { value: 2, label: 'ناموجود', color: 'text-red-700', bgColor: 'bg-red-100' },
  3: { value: 3, label: 'به‌زودی', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  4: { value: 4, label: 'تماس بگیرید', color: 'text-blue-700', bgColor: 'bg-blue-100' },
};
