// Client-side utility functions for mock data handling

export interface MockResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Mock success response helper
export function mockSuccessResponse<T>(
  data: T, 
  message?: string, 
  pagination?: MockResponse['pagination']
): MockResponse<T> {
  return {
    success: true,
    data,
    message,
    pagination
  };
}

// Mock error response helper
export function mockErrorResponse(error: string): MockResponse {
  return {
    success: false,
    error
  };
}

// Pagination helper
export function paginate<T>(
  items: T[], 
  page: number = 1, 
  limit: number = 10
): { items: T[]; pagination: MockResponse['pagination'] } {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    pagination: {
      page,
      limit,
      total: items.length,
      totalPages: Math.ceil(items.length / limit),
      hasNext: endIndex < items.length,
      hasPrev: page > 1
    }
  };
}

// Validation helpers
export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  password: (password: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  },

  phone: (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  },

  required: (value: any, fieldName: string): string | null => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return `${fieldName} is required`;
    }
    return null;
  }
};

// Mock delay helper for simulating API calls
export const mockDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Sanitization helpers
export const sanitize = {
  html: (input: string): string => {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  },

  sql: (input: string): string => {
    // Basic SQL injection prevention
    return input.replace(/['";\\]/g, '');
  },

  filename: (filename: string): string => {
    return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  }
};

// File upload helpers
export const fileUtils = {
  isValidImageType: (mimeType: string): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return validTypes.includes(mimeType);
  },

  isValidFileSize: (size: number, maxSizeMB: number = 5): boolean => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return size <= maxSizeBytes;
  },

  generateUniqueFilename: (originalName: string): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    const extension = originalName.split('.').pop();
    return `${timestamp}_${random}.${extension}`;
  }
};

// Mock form submission helpers
export const mockFormSubmission = {
  async submitContactForm(contactData: any): Promise<MockResponse<string>> {
    await mockDelay(1000);
    return mockSuccessResponse('Contact form submitted successfully!');
  },

  async subscribeNewsletter(email: string): Promise<MockResponse<string>> {
    await mockDelay(800);
    return mockSuccessResponse('Successfully subscribed to newsletter!');
  }
};

// Logging helper
export const logger = {
  info: (message: string, data?: any) => {
  },

  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '');
  },

  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data || '');
  },

  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
    }
  }
};

// Environment helpers
export const env = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  get: (key: string, defaultValue?: string): string => {
    return process.env[key] || defaultValue || '';
  },

  require: (key: string): string => {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Required environment variable ${key} is not set`);
    }
    return value;
  }
};
