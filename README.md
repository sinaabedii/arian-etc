# Lumina (لومینا) - فروشگاه جامع آنلاین

فروشگاه جامع آنلاین لومینا - خرید مواد غذایی، لوازم خانگی، پوشاک، لوازم الکترونیکی و هزاران محصول دیگر. ساخته شده با Next.js 14, TypeScript و Tailwind CSS.

## 🚀 ویژگی‌ها

### صفحه اصلی
- **طراحی مدرن و رسپانسیو** (mobile-first)
- **دسته‌بندی محصولات** به صورت جامع
- **Hero section** جذاب و حرفه‌ای
- **سیستم جستجو** پیشرفته
- **فیلترینگ محصولات** بر اساس دسته، قیمت، برند
- **سبد خرید و Wishlist** کامل
- **چت بات هوشمند** برای پشتیبانی

### صفحات جزئیات محصول
- **Dynamic routing** با `/products/[slug]`
- **گالری تصاویر** با thumbnail navigation
- **جدول مشخصات** کامل
- **نظرات کاربران** با امتیازدهی ستاره‌ای
- **فرم ثبت نظر**
- **مقایسه محصولات**
- **Breadcrumb navigation**
- **SEO بهینه‌سازی شده**

### Technical Features
- **TypeScript strict mode** for type safety
- **Tailwind CSS** with custom design tokens
- **External images** from Unsplash and CDNs
- **Mock data** with comprehensive product information
- **Responsive breakpoints** tested across devices
- **Accessibility** features (ARIA labels, semantic HTML)
- **Performance optimized** with Next.js Image component

## 🛠 فناوری‌های استفاده شده

- **Framework**: Next.js 14 (App Router)
- **زبان**: TypeScript (strict mode)
- **استایل**: Tailwind CSS v3.4+
- **State Management**: Zustand + Context API
- **تصاویر**: Next.js Image component
- **آیکون‌ها**: Lucide React
- **فونت‌ها**: فونت فارسی IRANSans

## 📁 Project Structure

```
/app
  layout.tsx              # Root layout with metadata
  page.tsx               # Landing page
  /products
    page.tsx             # Products listing
    /[slug]
      page.tsx           # Product detail page
      Gallery.tsx        # Image gallery component
      ReviewForm.tsx     # Review submission form
      SpecTable.tsx      # Specifications table
      ConsultationForm.tsx # Consultation request form

/components
  /ui
    Button.tsx           # Reusable button component
    Card.tsx            # Card wrapper component
    StarRating.tsx      # Star rating component
  /layout
    Header.tsx          # Navigation header
    Hero.tsx           # Hero section
    Features.tsx       # Product features
    Experience.tsx     # Experience section
    Footer.tsx         # Footer

/data
  mockData.ts           # Landing page mock data
  mockProducts.ts       # Product detail mock data

/types
  index.ts             # TypeScript interfaces

/styles
  globals.css          # Global styles and Tailwind

/lib
  utils.ts             # Utility functions

tailwind.config.ts     # Tailwind configuration
next.config.js         # Next.js configuration
```

## 🎨 سیستم طراحی

### رنگ‌ها
- **Primary**: `#0066cc` (Blue) - رنگ اصلی برند
- **Secondary**: سبز و نارنجی برای Accents
- **Neutral**: Gray scale برای متن و پس‌زمینه
- **Success**: سبز برای موفقیت‌آمیز

### Typography
- **Body**: Inter font family
- **Headings**: Poppins font family
- **Responsive**: 4xl to 7xl heading scales

### Spacing
- **8px grid system** for consistent spacing
- **Custom spacing**: 18, 88, 128 for specific layouts
- **Section padding**: Responsive padding classes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd themp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet (sm)**: 640px+
- **Desktop (md)**: 768px+
- **Large (lg)**: 1024px+
- **Extra Large (xl)**: 1280px+

## 🔧 Configuration

