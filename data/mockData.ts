import { 
  HeroData, 
  NavigationItem, 
  Product, 
  Feature, 
  FooterSection, 
  SocialLink, 
  CompanyInfo,
  TestimonialData 
} from '@/types';

export const heroData: HeroData = {
  title: "",
  subtitle: "",
  description: "",
  cta: "",
  backgroundImage: ""
};

export const navigationItems: NavigationItem[] = [
  {
    label: "خانه",
    href: "/"
  },
  { 
    label: "محصولات", 
    href: "/products"
  },
  {
    label: "بلاگ",
    href: "/blog"
  },
  { label: "سوالات متداول", href: "/faq" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" }
];

export const featuredProducts: Product[] = [];

export const bestSellingProducts: Product[] = [];

export const features: Feature[] = [];

export const companyInfo: CompanyInfo = {
  name: "",
  logo: "",
  description: "",
  address: "",
  phone: "",
  email: ""
};

export const footerSections: FooterSection[] = [];

export const socialLinks: SocialLink[] = [];

export const testimonials: TestimonialData[] = [];
