'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { paymentService } from '@/lib/payment-service';
import { useCart } from '@/contexts/CartContext';
import type { PaymentTransaction } from '@/types/payment';

export default function PaymentVerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [transaction, setTransaction] = useState<PaymentTransaction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [orderInfo, setOrderInfo] = useState<any>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get reference code from URL params
        const referenceCode = searchParams.get('reference_code') || searchParams.get('ref');
        
        if (!referenceCode) {
          // Try to get from session storage
          const pendingOrder = sessionStorage.getItem('pending_order');
          if (pendingOrder) {
            const parsed = JSON.parse(pendingOrder);
            setOrderInfo(parsed);
            
            if (parsed.referenceCode) {
              await verifyWithCode(parsed.referenceCode);
            } else {
              setError('کد پیگیری پرداخت یافت نشد.');
              setVerifying(false);
            }
          } else {
            setError('اطلاعات پرداخت یافت نشد.');
            setVerifying(false);
          }
          return;
        }

        // Get order info from session
        const pendingOrder = sessionStorage.getItem('pending_order');
        if (pendingOrder) {
          setOrderInfo(JSON.parse(pendingOrder));
        }

        await verifyWithCode(referenceCode);
      } catch (err: any) {
        console.error('Verification error:', err);
        setError(err.message || 'خطا در تأیید پرداخت');
        setVerifying(false);
      }
    };

    const verifyWithCode = async (referenceCode: string) => {
      const result = await paymentService.verifyPayment({ reference_code: referenceCode });
      
      setTransaction(result.transaction);
      
      if (result.success && result.transaction.status === 'success') {
        setVerified(true);
        // Clear cart on successful payment
        clearCart();
        // Clear pending order from session
        sessionStorage.removeItem('pending_order');
      } else {
        setVerified(false);
        setError(result.message || 'پرداخت تأیید نشد');
      }
      
      setVerifying(false);
    };

    verifyPayment();
  }, [searchParams]);

  const reverify = async () => {
    try {
      setVerifying(true);
      setError(null);
      // Prefer URL param, fallback to session
      const urlRef = searchParams.get('reference_code') || searchParams.get('ref');
      let ref = urlRef as string | null;
      if (!ref) {
        const pendingOrder = sessionStorage.getItem('pending_order');
        if (pendingOrder) {
          const parsed = JSON.parse(pendingOrder);
          ref = parsed?.referenceCode || null;
        }
      }
      if (!ref) {
        setError('کد پیگیری پرداخت یافت نشد.');
        setVerifying(false);
        return;
      }
      const result = await paymentService.verifyPayment({ reference_code: ref });
      setTransaction(result.transaction);
      if (result.success && result.transaction.status === 'success') {
        setVerified(true);
        clearCart();
        sessionStorage.removeItem('pending_order');
      } else {
        setVerified(false);
        setError(result.message || 'پرداخت تأیید نشد');
      }
    } catch (err: any) {
      setError(err.message || 'خطا در تأیید پرداخت');
    } finally {
      setVerifying(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12">
        <Card className="p-8 text-center max-w-md">
          <div className="animate-spin w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-6"></div>
          <h2 className="text-2xl font-display font-bold text-neutral-800 mb-4">
            در حال تأیید پرداخت...
          </h2>
          <p className="text-neutral-600">
            لطفاً صبر کنید، در حال بررسی وضعیت پرداخت شما هستیم.
          </p>
        </Card>
      </div>
    );
  }

  if (error || !verified) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container-max section-padding">
          <Card className="p-8 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-display font-bold text-neutral-800 mb-4">
              پرداخت ناموفق
            </h2>
            
            <p className="text-neutral-600 mb-6">
              {error || 'متأسفانه پرداخت شما با موفقیت انجام نشد.'}
            </p>

            {transaction && (
              <div className="bg-neutral-50 rounded-lg p-4 mb-6 text-right">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">کد پیگیری:</span>
                    <span className="font-mono font-medium">{transaction.reference_code}</span>
                  </div>
                  {transaction.tracking_code && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">کد رهگیری:</span>
                      <span className="font-mono font-medium">{transaction.tracking_code}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-600">مبلغ:</span>
                    <span className="font-medium">{formatPrice(transaction.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">وضعیت:</span>
                    <span className="font-medium text-red-600">{transaction.status_display}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={reverify} variant="outline">تأیید مجدد پرداخت</Button>
              <Link href="/checkout">
                <Button>تلاش مجدد</Button>
              </Link>
              <Link href="/cart">
                <Button variant="outline">بازگشت به سبد خرید</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container-max section-padding">
        <Card className="p-8 text-center max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-display font-bold text-neutral-800 mb-4">
            پرداخت موفق!
          </h2>
          
          <p className="text-neutral-600 mb-8">
            سفارش شما با موفقیت ثبت شد و پرداخت انجام گرفت.
          </p>

          {/* Transaction Details */}
          {transaction && (
            <div className="bg-gradient-to-r from-blue-50 to-primary-50 rounded-lg p-6 mb-6 text-right border border-primary-200">
              <h3 className="font-semibold text-neutral-800 mb-4">جزئیات تراکنش</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">کد پیگیری:</span>
                  <span className="font-mono font-medium">{transaction.reference_code}</span>
                </div>
                {transaction.tracking_code && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">کد رهگیری بانک:</span>
                    <span className="font-mono font-medium">{transaction.tracking_code}</span>
                  </div>
                )}
                {transaction.order_id && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">شماره سفارش:</span>
                    <span className="font-mono font-medium">{transaction.order_id}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-neutral-600">مبلغ پرداختی:</span>
                  <span className="font-bold text-primary-600">{formatPrice(transaction.amount)}</span>
                </div>
                {transaction.fee_amount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">کارمزد:</span>
                    <span className="font-medium">{formatPrice(transaction.fee_amount)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-primary-200">
                  <span className="text-neutral-600">مبلغ کل:</span>
                  <span className="font-bold text-lg text-primary-600">{formatPrice(transaction.total_amount)}</span>
                </div>
                {transaction.paid_at && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">تاریخ پرداخت:</span>
                    <span className="font-medium">{formatDate(transaction.paid_at)}</span>
                  </div>
                )}
                {transaction.gateway_name && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">درگاه پرداخت:</span>
                    <span className="font-medium">{transaction.gateway_name}</span>
                  </div>
                )}
                {transaction.payment_method_display && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">روش پرداخت:</span>
                    <span className="font-medium">{transaction.payment_method_display}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Order Info */}
          {orderInfo && (
            <div className="bg-neutral-50 rounded-lg p-6 mb-6 text-right">
              <h3 className="font-semibold text-neutral-800 mb-4">اطلاعات ارسال</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p>{orderInfo.shippingInfo?.firstName} {orderInfo.shippingInfo?.lastName}</p>
                <p>{orderInfo.shippingInfo?.phone}</p>
                <p>{orderInfo.shippingInfo?.address}</p>
                <p>{orderInfo.shippingInfo?.city}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reverify} variant="outline">تأیید مجدد پرداخت</Button>
            <Link href={`/dashboard/transactions/${transaction?.reference_code}`}>
              <Button>مشاهده جزئیات تراکنش</Button>
            </Link>
            <Link href="/products">
              <Button variant="outline">ادامه خرید</Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-neutral-200 text-sm text-neutral-600">
            <p>
              یک نسخه از فاکتور به ایمیل شما ارسال شد.
            </p>
            <p className="mt-2">
              برای پیگیری سفارش خود به بخش 
              <Link href="/dashboard" className="text-primary-600 hover:text-primary-700 mx-1">
                پنل کاربری
              </Link>
              مراجعه کنید.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
