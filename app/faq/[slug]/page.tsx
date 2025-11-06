'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { faqService } from '@/lib/faq-service';
import type { FAQ, FAQCategory } from '@/types/faq';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const FAQCategoryPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [category, setCategory] = useState<FAQCategory | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (slug) {
      loadData();
    }
  }, [slug]);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Load category details and FAQs in parallel
      const [categoryResponse, faqsResponse] = await Promise.all([
        faqService.getFAQCategoryDetail(slug),
        faqService.getFAQs({ category: slug, page_size: 100 }),
      ]);

      if (categoryResponse.success && categoryResponse.data) {
        setCategory(categoryResponse.data);
      }

      if (faqsResponse.success && faqsResponse.data) {
        // Handle nested results structure
        const results: any = faqsResponse.data.results;
        if (Array.isArray(results) && results.length > 0 && results[0]?.results) {
          setFaqs(results[0].results as FAQ[]);
        } else if (Array.isArray(results)) {
          setFaqs(results as FAQ[]);
        }
      } else {
        setError(faqsResponse.error?.message || 'خطا در بارگذاری سوالات');
      }
    } catch (err) {
      setError('خطا در بارگذاری اطلاعات');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-neutral-200 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-neutral-200 rounded mb-8"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i}>
                <div className="h-6 bg-neutral-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">خطا در بارگذاری</h2>
          <p className="text-neutral-600 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={loadData}>تلاش مجدد</Button>
            <Link href="/faq">
              <Button variant="outline">بازگشت به دسته‌بندی‌ها</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-6">
          <Link href="/faq" className="hover:text-primary-600 transition-colors">
            سوالات متداول
          </Link>
          <span>←</span>
          <span className="text-neutral-900">{category?.name || slug}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {category?.name || 'سوالات متداول'}
          </h1>
          {category?.description && (
            <p className="text-lg text-neutral-600">{category.description}</p>
          )}
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در سوالات..."
              className="w-full px-5 py-4 pr-12 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
              🔍
            </div>
          </div>
        </div>

        {/* FAQs List */}
        {filteredFaqs.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-neutral-600">
              {searchQuery ? 'نتیجه‌ای یافت نشد' : 'سوالی موجود نیست'}
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <Link key={faq.id} href={`/faq/${slug}/${faq.id}`}>
                <Card className="hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {faq.question}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <span className="flex items-center gap-1">
                          👁️ {faq.views_count} بازدید
                        </span>
                        <span className="flex items-center gap-1">
                          👍 {faq.helpful_count} مفید
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-primary-600 group-hover:translate-x-1 transition-transform">
                      ←
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link href="/faq">
            <Button variant="outline">
              → بازگشت به همه دسته‌بندی‌ها
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQCategoryPage;
