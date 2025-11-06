'use client';

import React from 'react';
import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import ContactMethods from '@/components/contact/ContactMethods';
import dynamic from 'next/dynamic';

// Dynamic import for map
const LocationMap = dynamic(() => import('@/components/map/LocationMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-neutral-100 rounded-2xl flex items-center justify-center">
      <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"></div>
    </div>
  )
});

// Note: metadata export moved to layout for 'use client' directive
const metadata: Metadata = {
  title: 'تماس با ما',
  description: 'با تیم پشتیبانی لومینا در تماس باشید. پشتیبانی 24/7، راهنمایی خرید و پاسخگویی به سوالات شما.',
  keywords: [
    'تماس با لومینا',
    'پشتیبانی آنلاین',
    'پشتیبانی فنی',
    'راهنمایی خرید',
    'شماره تماس',
    'آدرس شرکت',
    'مشاوره رایگان'
  ],
  openGraph: {
    title: 'تماس با   ',
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
    description: 'پشتیبانی 24/7 آماده پاسخگویی',
    contact: '021-2452000',
    icon: '📞',
    action: 'تماس بگیرید',
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'ایمیل',
    description: 'پاسخ در کمتر از 24 ساعت',
    contact: 'support@lumina-shop.com',
    icon: '📧',
    action: 'ایمیل بفرستید',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'آدرس فروشگاه',
    description: 'مراجعه حضوری به دفتر مرکزی',
    contact: 'تهران - جردن - بلوار گل آذین - پلاک 20',
    icon: '📍',
    action: 'مسیریابی',
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'پشتیبانی آنلاین',
    description: 'چت آنلاین با کارشناسان',
    contact: 'همین حالا شروع کنید',
    icon: '💬',
    action: 'شروع چت',
    color: 'from-orange-500 to-red-500'
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
      <section className="py-12 lg:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container-max section-padding relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl text-white shadow-2xl mx-auto mb-6 animate-bounce">
              💬
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-neutral-900 mb-4">
              با ما در تماس باشید
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed mb-6 max-w-3xl mx-auto">
              تیم پشتیبانی حرفه‌ای لومینا 24 ساعته آماده پاسخگویی به سوالات شما و ارائه بهترین راهنمایی‌ها برای خرید آسان و مطمئن است.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border-2 border-primary-200">
                <span className="text-2xl">⚡</span>
                <span className="font-bold text-neutral-700">پاسخ سریع</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border-2 border-green-200">
                <span className="text-2xl">🎯</span>
                <span className="font-bold text-neutral-700">راهنمایی تخصصی</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border-2 border-blue-200">
                <span className="text-2xl">🤝</span>
                <span className="font-bold text-neutral-700">پشتیبانی 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods - 4 Column Grid */}
      <section className="py-12 lg:py-16 bg-neutral-50">
        <div className="container-max section-padding">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-black text-neutral-900 mb-3">
              راه‌های تماس با ما
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              ما همیشه آماده پاسخگویی به سوالات و نیازهای شما هستیم
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-neutral-200 shadow-lg hover:shadow-2xl hover:border-primary-300 hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center text-3xl shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                  {method.icon}
                </div>
                <h3 className="text-lg font-black text-neutral-900 mb-2">{method.title}</h3>
                <p className="text-sm text-neutral-600 mb-3">{method.description}</p>
                <p className="text-sm font-bold text-primary-600 mb-4 break-words">{method.contact}</p>
                <button className="w-full px-4 py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 font-bold rounded-lg transition-colors text-sm">
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Map & Form Section - Side by Side */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -z-10"></div>
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Right Column: Map + Info Cards */}
            <div className="space-y-6">
              {/* Section Header */}
              <div className="text-center lg:text-right">
                <div className="inline-block w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl text-white shadow-xl mb-4">
                  📍
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-neutral-900 mb-3">
                  مکان ما روی نقشه
                </h2>
                <p className="text-neutral-600 mb-6">
                  برای مراجعه حضوری، مشاوره یا دریافت محصولات
                </p>
              </div>

              {/* Map */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <LocationMap height="400px" zoom={16} markerText="فروشگاه لومینا" />
              </div>
              
              {/* Address Details */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border-2 border-primary-200 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-neutral-900 mb-2">📍 آدرس دفتر مرکزی</h3>
                      <p className="text-neutral-700 leading-relaxed font-medium">
                        تهران - جردن - بلوار گل آذین - پلاک 20
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-neutral-900 mb-2">🕐 ساعات کاری</h3>
                      <p className="text-neutral-700 leading-relaxed font-medium">
                        شنبه تا پنج‌شنبه:<br />
                        <span className="text-primary-600 font-bold">9:00 صبح - 9:00 شب</span><br />
                        جمعه: تعطیل
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-neutral-900 mb-2">📞 تماس مستقیم</h3>
                      <p className="text-neutral-700 leading-relaxed font-medium">
                        <a href="tel:02191000000" className="text-primary-600 hover:text-primary-700 font-bold">021-2452000</a>
                      </p>
                    </div>
                  </div>
                </div>
                
              </div>

              <a
                href="https://www.google.com/maps?q=35.77857469321197,51.423923904739006"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  مسیریابی در گوگل مپ
                </div>
              </a>
            </div>

            {/* Left Column: Contact Form */}
            <div>
              {/* Form Header */}
              <div className="text-center lg:text-right mb-8">
                <div className="inline-block w-14 h-14 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-xl mb-4">
                  ✉️
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-neutral-900 mb-3">
                  پیام خود را بفرستید
                </h2>
                <p className="text-neutral-600">
                  تیم ما آماده پاسخگویی به سوالات شماست
                </p>
              </div>

              {/* Form Card */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-6 lg:p-8">
                <ContactForm departments={departments} inline />
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-md text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-1">پاسخ سریع</h4>
                  <p className="text-xs text-neutral-600">حداکثر ۲۴ ساعت</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-md text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-1">امنیت</h4>
                  <p className="text-xs text-neutral-600">محرمانه و امن</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-md text-center">
                  <div className="text-2xl mb-2">💯</div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-1">حرفه‌ای</h4>
                  <p className="text-xs text-neutral-600">تیم متخصص</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;