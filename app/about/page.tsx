import React from 'react';
import { Metadata } from 'next';
import HeroSection from '@/components/about/HeroSection';
import ValuesSection from '@/components/about/ValuesSection';

export const metadata: Metadata = {
  title: 'درباره ما - فروشگاه آنلاین لومینا',
  description: 'آشنایی با لومینا - فروشگاه جامع آنلاین با بیش از 100,000 محصول متنوع. خرید آسان، قیمت مناسب، کیفیت تضمینی و ارسال سریع در سراسر کشور.',
  keywords: [
    'درباره لومینا',
    'فروشگاه آنلاین',
    'خرید اینترنتی',
    'فروشگاه اینترنتی',
    'خرید آنلاین',
    'لومینا شاپ',
    'ارسال رایگان',
    'قیمت مناسب',
    'کیفیت تضمینی'
  ],
  openGraph: {
    title: 'درباره فروشگاه آنلاین لومینا',
    description: 'بیش از 10 سال تجربه در ارائه بهترین محصولات با کیفیت تضمینی و ارسال سریع',
    images: ['/images/about-og.jpg'],
  },
  alternates: {
    canonical: 'https://lumina-shop.com/about',
  },
};



const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ValuesSection />
    </div>
  );
};

export default AboutPage;
