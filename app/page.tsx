import React from 'react';
import { Metadata } from 'next';
import Hero from '@/components/layout/Hero';
import Categories from '@/components/layout/Categories';
import Features from '@/components/layout/Features';
import Innovation from '@/components/layout/Innovation';
import WhyChooseUs from '@/components/layout/WhyChooseUs';
import Stats from '@/components/layout/Stats';
import BusinessCTA from '@/components/layout/BusinessCTA';
import Experience from '@/components/layout/Experience';
import Partners from '@/components/layout/Partners';

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
    canonical: 'https://akandchimi.com',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '  ',
  alternateName: 'Akand Chimi Khazar',
  url: 'https://akandchimi.com',
  logo: 'https://akandchimi.com/images/logo.png',
  description: 'تولیدکننده محصولات نظافتی و ضدعفونی با کیفیت حرفه‌ای و مجوز EPA',
  foundingDate: '2010',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'خیابان ولیعصر، پلاک 123',
    addressLocality: 'تهران',
    addressCountry: 'IR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+98-21-1234-5678',
    contactType: 'customer service',
    availableLanguage: ['Persian', 'English'],
  },
  sameAs: [
    'https://instagram.com/akandchimi',
    'https://linkedin.com/company/akandchimi',
    'https://t.me/akandchimi',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'محصولات نظافتی و ضدعفونی',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'ضدعفونی کننده‌های حرفه‌ای',
          category: 'محصولات بهداشتی',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'شوینده‌های صنعتی',
          category: 'محصولات نظافتی',
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
      <Categories />
      <Features />
      <Innovation />
      <WhyChooseUs />
      <Stats />
      <BusinessCTA />
      <Experience />
      <Partners />
    </>
  );
}
