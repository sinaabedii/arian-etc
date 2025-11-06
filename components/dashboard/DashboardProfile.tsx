'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/lib/auth-service';
import Button from '@/components/ui/Button';
import type { ProfileResponse } from '@/types/auth';

const DashboardProfile: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const response = await authService.getProfile();
      if (response.success && response.data) {
        setProfile(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phone_number: response.data.phone_number,
        });
      } else {
        setErrors({ general: response.error?.message || 'خطا در بارگذاری اطلاعات' });
      }
    } catch (error: any) {
      setErrors({ general: error.message || 'خطا در بارگذاری اطلاعات' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'نام الزامی است';
    }

    if (!formData.email) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'فرمت ایمیل صحیح نیست';
    }

    if (!formData.phone_number) {
      newErrors.phone_number = 'شماره تلفن الزامی است';
    } else if (!/^09\d{9}$/.test(formData.phone_number)) {
      newErrors.phone_number = 'شماره تلفن باید با 09 شروع شود و 11 رقم باشد';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSaving(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const response = await authService.updateProfile(formData);

      if (response.success && response.data) {
        setProfile(response.data);
        setSuccessMessage('اطلاعات با موفقیت بروزرسانی شد');
        refreshUser();
      } else {
        setErrors({ general: response.error?.message || 'خطا در بروزرسانی اطلاعات' });
      }
    } catch (error: any) {
      setErrors({ general: error.message || 'خطا در بروزرسانی اطلاعات' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-neutral-200 p-16 text-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-neutral-600 font-semibold">در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-neutral-200 p-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <span className="text-3xl">👤</span>
          </div>
          <div>
            <h1 className="text-4xl font-black text-neutral-900">
              پروفایل کاربری
            </h1>
            <p className="text-neutral-600 mt-1">
              مشاهده و ویرایش اطلاعات حساب کاربری
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <div className="lg:col-span-1 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-neutral-200 p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-5xl text-white font-bold">
                {profile?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mb-1">{profile?.name}</h2>
            <p className="text-sm text-neutral-600 mb-6">{profile?.email}</p>
            
            <div className="space-y-4 text-right">
              <div className="p-3 bg-neutral-50 rounded-xl">
                <p className="text-xs text-neutral-500 mb-1">کد ملی</p>
                <p className="text-sm font-medium text-neutral-900">{profile?.national_id || '-'}</p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl">
                <p className="text-xs text-neutral-500 mb-1">شماره تلفن</p>
                <p className="text-sm font-medium text-neutral-900">{profile?.phone_number || '-'}</p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl">
                <p className="text-xs text-neutral-500 mb-1">وضعیت حساب</p>
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg ${
                  profile?.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {profile?.is_active ? 'فعال' : 'غیرفعال'}
                </span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl">
                <p className="text-xs text-neutral-500 mb-1">تاریخ عضویت</p>
                <p className="text-sm font-medium text-neutral-900">
                  {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('fa-IR') : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-neutral-200 p-8">
          <h3 className="text-lg font-bold text-neutral-900 mb-6">ویرایش اطلاعات</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <p className="text-sm font-medium text-green-700">{successMessage}</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errors.general && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  <p className="text-sm font-medium text-red-700">{errors.general}</p>
                </div>
              </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="name" className="text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                <span>👤</span>
                نام و نام خانوادگی
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                  errors.name ? 'border-red-500 bg-red-50' : 'border-neutral-200'
                }`}
                placeholder="نام و نام خانوادگی"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠️</span> {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                <span>📧</span>
                ایمیل
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-neutral-200'
                }`}
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠️</span> {errors.email}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone_number" className="text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                <span>📱</span>
                شماره تلفن
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                  errors.phone_number ? 'border-red-500 bg-red-50' : 'border-neutral-200'
                }`}
                placeholder="09123456789"
                maxLength={11}
              />
              {errors.phone_number && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠️</span> {errors.phone_number}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6 border-t border-neutral-200">
              <Button
                type="submit"
                disabled={isSaving}
                className="flex-1"
              >
                {isSaving ? (
                  <>
                    <span className="animate-spin text-xl ml-2">⏳</span>
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    <span className="text-xl ml-2">💾</span>
                    ذخیره تغییرات
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
