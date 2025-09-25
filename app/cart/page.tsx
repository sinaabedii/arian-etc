'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const [discountCode, setDiscountCode] = React.useState('');
  const [appliedDiscount, setAppliedDiscount] = React.useState<{code: string, amount: number, percentage: number} | null>(null);
  const [discountError, setDiscountError] = React.useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  // Mock discount codes
  const discountCodes = {
    'WELCOME10': { percentage: 10, description: 'تخفیف ۱۰٪ خوش‌آمدگویی' },
    'SAVE20': { percentage: 20, description: 'تخفیف ۲۰٪ ویژه' },
    'FIRST50': { percentage: 50, description: 'تخفیف ۵۰٪ اولین خرید' },
  };

  const applyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    if (!code) {
      setDiscountError('لطفاً کد تخفیف را وارد کنید');
      return;
    }

    const discount = discountCodes[code as keyof typeof discountCodes];
    if (!discount) {
      setDiscountError('کد تخفیف معتبر نیست');
      return;
    }

    const discountAmount = Math.floor((state.total * discount.percentage) / 100);
    setAppliedDiscount({
      code,
      amount: discountAmount,
      percentage: discount.percentage
    });
    setDiscountError('');
    setDiscountCode('');
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    setDiscountError('');
  };

  const subtotal = state.total;
  const discountAmount = appliedDiscount?.amount || 0;
  const discountedTotal = subtotal - discountAmount;
  const shippingCost = discountedTotal > 500000 ? 0 : 50000;
  const finalTotal = discountedTotal + shippingCost;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container-max section-padding">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2-2v4m16 0H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-display font-bold text-neutral-800 mb-4">
              سبد خرید شما خالی است
            </h2>
            <p className="text-neutral-600 mb-8">
              محصولات مورد نظر خود را از فروشگاه انتخاب کنید
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
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-neutral-800 mb-2">
            سبد خرید
          </h1>
          <p className="text-neutral-600">
            {state.itemCount} محصول در سبد خرید شما
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-neutral-800 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-2">
                      دسته‌بندی: {item.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-primary-600">
                        {formatPrice(item.price)}
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="حذف از سبد"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Item Total */}
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">
                      جمع این محصول:
                    </span>
                    <span className="font-bold text-neutral-800">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </Card>
            ))}

            {/* Clear Cart Button */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                پاک کردن سبد خرید
              </button>
              <Link href="/products">
                <Button variant="outline">
                  ادامه خرید
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h3 className="text-xl font-display font-bold text-neutral-800 mb-6">
                خلاصه سفارش
              </h3>

              {/* Discount Code Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-neutral-800 mb-3">کد تخفیف</h4>
                {!appliedDiscount ? (
                  <div className="space-y-3">
                    <div className="flex space-x-2 space-x-reverse">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => {
                          setDiscountCode(e.target.value);
                          setDiscountError('');
                        }}
                        placeholder="کد تخفیف را وارد کنید"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        onKeyPress={(e) => e.key === 'Enter' && applyDiscount()}
                      />
                      <Button onClick={applyDiscount} size="sm" variant="outline">
                        اعمال
                      </Button>
                    </div>
                    {discountError && (
                      <p className="text-red-500 text-xs">{discountError}</p>
                    )}
                    <div className="text-xs text-neutral-500">
                      کدهای نمونه: WELCOME10, SAVE20, FIRST50
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-green-600 text-sm">✓</span>
                      <span className="text-sm font-medium text-green-800">
                        {appliedDiscount.code} ({appliedDiscount.percentage}٪ تخفیف)
                      </span>
                    </div>
                    <button
                      onClick={removeDiscount}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      حذف
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-600">جمع محصولات:</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>

                {appliedDiscount && (
                  <div className="flex justify-between text-green-600">
                    <span>تخفیف ({appliedDiscount.percentage}٪):</span>
                    <span className="font-medium">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">هزینه ارسال:</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">رایگان</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>

                {shippingCost > 0 && (
                  <div className="text-sm text-neutral-500 bg-blue-50 p-3 rounded-lg">
                    💡 برای ارسال رایگان {formatPrice(500000 - discountedTotal)} بیشتر خرید کنید
                  </div>
                )}

                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>مجموع نهایی:</span>
                    <span className="text-primary-600">{formatPrice(finalTotal)}</span>
                  </div>
                  {appliedDiscount && (
                    <div className="text-sm text-green-600 mt-1">
                      شما {formatPrice(discountAmount)} صرفه‌جویی کردید!
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/checkout">
                  <Button className="w-full" size="lg">
                    ادامه فرآیند خرید
                  </Button>
                </Link>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 space-x-reverse text-sm text-neutral-600">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>خرید امن و مطمئن</span>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="text-xs text-neutral-600">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    ضمانت اصالت
                  </div>
                  <div className="text-xs text-neutral-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    </div>
                    ارسال سریع
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
