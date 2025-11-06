'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { paymentService } from '@/lib/payment-service';
import type { PaymentTransaction } from '@/types/payment';

export default function TransactionsPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login?redirect=/dashboard/transactions');
      return;
    }

    fetchTransactions();
  }, [isAuthenticated]);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await paymentService.getTransactions();
      setTransactions(data);
    } catch (err: any) {
      console.error('Failed to fetch transactions:', err);
      setError('خطا در بارگذاری تراکنش‌ها');
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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string, statusDisplay: string) => {
    const colors: Record<string, string> = {
      success: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      failed: 'bg-red-100 text-red-700',
      cancelled: 'bg-gray-100 text-gray-700',
      expired: 'bg-orange-100 text-orange-700'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
        {statusDisplay}
      </span>
    );
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-neutral-800 mb-2">
            تراکنش‌های پرداخت
          </h1>
          <p className="text-neutral-600">
            لیست تمام پرداخت‌های انجام شده
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <Card className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-neutral-600">در حال بارگذاری...</p>
          </Card>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="p-8 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchTransactions}>تلاش مجدد</Button>
          </Card>
        )}

        {/* Empty State */}
        {!loading && !error && transactions.length === 0 && (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              تراکنشی یافت نشد
            </h3>
            <p className="text-neutral-600 mb-6">
              هنوز هیچ پرداختی انجام نداده‌اید.
            </p>
            <Link href="/products">
              <Button>شروع خرید</Button>
            </Link>
          </Card>
        )}

        {/* Transactions List */}
        {!loading && !error && transactions.length > 0 && (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Transaction Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-neutral-800">
                        {transaction.description || `تراکنش ${transaction.reference_code}`}
                      </h3>
                      {getStatusBadge(transaction.status, transaction.status_display)}
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-2 text-sm text-neutral-600">
                      <div>
                        <span className="font-medium">کد پیگیری:</span>
                        <span className="mr-2 font-mono">{transaction.reference_code}</span>
                      </div>
                      {transaction.tracking_code && (
                        <div>
                          <span className="font-medium">کد رهگیری:</span>
                          <span className="mr-2 font-mono">{transaction.tracking_code}</span>
                        </div>
                      )}
                      {transaction.order_id && (
                        <div>
                          <span className="font-medium">شماره سفارش:</span>
                          <span className="mr-2 font-mono">{transaction.order_id}</span>
                        </div>
                      )}
                      {transaction.gateway_name && (
                        <div>
                          <span className="font-medium">درگاه:</span>
                          <span className="mr-2">{transaction.gateway_name}</span>
                        </div>
                      )}
                      <div>
                        <span className="font-medium">تاریخ:</span>
                        <span className="mr-2">{formatDate(transaction.created_at)}</span>
                      </div>
                      {transaction.paid_at && (
                        <div>
                          <span className="font-medium">پرداخت شده:</span>
                          <span className="mr-2">{formatDate(transaction.paid_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Amount and Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-left">
                      <div className="text-sm text-neutral-600">مبلغ</div>
                      <div className="text-xl font-bold text-primary-600">
                        {formatPrice(transaction.amount)}
                      </div>
                      {transaction.fee_amount > 0 && (
                        <div className="text-xs text-neutral-500">
                          کارمزد: {formatPrice(transaction.fee_amount)}
                        </div>
                      )}
                      <div className="text-sm font-medium text-neutral-800 mt-1">
                        جمع: {formatPrice(transaction.total_amount)}
                      </div>
                    </div>
                    
                    <Link href={`/dashboard/transactions/${transaction.reference_code}`}>
                      <Button variant="outline" size="sm">
                        جزئیات
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Link href="/dashboard">
            <Button variant="outline">بازگشت به پنل کاربری</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