### Tailwind Config
Custom colors, fonts, and spacing are defined in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#315a39', // Main green
    // ... other shades
  }
}
```

### Next.js Config
External image domains are configured in `next.config.js`:

```javascript
images: {
  domains: [
    'images.unsplash.com',
    'cdn-icons-png.flaticon.com',
    // ... other domains
  ],
}
```

## 📊 Mock Data

### Products
- **HabitTracker Pro** - Smart habit formation device with gamification
- **FocusFlow Headphones** - Cognitive enhancement with binaural beats
- **NeuroFeedback Gaming Chair** - Biofeedback sensors for performance
- **SleepOptimizer Pod** - Smart sleep environment controller
- **Customer reviews** focused on habit formation and productivity
- **Multiple relevant images** per product (external URLs)
- **YouTube demo videos** for key products
- **Detailed technical specifications**

### Content
- **Behavioral design** focused hero section
- **Psychology-based** navigation and features
- **Expert testimonials** from behavioral scientists
- **Addiction science** feature cards
- **Innovation-focused** footer content

## 🎯 Key Features Implemented

### ✅ Landing Page
- [x] Behavioral design focused hero section
- [x] Useful & addictive product showcase grid
- [x] Expert testimonials from psychologists
- [x] Responsive navigation with updated branding
- [x] Footer with newsletter signup

### ✅ Product Detail Pages
- [x] Dynamic routing with slug-based URLs
- [x] Image gallery with thumbnail navigation
- [x] Product specifications table
- [x] Customer reviews display
- [x] Review submission form
- [x] Consultation request form
- [x] Video demo integration
- [x] Breadcrumb navigation
- [x] SEO metadata

### ✅ Technical Requirements
- [x] TypeScript strict mode
- [x] Responsive design (mobile-first)
- [x] External images only
- [x] No e-commerce functionality
- [x] Console logging for forms
- [x] Accessibility features
- [x] Performance optimization

## 🚫 Deliberately Excluded

- **E-commerce functionality** (no cart, checkout, payments)
- **Backend API** (all data is mocked)
- **User authentication**
- **Real form submissions** (console logging only)
- **Database integration**

## 🎨 Design Decisions

1. **Color Scheme**: Used the specified green (`#315a39`) as primary color
2. **Typography**: Inter for readability, Poppins for headings
3. **Layout**: Mobile-first responsive design
4. **Components**: Modular, reusable component architecture
5. **Forms**: Non-functional but fully styled forms with validation
6. **Images**: High-quality external images for realistic appearance

## 📈 Performance

- **Next.js Image** component for optimized loading
- **Priority loading** for above-the-fold images
- **Lazy loading** for video embeds
- **Optimized bundle** with tree shaking
- **Static generation** for product pages

## 🛒 دسته‌بندی محصولات

### محصولات موجود
- **🛒 مواد غذایی**: مواد خوراکی، نوشیدنی، میوه و سبزیجات، لبنیات
- **🏠 لوازم خانگی**: وسایل آشپزخانه، لوازم حمام، دکوراسیون، وسایل برقی
- **👕 پوشاک و کفش**: لباس مردانه، زنانه، کودک، کفش و کیف
- **💻 لوازم الکترونیکی**: موبایل، لپ‌تاپ، تبلت، لوازم جانبی
- **✨ زیبایی و بهداشت**: محصولات آرایشی، بهداشت فردی، عطر
- **📚 کتاب و لوازم التحریر**: کتاب، لوازم التحریر، هنر
- **🏃 ورزش و سرگرمی**: لوازم ورزشی، اسباب‌بازی

## 🔍 SEO

- **Metadata** for all pages with behavioral design keywords
- **Open Graph** tags optimized for product innovation
- **Semantic HTML** structure
- **Alt text** for all images
- **Structured breadcrumbs**

## 🎯 Browser Support

- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **Mobile browsers** (iOS Safari, Chrome Mobile)
- **Responsive design** tested across devices

## 📝 License

This project is for demonstration purposes only.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit the site
open http://localhost:3000
```

### مسیرهای موجود
- `/` - صفحه اصلی
- `/products` - لیست محصولات
- `/products/[slug]` - جزئیات محصول
- `/cart` - سبد خرید
- `/wishlist` - لیست علاقه‌مندی‌ها
- `/checkout` - تسویه حساب
- `/dashboard` - پنل کاربری
- `/about` - درباره ما
- `/contact` - تماس با ما

---

**ساخته شده با ❤️ توسط Next.js, TypeScript و Tailwind CSS**  
**لومینا - فروشگاه جامع آنلاین 🛒**
