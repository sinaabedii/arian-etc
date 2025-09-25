export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  backgroundImage: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  dropdown?: NavigationItem[];
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface FooterSection {
  title: string;
  links: NavigationItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface CompanyInfo {
  name: string;
  logo: string;
  description: string;
  address: string;
  phone: string;
  email: string;
}

export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface Review {
  id: string;
  name: string;
  date: string; // ISO string
  rating: number; // 0-5
  comment: string;
  avatar?: string; // external URL
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDetail {
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  price: number;
  images: string[]; // external URLs
  videoUrl?: string; // youtube embed src
  specs: ProductSpec[];
  catalogPdfUrl: string; // mock
  reviews: Review[];
  category: string;
  tags: string[];
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  email: string;
  organization: string;
  message: string;
}

export interface ReviewFormData {
  name: string;
  rating: number;
  comment: string;
}
