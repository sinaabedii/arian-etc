'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

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

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'saeedpay',
    name: 'خرید اقساطی سعیدپی',
    description: 'پرداخت اعتباری تا 24 قسط بدون ضامن',
    icon: '💎'
  },
  {
    id: 'online',
    name: 'پرداخت آنلاین',
    description: 'پرداخت امن با کارت بانکی',
    icon: '💳'
  },
  {
    id: 'cash',
    name: 'پرداخت در محل',
    description: 'پرداخت هنگام تحویل',
    icon: '💵'
  },
  {
    id: 'transfer',
    name: 'واریز بانکی',
    description: 'واریز به حساب شرکت',
    icon: '🏦'
  }
];

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
  const [selectedPayment, setSelectedPayment] = useState('saeedpay');
  const [selectedInstallments, setSelectedInstallments] = useState(3);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const shippingCost = state.total > 500000 ? 0 : 50000;
  const finalTotal = state.total + shippingCost;

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
    if (currentStep === 1 && validateShippingInfo()) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      if (selectedPayment === 'saeedpay') {
        // Mock SaeedPay integration
        console.log('Redirecting to SaeedPay for installment payment:', {
          amount: finalTotal,
          installments: selectedInstallments,
          monthlyPayment: Math.ceil(finalTotal / selectedInstallments)
        });
        
        // Simulate SaeedPay redirect and approval process
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // In real implementation, this would redirect to saeedpay.com
        // window.location.href = `https://saeedpay.com/checkout?amount=${finalTotal}&installments=${selectedInstallments}&merchant_id=YOUR_MERCHANT_ID`;
        
      } else {
        // Other payment methods
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      // Clear cart and redirect to success page
      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      console.error('Order placement failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-display font-bold text-neutral-800 mb-4">
            ورود به حساب کاربری
          </h2>
          <p className="text-neutral-600 mb-6">
            برای ادامه فرآیند خرید، لطفاً وارد حساب کاربری خود شوید.
          </p>
          <Link href="/auth/login">
            <Button>ورود به حساب کاربری</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-display font-bold text-neutral-800 mb-4">
            سبد خرید خالی است
          </h2>
          <p className="text-neutral-600 mb-6">
            برای ادامه فرآیند خرید، ابتدا محصولاتی به سبد خرید اضافه کنید.
          </p>
          <Link href="/products">
            <Button>مشاهده محصولات</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-neutral-800 mb-2">
            تکمیل خرید
          </h1>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-4 space-x-reverse mt-6">
            {[
              { step: 1, title: 'اطلاعات ارسال' },
              { step: 2, title: 'روش پرداخت' },
              { step: 3, title: 'بررسی نهایی' }
            ].map((item) => (
              <div key={item.step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= item.step
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {item.step}
                </div>
                <span className={`mr-2 text-sm ${
                  currentStep >= item.step ? 'text-primary-600' : 'text-neutral-600'
                }`}>
                  {item.title}
                </span>
                {item.step < 3 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > item.step ? 'bg-primary-500' : 'bg-neutral-200'
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
              <Card className="p-6">
                <h2 className="text-xl font-display font-bold text-neutral-800 mb-6">
                  اطلاعات ارسال
                </h2>
                
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
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <Card className="p-6">
                <h2 className="text-xl font-display font-bold text-neutral-800 mb-6">
                  روش پرداخت
                </h2>
                
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id}>
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedPayment === method.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                        onClick={() => setSelectedPayment(method.id)}
                      >
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={() => setSelectedPayment(method.id)}
                            className="w-4 h-4 text-primary-600"
                          />
                          <div className="text-2xl">{method.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-neutral-800">
                              {method.name}
                            </h3>
                            <p className="text-sm text-neutral-600">
                              {method.description}
                            </p>
                            {method.id === 'saeedpay' && (
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

                      {/* SaeedPay Installment Options */}
                      {method.id === 'saeedpay' && selectedPayment === 'saeedpay' && (
                        <div className="mt-4 mr-8 p-4 bg-gradient-to-r from-blue-50 to-primary-50 rounded-lg border border-primary-200">
                          <h4 className="font-semibold text-neutral-800 mb-4">انتخاب تعداد اقساط:</h4>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                            {[3, 6, 12, 24].map((months) => {
                              const monthlyPayment = Math.ceil(finalTotal / months);
                              return (
                                <div
                                  key={months}
                                  className={`p-3 rounded-lg cursor-pointer transition-colors text-center ${
                                    selectedInstallments === months
                                      ? 'bg-primary-500 text-white'
                                      : 'bg-white border border-neutral-200 hover:border-primary-300'
                                  }`}
                                  onClick={() => setSelectedInstallments(months)}
                                >
                                  <div className="font-bold">{months} قسط</div>
                                  <div className="text-sm mt-1">
                                    {formatPrice(monthlyPayment)}
                                  </div>
                                  <div className="text-xs mt-1 opacity-75">
                                    ماهانه
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="bg-white rounded-lg p-4 border border-primary-200">
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-neutral-600">مبلغ هر قسط:</p>
                                <p className="font-bold text-lg text-primary-600">
                                  {formatPrice(Math.ceil(finalTotal / selectedInstallments))}
                                </p>
                              </div>
                              <div>
                                <p className="text-neutral-600">مدت پرداخت:</p>
                                <p className="font-bold text-lg text-neutral-800">
                                  {selectedInstallments} ماه
                                </p>
                              </div>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-neutral-200">
                              <div className="flex items-center space-x-2 space-x-reverse text-sm text-green-700">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>بدون نیاز به ضامن یا چک</span>
                              </div>
                              <div className="flex items-center space-x-2 space-x-reverse text-sm text-green-700 mt-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>تأیید و پرداخت فوری</span>
                              </div>
                              <div className="flex items-center space-x-2 space-x-reverse text-sm text-green-700 mt-1">
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
                </div>
              </Card>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <Card className="p-6">
                <h2 className="text-xl font-display font-bold text-neutral-800 mb-6">
                  بررسی نهایی سفارش
                </h2>
                
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

                {/* Payment Method Summary */}
                <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                  <h3 className="font-semibold text-neutral-800 mb-3">روش پرداخت:</h3>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-lg">
                      {paymentMethods.find(m => m.id === selectedPayment)?.icon}
                    </span>
                    <div>
                      <span className="text-sm text-neutral-600">
                        {paymentMethods.find(m => m.id === selectedPayment)?.name}
                      </span>
                      {selectedPayment === 'saeedpay' && (
                        <div className="mt-1">
                          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                            {selectedInstallments} قسط ماهانه
                          </span>
                          <span className="text-xs text-neutral-500 mr-2">
                            {formatPrice(Math.ceil(finalTotal / selectedInstallments))} در ماه
                          </span>
                        </div>
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
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  مرحله قبل
                </Button>
              )}
              
              <div className="mr-auto">
                {currentStep < 3 ? (
                  <Button onClick={handleNextStep}>
                    مرحله بعد
                  </Button>
                ) : (
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        در حال پردازش...
                      </div>
                    ) : (
                      'تکمیل خرید'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h3 className="text-xl font-display font-bold text-neutral-800 mb-6">
                خلاصه سفارش
              </h3>

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
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">هزینه ارسال:</span>
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
                      <div className="text-sm text-neutral-600 mb-1">پرداخت اقساطی سعیدپی</div>
                      <div className="font-bold text-primary-600">
                        {selectedInstallments} قسط × {formatPrice(Math.ceil(finalTotal / selectedInstallments))}
                      </div>
                      <div className="text-xs text-neutral-500 mt-1">
                        بدون ضامن و تأیید فوری
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
