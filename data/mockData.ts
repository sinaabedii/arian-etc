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
  title: "راهکارهای پیشرفته نظافت و ضدعفونی",
  subtitle: "محصولات نظافتی حرفه‌ای که میکروب‌ها، باکتری‌ها و ویروس‌ها را از بین می‌برند و برای استفاده روزمره ایمن هستند",
  description: "ما محصولات نظافتی و ضدعفونی با کیفیت بالا برای خانه‌ها، ادارات و مراکز درمانی تولید می‌کنیم. راهکارهای ما حفاظت برتر در برابر عوامل بیماری‌زا فراهم می‌کند.",
  cta: "مشاهده محصولات",
  backgroundImage: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
};

export const navigationItems: NavigationItem[] = [
  { 
    label: "محصولات", 
    href: "/products",
    dropdown: [
      { label: "همه محصولات", href: "/products" },
      { label: "کاتالوگ محصولات", href: "/catalog" },
      { label: "یافتن محصول", href: "/product-finder" },
      { label: "مقایسه محصولات", href: "/compare" }
    ]
  },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
  
];

export const featuredProducts: Product[] = [
  {
    id: "1",
    title: "اسپری ضدعفونی‌کننده اولتراکلین",
    description: "ضدعفونی‌کننده با گرید بیمارستانی که ۹۹.۹٪ میکروب‌ها، باکتری‌ها و ویروس‌ها را در تماس از بین می‌برد",
    price: 24.99,
    originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "ضدعفونی‌کننده‌ها",
    rating: 4.9,
    reviews: 2847
  },
  {
    id: "2",
    title: "مایع شوینده چندمنظوره پروکلین",
    description: "پاک‌کننده قدرتمند و ایمن برای آشپزخانه، سرویس بهداشتی و تمام سطوح خانگی",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "شوینده‌ها",
    rating: 4.8,
    reviews: 1923
  },
  {
    id: "3",
    title: "دستمال مرطوب آنتی‌باکتریال سانی‌وایپس",
    description: "دستمال‌های ضدعفونی‌کننده مناسب برای پاکسازی سریع و بهداشتی در هر زمان",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "دستمال‌ها",
    rating: 4.7,
    reviews: 5621
  },
  {
    id: "4",
    title: "چربی‌بر صنعتی قوی",
    description: "چربی‌بر قدرتمند مناسب آشپزخانه‌های صنعتی و مصارف نظافتی حرفه‌ای",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "صنعتی",
    rating: 4.6,
    reviews: 892
  }
];

export const bestSellingProducts: Product[] = [
  {
    id: "5",
    title: "شوینده کف با گرید بیمارستانی",
    description: "محلول حرفه‌ای شست‌وشوی کف مورد استفاده در بیمارستان‌ها و مراکز درمانی",
    price: 89.99,
    originalPrice: 109.99,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "سلامت و بهداشت",
    rating: 4.9,
    reviews: 3421
  },
  {
    id: "6",
    title: "شیشه‌پاک‌کن دوستدار محیط‌زیست",
    description: "شیشه‌پاک‌کن بدون رد و لک با ترکیبات طبیعی، امن برای منزل و محیط کار",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "محصولات سبز",
    rating: 4.8,
    reviews: 1876
  }
];

export const features: Feature[] = [
  {
    title: "از بین بردن ۹۹.۹٪ میکروب‌ها",
    description: "محصولات ما به‌صورت علمی تأیید شده‌اند که باکتری‌ها و ویروس‌های مضر را از بین می‌برند",
    icon: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png"
  },
  {
    title: "ایمن و بدون سم",
    description: "تمام محصولات در صورت استفاده صحیح برای کودکان و حیوانات خانگی ایمن هستند",
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
  },
  {
    title: "کیفیت حرفه‌ای",
    description: "راهکارهای نظافتی تأییدشده برای بیمارستان‌ها و مراکز درمانی",
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  },
  {
    title: "فرمول سریع‌اثر",
    description: "فرمولاسیون‌هایی با اثرگذاری سریع در چند ثانیه، نه چند دقیقه",
    icon: "https://cdn-icons-png.flaticon.com/512/1067/1067566.png"
  }
];

export const companyInfo: CompanyInfo = {
  name: "Arian ETC",
  logo: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  description: "تولیدکننده پیشرو محصولات نظافتی و ضدعفونی با کیفیت حرفه‌ای. ارائه‌دهنده راهکارهای ایمن و مؤثر برای منازل، ادارات و مراکز درمانی.",
  address: "تهران، خیابان مثال، پلاک ۱۲۳",
  phone: "+98 21 1234 5678",
  email: "info@arianetc.com"
};

export const footerSections: FooterSection[] = [
  {
    title: "خدمات",
    links: [
      { label: "پشتیبانی", href: "#" },
      { label: "سفارش سازمانی", href: "#" },
      { label: "گارانتی", href: "#" },
      { label: "راهنما", href: "#" }
    ]
  },
  {
    title: "دسته‌بندی‌ها",
    links: [
      { label: "شوینده‌ها", href: "#" },
      { label: "ضدعفونی‌کننده‌ها", href: "#" },
      { label: "همه", href: "#" }
    ]
  },
  {
    title: "ما را دنبال کنید",
    links: [
      { label: "اینستاگرام", href: "#" },
      { label: "لینکدین", href: "#" },
      { label: "تلگرام", href: "#" }
    ]
  }
];

export const socialLinks: SocialLink[] = [
  {
    platform: "Instagram",
    url: "https://instagram.com",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png"
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png"
  },
  {
    platform: "Telegram",
    url: "https://t.me",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733558.png"
  }
];

export const testimonials: TestimonialData[] = [
  {
    id: "1",
    name: "دکتر سارا رضایی",
    role: "متخصص بهداشت و سلامت",
    company: "دانشگاه علوم پزشکی",
    content: "محصولات Arian ETC طراحی فوق‌العاده‌ای دارند. کیفیت بالای ساخت و اثربخشی واقعی در بهداشت روزمره کاملاً محسوس است.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    rating: 5
  },
  {
    id: "2",
    name: "امیر محمدی",
    role: "مدیر تدارکات",
    company: "شرکت بازرگانی آریا",
    content: "از محصولات نظافتی Arian ETC برای مجموعه اداری‌مان استفاده می‌کنیم. هم صرفه اقتصادی دارد و هم کیفیت بالایی ارائه می‌دهد.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    rating: 5
  }
];
