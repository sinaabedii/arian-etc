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
  title: "لومینا - فروشگاه جامع آنلاین",
  subtitle: "خرید آسان، ارسال سریع و قیمت مناسب برای هزاران محصول",
  description: "از مواد غذایی تا لوازم خانگی، از پوشاک تا الکترونیک. همه چیز در یک مکان با بهترین قیمت و کیفیت",
  cta: "شروع خرید",
  backgroundImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
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
    title: "گوشی Samsung Galaxy S23",
    description: "گوشی هوشمند پرچمدار با دوربین 200 مگاپیکسل و 5G",
    price: 28500000,
    originalPrice: 32000000,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "الکترونیکی",
    rating: 4.8,
    reviews: 342
  },
  {
    id: "2",
    title: "روغن زیتون ارگانیک",
    description: "روغن زیتون تصفیه نشده درجه یک - 1 لیتر",
    price: 450000,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "مواد غذایی",
    rating: 4.9,
    reviews: 876
  },
  {
    id: "3",
    title: "کفش ورزشی نایک",
    description: "کفش ورزشی مردانه برای دویدن و فعالیت روزانه",
    price: 3200000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "پوشاک",
    rating: 4.7,
    reviews: 521
  },
  {
    id: "4",
    title: "ماشین لباسشویی سامسونگ",
    description: "ماشین لباسشویی 8 کیلویی با تکنولوژی Eco Bubble",
    price: 15800000,
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "لوازم خانگی",
    rating: 4.6,
    reviews: 198
  },
  {
    id: "5",
    title: "قهوه فوری نسکافه",
    description: "قهوه فوری گلد 200 گرمی با طعم ملایم",
    price: 285000,
    originalPrice: 320000,
    image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "مواد غذایی",
    rating: 4.5,
    reviews: 1243
  },
  {
    id: "6",
    title: "هدفون بی‌سیم سونی",
    description: "هدفون بلوتوثی با کنترل نویز و باتری 30 ساعته",
    price: 6500000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "الکترونیکی",
    rating: 4.8,
    reviews: 412
  }
];

export const bestSellingProducts: Product[] = [
  {
    id: "7",
    title: "تی‌شرت مردانه کتان",
    description: "تی‌شرت کتان خنک و راحت برای تابستان",
    price: 450000,
    originalPrice: 580000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "پوشاک",
    rating: 4.6,
    reviews: 632
  },
  {
    id: "8",
    title: "میکروویو پاناسونیک",
    description: "میکروویو دیجیتال 28 لیتری با گریل",
    price: 4200000,
    image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "لوازم خانگی",
    rating: 4.7,
    reviews: 287
  },
  {
    id: "9",
    title: "کتاب رمان عشق",
    description: "کتاب پرفروش سال با ترجمه فارسی روان",
    price: 180000,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "کتاب",
    rating: 4.9,
    reviews: 1456
  },
  {
    id: "10",
    title: "برنج هاشمی محلی",
    description: "برنج درجه یک هاشمی گیلان - 10 کیلو",
    price: 850000,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "مواد غذایی",
    rating: 4.8,
    reviews: 923
  }
];

export const features: Feature[] = [
  {
    title: "ارسال سریع و رایگان",
    description: "ارسال رایگان برای خریدهای بالای 500 هزار تومان به سراسر کشور",
    icon: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png"
  },
  {
    title: "تضمین اصالت کالا",
    description: "تمام محصولات اورجینال و با ضمانت بازگشت 7 روزه",
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
  },
  {
    title: "پشتیبانی 24/7",
    description: "تیم پشتیبانی ما همیشه آماده پاسخگویی به سوالات شماست",
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  },
  {
    title: "پرداخت امن",
    description: "پرداخت آنلاین با تمام کارت‌های بانکی و درگاه امن",
    icon: "https://cdn-icons-png.flaticon.com/512/1067/1067566.png"
  }
];

export const companyInfo: CompanyInfo = {
  name: "لومینا",
  logo: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  description: "فروشگاه جامع آنلاین لومینا - خرید آسان مواد غذایی، لوازم خانگی، پوشاک، الکترونیکی و هزاران محصول دیگر با بهترین قیمت",
  address: "تهران، میدان ونک، برج لومینا، طبقه 12",
  phone: "+98 21 9876 5432",
  email: "info@luminastore.com"
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
      { label: "مواد غذایی", href: "/products?category=food" },
      { label: "لوازم خانگی", href: "/products?category=home" },
      { label: "پوشاک", href: "/products?category=fashion" },
      { label: "الکترونیکی", href: "/products?category=electronics" }
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
    name: "مریم احمدی",
    role: "خریدار لومینا",
    company: "تهران",
    content: "از تنوع محصولات و سرعت ارسال لومینا واقعاً راضی هستم. قیمت‌ها هم خیلی مناسب‌تر از فروشگاه‌های دیگه است.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    rating: 5
  },
  {
    id: "2",
    name: "رضا کریمی",
    role: "خریدار لومینا",
    company: "اصفهان",
    content: "بهترین فروشگاه آنلاین! محصولات با کیفیت، ارسال سریع و پشتیبانی عالی. همیشه از لومینا خرید می‌کنم.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    rating: 5
  }
];
