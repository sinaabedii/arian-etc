'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem, isInCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      slug: item.slug
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container-max section-padding">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-display font-bold text-neutral-800 mb-4">
              لیست علاقه‌مندی‌های شما خالی است
            </h2>
            <p className="text-neutral-600 mb-8">
              محصولات مورد علاقه خود را به این لیست اضافه کنید
            </p>
            <Link href="/products">
              <Button size="lg">
                مشاهده محصولات
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-neutral-800 mb-2">
              علاقه‌مندی‌ها
            </h1>
            <p className="text-neutral-600">
              {items.length} محصول در لیست علاقه‌مندی‌های شما
            </p>
          </div>
          
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              پاک کردن همه
            </button>
          )}
        </div>

        {/* Wishlist Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="group overflow-hidden">
              {/* Product Image */}
              <div className="relative aspect-square bg-neutral-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* دکمه حذف از علاقه‌مندی‌ها */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors"
                  title="حذف از علاقه‌مندی‌ها"
                >
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-2 space-x-reverse">
                    <Link href={`/products/${item.slug}`}>
                      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors">
                        <svg className="w-5 h-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </Link>
                    
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={isInCart(item.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isInCart(item.id)
                          ? 'bg-green-500 text-white'
                          : 'bg-white text-neutral-700 hover:bg-neutral-100'
                      }`}
                      title={isInCart(item.id) ? 'در سبد خرید موجود است' : 'افزودن به سبد خرید'}
                    >
                      {isInCart(item.id) ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2-2v4m16 0H4" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                
                <h3 className="font-semibold text-neutral-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {item.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-primary-600">
                    {formatPrice(item.price)}
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={isInCart(item.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isInCart(item.id)
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-primary-500 text-white hover:bg-primary-600'
                    }`}
                  >
                    {isInCart(item.id) ? 'در سبد خرید' : 'افزودن به سبد'}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              ادامه خرید
            </Button>
          </Link>
          
          <Link href="/cart">
            <Button size="lg">
              مشاهده سبد خرید
            </Button>
          </Link>
        </div>

        {/* Tips Section */}
        <Card className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-primary-50">
          <div className="flex items-start space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">
                نکات مفید درباره لیست علاقه‌مندی‌ها
              </h3>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• محصولات مورد علاقه خود را ذخیره کنید تا بعداً خریداری کنید</li>
                <li>• از تخفیف‌های ویژه محصولات موجود در لیست علاقه‌مندی‌هایتان باخبر شوید</li>
                <li>• لیست خود را با دوستان و خانواده به اشتراک بگذارید</li>
                <li>• محصولات را مقایسه کنید و بهترین انتخاب را داشته باشید</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
