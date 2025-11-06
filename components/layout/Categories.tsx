'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categoryService } from '@/lib/category-service';
import type { Category } from '@/types/category';

// رنگ‌های گرادیانت برای دسته‌بندی‌ها
const gradients = [
  'from-rose-400 via-pink-500 to-purple-600',
  'from-blue-400 via-cyan-500 to-teal-600',
  'from-amber-400 via-orange-500 to-red-600',
  'from-green-400 via-emerald-500 to-teal-600',
  'from-purple-400 via-violet-500 to-indigo-600',
  'from-pink-400 via-rose-500 to-red-600',
  'from-cyan-400 via-sky-500 to-blue-600',
  'from-yellow-400 via-amber-500 to-orange-600',
];

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await categoryService.getCategories({ page_size: 8 });
      
      if (response.success && response.data) {
        setCategories(response.data.results);
      } else {
        setError(response.error?.message || 'خطا در بارگذاری دسته‌بندی‌ها');
      }
    } catch (err) {
      setError('خطا در بارگذاری دسته‌بندی‌ها');
    } finally {
      setIsLoading(false);
    }
  };

  const getGradient = (index: number) => {
    return gradients[index % gradients.length];
  };

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-neutral-50 via-white to-blue-50">
        <div className="container-max section-padding">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
              دسته‌بندی محصولات
            </h2>
            <p className="text-base md:text-lg text-neutral-600">
              در حال بارگذاری...
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-neutral-200 rounded-2xl h-64"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-50 via-white to-blue-50">
        <div className="container-max section-padding">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">خطا در بارگذاری</h3>
            <p className="text-neutral-600 mb-6">{error}</p>
            <button
              onClick={loadCategories}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-neutral-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="hidden md:block absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="hidden md:block absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="container-max section-padding relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-3 md:mb-4">
            <span className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-bold">
              🛍️ دسته‌بندی‌ها
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-neutral-900 mb-3 md:mb-4">
            خرید بر اساس دسته‌بندی
          </h2>
          <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
            هزاران محصول متنوع در دسته‌بندی‌های مختلف برای راحتی خرید شما
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-105 h-full">
                {/* Background Image */}
                <div className="relative h-36 sm:h-48 md:h-56 overflow-hidden">
                  <Image
                    src={typeof category.image === 'string' && category.image.trim() ? category.image : 'https://images.unsplash.com/photo-1515165562835-c3b8c8c4c2f2?auto=format&fit=crop&w=800&q=60'}
                    alt={category.name || 'دسته‌بندی'}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    unoptimized
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-4 lg:p-6">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-1 drop-shadow-lg">
                      {category.name}
                    </h3>
                    
                    {/* Order Badge */}
                    <div className="flex items-center gap-1 md:gap-2">
                      <span className="px-2 py-0.5 md:px-3 md:py-1 bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs md:text-sm rounded-full font-medium">
                        #{category.order}
                      </span>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 md:mt-12 lg:mt-16">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm md:text-base font-bold rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>مشاهده همه محصولات</span>
            <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default Categories;
