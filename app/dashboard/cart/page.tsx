'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

const DashboardCartPage: React.FC = () => {
  const { state, clearCart, removeItem, updateQuantity } = useCart();
  const { items, total, itemCount } = state;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-neutral-200 p-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <span className="text-3xl">🛍️</span>
            </div>
            <div>
              <h1 className="text-4xl font-black text-neutral-900">
                سبد خرید
              </h1>
              <p className="text-neutral-600 mt-1">
                {items.length === 0
                  ? 'سبد خرید شما خالی است'
                  : `${itemCount} محصول در سبد`}
              </p>
            </div>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              پاک کردن
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-neutral-200 p-16 text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <span className="text-7xl">🛍️</span>
          </div>
          <h3 className="text-3xl font-black text-neutral-900 mb-4">
            سبد خرید شما خالی است!
          </h3>
          <p className="text-neutral-600 mb-8 text-lg">
            محصولی به سبد خرید خود اضافه نکرده‌اید.
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
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border-2 border-neutral-200 p-6 hover:shadow-xl hover:border-primary-300 transition-all"
              >
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
                    <Image
                      src={item.image || '/images/placeholder.png'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.slug}`}>
                      <h3 className="font-bold text-lg text-neutral-800 hover:text-blue-600 transition-colors mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-neutral-600 text-sm mb-3">{item.category}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 border border-neutral-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-neutral-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-neutral-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-bold text-lg text-blue-600">
                        {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors h-fit"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-neutral-200 p-8 sticky top-6">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-neutral-200">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                  📋
                </div>
                <h3 className="text-2xl font-black text-neutral-900">
                  خلاصه سفارش
                </h3>
              </div>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
                <div className="flex justify-between text-neutral-600">
                  <span>تعداد کالاها:</span>
                  <span className="font-semibold">{itemCount} محصول</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>جمع قیمت:</span>
                  <span className="font-semibold">
                    {total.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>هزینه ارسال:</span>
                  <span className="font-semibold text-green-600">رایگان</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 text-lg">
                <span className="font-bold text-neutral-800">مبلغ قابل پرداخت:</span>
                <span className="font-bold text-blue-600 text-2xl">
                  {total.toLocaleString('fa-IR')} تومان
                </span>
              </div>

              <Link href="/checkout" className="block">
                <button className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  ادامه و تسویه حساب
                </button>
              </Link>

              <Link href="/products" className="block mt-4">
                <Button variant="outline" size="lg" className="w-full">
                  <span className="ml-2">🛍️</span>
                  ادامه خرید
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCartPage;
