'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { paymentService } from '@/lib/payment-service';
import type { PaymentGateway } from '@/types/payment';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  duration: string;
  cost: number;
  icon: string;
}

// Map gateway icons
const getGatewayIcon = (gatewayType: string): React.ReactNode => {
  switch (gatewayType.toLowerCase()) {
    case 'saeedpay':
      return (
        <span className="inline-flex items-center">
          <Image src="/images/Logo-saeedpay.png" alt="SaeedPay" width={24} height={24} className="rounded" />
        </span>
      );
    case 'online':
      return '💳';
    default:
      return '💰';
  }
};

export default function CheckoutPage() {
  const router = useRouter();
  const { state, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    phone: '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>([]);
  const [loadingGateways, setLoadingGateways] = useState(true);
  const [gatewayError, setGatewayError] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedShipping, setSelectedShipping] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethodError, setPaymentMethodError] = useState('');
  const [shippingMethodError, setShippingMethodError] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  // Shipping methods
  const shippingMethods: ShippingMethod[] = [
    {
      id: 'express',
      name: 'پست پیشتاز',
      description: 'ارسال سریع با پست پیشتاز',
      duration: '1-2 روز کاری',
      cost: 80000,
      icon: '🚀'
    },
    {
      id: 'standard',
      name: 'پست عادی',
      description: 'ارسال استاندارد با پست ایران',
      duration: '3-5 روز کاری',
      cost: 50000,
      icon: '📦'
    },
    {
      id: 'courier',
      name: 'پیک موتوری',
      description: 'ارسال با پیک در تهران',
      duration: 'امروز',
      cost: 120000,
      icon: '🏍️'
    },
    {
      id: 'cargo',
      name: 'باربری',
      description: 'برای سفارش‌های حجیم',
      duration: '2-4 روز کاری',
      cost: 150000,
      icon: '🚚'
    }
  ];

  const getShippingCost = () => {
    if (state.total > 500000) return 0; // ارسال رایگان
    if (!selectedShipping) return 50000; // پیش‌فرض
    const method = shippingMethods.find(m => m.id === selectedShipping);
    return method?.cost || 50000;
  };

  const shippingCost = getShippingCost();
  const finalTotal = state.total + shippingCost;

  // Fetch payment gateways on mount
  useEffect(() => {
    const fetchGateways = async () => {
      if (!isAuthenticated) return;
      
      setLoadingGateways(true);
      setGatewayError(null);
      
      try {
        const gateways = await paymentService.getGateways();
        // Only allow online and saeedpay
        const allowed = gateways.filter(g => ['online', 'saeedpay'].includes(g.gateway_type?.toLowerCase()))
          .sort((a, b) => a.gateway_type.localeCompare(b.gateway_type));
        setPaymentGateways(allowed);

        // Auto-select first active gateway
        if (allowed.length > 0 && !selectedPayment) {
          setSelectedPayment(allowed[0].gateway_type);
        }
      } catch (error) {
        setGatewayError('خطا در بارگذاری روش‌های پرداخت. لطفاً صفحه را رفرش کنید.');
      } finally {
        setLoadingGateways(false);
      }
    };

    fetchGateways();
  }, [isAuthenticated]);

  const validateShippingInfo = () => {
    const newErrors: Record<string, string> = {};

    if (!shippingInfo.firstName.trim()) {
      newErrors.firstName = 'نام الزامی است';
    }
    if (!shippingInfo.lastName.trim()) {
      newErrors.lastName = 'نام خانوادگی الزامی است';
    }
    if (!shippingInfo.phone.trim()) {
      newErrors.phone = 'شماره تلفن الزامی است';
    } else if (!/^09\d{9}$/.test(shippingInfo.phone)) {
      newErrors.phone = 'شماره تلفن معتبر نیست';
    }
    if (!shippingInfo.email.trim()) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      newErrors.email = 'ایمیل معتبر نیست';
    }
    if (!shippingInfo.address.trim()) {
      newErrors.address = 'آدرس الزامی است';
    }
    if (!shippingInfo.city.trim()) {
      newErrors.city = 'شهر الزامی است';
    }
    if (!shippingInfo.postalCode.trim()) {
      newErrors.postalCode = 'کد پستی الزامی است';
    } else if (!/^\d{10}$/.test(shippingInfo.postalCode)) {
      newErrors.postalCode = 'کد پستی باید 10 رقم باشد';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateShippingInfo()) {
        setCurrentStep(2);
      }
      return;
    }
    if (currentStep === 2) {
      if (!selectedShipping) {
        setShippingMethodError('لطفاً یک روش ارسال را انتخاب کنید');
        return;
      }
      setShippingMethodError('');
      setCurrentStep(3);
      return;
    }
    if (currentStep === 3) {
      if (!selectedPayment) {
        setPaymentMethodError('لطفاً یک روش پرداخت را انتخاب کنید');
        return;
      }
      setPaymentMethodError('');
      setCurrentStep(4);
      return;
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      setErrors({});
      if (!selectedShipping) {
        setIsProcessing(false);
        setShippingMethodError('لطفاً یک روش ارسال را انتخاب کنید');
        setCurrentStep(2);
        return;
      }
      if (!selectedPayment) {
        setIsProcessing(false);
        setPaymentMethodError('لطفاً یک روش پرداخت را انتخاب کنید');
        setCurrentStep(3);
        return;
      }
      if (!paymentGateways || paymentGateways.length === 0) {
        throw new Error('هیچ درگاه پرداختی در دسترس نیست');
      }
      // Generate order ID (unique identifier for this order)
      const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Get current page URL for return URL
      const returnUrl = `${window.location.origin}/checkout/verify`;
      
      // Convert to Rials (backend expects Rials)
      const amountRial = Math.round(finalTotal * 10);

      // Do not enforce client-side min/max; rely on backend validation to match exact rules

      // Create payment request
      const paymentData = {
        gateway_type: selectedPayment,
        order_id: orderId,
        amount: amountRial,
        description: `خرید ${state.items.length} محصول - ${shippingInfo.firstName} ${shippingInfo.lastName}`,
        return_url: returnUrl,
        payer_mobile: shippingInfo.phone
      };
      
      const paymentResponse = await paymentService.createPayment(paymentData);
      
      // Store order info in session storage for verification page
      sessionStorage.setItem('pending_order', JSON.stringify({
        orderId,
        referenceCode: paymentResponse.reference_code,
        shippingInfo,
        shippingMethod: shippingMethods.find(m => m.id === selectedShipping),
        cartItems: state.items,
        total: finalTotal
      }));
      
      // Redirect to payment gateway
      if (paymentResponse.payment_url) {
        window.location.href = paymentResponse.payment_url;
      } else {
        throw new Error('No payment URL received from gateway');
      }
      
    } catch (error: any) {
      const msg: string = error?.message || 'خطا در ایجاد درخواست پرداخت. لطفاً دوباره تلاش کنید.';
      // If SaeedPay upstream failed (SSL/connection), guide the user to choose another method
      if (/saeedpay|payment request|ssl|httpsconnectionpool|eof/i.test(msg)) {
        setCurrentStep(3);
        setPaymentMethodError('درگاه اعتباری سعیدپی در حال حاضر در دسترس نیست. لطفاً «پرداخت آنلاین» را انتخاب کنید یا بعداً دوباره تلاش کنید.');
      } else {
        setErrors({ submit: msg });
      }
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-200 p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-neutral-900 mb-3">
              ورود به حساب کاربری
            </h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              برای تکمیل فرآیند خرید، لطفاً ابتدا وارد حساب کاربری خود شوید
            </p>
            <Link href="/auth/login">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                ورود به حساب
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-200 p-12 text-center">
            <div className="w-28 h-28 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <svg className="w-16 h-16 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2-2v4m16 0H4" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-neutral-900 mb-3">
              سبد خرید خالی است!
            </h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              لطفاً ابتدا محصولات دلخواه خود را به سبد خرید اضافه کنید
            </p>
            <Link href="/products">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                مشاهده محصولات
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg">
              ✅
            </div>
            <div>
              <h1 className="text-4xl font-black text-neutral-900">
                تکمیل خرید
              </h1>
              <p className="text-neutral-600 mt-1">
                تنها چند قدم تا دریافت سفارش شما باقی مانده
              </p>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between space-x-2 sm:space-x-4 space-x-reverse overflow-x-auto pb-2">
            {[
              { step: 1, title: 'اطلاعات ارسال', icon: '📝' },
              { step: 2, title: 'نوع ارسال', icon: '🚚' },
              { step: 3, title: 'روش پرداخت', icon: '💳' },
              { step: 4, title: 'بررسی نهایی', icon: '✅' }
            ].map((item) => (
              <div key={item.step} className="flex items-center min-w-fit">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold transition-all shadow-lg ${
                    currentStep >= item.step
                      ? 'bg-gradient-to-br from-primary-500 to-blue-500 text-white scale-110'
                      : 'bg-white/80 backdrop-blur-xl border-2 border-neutral-200 text-neutral-400'
                  }`}>
                    {currentStep > item.step ? '✓' : item.icon}
                  </div>
                  <span className={`mt-2 text-xs sm:text-sm whitespace-nowrap font-bold transition-colors ${
                    currentStep >= item.step ? 'text-primary-600' : 'text-neutral-500'
                  }`}>
                    {item.title}
                  </span>
                </div>
                {item.step < 4 && (
                  <div className={`w-8 sm:w-16 h-1 mx-2 sm:mx-4 rounded-full transition-all ${
                    currentStep > item.step ? 'bg-gradient-to-r from-primary-500 to-blue-500' : 'bg-neutral-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border-2 border-neutral-200 p-8">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-neutral-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                    📝
                  </div>
                  <h2 className="text-2xl font-black text-neutral-900">
                    اطلاعات ارسال
                  </h2>
                </div>
                
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        نام *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.firstName ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                        }`}
                        placeholder="نام خود را وارد کنید"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        نام خانوادگی *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.lastName ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                        }`}
                        placeholder="نام خانوادگی"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        شماره تلفن *
                      </label>
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.phone ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                        }`}
                        placeholder="09123456789"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        ایمیل *
                      </label>
                      <input
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.email ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                        }`}
                        placeholder="example@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      آدرس کامل *
                    </label>
                    <textarea
                      rows={3}
                      value={shippingInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.address ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                      }`}
                      placeholder="آدرس کامل خود را وارد کنید"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        شهر *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.city ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                        }`}
                        placeholder="تهران"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        کد پستی *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.postalCode ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                        }`}
                        placeholder="1234567890"
                      />
                      {errors.postalCode && (
                        <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      توضیحات اضافی
                    </label>
                    <textarea
                      rows={2}
                      value={shippingInfo.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="توضیحات اضافی برای تحویل (اختیاری)"
                    />
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Shipping Method */}
            {currentStep === 2 && (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border-2 border-neutral-200 p-8">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-neutral-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                    🚚
                  </div>
                  <h2 className="text-2xl font-black text-neutral-900">
                    انتخاب نوع ارسال
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {state.total > 500000 && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-green-800">
                          تبریک! سفارش شما برای ارسال رایگان واجد شرایط است
                        </span>
                      </div>
                    </div>
                  )}

                  {shippingMethods.map((method) => (
                    <div key={method.id}>
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                          selectedShipping === method.id
                            ? 'border-primary-500 bg-primary-50 shadow-md'
                            : 'border-neutral-200 hover:border-neutral-300 hover:shadow-sm'
                        }`}
                        onClick={() => {
                          setSelectedShipping(method.id);
                          setShippingMethodError('');
                        }}
                      >
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={selectedShipping === method.id}
                            onChange={() => setSelectedShipping(method.id)}
                            className="w-4 h-4 text-primary-600"
                          />
                          <div className="text-3xl">{method.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-neutral-800 text-lg">
                              {method.name}
                            </h3>
                            <p className="text-sm text-neutral-600 mt-1">
                              {method.description}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xs text-neutral-600">{method.duration}</span>
                              </div>
                              <span className="text-lg font-bold text-primary-600">
                                {state.total > 500000 ? (
                                  <span className="text-green-600">رایگان</span>
                                ) : (
                                  formatPrice(method.cost)
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Additional info for specific methods */}
                      {method.id === 'courier' && selectedShipping === 'courier' && (
                        <div className="mt-3 mr-8 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-800">
                            ⚠️ ارسال با پیک فقط در محدوده شهر تهران امکان‌پذیر است
                          </p>
                        </div>
                      )}
                      {method.id === 'cargo' && selectedShipping === 'cargo' && (
                        <div className="mt-3 mr-8 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <p className="text-sm text-amber-800">
                            📦 مناسب برای سفارش‌های حجیم و وزن بالا
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  {shippingMethodError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm mt-4">
                      {shippingMethodError}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border-2 border-neutral-200 p-8">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-neutral-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                    💳
                  </div>
                  <h2 className="text-2xl font-black text-neutral-900">
                    روش پرداخت
                  </h2>
                </div>
                
                {loadingGateways ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-neutral-600">در حال بارگذاری روش‌های پرداخت...</p>
                  </div>
                ) : gatewayError ? (
                  <div className="text-center py-8">
                    <p className="text-red-600 mb-4">{gatewayError}</p>
                    <Button onClick={() => window.location.reload()}>تلاش مجدد</Button>
                  </div>
                ) : paymentGateways.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-neutral-600">هیچ روش پرداختی در حال حاضر فعال نیست.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paymentGateways.map((gateway) => (
                      <div key={gateway.id}>
                        <div
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedPayment === gateway.gateway_type
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-neutral-200 hover:border-neutral-300'
                          }`}
                          onClick={() => setSelectedPayment(gateway.gateway_type)}
                        >
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <input
                              type="radio"
                              name="payment"
                              value={gateway.gateway_type}
                              checked={selectedPayment === gateway.gateway_type}
                              onChange={() => setSelectedPayment(gateway.gateway_type)}
                              className="w-4 h-4 text-primary-600"
                            />
                            <div className="text-2xl">{getGatewayIcon(gateway.gateway_type)}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-neutral-800">
                                {gateway.name}
                              </h3>
                              <p className="text-sm text-neutral-600">
                                کارمزد: {gateway.fee_percentage}% + {new Intl.NumberFormat('fa-IR').format(Math.round((gateway.fee_fixed || 0) / 10))} تومان
                              </p>
                              <p className="text-xs text-neutral-500 mt-1">
                                حداقل: {new Intl.NumberFormat('fa-IR').format(Math.round((gateway.min_amount || 0) / 10))} تومان - حداکثر: {new Intl.NumberFormat('fa-IR').format(Math.round((gateway.max_amount || 0) / 10))} تومان
                              </p>
                              {gateway.gateway_type === 'saeedpay' && (
                              <div className="flex items-center space-x-2 space-x-reverse mt-2">
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                  بدون ضامن
                                </span>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                  تأیید فوری
                                </span>
                                <a 
                                  href="https://saeedpay.com" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-primary-600 hover:text-primary-700 underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  saeedpay.com
                                </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* SaeedPay Info */}
                        {gateway.gateway_type === 'saeedpay' && selectedPayment === 'saeedpay' && (
                          <div className="mt-4 mr-8 p-4 bg-gradient-to-r from-blue-50 to-primary-50 rounded-lg border border-primary-200">
                            <div className="text-sm text-neutral-700 space-y-2">
                              <p className="font-semibold">پرداخت اعتباری با سعیدپی</p>
                              <p>گزینه‌های اقساط و جزئیات پرداخت در مرحله بعد نمایش داده می‌شود.</p>
                              <div className="mt-3 space-y-1">
                                <div className="flex items-center space-x-2 space-x-reverse text-sm text-green-700">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  <span>بدون نیاز به ضامن یا چک</span>
                                </div>
                                <div className="flex items-center space-x-2 space-x-reverse text-sm text-green-700">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  <span>تأیید و پرداخت فوری</span>
                                </div>
                                <div className="flex items-center space-x-2 space-x-reverse text-sm text-green-700">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  <span>امکان تسویه زودهنگام</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {paymentMethodError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {paymentMethodError}
                      </div>
                    )}
                  </div>
                )}

                {errors.submit && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {errors.submit}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Order Review */}
            {currentStep === 4 && (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border-2 border-neutral-200 p-8">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-neutral-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                    ✅
                  </div>
                  <h2 className="text-2xl font-black text-neutral-900">
                    بررسی نهایی سفارش
                  </h2>
                </div>
                
                {/* Shipping Info Summary */}
                <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                  <h3 className="font-semibold text-neutral-800 mb-3">اطلاعات ارسال:</h3>
                  <div className="text-sm text-neutral-600 space-y-1">
                    <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                    <p>{shippingInfo.phone}</p>
                    <p>{shippingInfo.email}</p>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.city} - {shippingInfo.postalCode}</p>
                  </div>
                </div>

                {/* Shipping Method Summary */}
                <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                  <h3 className="font-semibold text-neutral-800 mb-3">نوع ارسال:</h3>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="text-2xl">
                      {shippingMethods.find(m => m.id === selectedShipping)?.icon || '📦'}
                    </span>
                    <div>
                      <span className="text-sm font-medium text-neutral-800">
                        {shippingMethods.find(m => m.id === selectedShipping)?.name || 'روش ارسال انتخاب شده'}
                      </span>
                      <p className="text-xs text-neutral-600 mt-1">
                        زمان تحویل: {shippingMethods.find(m => m.id === selectedShipping)?.duration}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Method Summary */}
                <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                  <h3 className="font-semibold text-neutral-800 mb-3">روش پرداخت:</h3>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-lg">
                      {getGatewayIcon(selectedPayment)}
                    </span>
                    <div>
                      <span className="text-sm font-medium text-neutral-800">
                        {paymentGateways.find(g => g.gateway_type === selectedPayment)?.name || 'روش پرداخت انتخاب شده'}
                      </span>
                      {selectedPayment === 'saeedpay' && (
                        <p className="text-xs text-neutral-600 mt-1">
                          پرداخت اعتباری - جزئیات در درگاه
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-neutral-800">محصولات سفارش:</h3>
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="relative w-12 h-12 bg-neutral-200 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral-800">{item.name}</h4>
                          <p className="text-sm text-neutral-600">تعداد: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-neutral-800">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-neutral-200">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl border-2 border-neutral-300 hover:border-neutral-400 text-neutral-700 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  مرحله قبل
                </button>
              )}
              
              <div className="mr-auto">
                {currentStep < 4 ? (
                  <button
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    مرحله بعد
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        در حال پردازش...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        تکمیل خرید و پرداخت
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-neutral-200 p-8 sticky top-6">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-neutral-200">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                  📋
                </div>
                <h3 className="text-2xl font-black text-neutral-900">
                  خلاصه سفارش
                </h3>
              </div>

              <div className="space-y-3 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-neutral-600">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-neutral-200">
                <div className="flex justify-between">
                  <span className="text-neutral-600">جمع محصولات:</span>
                  <span className="font-medium">{formatPrice(state.total)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-neutral-600">هزینه ارسال:</span>
                    {selectedShipping && (
                      <span className="text-xs text-neutral-500">
                        {shippingMethods.find(m => m.id === selectedShipping)?.name}
                      </span>
                    )}
                  </div>
                  <span className="font-medium">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">رایگان</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-lg font-bold pt-3 border-t border-neutral-200">
                  <span>مجموع نهایی:</span>
                  <span className="text-primary-600">{formatPrice(finalTotal)}</span>
                </div>

                {selectedPayment === 'saeedpay' && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-primary-50 rounded-lg border border-primary-200">
                    <div className="text-center">
                      <div className="text-sm text-neutral-700 font-medium mb-1">پرداخت اعتباری سعیدپی</div>
                      <div className="text-xs text-neutral-600">
                        انتخاب اقساط در مرحله بعد
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
