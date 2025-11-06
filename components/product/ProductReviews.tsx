'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { reviewService } from '@/lib/review-service';
import type { Review, CreateReviewRequest } from '@/types/review';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

interface ProductReviewsProps {
  productId: number;
  productName: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, productName }) => {
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadReviews();
  }, [productId, page]);

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const response = await reviewService.getProductReviews(productId, {
        page,
        page_size: 10,
      });
      
      if (response.success && response.data) {
        if (page === 1) {
          setReviews(response.data.results);
        } else {
          setReviews(prev => [...prev, ...response.data!.results]);
        }
        setHasMore(!!response.data.next);
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
      const response = await reviewService.createProductReview(productId, formData);
      
      if (response.success) {
        setFormData({ rating: 5, title: '', comment: '' });
        setIsModalOpen(false);
        setPage(1);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR');
  };

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const starSize = size === 'lg' ? 'text-2xl' : 'text-lg';
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`${starSize} ${i < rating ? 'text-yellow-400' : 'text-neutral-300'}`}>
        ⭐
      </span>
    ));
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <div className="bg-white rounded-3xl shadow-xl border p-6 lg:p-10">
      <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-neutral-200">
        <div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-neutral-900 flex items-center gap-3">
            <span className="text-purple-600">💬</span>
            نظرات کاربران
          </h2>
          {reviews.length > 0 && (
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-2">
                {renderStars(Math.round(parseFloat(averageRating)))}
              </div>
              <span className="text-lg font-bold text-neutral-900">{averageRating}</span>
              <span className="text-sm text-neutral-500">({reviews.length} نظر)</span>
            </div>
          )}
        </div>
        
        {isAuthenticated && (
          <Button onClick={() => setIsModalOpen(true)} size="lg">
            <span className="text-lg ml-2">✍️</span>
            ثبت نظر
          </Button>
        )}
      </div>

      {/* Reviews List */}
      {isLoading && page === 1 ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-neutral-600">در حال بارگذاری نظرات...</p>
          </div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            هنوز نظری ثبت نشده است
          </h3>
          <p className="text-neutral-600 mb-6">
            اولین نفری باشید که نظر خود را درباره {productName} به اشتراک می‌گذارد!
          </p>
          {!isAuthenticated && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 max-w-md mx-auto">
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
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-6 border-2 border-neutral-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {review.customer_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">{review.customer_name}</p>
                    <p className="text-sm text-neutral-500">{formatDate(review.created_at)}</p>
                  </div>
                </div>
                
                {review.is_verified_purchase && (
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <span>✓</span>
                    <span>خرید تایید شده</span>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                {renderStars(review.rating)}
              </div>

              {/* Title */}
              <h4 className="text-lg font-bold text-neutral-900 mb-2">
                {review.title}
              </h4>

              {/* Comment */}
              <p className="text-neutral-700 leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}

          {/* Load More */}
          {hasMore && (
            <div className="text-center pt-4">
              <Button
                onClick={() => setPage(p => p + 1)}
                variant="outline"
                disabled={isLoading}
              >
                {isLoading ? 'در حال بارگذاری...' : 'نمایش نظرات بیشتر'}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Login Prompt for non-authenticated users */}
      {!isAuthenticated && reviews.length > 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mt-8 text-center">
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

      {/* Review Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`ثبت نظر برای ${productName}`} size="lg">
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
              <p className="mt-2 text-sm text-red-600 text-center">⚠️ {formErrors.rating}</p>
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
    </div>
  );
};

export default ProductReviews;
