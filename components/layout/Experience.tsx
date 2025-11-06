'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { reviewService } from '@/lib/review-service';
import { toPersianDate } from '@/lib/date-utils';
import type { WebsiteReview } from '@/types/review';
import ReviewModal from '@/components/reviews/ReviewModal';
import { useAuth } from '@/contexts/AuthContext';
import Toast from '@/components/ui/Toast';

const Experience: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [reviews, setReviews] = useState<WebsiteReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await reviewService.getWebsiteReviews({
        featured: true,
        page_size: 10
      });
      
      if (response.success && response.data) {
        setReviews(response.data.results);
      } else {
        setError('خطا در بارگذاری نظرات');
      }
    } catch (err) {
      setError('خطا در بارگذاری نظرات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSuccess = () => {
    setShowToast(true);
    fetchReviews();
  };

  useEffect(() => {
    if (reviews.length > 0) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [reviews]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % reviews.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      service: 'خدمات مشتریان',
      delivery: 'ارسال و تحویل',
      quality: 'کیفیت محصول',
      website: 'سایت و رابط کاربری',
      general: 'عمومی'
    };
    return labels[category] || category;
  };

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-accent-cream">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {/* Top Left - Large Image */}
              <div className="col-span-2 lg:col-span-1">
                <div className="relative bg-primary-500 rounded-xl md:rounded-2xl p-4 md:p-6 h-64 md:h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Orange Chair"
                    width={300}
                    height={300}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              {/* Top Right - Sofa */}
              <div className="bg-secondary-100 rounded-xl md:rounded-2xl p-4 md:p-6 h-64 md:h-80">
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Modern Sofa"
                  width={300}
                  height={300}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-neutral-800 leading-tight">
                بهترین تجربه خرید و کیفیت را ارائه می‌دهیم
              </h2>
              
              <p className="text-sm md:text-base lg:text-lg text-neutral-600 leading-relaxed">
                با خیال راحت انتخاب کنید؛ تمام محصولات توسط تیم‌های حرفه‌ای و با استفاده از مواد اولیه باکیفیت تولید شده‌اند تا دوام، کارایی و زیبایی را همزمان تجربه کنید.
              </p>
            </div>

            <Button size="lg">
              اطلاعات بیشتر
            </Button>
          </div>
        </div>

        {/* Testimonial Slider Section */}
        <div className="mt-12 md:mt-16 lg:mt-24">
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-primary-100 rounded-full text-primary-600 font-medium text-xs md:text-sm mb-3 md:mb-4">
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              نظرات مشتریان راضی
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-3 md:mb-4">
              آنچه مشتریان ما می‌گویند
            </h3>
            <p className="text-sm md:text-base lg:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
              {reviews.length > 0 ? `${reviews.length} نظر تأیید شده از مشتریان ما` : 'تجربه واقعی مشتریان ما'}
            </p>
            
            {/* Add Review Button */}
            <div className="mt-6 flex flex-col items-center gap-3">
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    setIsModalOpen(true);
                  } else {
                    window.location.href = '/auth/login';
                  }
                }}
                className="group inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm md:text-base">ثبت نظر شما</span>
              </button>
              {!isAuthenticated && (
                <p className="text-xs md:text-sm text-neutral-500">
                  برای ثبت نظر ابتدا وارد حساب کاربری خود شوید
                </p>
              )}
            </div>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-50 via-transparent to-primary-50 rounded-4xl -z-10"></div>
            
            {/* Slider Container */}
            <div className="overflow-hidden rounded-2xl md:rounded-3xl">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"></div>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <p className="text-red-600 mb-4">{error}</p>
                  <Button onClick={() => window.location.reload()}>تلاش مجدد</Button>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-neutral-600">هنوز نظری ثبت نشده است</p>
                </div>
              ) : (
                <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                >
                  {reviews.map((review) => (
                    <div key={review.id} className="w-full flex-shrink-0 px-2 md:px-4">
                      <div className="bg-white rounded-2xl md:rounded-3xl shadow-soft hover:shadow-medium transition-all duration-300 p-6 md:p-8 lg:p-12 mx-2 md:mx-4 relative overflow-hidden">
                        {/* Quote Icon */}
                        <div className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 md:w-8 md:h-8 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                          </svg>
                        </div>

                        <div className="space-y-6 md:space-y-8">
                          {/* Category Badge */}
                          <div className="flex justify-center mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                              {getCategoryLabel(review.category)}
                            </span>
                          </div>

                          {/* Stars */}
                          <div className="flex justify-center space-x-0.5 md:space-x-1 space-x-reverse">
                            {[...Array(review.rating)].map((_, i) => (
                              <svg key={i} className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                              </svg>
                            ))}
                          </div>
                          
                          {/* Title */}
                          <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-800 text-center mb-4">
                            {review.title}
                          </h4>
                          
                          {/* Quote */}
                          <blockquote className="text-base sm:text-lg md:text-xl text-neutral-700 leading-relaxed text-center">
                            «{review.comment}»
                          </blockquote>
                          
                          {/* Author Info */}
                          <div className="flex flex-col items-center justify-center space-y-3 pt-4">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl">
                                {review.customer_name.charAt(0)}
                              </div>
                              <div className="text-center">
                                <div className="font-display font-bold text-base md:text-lg text-neutral-800">
                                  {review.customer_name}
                                </div>
                                <div className="text-xs md:text-sm text-neutral-500">
                                  {toPersianDate(review.created_at)}
                                </div>
                              </div>
                            </div>
                            {review.admin_response && (
                              <div className="mt-4 p-4 bg-blue-50 border-r-4 border-blue-500 rounded-lg w-full">
                                <div className="flex items-start space-x-2 space-x-reverse">
                                  <svg className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                  </svg>
                                  <div className="flex-1">
                                    <div className="text-sm font-semibold text-blue-900 mb-1">پاسخ مدیریت:</div>
                                    <p className="text-sm text-blue-800">{review.admin_response}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Arrows */}
            {reviews.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 bg-white rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-primary-50 z-10 group items-center justify-center"
                  aria-label="نظر قبلی"
                >
                  <svg className="w-6 h-6 text-neutral-600 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextTestimonial}
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 bg-white rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-primary-50 z-10 group items-center justify-center"
                  aria-label="نظر بعدی"
                >
                  <svg className="w-6 h-6 text-neutral-600 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Progress Indicators */}
            {reviews.length > 1 && (
              <div className="flex justify-center space-x-2 md:space-x-3 space-x-reverse mt-8 md:mt-12">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'w-12 h-3 bg-primary-500 rounded-full' 
                        : 'w-3 h-3 bg-neutral-300 hover:bg-primary-300 rounded-full'
                    }`}
                    aria-label={`رفتن به نظر ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleReviewSuccess}
      />

      {/* Success Toast */}
      <Toast
        message="نظر شما با موفقیت ثبت شد و پس از تأیید نمایش داده خواهد شد"
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
};

export default Experience;
