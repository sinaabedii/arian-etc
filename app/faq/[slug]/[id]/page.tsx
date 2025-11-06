'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { faqService } from '@/lib/faq-service';
import type { FAQDetail } from '@/types/faq';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const FAQDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const id = parseInt(params?.id as string);

  const [faq, setFaq] = useState<FAQDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMarkedHelpful, setHasMarkedHelpful] = useState(false);
  const [isMarkingHelpful, setIsMarkingHelpful] = useState(false);

  useEffect(() => {
    if (id) {
      loadFAQ();
    }
  }, [id]);

  const loadFAQ = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await faqService.getFAQDetail(id);

      if (response.success && response.data) {
        setFaq(response.data);
      } else {
        setError(response.error?.message || 'خطا در بارگذاری سوال');
      }
    } catch (err) {
      setError('خطا در بارگذاری سوال');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkHelpful = async () => {
    if (hasMarkedHelpful || isMarkingHelpful) return;

    setIsMarkingHelpful(true);

    try {
      const response = await faqService.markFAQHelpful(id);

      if (response.success && response.data) {
        setHasMarkedHelpful(true);
        // Update helpful count
        if (faq) {
          setFaq({
            ...faq,
            helpful_count: response.data.helpful_count,
          });
        }
      }
    } catch (err) {
      console.error('Error marking FAQ as helpful:', err);
    } finally {
      setIsMarkingHelpful(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-neutral-200 rounded w-1/4 mb-8"></div>
            <div className="h-10 bg-neutral-200 rounded w-3/4 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-neutral-200 rounded"></div>
              <div className="h-4 bg-neutral-200 rounded"></div>
              <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !faq) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">خطا در بارگذاری</h2>
          <p className="text-neutral-600 mb-6">{error || 'سوال یافت نشد'}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={loadFAQ}>تلاش مجدد</Button>
            <Link href={`/faq/${slug}`}>
              <Button variant="outline">بازگشت به لیست</Button>
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
        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-6 flex-wrap">
          <Link href="/faq" className="hover:text-primary-600 transition-colors">
            سوالات متداول
          </Link>
          <span>←</span>
          <Link href={`/faq/${slug}`} className="hover:text-primary-600 transition-colors">
            {faq.category_name}
          </Link>
          <span>←</span>
          <span className="text-neutral-900">جزئیات سوال</span>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
                {faq.question}
              </h1>
            </div>

            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <span className="flex items-center gap-1">
                👁️ {faq.views_count} بازدید
              </span>
              <span className="flex items-center gap-1">
                👍 {faq.helpful_count} نفر این پاسخ را مفید دانستند
              </span>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">پاسخ:</h2>
            <div
              className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: faq.answer || 'پاسخی موجود نیست' }}
            />
          </div>
        </Card>

        {/* Helpful Feedback */}
        <Card className="mb-6">
          <div className="text-center">
            <p className="text-lg font-medium text-neutral-900 mb-4">
              آیا این پاسخ برای شما مفید بود؟
            </p>
            <Button
              onClick={handleMarkHelpful}
              disabled={hasMarkedHelpful || isMarkingHelpful}
              variant={hasMarkedHelpful ? 'outline' : 'primary'}
            >
              {hasMarkedHelpful ? '✅ بازخورد شما ثبت شد' : isMarkingHelpful ? 'در حال ثبت...' : '👍 بله، مفید بود'}
            </Button>
            {hasMarkedHelpful && (
              <p className="text-sm text-green-600 mt-2">
                از بازخورد شما متشکریم!
              </p>
            )}
          </div>
        </Card>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <div className="text-center">
            <h3 className="text-xl font-bold text-neutral-900 mb-2">
              سوال شما پاسخ داده نشد؟
            </h3>
            <p className="text-neutral-700 mb-4">
              با تیم پشتیبانی ما تماس بگیرید
            </p>
            <Link href="/contact">
              <Button>
                تماس با پشتیبانی
              </Button>
            </Link>
          </div>
        </Card>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link href={`/faq/${slug}`}>
            <Button variant="outline">
              → بازگشت به {faq.category_name}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQDetailPage;
