// Blog Type Definitions

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  posts_count?: number;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogAuthor {
  id: number;
  name: string;
  avatar?: string;
  bio?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  featured_image: string;
  category: BlogCategory;
  tags: BlogTag[];
  author: BlogAuthor;
  published_at: string;
  updated_at: string;
  read_time: number;
  views_count: number;
  comments_count: number;
  is_featured: boolean;
}

export interface BlogPostDetail extends BlogPost {
  content: string;
  comments: BlogComment[];
}

export interface BlogComment {
  id: number;
  post: number;
  user_name: string;
  user_avatar?: string;
  content: string;
  created_at: string;
  updated_at: string;
  parent_comment?: number;
  replies?: BlogComment[];
}

export interface CreateCommentRequest {
  post_slug: string;
  content: string;
  parent_comment_id?: number;
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
