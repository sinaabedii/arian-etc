import React from 'react';
import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import ContactMethods from '@/components/contact/ContactMethods';

export const metadata: Metadata = {
  title: 'تماس با ما',
  description: 'با تیم متخصص آکند شیمی خزر در تماس باشید. مشاوره رایگان، پشتیبانی فنی و راهنمایی خرید محصولات نظافتی و ضدعفونی حرفه‌ای.',
  keywords: [
    'تماس با آکند شیمی خزر',
    'مشاوره محصولات نظافتی',
    'پشتیبانی فنی',
    'راهنمایی خرید',
    'شماره تماس',
    'آدرس شرکت',
    'مشاوره رایگان'
  ],
  openGraph: {
    title: 'تماس با آکند شیمی خزر',
    description: 'مشاوره رایگان و پشتیبانی فنی محصولات نظافتی و ضدعفونی حرفه‌ای',
    images: ['/images/contact-og.jpg'],
  },
  alternates: {
    canonical: 'https://akandchimi.com/contact',
  },
};

const contactMethods = [
  {
    title: 'تماس تلفنی',
    description: 'با کارشناسان ما تماس بگیرید',
    contact: '+98 21 1234 5678',
    icon: '📞',
    action: 'تماس بگیرید'
  },
  {
    title: 'ایمیل',
    description: 'پیام خود را ارسال کنید',
    contact: 'info@akandchimi.com',
    icon: '📧',
    action: 'ایمیل بفرستید'
  },
  {
    title: 'آدرس',
    description: 'به دفتر ما مراجعه کنید',
    contact: 'تهران، خیابان ولیعصر، پلاک 123',
    icon: '📍',
    action: 'مسیریابی'
  }
];

const departments = [
  { value: 'sales', label: 'فروش' },
  { value: 'support', label: 'پشتیبانی' },
  { value: 'technical', label: 'فنی' },
  { value: 'general', label: 'عمومی' }
];

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-50 via-white to-neutral-50">
        <div className="container-max section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-800 mb-6">
              تماس با ما
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              تیم متخصص ما آماده پاسخگویی به سوالات شما و ارائه بهترین راه‌حل‌های نظافتی است. 
              با ما در تماس باشید تا بهترین خدمات را دریافت کنید.
            </p>
          </div>
        </div>
      </section>

      <ContactMethods contactMethods={contactMethods} />
      <ContactForm departments={departments} />
    </div>
  );
};

export default ContactPage;