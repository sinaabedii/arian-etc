'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { faqService } from '@/lib/faq-service';
import type { FAQCategory, PaginatedResponse } from '@/types/faq';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const FAQPage: React.FC = () => {
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await faqService.getFAQCategories({ page_size: 100 });
      
      if (response.success && response.data) {
        // Handle nested results structure from API
        const results: any = response.data.results;
        if (Array.isArray(results) && results.length > 0 && results[0]?.results) {
          setCategories(results[0].results as FAQCategory[]);
        } else if (Array.isArray(results)) {
          setCategories(results as FAQCategory[]);
        }
      } else {
        setError(response.error?.message || 'خطا در بارگذاری دسته‌بندی‌ها');
      }
    } catch (err) {
      setError('خطا در بارگذاری دسته‌بندی‌ها');
    } finally {
      setIsLoading(false);
    }
  };

  const getIconClass = (icon: string) => {
    // Map FontAwesome icons to emojis for now
    const iconMap: Record<string, string> = {
      'fa-question-circle': '❓',
      'fa-truck': '🚚',
      'fa-credit-card': '💳',
      'fa-shield-alt': '🛡️',
      'fa-box': '📦',
      'fa-user': '👤',
      'fa-cog': '⚙️',
      'fa-info-circle': 'ℹ️',
    };
    
    return iconMap[icon] || '📋';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="container-max section-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl text-white shadow-xl mx-auto mb-6">
                ❓
              </div>
              <h1 className="text-5xl font-black text-neutral-900 mb-4">
                سوالات متداول
              </h1>
              <p className="text-xl text-neutral-600">
                پاسخ سوالات خود را در اینجا پیدا کنید
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-neutral-200 p-6 animate-pulse">
                  <div className="h-12 w-12 bg-neutral-200 rounded-full mb-4"></div>
                  <div className="h-6 bg-neutral-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-neutral-200 rounded mb-4 w-full"></div>
                  <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="container-max section-padding">
          <div className="max-w-md mx-auto text-center bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-200 p-12">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-4xl">⚠️</div>
            </div>
            <h2 className="text-3xl font-black text-neutral-900 mb-3">خطا در بارگذاری</h2>
            <p className="text-neutral-600 mb-8">{error}</p>
            <button onClick={loadCategories} className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container-max section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl text-white shadow-xl mx-auto mb-6">
              ❓
            </div>
            <h1 className="text-5xl font-black text-neutral-900 mb-4">
              سوالات متداول
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              پاسخ سوالات خود را در اینجا پیدا کنید
            </p>
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl border-2 border-primary-200 hover:border-primary-400 text-primary-700 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                سوال شما پاسخ داده نشد؟ تماس با ما
              </button>
            </Link>
          </div>

          {/* Categories Grid */}
          {categories.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-neutral-200 text-center py-12">
              <div className="text-5xl mb-4">📋</div>
              <p className="text-neutral-600">هیچ دسته‌بندی‌ای یافت نشد</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link key={category.id} href={`/faq/${category.slug}`}>
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-neutral-200 p-6 h-full hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer group">
                  <div className="flex flex-col h-full">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                      {getIconClass(category.icon)}
                    </div>
                    
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-neutral-600 mb-4 flex-grow">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                      <span className="text-sm text-neutral-500">
                        {category.faq_count} سوال
                      </span>
                      <span className="text-primary-600 group-hover:translate-x-1 transition-transform">
                        ←
                      </span>
                    </div>
                  </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
