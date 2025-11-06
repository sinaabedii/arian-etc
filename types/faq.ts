// FAQ and Contact Types

export interface FAQCategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  order: number;
  faq_count: number;
}

export interface FAQ {
  id: number;
  category: number;
  category_name: string;
  question: string;
  answer?: string;
  order: number;
  views_count: number;
  helpful_count: number;
}

export interface FAQDetail extends FAQ {
  answer: string;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  name: string;
  phone_number: string;
  email: string;
  title: string;
  message: string;
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
