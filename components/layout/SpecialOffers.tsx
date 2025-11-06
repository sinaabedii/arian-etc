'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SpecialOffers: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-red-100 to-orange-100 text-red-700 rounded-full text-sm font-bold">
              🔥 پیشنهادهای ویژه
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            فرصت‌های طلایی امروز
          </h2>
          <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
            تخفیف‌های شگفت‌انگیز روی محصولات منتخب - فقط امروز!
          </p>
        </div>

        {/* Main Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Large Offer 1 */}
          <Link href="/products?sale=true" className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 h-[400px] md:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="پوشاک"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold">
                  تا 60% تخفیف
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 drop-shadow-2xl">
                کلکسیون پاییزه
              </h3>
              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-lg drop-shadow-lg">
                جدیدترین مدل‌های پوشاک با تخفیف استثنایی
              </p>
              <div className="flex items-center gap-3 text-white font-bold text-lg group-hover:gap-5 transition-all">
                <span>خرید کنید</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>

            {/* Animated Border */}
            <div className="absolute inset-0 border-4 border-white/20 rounded-3xl group-hover:border-white/40 transition-colors"></div>
          </Link>

          {/* Large Offer 2 */}
          <Link href="/products?category=electronics" className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 h-[400px] md:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="الکترونیک"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-bold">
                  تا 40% تخفیف
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 drop-shadow-2xl">
                گجت‌های هوشمند
              </h3>
              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-lg drop-shadow-lg">
                آخرین تکنولوژی‌ها با قیمت‌های باورنکردنی
              </p>
              <div className="flex items-center gap-3 text-white font-bold text-lg group-hover:gap-5 transition-all">
                <span>کشف کنید</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>

            {/* Animated Border */}
            <div className="absolute inset-0 border-4 border-white/20 rounded-3xl group-hover:border-white/40 transition-colors"></div>
          </Link>
        </div>

        {/* Three Small Offers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Small Offer 1 */}
          <Link href="/products?category=home" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 h-[280px]">
            <Image
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="دکوراسیون"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/40 to-transparent"></div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="inline-block mb-2 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold w-fit">
                30% تخفیف
              </span>
              <h4 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                دکوراسیون خانه
              </h4>
              <div className="flex items-center gap-2 text-white text-sm font-semibold">
                <span>خرید</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Small Offer 2 */}
          <Link href="/products?category=sports" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 h-[280px]">
            <Image
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="ورزشی"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-orange-900/40 to-transparent"></div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="inline-block mb-2 px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-bold w-fit">
                25% تخفیف
              </span>
              <h4 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                لوازم ورزشی
              </h4>
              <div className="flex items-center gap-2 text-white text-sm font-semibold">
                <span>خرید</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Small Offer 3 */}
          <Link href="/products?category=beauty" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 h-[280px]">
            <Image
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="آرایشی"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-900/80 via-pink-900/40 to-transparent"></div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="inline-block mb-2 px-3 py-1 bg-pink-500 text-white rounded-full text-xs font-bold w-fit">
                50% تخفیف
              </span>
              <h4 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                محصولات زیبایی
              </h4>
              <div className="flex items-center gap-2 text-white text-sm font-semibold">
                <span>خرید</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Timer Banner */}
        <div className="mt-12 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 rounded-2xl p-6 md:p-8 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="text-sm md:text-base font-semibold mb-2">⏰ تخفیف‌های شگفت‌انگیز</div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              فقط امروز - نگذارید از دست برود!
            </h3>
            <p className="text-base md:text-lg opacity-90 mb-6">
              تا پایان امروز فرصت دارید از این تخفیف‌های باورنکردنی استفاده کنید
            </p>
            <Link
              href="/products?sale=true"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-red-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>مشاهده همه تخفیف‌ها</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
