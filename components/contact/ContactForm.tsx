'use client';

import React, { useState } from 'react';
import { faqService } from '@/lib/faq-service';
import type { ContactMessage } from '@/types/faq';
import Button from '@/components/ui/Button';

interface ContactFormData {
  name: string;
  email: string;
  phone_number: string;
  title: string;
  message: string;
}

interface Department {
  value: string;
  label: string;
}

interface ContactFormProps {
  departments: Department[];
  inline?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ departments, inline = false }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone_number: '',
    title: '',
    message: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'نام و نام خانوادگی الزامی است';
    if (!formData.email.trim()) newErrors.email = 'ایمیل الزامی است';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'ایمیل معتبر نیست';
    if (!formData.phone_number.trim()) newErrors.phone_number = 'شماره تماس الزامی است';
    else if (!/^09\d{9}$/.test(formData.phone_number)) newErrors.phone_number = 'شماره تماس معتبر نیست (مثال: 09123456789)';
    if (!formData.title.trim()) newErrors.title = 'موضوع الزامی است';
    if (!formData.message.trim()) newErrors.message = 'پیام الزامی است';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setIsSuccess(false);
    
    try {
      const response = await faqService.submitContactMessage(formData);
      
      if (response.success) {
        setIsSuccess(true);
        // ریست فرم
        setFormData({
          name: '',
          email: '',
          phone_number: '',
          title: '',
          message: ''
        });
        setErrors({});
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Show API error
        if (response.error?.errors) {
          setErrors(response.error.errors as any);
        } else {
          alert(response.error?.message || 'خطا در ارسال پیام');
        }
      }
    } catch (error) {
      alert('خطا در ارسال پیام. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Content without section wrapper for inline use
  const formContent = (
    <>

      {/* Success Message */}
      {isSuccess && (
            <div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-lg animate-[slideDown_0.5s_ease-out]">
              <div className="flex items-start gap-4">
                <div className="text-5xl animate-bounce">🎉</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    پیام شما با موفقیت ارسال شد!
                  </h3>
                  <p className="text-green-700">
                    تیم ما در اسرع وقت با شما تماس خواهد گرفت.
                  </p>
                </div>
                <div className="text-green-600 text-3xl">✓</div>
              </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="group">
                <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                  <span className="text-xl">👤</span>
                  نام و نام خانوادگی *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                      errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-neutral-200 group-hover:border-primary-300'
                    }`}
                    placeholder="نام و نام خانوادگی خود را وارد کنید"
                  />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <span>⚠️</span> {errors.name}
              </p>
            )}
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid sm:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                    <span className="text-xl">📧</span>
                    ایمیل *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                        errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-neutral-200 group-hover:border-primary-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <span>⚠️</span> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="phone_number" className="block text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                    <span className="text-xl">📱</span>
                    شماره تماس *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                        errors.phone_number ? 'border-red-500 focus:ring-red-500/20' : 'border-neutral-200 group-hover:border-primary-300'
                      }`}
                      placeholder="09123456789"
                    />
                    {errors.phone_number && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <span>⚠️</span> {errors.phone_number}
                      </p>
                    )}
                  </div>
                </div>
              </div>

        {/* Title */}
        <div className="group">
                <label htmlFor="title" className="block text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                  <span className="text-xl">📝</span>
                  موضوع *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                      errors.title ? 'border-red-500 focus:ring-red-500/20' : 'border-neutral-200 group-hover:border-primary-300'
                    }`}
                    placeholder="موضوع پیام خود را وارد کنید"
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠️</span> {errors.title}
                    </p>
                  )}
                </div>
              </div>

        {/* Message */}
        <div className="group">
                <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                  <span className="text-xl">💬</span>
                  پیام *
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none ${
                      errors.message ? 'border-red-500 focus:ring-red-500/20' : 'border-neutral-200 group-hover:border-primary-300'
                    }`}
                    placeholder="پیام خود را اینجا بنویسید..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠️</span> {errors.message}
                    </p>
                  )}
                </div>
              </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative overflow-hidden px-8 py-5 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-primary-500/40 hover:shadow-xl hover:shadow-primary-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin text-2xl">⏳</span>
                        <span>در حال ارسال...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl group-hover:rotate-12 transition-transform">🚀</span>
                        <span>ارسال پیام</span>
                      </>
                    )}
                  </span>
            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      </form>
    </>
  );

  // Return inline content or wrapped in section
  if (inline) {
    return formContent;
  }

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 -z-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -z-10"></div>

      <div className="container-max section-padding">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-primary-500/30">
              <span className="text-4xl">✉️</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              پیام خود را برای ما بفرستید
            </h2>
            <p className="text-lg text-neutral-600">
              تیم ما آماده پاسخگویی به سوالات شما است
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10">
            {formContent}
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mt-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-bold text-neutral-900 mb-1">پاسخگویی سریع</h4>
              <p className="text-sm text-neutral-600">حداکثر ۲۴ ساعت</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🔒</div>
              <h4 className="font-bold text-neutral-900 mb-1">امنیت اطلاعات</h4>
              <p className="text-sm text-neutral-600">محرمانه و امن</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">💯</div>
              <h4 className="font-bold text-neutral-900 mb-1">پشتیبانی حرفه‌ای</h4>
              <p className="text-sm text-neutral-600">تیم متخصص</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
