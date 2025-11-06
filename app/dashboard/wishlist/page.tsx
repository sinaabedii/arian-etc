'use client';

import React from 'react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

const DashboardWishlistPage: React.FC = () => {
  const { items, clearWishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      slug: item.slug,
    });
  };

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      handleAddToCart(item);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-neutral-200 p-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <span className="text-3xl">❤️</span>
            </div>
            <div>
              <h1 className="text-4xl font-black text-neutral-900">
                علاقه‌مندی‌ها
              </h1>
              <p className="text-neutral-600 mt-1">
                {items.length === 0
                  ? 'لیست علاقه‌مندی‌ها خالی است'
                  : `${items.length} محصول در لیست`}
              </p>
            </div>
          </div>
          {items.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={handleAddAllToCart}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 font-bold rounded-xl transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2-2v4m16 0H4" />
                </svg>
                افزودن همه
              </button>
              <button
                onClick={clearWishlist}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-xl transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                پاک کردن
              </button>
            </div>
          )}
        </div>
        <p className="text-neutral-600">
          {items.length === 0
            ? 'لیست علاقه‌مندی‌های شما خالی است'
            : `${items.length} محصول در لیست علاقه‌مندی‌های شما`}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-neutral-200 p-16 text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-7xl">💔</span>
          </div>
          <h3 className="text-3xl font-black text-neutral-900 mb-4">
            لیست علاقه‌مندی‌ها خالی است!
          </h3>
          <p className="text-neutral-600 mb-8 text-lg">
            محصولی به لیست خود اضافه نکرده‌اید.
          </p>
          <Link href="/products">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              رفتن به فروشگاه
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border-2 border-neutral-200 overflow-hidden hover:shadow-2xl hover:border-primary-300 transition-all duration-300">
              {/* Image */}
              <div className="relative h-64 bg-neutral-100">
                <Image
                  src={item.image || '/images/placeholder.png'}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 left-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                >
                  <span className="text-red-600">❌</span>
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <Link href={`/products/${item.slug}`}>
                  <h3 className="font-bold text-lg text-neutral-800 hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-neutral-600 text-sm mb-4">{item.category}</p>
                
                <div className="flex items-center justify-between">
                  <p className="font-bold text-xl text-blue-600">
                    {item.price.toLocaleString('fa-IR')} تومان
                  </p>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <span className="ml-2">🛒</span>
                    افزودن
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 text-center">
          <p className="text-neutral-700 mb-4">
            آیا می‌خواهید همه محصولات را به سبد خرید اضافه کنید؟
          </p>
          <Button
            size="lg"
            onClick={handleAddAllToCart}
            className="bg-green-600 hover:bg-green-700"
          >
            <span className="ml-2">🛒</span>
            افزودن همه به سبد خرید
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardWishlistPage;
