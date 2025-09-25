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
    default: 'آکند شیمی خزر - محصولات نظافتی و ضدعفونی حرفه‌ای',
    template: '%s | آکند شیمی خزر'
  },
  description: 'آکند شیمی خزر تولیدکننده و عرضه‌کننده محصولات نظافتی و ضدعفونی با کیفیت حرفه‌ای، مجوز EPA و استاندارد بیمارستانی برای منزل، اداره و مراکز درمانی.',
  keywords: [
    'آکند شیمی خزر',
    'محصولات نظافتی',
    'ضدعفونی کننده',
    'شوینده صنعتی',
    'محصولات بهداشتی',
    'ضدعفونی بیمارستانی',
    'EPA approved',
    'مواد شوینده',
    'نظافت حرفه‌ای',
    'فروشگاه آنلاین نظافت'
  ],
  authors: [{ name: 'آکند شیمی خزر', url: 'https://akandchimi.com' }],
  creator: 'آکند شیمی خزر',
  publisher: 'آکند شیمی خزر',
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
    siteName: 'آکند شیمی خزر',
    title: 'آکند شیمی خزر - محصولات نظافتی و ضدعفونی حرفه‌ای',
    description: 'کیفیت حرفه‌ای، ایمنی بالا و اثربخشی واقعی در محصولات نظافتی و ضدعفونی با مجوز EPA و استاندارد بیمارستانی.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'آکند شیمی خزر - محصولات نظافتی حرفه‌ای',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'آکند شیمی خزر - محصولات نظافتی و ضدعفونی حرفه‌ای',
    description: 'راهکارهای نظافت و بهداشت حرفه‌ای برای منزل، اداره و مراکز درمانی.',
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
