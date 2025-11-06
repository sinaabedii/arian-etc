import { Metadata } from 'next';
import Hero from '@/components/layout/Hero';
import FeaturedProducts from '@/components/layout/FeaturedProducts';
import SpecialOffers from '@/components/layout/SpecialOffers';
import Categories from '@/components/layout/Categories';
import WhyChooseUs from '@/components/layout/WhyChooseUs';
import BusinessCTA from '@/components/layout/BusinessCTA';
import Experience from '@/components/layout/Experience';

export const metadata: Metadata = {
  title: 'لومینا - فروشگاه جامع آنلاین',
  description: 'لومینا - فروشگاه جامع آنلاین برای خرید مواد غذایی، لوازم خانگی، پوشاک، لوازم الکترونیکی و هزاران محصول دیگر. خرید آسان، ارسال سریع و قیمت مناسب.',
  keywords: [
    'لومینا',
    'فروشگاه آنلاین',
    'خرید آنلاین',
    'مواد غذایی',
    'لوازم خانگی',
    'پوشاک',
    'لوازم الکترونیکی',
    'فروشگاه جامع',
    'خرید اینترنتی',
    'قیمت مناسب'
  ],
  openGraph: {
    title: 'لومینا - فروشگاه جامع آنلاین',
    description: 'خرید آنلاین مواد غذایی، لوازم خانگی، پوشاک و هزاران محصول دیگر. قیمت مناسب و ارسال سریع.',
    images: [
      {
        url: '/images/hero-og.jpg',
        width: 1200,
        height: 630,
        alt: 'لومینا - فروشگاه جامع آنلاین',
      },
    ],
  },
  alternates: {
    canonical: 'https://lumina-shop.com',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'OnlineStore',
  name: 'لومینا',
  alternateName: 'Lumina',
  url: 'https://lumina-shop.com',
  logo: 'https://lumina-shop.com/images/Logo-saeedpay',
  description: 'فروشگاه آنلاین لومینا - خرید آسان هزاران محصول متنوع با بهترین قیمت و ارسال سریع',
  foundingDate: '2020',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'تهران',
    addressLocality: 'تهران',
    addressCountry: 'IR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+98-21-0000-0000',
    contactType: 'customer service',
    availableLanguage: ['Persian'],
  },
  sameAs: [
    'https://instagram.com/lumina',
    'https://telegram.me/lumina',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'محصولات متنوع لومینا',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'لوازم الکترونیکی',
          category: 'الکترونیک',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'پوشاک و مد',
          category: 'پوشاک',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'لوازم خانگی',
          category: 'خانه و آشپزخانه',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'مواد غذایی',
          category: 'غذا و نوشیدنی',
        },
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <FeaturedProducts />
      <Categories />
      <SpecialOffers />
      <WhyChooseUs />
      <BusinessCTA />
      <Experience />
    </>
  );
}
