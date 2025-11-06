'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { reviewService } from '@/lib/review-service';
import type { Review, CreateReviewRequest } from '@/types/review';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

const ReviewsSection: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateReviewRequest>({
    rating: 5,
    title: '',
    comment: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadReviews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (reviews.length > 0) {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const response = await reviewService.getMyReviews({ page_size: 10 });
      
      if (response.success && response.data) {
        setReviews(response.data.results);
      }
    } catch (err) {
      console.error('Error loading reviews:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    if (formErrors.rating) {
      setFormErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.title.trim()) errors.title = 'عنوان الزامی است';
    if (!formData.comment.trim()) errors.comment = 'نظر الزامی است';
    if (formData.rating < 1 || formData.rating > 5) errors.rating = 'امتیاز باید بین 1 تا 5 باشد';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await reviewService.createReview(formData);
      
      if (response.success) {
        setFormData({
          rating: 5,
          title: '',
          comment: '',
        });
        setIsModalOpen(false);
        loadReviews();
      } else {
        setError(response.error?.message || 'خطا در ثبت نظر');
      }
    } catch (err) {
      setError('خطا در ثبت نظر');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-2xl ${i < rating ? 'text-yellow-400' : 'text-neutral-300'}`}>
        ⭐
      </span>
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            💬 نظرات مشتریان
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            تجربه‌های واقعی مشتریان ما از خرید و استفاده از محصولات
          </p>
        </div>

        {/* Reviews Slider */}
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-neutral-600">در حال بارگذاری نظرات...</p>
            </div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">
              هنوز نظری ثبت نشده است
            </h3>
            <p className="text-neutral-600 mb-6">
              اولین نفری باشید که نظر خود را با ما به اشتراک می‌گذارد!
            </p>
            {isAuthenticated && (
              <Button onClick={() => setIsModalOpen(true)} size="lg">
                <span className="text-xl ml-2">✍️</span>
                ثبت نظر جدید
              </Button>
            )}
          </div>
        ) : (
          <div className="relative">
            {/* Book-like Cards Container */}
            <div className="relative h-[500px] max-w-4xl mx-auto perspective-1000">
              {reviews.map((review, index) => {
                const isActive = index === currentIndex;
                const isPrev = index === (currentIndex - 1 + reviews.length) % reviews.length;
                const isNext = index === (currentIndex + 1) % reviews.length;
                
                let transform = 'translateX(0%) rotateY(0deg) scale(0.8)';
                let zIndex = 0;
                let opacity = 0;

                if (isActive) {
                  transform = 'translateX(0%) rotateY(0deg) scale(1)';
                  zIndex = 30;
                  opacity = 1;
                } else if (isPrev) {
                  transform = 'translateX(-80%) rotateY(25deg) scale(0.85)';
                  zIndex = 20;
                  opacity = 0.6;
                } else if (isNext) {
                  transform = 'translateX(80%) rotateY(-25deg) scale(0.85)';
                  zIndex = 20;
                  opacity = 0.6;
                }

                return (
                  <div
                    key={review.id}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl transition-all duration-700 ease-in-out"
                    style={{
                      transform,
                      zIndex,
                      opacity,
                    }}
                  >
                    {/* Book Card */}
                    <div className="bg-gradient-to-br from-white to-neutral-50 rounded-3xl shadow-2xl p-8 lg:p-12 border-4 border-white transform-gpu">
                      {/* Page Binding Effect */}
                      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-neutral-200 to-transparent opacity-30 rounded-l-3xl"></div>
                      
                      {/* Verified Badge */}
                      {review.is_verified_purchase && (
                        <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                          <span>✓</span>
                          <span>خرید تایید شده</span>
                        </div>
                      )}

                      {/* Rating Stars */}
                      <div className="flex justify-center mb-6">
                        {renderStars(review.rating)}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 text-center mb-4">
                        {review.title}
                      </h3>

                      {/* Comment */}
                      <p className="text-neutral-700 text-lg leading-relaxed text-center mb-6 min-h-[120px]">
                        "{review.comment}"
                      </p>

                      {/* Author & Date */}
                      <div className="flex items-center justify-center gap-4 pt-6 border-t-2 border-neutral-200">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {review.customer_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-neutral-900">{review.customer_name}</p>
                          <p className="text-sm text-neutral-500">{formatDate(review.created_at)}</p>
                        </div>
                      </div>

                      {/* Page Number */}
                      <div className="absolute bottom-6 left-6 text-sm text-neutral-400 font-mono">
                        {index + 1} / {reviews.length}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevReview}
                className="w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center text-2xl text-purple-600"
              >
                →
              </button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-3 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-purple-600'
                        : 'w-3 bg-neutral-300 hover:bg-purple-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextReview}
                className="w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center text-2xl text-purple-600"
              >
                ←
              </button>
            </div>
          </div>
        )}

        {/* Add Review Button */}
        {isAuthenticated && reviews.length > 0 && (
          <div className="text-center mt-12">
            <Button onClick={() => setIsModalOpen(true)} size="lg">
              <span className="text-xl ml-2">✍️</span>
              ثبت نظر جدید
            </Button>
          </div>
        )}

        {/* Login Prompt */}
        {!isAuthenticated && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 max-w-2xl mx-auto mt-12 text-center">
            <p className="text-yellow-800 font-medium mb-4">
              🔒 برای ثبت نظر باید وارد حساب کاربری خود شوید
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/auth/login">
                <Button>ورود</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="outline">ثبت‌نام</Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="ثبت نظر جدید" size="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <p className="text-red-700">⚠️ {error}</p>
            </div>
          )}

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              ⭐ امتیاز شما *
            </label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="text-4xl transition-transform hover:scale-125"
                >
                  <span className={star <= formData.rating ? 'text-yellow-400' : 'text-neutral-300'}>
                    ⭐
                  </span>
                </button>
              ))}
            </div>
            {formErrors.rating && (
              <p className="mt-2 text-sm text-red-600">⚠️ {formErrors.rating}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-neutral-700 mb-2">
              📝 عنوان نظر *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all ${
                formErrors.title ? 'border-red-500' : 'border-neutral-200'
              }`}
              placeholder="عنوان کوتاهی برای نظر خود بنویسید"
            />
            {formErrors.title && (
              <p className="mt-1 text-sm text-red-600">⚠️ {formErrors.title}</p>
            )}
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-sm font-semibold text-neutral-700 mb-2">
              💬 نظر شما *
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={5}
              value={formData.comment}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none ${
                formErrors.comment ? 'border-red-500' : 'border-neutral-200'
              }`}
              placeholder="تجربه خود را با ما به اشتراک بگذارید..."
            />
            {formErrors.comment && (
              <p className="mt-1 text-sm text-red-600">⚠️ {formErrors.comment}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="flex-1">
              انصراف
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <>
                  <span className="animate-spin text-xl ml-2">⏳</span>
                  در حال ارسال...
                </>
              ) : (
                <>
                  <span className="text-xl ml-2">🚀</span>
                  ثبت نظر
                </>
              )}
            </Button>
          </div>
        </form>
      </Modal>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default ReviewsSection;
