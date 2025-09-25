import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-50 via-white to-neutral-50">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-800 mb-6">
                راه‌حل‌های نظافت و ضدعفونی بیمارستانی
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                محصولات تخصصی ما برای محیط‌های بهداشتی و درمانی طراحی شده‌اند تا بالاترین 
                سطح ایمنی و بهداشت را تضمین کنند.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                <div className="text-3xl font-bold text-primary-600 mb-2">99.9%</div>
                <div className="text-neutral-600">کشتار میکروب‌ها</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                <div className="text-3xl font-bold text-primary-600 mb-2">30</div>
                <div className="text-neutral-600">ثانیه زمان اثر</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                <div className="text-3xl font-bold text-primary-600 mb-2">EPA</div>
                <div className="text-neutral-600">مجوز رسمی</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
                <div className="text-neutral-600">پشتیبانی فنی</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">
                مشاهده محصولات
              </Button>
              <Button variant="outline" size="lg">
                درخواست مشاوره
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="راه‌حل‌های بهداشتی"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
