'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const Innovation: React.FC = () => {
  const innovations = [
    {
      id: 1,
      title: 'هوش مصنوعی در طراحی محصول',
      description: 'استفاده از الگوریتم‌های پیشرفته برای ایجاد محصولاتی که عادت‌های مثبت را تقویت می‌کنند',
      icon: '🤖',
      color: 'from-blue-500 to-purple-600',
      features: ['تحلیل رفتار کاربر', 'بهینه‌سازی تجربه', 'پیش‌بینی نیازها']
    },
    {
      id: 2,
      title: 'فناوری عادت‌سازی',
      description: 'ترکیب علم روان‌شناسی رفتاری با طراحی محصول برای ایجاد وابستگی مثبت',
      icon: '🧠',
      color: 'from-green-500 to-teal-600',
      features: ['حلقه‌های بازخورد', 'سیستم پاداش', 'انگیزش درونی']
    },
    {
      id: 3,
      title: 'طراحی تجربه محور',
      description: 'هر محصول با هدف ایجاد لحظات خوشایند و قابل تکرار طراحی شده است',
      icon: '✨',
      color: 'from-pink-500 to-rose-600',
      features: ['تجربه حسی', 'طراحی عاطفی', 'تعامل بصری']
    },
    {
      id: 4,
      title: 'اکوسیستم هوشمند',
      description: 'محصولات ما با یکدیگر ارتباط برقرار کرده و تجربه‌ای یکپارچه ایجاد می‌کنند',
      icon: '🌐',
      color: 'from-orange-500 to-red-600',
      features: ['اتصال IoT', 'همگام‌سازی داده', 'کنترل متمرکز']
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-green-400/5 to-teal-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-max section-padding relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-50 rounded-full mb-6">
            <span className="text-2xl ml-2">🚀</span>
            <span className="text-primary-700 font-medium text-sm">نوآوری و خلاقیت</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-neutral-800 mb-6 leading-tight">
            آینده محصولات
            <span className="block bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              اعتیادآور و مفید
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            ما با ترکیب علم، فناوری و خلاقیت، محصولاتی می‌سازیم که نه تنها مشکلات روزمره را حل می‌کنند، 
            بلکه عادت‌های مثبت ایجاد کرده و زندگی شما را بهتر می‌کنند
          </p>
        </div>

        {/* Innovation Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {innovations.map((innovation, index) => (
            <Card 
              key={innovation.id} 
              className="p-6 lg:p-8 hover:shadow-2xl transition-all duration-500 group border-0 bg-white/80 backdrop-blur-sm"
            >
              <div className="flex items-start space-x-4 space-x-reverse mb-6">
                <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-r ${innovation.color} flex items-center justify-center text-2xl lg:text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {innovation.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-display font-bold text-neutral-800 mb-3 group-hover:text-primary-600 transition-colors">
                    {innovation.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    {innovation.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {innovation.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2 space-x-reverse text-sm text-neutral-600">
                    <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">در حال توسعه</span>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">فعال</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {[
            { number: '50+', label: 'محصول نوآورانه', icon: '💡' },
            { number: '10k+', label: 'کاربر راضی', icon: '😊' },
            { number: '95%', label: 'رضایت مشتریان', icon: '⭐' },
            { number: '24/7', label: 'پشتیبانی', icon: '🎧' }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-neutral-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-display font-bold mb-4">
              آماده تجربه آینده هستید؟
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              محصولات نوآورانه ما را کشف کنید و تجربه‌ای متفاوت از زندگی روزمره داشته باشید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products">
                <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-8">
                  مشاهده محصولات
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white/10 font-medium px-8">
                  تماس با ما
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Innovation;
