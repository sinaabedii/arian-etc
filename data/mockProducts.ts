import { ProductDetail, Review } from '@/types';

export const mockProductDetails: ProductDetail[] = [
  {
    slug: 'ultraclean-disinfectant',
    title: 'اسپری ضدعفونی‌کننده اولتراکلین (گرید بیمارستانی)',
    shortDesc: 'اسپری ضدعفونی‌کننده حرفه‌ای که ۹۹.۹٪ میکروب‌ها، باکتری‌ها و ویروس‌ها را در تماس از بین می‌برد',
    price: 1250000,
    longDesc: `
      <p>اسپری ضدعفونی‌کننده اولتراکلین یک محلول نظافتی با گرید بیمارستانی است که مورد اعتماد متخصصان سلامت در سراسر جهان می‌باشد. فرمول پیشرفته ما حفاظت برتر در برابر عوامل بیماری‌زا را فراهم می‌کند و در عین حال برای استفاده روزمره ایمن است.</p>
      
      <p>ویژگی‌های کلیدی:</p>
      <ul>
        <li>از بین بردن ۹۹.۹٪ باکتری‌ها، ویروس‌ها و قارچ‌ها در ۳۰ ثانیه</li>
        <li>فرمول ثبت‌شده و تأیید شده توسط مراجع بهداشتی</li>
        <li>ایمن برای استفاده روی تمام سطوح سخت</li>
        <li>بدون باقی‌ماندن اثر مواد ایی یا بوی تند</li>
        <li>موثر علیه ویروس‌های تنفسی مانند کرونا و آنفلوآنزا</li>
        <li>بدون خوردگی و بدون ایجاد لکه</li>
      </ul>
      
      <p>مورد استفاده در بیش از ۱۰٬۰۰۰ مرکز درمانی، اولتراکلین حفاظت حرفه‌ای مورد نیاز شما را برای منزل، محل کار یا محیط‌های درمانی فراهم می‌کند.</p>
    `,
    images: [
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    specs: [
      { label: 'حجم', value: '۵۰۰ میلی‌لیتر' },
      { label: 'مواد مؤثره', value: 'ترکیبات آمونیوم چهارتایی' },
      { label: 'زمان اثرگذاری', value: '۳۰ ثانیه' },
      { label: 'پوشش‌دهی', value: 'تا ۱۸ متر مربع برای هر بطری' },
      { label: 'pH', value: '۷ (خنثی)' },
      { label: 'ماندگاری', value: '۳ سال از تاریخ تولید' },
      { label: 'گواهی‌ها', value: 'تأییدیه‌های بهداشتی معتبر' },
      { label: 'ایمنی', value: 'ایمن برای سطوح در تماس با مواد غذایی' }
    ],
    catalogPdfUrl: '/catalogs/ultraclean-disinfectant.pdf',
    category: 'ضدعفونی‌کننده‌ها',
    tags: ['گرید بیمارستانی', 'تأییدیه بهداشتی', 'محافظت در برابر ویروس'],
    reviews: [
      {
        id: '1',
        name: 'دکتر سارا میچل',
        date: '2024-01-15T10:30:00Z',
        rating: 5,
        comment: 'در مرکز درمانی ما از اولتراکلین استفاده می‌کنیم و فوق‌العاده مؤثر است. سریع میکروب‌ها را از بین می‌برد و اثری باقی نمی‌گذارد. عالی برای فضاهای پر رفت‌وآمد.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
      },
      {
        id: '2',
        name: 'ماریا رودریگز',
        date: '2024-01-10T14:20:00Z',
        rating: 5,
        comment: 'به‌عنوان مادر سه فرزند، به ضدعفونی‌کننده‌ای نیاز دارم که به آن اعتماد کنم. اولتراکلین خیال من را بابت محافظت خانواده‌ام از میکروب‌ها راحت می‌کند.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
      },
      {
        id: '3',
        name: 'جیمز ویلسون',
        date: '2024-01-05T09:15:00Z',
        rating: 5,
        comment: 'در رستوران‌مان به اولتراکلین تغییر دادیم و عالی بوده است. اثرگذاری سریع و ایمن برای نواحی آماده‌سازی غذا. به‌شدت توصیه می‌کنم!',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
      }
    ]
  },
  {
    slug: 'focusflow-headphones',
    title: 'هدست حذف نویز فوکوس‌فلو',
    shortDesc: 'هدفون پیشرفته با باینورال بیت برای افزایش تمرکز و ایجاد حالت‌های فلو طبیعی',
    price: 3500000,
    longDesc: `
      <p>هدفون‌های فوکوس‌فلو یک پیشرفت چشمگیر در فناوری بهبود شناختی هستند. این‌ها فقط یک هدفون پریمیوم نیستند؛ بلکه ابزاری علمی برای دستیابی به اوج عملکرد ذهنی و ایجاد جلسات تمرکز عمیق می‌باشند.</p>
      
      <p>ویژگی‌های انقلابی:</p>
      <ul>
        <li>حذف نویز تطبیقی با کاهش ۹۹.۵٪ صدای محیط</li>
        <li>تولیدکننده داخلی باینورال بیت برای تمرکز بیشتر</li>
        <li>بهینه‌سازی صدا با هوش مصنوعی</li>
        <li>پایش و بازخورد امواج مغزی به‌صورت لحظه‌ای</li>
        <li>پیشنهادهای شخصی‌سازی‌شده برای جلسات تمرکز</li>
        <li>ردیابی پیشرفت و پاداش‌های انگیزشی</li>
      </ul>
    `,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/BaW_jenozKc',
    specs: [
      { label: 'اندازه درایور', value: '۵۰ میلی‌متر (داینامیک)' },
      { label: 'وزن', value: '۳۲۰ گرم' },
      { label: 'عمر باتری', value: '۴۰ ساعت با ANC' },
      { label: 'اتصال', value: 'Bluetooth 5.3, USB-C, 3.5mm' },
      { label: 'حذف نویز', value: 'ANC تا ۴۰dB' },
      { label: 'پاسخ فرکانسی', value: '۱۰Hz تا ۴۰kHz' },
      { label: 'امواج باینورال', value: 'آلفا، بتا، تتا، گاما' },
      { label: 'گارانتی', value: '۳ سال + بروزرسانی مادام‌العمر اپ' }
    ],
    catalogPdfUrl: '/catalogs/focusflow-headphones.pdf',
    category: 'صوتی',
    tags: ['افزایش تمرکز', 'فناوری شناختی', 'بهره‌وری'],
    reviews: [
      {
        id: '4',
        name: 'دکتر سارا میچل',
        date: '2024-01-20T16:45:00Z',
        rating: 5,
        comment: 'به‌عنوان عصب‌شناس، از رویکرد علمی شگفت‌زده شدم. این هدفون‌ها واقعاً به من کمک می‌کنند سریع‌تر از هر روش دیگری وارد حالت فلو شوم. باینورال بیت‌ها به‌خوبی کالیبره شده‌اند.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
      },
      {
        id: '5',
        name: 'مارکوس تامپسون',
        date: '2024-01-18T11:30:00Z',
        rating: 5,
        comment: 'من توسعه‌دهنده نرم‌افزار هستم و این هدفون‌ها جلسات کدنویسی‌ام را متحول کرده‌اند. می‌توانم ساعت‌ها بدون خستگی تمرکز کنم. اپلیکیشن بهره‌وری من را ردیابی می‌کند و معتاد به شکستن رکوردهای تمرکز روزانه‌ام شده‌ام! ',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
      }
    ]
  }
];

export const getProductBySlug = (slug: string): ProductDetail | undefined => {
  return mockProductDetails.find(product => product.slug === slug);
};

export const getAllProductSlugs = (): string[] => {
  return mockProductDetails.map(product => product.slug);
};
