'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: number;
}

const DashboardOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Mock orders data - در واقعیت باید از API دریافت شود
    setOrders([
      { id: 'ORD-001', date: '1403/10/30', status: 'delivered', total: 2500000, items: 3 },
      { id: 'ORD-002', date: '1403/10/28', status: 'shipped', total: 1250000, items: 2 },
      { id: 'ORD-003', date: '1403/10/25', status: 'processing', total: 750000, items: 1 },
      { id: 'ORD-004', date: '1403/10/20', status: 'delivered', total: 3200000, items: 5 },
      { id: 'ORD-005', date: '1403/10/15', status: 'pending', total: 450000, items: 1 }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'processing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'pending': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'تحویل شده';
      case 'shipped': return 'ارسال شده';
      case 'processing': return 'در حال پردازش';
      case 'pending': return 'در انتظار';
      default: return 'نامشخص';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-neutral-200 p-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <span className="text-3xl">📦</span>
          </div>
          <div>
            <h1 className="text-4xl font-black text-neutral-900">
              تاریخچه سفارشات
            </h1>
            <p className="text-neutral-600 mt-1">
              پیگیری و مدیریت سفارشات شما
            </p>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border-2 border-neutral-200 p-8 hover:shadow-2xl hover:border-primary-300 transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Order Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">📦</span>
                </div>
                <div>
                  <h4 className="font-black text-neutral-900 text-xl mb-1 group-hover:text-primary-600 transition-colors">{order.id}</h4>
                  <p className="text-sm text-neutral-600 font-medium">📅 ثبت شده در {order.date}</p>
                  <p className="text-sm text-neutral-500 mt-1 font-medium">📦 {order.items} محصول</p>
                </div>
              </div>

              {/* Status & Price */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:text-right">
                <div>
                  <p className="text-3xl font-black text-neutral-900 mb-3">{formatPrice(order.total)}</p>
                  <span className={`inline-block px-4 py-2 rounded-xl text-sm font-black border-2 ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-100 hover:bg-primary-200 text-primary-700 font-bold rounded-xl transition-all hover:scale-105 self-start sm:self-auto">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  مشاهده جزئیات
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-neutral-200 p-16 text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-7xl">📦</span>
          </div>
          <h3 className="text-3xl font-black text-neutral-900 mb-4">
            هنوز سفارشی ثبت نکرده‌اید!
          </h3>
          <p className="text-neutral-600 mb-8 text-lg">
            با خرید از فروشگاه، سفارشات شما اینجا نمایش داده می‌شود
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            مشاهده محصولات
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardOrders;
