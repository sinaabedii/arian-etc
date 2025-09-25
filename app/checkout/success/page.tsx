'use client';

import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function CheckoutSuccessPage() {
  // Mock order data - در واقعیت از URL params یا state دریافت می‌شود
  const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('fa-IR');
  
  // Mock payment data - در واقعیت از state یا API دریافت می‌شود
  const paymentMethod = 'saeedpay'; // یا از state دریافت شود
  const installments = 6;
  const monthlyPayment = 173250;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container-max section-padding">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-4">
            سفارش شما با موفقیت ثبت شد!
          </h1>
          
          <p className="text-lg text-neutral-600 mb-8">
            از خرید شما متشکریم. سفارش شما در حال پردازش است و به زودی ارسال خواهد شد.
          </p>

          {/* Order Details Card */}
          <Card className="p-8 mb-8 text-right">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-neutral-800 mb-2">شماره سفارش:</h3>
                <p className="text-primary-600 font-bold text-lg">{orderNumber}</p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800 mb-2">تاریخ تحویل تقریبی:</h3>
                <p className="text-neutral-700 font-medium">{estimatedDelivery}</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-neutral-200">
              {paymentMethod === 'saeedpay' && (
                <div className="bg-gradient-to-r from-blue-50 to-primary-50 rounded-lg p-4 mb-4 border border-primary-200">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">💎</span>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-primary-800 mb-2">پرداخت اقساطی سعیدپی تأیید شد!</p>
                      <div className="grid grid-cols-2 gap-4 text-primary-700">
                        <div>
                          <span className="font-medium">تعداد اقساط:</span>
                          <span className="mr-1">{installments} ماه</span>
                        </div>
                        <div>
                          <span className="font-medium">مبلغ ماهانه:</span>
                          <span className="mr-1">{formatPrice(monthlyPayment)}</span>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-primary-600">
                        قسط اول در تاریخ {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fa-IR')} از حساب شما کسر خواهد شد.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">اطلاعیه مهم:</p>
                    <p>ایمیل تأیید سفارش و جزئیات پرداخت به آدرس ایمیل شما ارسال شده است. لطفاً صندوق ورودی خود را بررسی کنید.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">پیگیری سفارش</h3>
              <p className="text-sm text-neutral-600">
                از طریق داشبورد کاربری یا شماره سفارش، وضعیت ارسال را پیگیری کنید
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">ایمیل تأیید</h3>
              <p className="text-sm text-neutral-600">
                جزئیات کامل سفارش و فاکتور به ایمیل شما ارسال شده است
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">پشتیبانی</h3>
              <p className="text-sm text-neutral-600">
                در صورت نیاز به راهنمایی، با تیم پشتیبانی ما تماس بگیرید
              </p>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                مشاهده داشبورد
              </Button>
            </Link>
            
            <Link href="/products">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                ادامه خرید
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                تماس با پشتیبانی
              </Button>
            </Link>
          </div>

          {/* Social Share */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-600 mb-4">
              تجربه خرید خود را با دوستان به اشتراک بگذارید
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              
              <button className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </button>
              
              <button className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
