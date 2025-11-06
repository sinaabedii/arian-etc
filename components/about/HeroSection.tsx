import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6">
                <span className="text-2xl">🛍️</span>
                <span className="text-primary-700 font-bold">فروشگاه آنلاین لومینا</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-neutral-900 mb-6 leading-tight">
                خرید آسان،
                <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent"> سریع و مطمئن</span>
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed">
                لومینا، فروشگاه جامع آنلاین با بیش از <span className="font-bold text-primary-600">100,000</span> محصول متنوع در دسته‌بندی‌های مختلف. ما با ارائه بهترین قیمت، کیفیت تضمینی و ارسال سریع، تجربه خرید آنلاین بی‌نظیری را برای شما فراهم می‌کنیم.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border-2 border-primary-100 hover:border-primary-300 hover:scale-105 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">📅</div>
                  <div className="text-4xl font-black bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">10+</div>
                </div>
                <div className="text-neutral-700 font-semibold">سال تجربه موفق</div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border-2 border-green-100 hover:border-green-300 hover:scale-105 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">😊</div>
                  <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">500K+</div>
                </div>
                <div className="text-neutral-700 font-semibold">مشتری راضی</div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border-2 border-purple-100 hover:border-purple-300 hover:scale-105 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">📦</div>
                  <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">100K+</div>
                </div>
                <div className="text-neutral-700 font-semibold">محصول متنوع</div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border-2 border-blue-100 hover:border-blue-300 hover:scale-105 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">🎧</div>
                  <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">24/7</div>
                </div>
                <div className="text-neutral-700 font-semibold">پشتیبانی آنلاین</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80"
                alt="فروشگاه آنلاین لومینا"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-600/30 to-transparent" />
              
              {/* Floating badges */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-xl border border-primary-200 animate-bounce">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="text-xs text-neutral-600">کیفیت</div>
                    <div className="text-sm font-black text-primary-600">تضمین شده</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-xl border border-green-200">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <div className="text-xs text-neutral-600">ارسال</div>
                    <div className="text-sm font-black text-green-600">فوری و رایگان</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
