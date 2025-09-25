'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const backgroundImages = [
  {
    url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'بازیابی آسان رمز عبور'
  },
  {
    url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'امنیت حساب کاربری شما مهم است'
  },
  {
    url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'پشتیبانی 24 ساعته در خدمت شما'
  },
  {
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'بازگشت سریع به حساب کاربری'
  }
];

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('ایمیل الزامی است');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('فرمت ایمیل صحیح نیست');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      setError('خطا در ارسال ایمیل. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex">
        {/* Background Image Slider */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-800/60 to-green-700/80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-8">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
                    ایمیل ارسال شد
                  </h1>
                  <p className="text-xl lg:text-2xl font-light mb-8 opacity-90">
                    {image.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-neutral-50 via-white to-green-50">
          <div className="max-w-md w-full space-y-8">
            {/* Mobile Header */}
            <div className="text-center lg:hidden">
              <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg p-3">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/logo (3).png"
                    alt="آرین ای تی سی"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h2 className="text-3xl font-display font-bold text-neutral-800">
                ایمیل ارسال شد
              </h2>
              <p className="mt-4 text-neutral-600">
                لینک بازیابی رمز عبور به ایمیل شما ارسال شد
              </p>
            </div>

            {/* Desktop Header */}
            <div className="text-center hidden lg:block">
              <h2 className="text-3xl font-display font-bold text-neutral-800">
                ایمیل ارسال شد
              </h2>
              <p className="mt-4 text-neutral-600">
                لینک بازیابی رمز عبور به ایمیل شما ارسال شد. لطفاً صندوق ورودی خود را بررسی کنید.
              </p>
            </div>

            <Card className="p-8 text-center shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                    بررسی ایمیل خود کنید
                  </h3>
                  <p className="text-sm text-neutral-600">
                    ایمیل حاوی لینک بازیابی به آدرس <span className="font-medium text-neutral-800">{email}</span> ارسال شد.
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    💡 اگر ایمیل را نمی‌بینید، پوشه اسپم خود را نیز بررسی کنید.
                  </p>
                </div>
                
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="secondary"
                  className="w-full"
                >
                  ارسال مجدد ایمیل
                </Button>
                
                <Link
                  href="/auth/login"
                  className="block text-sm text-primary-600 hover:text-primary-500 transition-colors underline-offset-4 hover:underline"
                >
                  بازگشت به صفحه ورود
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Background Image Slider */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/60 to-primary-700/80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-8">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 p-3">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/logo (3).png"
                      alt="آرین ای تی سی"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
                  آرین ای تی سی
                </h1>
                <p className="text-xl lg:text-2xl font-light mb-8 opacity-90">
                  {image.title}
                </p>
                <div className="flex justify-center space-x-2 space-x-reverse">
                  {backgroundImages.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      onClick={() => setCurrentImageIndex(dotIndex)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        dotIndex === currentImageIndex
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-neutral-50 via-white to-primary-50">
        <div className="max-w-md w-full space-y-8">
          {/* Mobile Header */}
          <div className="text-center lg:hidden">
            <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg p-3">
              <div className="relative w-full h-full">
                <Image
                  src="/images/logo (3).png"
                  alt="آرین ای تی سی"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h2 className="text-3xl font-display font-bold text-neutral-800">
              آرین ای تی سی
            </h2>
            <p className="mt-2 text-neutral-600">
              محصولات مفید و اعتیادآور
            </p>
          </div>

          {/* Desktop Header */}
          <div className="text-center hidden lg:block">
            <h2 className="text-3xl font-display font-bold text-neutral-800">
              فراموشی رمز عبور
            </h2>
            <p className="mt-2 text-neutral-600">
              ایمیل خود را وارد کنید تا لینک بازیابی برایتان ارسال شود
            </p>
          </div>

          {/* Form */}
          <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <svg className="w-5 h-5 text-red-400 ml-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                ایمیل
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                  error ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                }`}
                placeholder="example@email.com"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  در حال ارسال...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  ارسال لینک بازیابی
                </div>
              )}
            </Button>
          </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-neutral-500">یا</span>
                </div>
              </div>

              <div className="mt-6 text-center space-y-4">
                <p className="text-sm text-neutral-600">
                  رمز عبور خود را به یاد آوردید؟{' '}
                  <Link
                    href="/auth/login"
                    className="font-medium text-primary-600 hover:text-primary-500 transition-colors underline-offset-4 hover:underline"
                  >
                    وارد شوید
                  </Link>
                </p>
                
                <p className="text-sm text-neutral-600">
                  حساب کاربری ندارید؟{' '}
                  <Link
                    href="/auth/register"
                    className="font-medium text-primary-600 hover:text-primary-500 transition-colors underline-offset-4 hover:underline"
                  >
                    ثبت نام کنید
                  </Link>
                </p>
                
                <div className="flex items-center justify-center space-x-4 space-x-reverse text-xs text-neutral-500">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    بازیابی امن
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    پشتیبانی 24/7
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
