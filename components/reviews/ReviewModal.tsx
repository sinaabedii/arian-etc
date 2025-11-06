'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { reviewService } from '@/lib/review-service';
import type { ReviewCategory } from '@/types/review';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: '',
    category: 'general' as ReviewCategory
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const categories = [
    { value: 'service', label: 'خدمات مشتریان', icon: '🤝' },
    { value: 'delivery', label: 'ارسال و تحویل', icon: '📦' },
    { value: 'quality', label: 'کیفیت محصول', icon: '⭐' },
    { value: 'website', label: 'سایت و رابط کاربری', icon: '💻' },
    { value: 'general', label: 'عمومی', icon: '💬' }
  ];

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'عنوان نظر الزامی است';
    } else if (formData.title.length < 3) {
      newErrors.title = 'عنوان باید حداقل 3 کاراکتر باشد';
    }

    if (!formData.comment.trim()) {
      newErrors.comment = 'متن نظر الزامی است';
    } else if (formData.comment.length < 10) {
      newErrors.comment = 'متن نظر باید حداقل 10 کاراکتر باشد';
    }

    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'امتیاز باید بین 1 تا 5 باشد';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await reviewService.createWebsiteReview(formData);

      if (response.success) {
        // Reset form
        setFormData({
          rating: 5,
          title: '',
          comment: '',
          category: 'general'
        });
        onSuccess();
        onClose();
      } else {
        setSubmitError(response.error?.message || 'خطا در ثبت نظر');
      }
    } catch (error: any) {
      setSubmitError(error.message || 'خطا در ثبت نظر. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        rating: 5,
        title: '',
        comment: '',
        category: 'general'
      });
      setErrors({});
      setSubmitError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-800">
                ثبت نظر شما
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                نظر شما پس از تأیید نمایش داده خواهد شد
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-neutral-400 hover:text-neutral-600 transition-colors disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                امتیاز شما *
              </label>
              <div className="flex items-center space-x-2 space-x-reverse">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <svg
                      className={`w-10 h-10 md:w-12 md:h-12 ${
                        star <= formData.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-neutral-300'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  </button>
                ))}
              </div>
              {errors.rating && (
                <p className="mt-2 text-sm text-red-600">{errors.rating}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                دسته‌بندی نظر *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleInputChange('category', cat.value)}
                    className={`flex items-center space-x-2 space-x-reverse p-3 rounded-lg border-2 transition-all ${
                      formData.category === cat.value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-sm font-medium">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
                عنوان نظر *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.title ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                }`}
                placeholder="مثال: خدمات عالی و محصولات باکیفیت"
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-neutral-700 mb-2">
                متن نظر *
              </label>
              <textarea
                id="comment"
                rows={5}
                value={formData.comment}
                onChange={(e) => handleInputChange('comment', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${
                  errors.comment ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                }`}
                placeholder="تجربه خود را با ما به اشتراک بگذارید..."
                disabled={isSubmitting}
              />
              {errors.comment && (
                <p className="mt-1 text-sm text-red-600">{errors.comment}</p>
              )}
              <p className="mt-1 text-xs text-neutral-500">
                حداقل 10 کاراکتر
              </p>
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{submitError}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    در حال ارسال...
                  </div>
                ) : (
                  'ثبت نظر'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1"
              >
                انصراف
              </Button>
            </div>

            {/* Info */}
            <div className="flex items-start space-x-2 space-x-reverse p-4 bg-blue-50 rounded-lg">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-blue-800">
                نظر شما پس از بررسی و تأیید توسط تیم مدیریت در سایت نمایش داده خواهد شد.
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ReviewModal;
