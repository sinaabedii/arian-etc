import React from 'react';
import { Metadata } from 'next';
import HeroSection from '@/components/about/HeroSection';
import ValuesSection from '@/components/about/ValuesSection';
import TeamSection from '@/components/about/TeamSection';

export const metadata: Metadata = {
  title: 'درباره ما',
  description: 'آشنایی با آکند شیمی خزر - تولیدکننده پیشرو محصولات نظافتی و ضدعفونی حرفه‌ای با بیش از 10 سال تجربه، مجوز EPA و استاندارد بیمارستانی.',
  keywords: [
    'درباره آکند شیمی خزر',
    'تاریخچه شرکت',
    'تولیدکننده محصولات نظافتی',
    'شرکت ضدعفونی',
    'نظافت حرفه‌ای',
    'EPA approved',
    'استاندارد بیمارستانی',
    'تیم متخصص',
    'کیفیت حرفه‌ای'
  ],
  openGraph: {
    title: 'درباره آکند شیمی خزر',
    description: 'تولیدکننده پیشرو محصولات نظافتی و ضدعفونی حرفه‌ای با بیش از 10 سال تجربه',
    images: ['/images/about-og.jpg'],
  },
  alternates: {
    canonical: 'https://akandchimi.com/about',
  },
};

const teamMembers = [
  {
    name: 'دکتر سارا جانسون',
    role: 'مدیر عامل',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'بیش از 15 سال تجربه در مهندسی شیمی و توسعه محصول'
  },
  {
    name: 'مایکل چن',
    role: 'رئیس تحقیق و توسعه',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'دکترای شیمی با تخصص در فرمولاسیون‌های ضدمیکروبی'
  },
  {
    name: 'امیلی رودریگز',
    role: 'مدیر تضمین کیفیت',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'متخصص انطباق با مقررات و استانداردهای ایمنی'
  },
  {
    name: 'دیوید کیم',
    role: 'مدیر عملیات',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'تعالی در تولید و بهینه‌سازی زنجیره تأمین'
  }
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ValuesSection />
      <TeamSection teamMembers={teamMembers} />
    </div>
  );
};

export default AboutPage;
