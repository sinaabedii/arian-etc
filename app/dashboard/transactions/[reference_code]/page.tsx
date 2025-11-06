'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { paymentService } from '@/lib/payment-service';
import type { PaymentTransaction } from '@/types/payment';

export default function TransactionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const referenceCode = params.reference_code as string;
  
  const [transaction, setTransaction] = useState<PaymentTransaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login?redirect=/dashboard/transactions');
      return;
    }

    if (referenceCode) {
      fetchTransaction();
    }
  }, [isAuthenticated, referenceCode]);

  const fetchTransaction = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await paymentService.getTransaction(referenceCode);
      setTransaction(data);
    } catch (err: any) {
      console.error('Failed to fetch transaction:', err);
      setError(err.message || 'خطا در بارگذاری جزئیات تراکنش');
    } finally {
      setLoading(false);
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
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusBadge = (status: string, statusDisplay: string) => {
    const colors: Record<string, string> = {
      success: 'bg-green-100 text-green-700 border-green-300',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      failed: 'bg-red-100 text-red-700 border-red-300',
      cancelled: 'bg-gray-100 text-gray-700 border-gray-300',
      expired: 'bg-orange-100 text-orange-700 border-orange-300'
    };
    
    return (
      <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${colors[status] || 'bg-gray-100 text-gray-700 border-gray-300'}`}>
        {statusDisplay}
      </span>
    );
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container-max section-padding">
          <Card className="p-8 text-center max-w-2xl mx-auto">
            <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-neutral-600">در حال بارگذاری...</p>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container-max section-padding">
          <Card className="p-8 text-center max-w-2xl mx-auto">
            <p className="text-red-600 mb-4">{error || 'تراکنش یافت نشد'}</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={fetchTransaction}>تلاش مجدد</Button>
              <Link href="/dashboard/transactions">
                <Button variant="outline">بازگشت به لیست</Button>
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
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/transactions" className="text-primary-600 hover:text-primary-700 text-sm mb-4 inline-block">
            ← بازگشت به لیست تراکنش‌ها
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-neutral-800 mb-2">
                جزئیات تراکنش
              </h1>
              <p className="text-neutral-600 font-mono">
                {transaction.reference_code}
              </p>
            </div>
            {getStatusBadge(transaction.status, transaction.status_display)}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transaction Details */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">اطلاعات تراکنش</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-neutral-200">
                  <span className="text-neutral-600">کد پیگیری:</span>
                  <span className="font-mono font-medium">{transaction.reference_code}</span>
                </div>
                
                {transaction.gateway_reference && (
                  <div className="flex justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">شماره مرجع درگاه:</span>
                    <span className="font-mono font-medium">{transaction.gateway_reference}</span>
                  </div>
                )}
                
                {transaction.tracking_code && (
                  <div className="flex justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">کد رهگیری بانک:</span>
                    <span className="font-mono font-medium">{transaction.tracking_code}</span>
                  </div>
                )}
                
                {transaction.order_id && (
                  <div className="flex justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">شماره سفارش:</span>
                    <span className="font-mono font-medium">{transaction.order_id}</span>
                  </div>
                )}
                
                {transaction.gateway_name && (
                  <div className="flex justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">درگاه پرداخت:</span>
                    <span className="font-medium">{transaction.gateway_name}</span>
                  </div>
                )}
                
                {transaction.gateway_type && (
                  <div className="flex justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">نوع درگاه:</span>
                    <span className="font-medium">{transaction.gateway_type}</span>
                  </div>
                )}
                
                <div className="flex justify-between py-2 border-b border-neutral-200">
                  <span className="text-neutral-600">روش پرداخت:</span>
                  <span className="font-medium">{transaction.payment_method_display}</span>
                </div>
                
                {transaction.description && (
                  <div className="flex justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">توضیحات:</span>
                    <span className="font-medium">{transaction.description}</span>
                  </div>
                )}
              </div>
            </Card>

            {/* Payer Information */}
            {(transaction.payer_name || transaction.payer_email || transaction.payer_mobile || transaction.card_number) && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">اطلاعات پرداخت‌کننده</h2>
                <div className="space-y-3">
                  {transaction.payer_name && (
                    <div className="flex justify-between py-2 border-b border-neutral-200">
                      <span className="text-neutral-600">نام:</span>
                      <span className="font-medium">{transaction.payer_name}</span>
                    </div>
                  )}
                  {transaction.payer_mobile && (
                    <div className="flex justify-between py-2 border-b border-neutral-200">
                      <span className="text-neutral-600">شماره موبایل:</span>
                      <span className="font-mono font-medium">{transaction.payer_mobile}</span>
                    </div>
                  )}
                  {transaction.payer_email && (
                    <div className="flex justify-between py-2 border-b border-neutral-200">
                      <span className="text-neutral-600">ایمیل:</span>
                      <span className="font-mono font-medium">{transaction.payer_email}</span>
                    </div>
                  )}
                  {transaction.card_number && (
                    <div className="flex justify-between py-2 border-b border-neutral-200">
                      <span className="text-neutral-600">شماره کارت:</span>
                      <span className="font-mono font-medium">{transaction.card_number}</span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Timestamps */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">تاریخچه</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-neutral-200">
                  <span className="text-neutral-600">تاریخ ایجاد:</span>
                  <span className="font-medium">{formatDate(transaction.created_at)}</span>
                </div>
                
                {transaction.paid_at && (
                  <div className="flex justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">تاریخ پرداخت:</span>
                    <span className="font-medium">{formatDate(transaction.paid_at)}</span>
                  </div>
                )}
                
                {transaction.verified_at && (
                  <div className="flex justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">تاریخ تأیید:</span>
                    <span className="font-medium">{formatDate(transaction.verified_at)}</span>
                  </div>
                )}
                
                {transaction.expires_at && (
                  <div className="flex justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">تاریخ انقضا:</span>
                    <span className="font-medium">{formatDate(transaction.expires_at)}</span>
                  </div>
                )}
                
                {transaction.updated_at && (
                  <div className="flex justify-between py-2">
                    <span className="text-neutral-600">آخرین بروزرسانی:</span>
                    <span className="font-medium">{formatDate(transaction.updated_at)}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Amount Summary */}
            <Card className="p-6 bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
              <h2 className="text-lg font-semibold text-neutral-800 mb-4">خلاصه مبلغ</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">مبلغ اصلی:</span>
                  <span className="font-medium">{formatPrice(transaction.amount)}</span>
                </div>
                
                {transaction.fee_amount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">کارمزد:</span>
                    <span className="font-medium">{formatPrice(transaction.fee_amount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between pt-3 border-t border-primary-200">
                  <span className="font-semibold text-neutral-800">مبلغ کل:</span>
                  <span className="font-bold text-lg text-primary-600">
                    {formatPrice(transaction.total_amount)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Refund Info */}
            {transaction.is_refundable && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-neutral-800 mb-4">اطلاعات بازگشت وجه</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">قابل بازگشت:</span>
                    <span className="font-medium text-green-600">بله</span>
                  </div>
                  
                  {transaction.refunded_amount !== undefined && transaction.refunded_amount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">مبلغ بازگشت داده شده:</span>
                      <span className="font-medium">{formatPrice(transaction.refunded_amount)}</span>
                    </div>
                  )}
                  
                  {transaction.refundable_amount !== undefined && transaction.refundable_amount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">قابل بازگشت:</span>
                      <span className="font-medium">{formatPrice(transaction.refundable_amount)}</span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-neutral-800 mb-4">عملیات</h2>
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => window.print()}
                >
                  چاپ رسید
                </Button>
                
                {transaction.order_id && (
                  <Link href={`/invoice/${transaction.order_id}`}>
                    <Button className="w-full" variant="outline">
                      مشاهده فاکتور
                    </Button>
                  </Link>
                )}
                
                <Link href="/dashboard/transactions">
                  <Button className="w-full" variant="outline">
                    بازگشت به لیست
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
