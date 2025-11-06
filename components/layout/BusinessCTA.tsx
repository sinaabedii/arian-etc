import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const BusinessCTA: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white rounded-full"></div>
      </div>

      <div className="container-max section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-white">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-white/20 rounded-full text-xs md:text-sm font-medium">
                <span className="w-2 h-2 bg-white rounded-full ml-2"></span>
                پیشنهاد ویژه
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold leading-tight">
                شروع خرید آنلاین هوشمند
              </h2>
              
              <p className="text-sm md:text-base lg:text-lg text-white/90 leading-relaxed">
                با لومینا، همه چیز را در یک مکان پیدا کنید. هزاران محصول باکیفیت با بهترین قیمت، ارسال سریع و پشتیبانی عالی.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="flex items-center space-x-2 md:space-x-3 space-x-reverse">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm md:text-base text-white/90">تخفیف‌های ویژه</span>
              </div>
              
              <div className="flex items-center space-x-2 md:space-x-3 space-x-reverse">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm md:text-base text-white/90">ارسال رایگان</span>
              </div>
              
              <div className="flex items-center space-x-2 md:space-x-3 space-x-reverse">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm md:text-base text-white/90">ضمانت بازگشت کالا</span>
              </div>
              
              <div className="flex items-center space-x-2 md:space-x-3 space-x-reverse">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm md:text-base text-white/90">پشتیبانی 24/7</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100 font-semibold text-sm md:text-base w-full sm:w-auto">
                  مشاهده محصولات
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600 font-semibold text-sm md:text-base w-full sm:w-auto">
                  سبد خرید
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative mt-8 lg:mt-0">
            <div className="relative bg-white/10 rounded-3xl md:rounded-4xl p-6 md:p-8 backdrop-blur-sm">
              <Image
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="خرید آنلاین"
                width={500}
                height={400}
                className="w-full h-auto rounded-xl md:rounded-2xl object-cover"
              />
              
              {/* Floating Card */}
              <div className="hidden md:block absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl">
                <div className="flex items-center space-x-3 md:space-x-4 space-x-reverse">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm md:text-base font-semibold text-neutral-800">تحویل سریع</div>
                    <div className="text-xs md:text-sm text-neutral-600">2-5 روز کاری</div>
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

export default BusinessCTA;
