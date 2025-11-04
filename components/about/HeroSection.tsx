import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-50 via-white to-neutral-50">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-800 mb-6">
                درباره لومینا
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed">
                لومینا یک فروشگاه جامع آنلاین است که برای راحتی شما هزاران محصول در دسته‌بندی‌های مختلف از جمله مواد غذایی، لوازم خانگی، پوشاک، لوازم الکترونیکی و بسیاری دیگر را با بهترین قیمت و کیفیت ارائه می‌دهد.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                <div className="text-3xl font-bold text-primary-600 mb-2">20+</div>
                <div className="text-neutral-600">سال تجربه</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
                <div className="text-neutral-600">مشتری راضی</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                <div className="text-3xl font-bold text-primary-600 mb-2">100+</div>
                <div className="text-neutral-600">محصول متنوع</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
                <div className="text-neutral-600">پشتیبانی</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="درباره لومینا"
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
