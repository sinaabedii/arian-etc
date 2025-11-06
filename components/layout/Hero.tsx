'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"
          style={{
            transform: `translate(${-mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`
          }}
        ></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      </div>

      {/* Content */}
      <div className="container-max section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-12">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 backdrop-blur-md rounded-full border border-primary-200">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                </span>
                <span className="text-sm font-medium text-primary-700">جدیدترین محصولات در دسترس</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none">
                <span className="block pt-2 bg-gradient-to-r from-primary-600 via-blue-600 to-primary-600 bg-clip-text text-transparent animate-gradient">
                  خرید آنلاین
                </span>
                <span className="block mt-2 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  بدون محدودیت
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed max-w-2xl">
                هزاران محصول با کیفیت، قیمت‌های باورنکردنی و ارسال رایگان. تجربه خریدی متفاوت با 
                <span className="text-primary-600 font-bold"> لومینا</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/50">
                <span className="relative z-10 flex items-center gap-2">
                  شروع خرید
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>

              <Link href="/products?sale=true" className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-primary-700 bg-white border-2 border-primary-200 hover:border-primary-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-2">
                  <span className="text-red-500">🔥</span>
                  تخفیف‌های ویژه
                </span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                  100K+
                </div>
                <div className="text-sm text-neutral-600">محصول متنوع</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  50K+
                </div>
                <div className="text-sm text-neutral-600">مشتری راضی</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  98%
                </div>
                <div className="text-sm text-neutral-600">رضایت</div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative">
            {/* Main Product Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-300 via-blue-300 to-purple-300 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-neutral-200 shadow-2xl">
                <div className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-full animate-pulse">
                  50% تخفیف
                </div>

                <div className="relative h-80 mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="محصول ویژه"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-neutral-700 text-sm">(2.5K نظر)</span>
                  </div>

                  <h3 className="text-2xl font-bold text-neutral-900">هدفون بی‌سیم پرمیوم</h3>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-black text-neutral-900">۲.۵ میلیون تومان</span>
                    <span className="text-lg text-neutral-500 line-through">۵ میلیون تومان</span>
                  </div>

                  <Link href="/products" className="block w-full py-4 text-center font-bold text-white bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl hover:scale-105 transition-transform shadow-lg">
                    خرید سریع
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="hidden lg:block absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary-400 to-blue-400 rounded-2xl rotate-12 animate-float shadow-xl"></div>
            <div className="hidden lg:block absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl -rotate-12 animate-float animation-delay-2000 shadow-xl"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-neutral-400">
          <span className="text-sm">اسکرول کنید</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(12deg); }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  );
};

export default Hero;
