import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import AppShell from '@/components/layout/AppShell';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';

const iranSans = localFont({
  src: [
    { path: '../public/fonts/iransansx-light.woff', weight: '300', style: 'normal' },
    { path: '../public/fonts/iransansx-regular.woff', weight: '400', style: 'normal' },
    { path: '../public/fonts/iransansx-bold.woff', weight: '700', style: 'normal' },
    // Fallback TTFs if needed
    { path: '../public/fonts/IRANSans.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/IranSansBold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-iran',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'لومینا - فروشگاه جامع آنلاین',
    template: '%s | لومینا'
  },
  description: 'لومینا - فروشگاه جامع آنلاین برای خرید مواد غذایی، لوازم خانگی، پوشاک، لوازم الکترونیکی و هزاران محصول دیگر. خرید آسان، ارسال سریع و قیمت مناسب.',
  keywords: [
    'لومینا',
    'فروشگاه آنلاین',
    'خرید آنلاین',
    'مواد غذایی',
    'لوازم خانگی',
    'پوشاک و کفش',
    'لوازم الکترونیکی',
    'خرید اینترنتی',
    'فروشگاه جامع',
    'قیمت مناسب',
    'ارسال سریع',
    'خرید مطمئن',
    'محصولات متنوع',
  ],
  authors: [{ name: 'لومینا', url: 'https://akandchimi.com' }],
  creator: 'لومینا',
  publisher: 'لومینا',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://akandchimi.com',
    siteName: 'لومینا',
    title: 'لومینا - فروشگاه جامع آنلاین',
    description: 'خرید آنلاین مواد غذایی، لوازم خانگی، پوشاک و هزاران محصول دیگر. قیمت مناسب، ارسال سریع و خرید مطمئن.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'لومینا - فروشگاه جامع آنلاین',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'لومینا - فروشگاه جامع آنلاین',
    description: 'خرید آنلاین محصولات متنوع با بهترین قیمت و ارسال سریع.',
    images: ['/images/twitter-image.jpg'],
    creator: '@akandchimi',
  },
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://akandchimi.com',
    languages: {
      'fa-IR': 'https://akandchimi.com',
      'en-US': 'https://akandchimi.com/en',
    },
  },
  category: 'business',
  classification: 'محصولات نظافتی و ضدعفونی',
  metadataBase: new URL('https://akandchimi.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={`${iranSans.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <AppShell>
                {children}
              </AppShell>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
