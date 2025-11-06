'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ticketService } from '@/lib/ticket-service';
import type { TicketCategory, CreateTicketRequest } from '@/types/ticket';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateTicketRequest>({
    name: '',
    email: '',
    phone_number: '',
    category: 0,
    subject: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-fill form with user data
  useEffect(() => {
    if (user && isOpen) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
      }));
    }
  }, [user, isOpen]);

  // Load categories when modal opens
  useEffect(() => {
    if (isOpen && categories.length === 0) {
      loadCategories();
    }
  }, [isOpen]);

  const loadCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const response = await ticketService.getTicketCategories({ page_size: 100 });
      
      if (response.success && response.data) {
        const results: any = response.data.results;
        if (Array.isArray(results) && results.length > 0 && results[0]?.results) {
          setCategories(results[0].results as TicketCategory[]);
        } else if (Array.isArray(results)) {
          setCategories(results as TicketCategory[]);
        }
      }
    } catch (err) {
      console.error('Error loading categories:', err);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'category' ? parseInt(value) : value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'نام الزامی است';
    if (!formData.email.trim()) newErrors.email = 'ایمیل الزامی است';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'ایمیل معتبر نیست';
    if (!formData.phone_number.trim()) newErrors.phone_number = 'شماره تماس الزامی است';
    else if (!/^09\d{9}$/.test(formData.phone_number)) newErrors.phone_number = 'شماره تماس معتبر نیست';
    if (!formData.category || formData.category === 0) newErrors.category = 'انتخاب دسته‌بندی الزامی است';
    if (!formData.subject.trim()) newErrors.subject = 'موضوع الزامی است';
    if (!formData.description.trim()) newErrors.description = 'توضیحات الزامی است';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await ticketService.createTicket(formData);
      
      if (response.success) {
        // Reset form
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          phone_number: user?.phone_number || '',
          category: 0,
          subject: '',
          description: '',
        });
        setErrors({});
        
        // Call success callback
        if (onSuccess) {
          onSuccess();
        }
        
        // Close modal
        onClose();
      } else {
        if (response.error?.errors) {
          setErrors(response.error.errors as any);
        } else {
          setError(response.error?.message || 'خطا در ارسال تیکت');
        }
      }
    } catch (err) {
      setError('خطا در ارسال تیکت. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryIcon = (icon: string) => {
    const iconMap: Record<string, string> = {
      'fa-cog': '⚙️',
      'fa-dollar-sign': '💰',
      'fa-question-circle': '❓',
      'fa-box': '📦',
      'fa-user': '👤',
    };
    return iconMap[icon] || '🎫';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ایجاد تیکت پشتیبانی" size="xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <p className="text-red-700 flex items-center gap-2">
              <span>⚠️</span> {error}
            </p>
          </div>
        )}

        {/* Name & Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
              👤 نام و نام خانوادگی *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/80 backdrop-blur-sm ${
                errors.name ? 'border-red-500' : 'border-neutral-200'
              }`}
              placeholder="نام خود را وارد کنید"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">⚠️ {errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
              📧 ایمیل *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/80 backdrop-blur-sm ${
                errors.email ? 'border-red-500' : 'border-neutral-200'
              }`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">⚠️ {errors.email}</p>
            )}
          </div>
        </div>

        {/* Phone & Category */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone_number" className="block text-sm font-semibold text-neutral-700 mb-2">
              📱 شماره تماس *
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/80 backdrop-blur-sm ${
                errors.phone_number ? 'border-red-500' : 'border-neutral-200'
              }`}
              placeholder="09123456789"
            />
            {errors.phone_number && (
              <p className="mt-1 text-sm text-red-600">⚠️ {errors.phone_number}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-neutral-700 mb-2">
              📂 دسته‌بندی *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={isLoadingCategories}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/80 backdrop-blur-sm ${
                errors.category ? 'border-red-500' : 'border-neutral-200'
              }`}
            >
              <option value="0">
                {isLoadingCategories ? 'در حال بارگذاری...' : 'انتخاب دسته‌بندی'}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {getCategoryIcon(cat.icon)} {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">⚠️ {errors.category}</p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-neutral-700 mb-2">
            📝 موضوع *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/80 backdrop-blur-sm ${
              errors.subject ? 'border-red-500' : 'border-neutral-200'
            }`}
            placeholder="خلاصه‌ای از مشکل خود را بنویسید"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">⚠️ {errors.subject}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-neutral-700 mb-2">
            💬 توضیحات کامل *
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none bg-white/80 backdrop-blur-sm ${
              errors.description ? 'border-red-500' : 'border-neutral-200'
            }`}
            placeholder="مشکل خود را به طور کامل شرح دهید..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">⚠️ {errors.description}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t border-neutral-200">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 border-2 border-neutral-300 hover:border-neutral-400 bg-white/70 backdrop-blur-sm text-neutral-700"
          >
            انصراف
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin text-xl ml-2">⏳</span>
                در حال ارسال...
              </>
            ) : (
              <>
                <span className="text-xl ml-2">🚀</span>
                ثبت تیکت
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTicketModal;
