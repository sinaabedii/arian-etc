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
  title: 'آکند شیمی خزر - محصولات نظافتی و ضدعفونی حرفه‌ای',
  description: 'آکند شیمی خزر تولیدکننده محصولات نظافتی و ضدعفونی با کیفیت حرفه‌ای، مجوز EPA و استاندارد بیمارستانی. راهکارهای ایمن و مؤثر برای منزل، اداره و مراکز درمانی.',
  keywords: [
    'آکند شیمی خزر',
    'محصولات نظافتی حرفه‌ای',
    'ضدعفونی کننده بیمارستانی',
    'شوینده صنعتی',
    'EPA approved',
    'محصولات بهداشتی',
    'نظافت حرفه‌ای',
    'ضدعفونی ویروس',
    'شرکت نظافتی',
    'فروشگاه محصولات شوینده'
  ],
  openGraph: {
    title: 'آکند شیمی خزر - محصولات نظافتی و ضدعفونی حرفه‌ای',
    description: 'کیفیت حرفه‌ای، ایمنی بالا و اثربخشی واقعی در محصولات نظافتی و ضدعفونی با مجوز EPA.',
    images: [
      {
        url: '/images/hero-og.jpg',
        width: 1200,
        height: 630,
        alt: 'آکند شیمی خزر - محصولات نظافتی حرفه‌ای',
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
  name: 'آکند شیمی خزر',
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
