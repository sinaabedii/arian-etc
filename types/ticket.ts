// Ticket Types

export interface TicketCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}

export interface Ticket {
  id: number;
  ticket_number: string;
  category: number;
  category_name: string;
  subject: string;
  status: 'open' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  last_message_at: string;
  created_at: string;
  updated_at: string;
}

export interface TicketMessage {
  id: number;
  ticket: number;
  sender_name: string;
  sender_role: 'customer' | 'support' | 'admin';
  message: string;
  created_at: string;
  is_staff_reply: boolean;
}

export interface TicketDetail extends Ticket {
  description: string;
  messages: TicketMessage[];
  customer_name: string;
  customer_email: string;
  customer_phone: string;
}

export interface CreateTicketRequest {
  name: string;
  email: string;
  phone_number: string;
  category: number;
  subject: string;
  description: string;
}

export interface AddMessageRequest {
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

// Status and Priority mappings
export const TICKET_STATUS_LABELS: Record<Ticket['status'], string> = {
  open: 'باز',
  in_progress: 'در حال بررسی',
  waiting_customer: 'در انتظار مشتری',
  resolved: 'حل شده',
  closed: 'بسته شده',
};

export const TICKET_PRIORITY_LABELS: Record<Ticket['priority'], string> = {
  low: 'کم',
  normal: 'عادی',
  high: 'بالا',
  urgent: 'فوری',
};

export const TICKET_STATUS_COLORS: Record<Ticket['status'], string> = {
  open: 'bg-blue-100 text-blue-800 border-blue-200',
  in_progress: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  waiting_customer: 'bg-purple-100 text-purple-800 border-purple-200',
  resolved: 'bg-green-100 text-green-800 border-green-200',
  closed: 'bg-gray-100 text-gray-800 border-gray-200',
};

export const TICKET_PRIORITY_COLORS: Record<Ticket['priority'], string> = {
  low: 'bg-slate-100 text-slate-700',
  normal: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
};
