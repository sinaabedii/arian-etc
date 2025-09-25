import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">صفحه مورد نظر یافت نشد</h2>
          <p className="text-gray-600">
            صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button size="lg" className="w-full">
            <Link href="/">
              بازگشت به صفحه اصلی
            </Link>
          </Button>
          <Button variant="secondary" size="lg" className="w-full">
            <Link href="/products">
              مشاهده محصولات
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
