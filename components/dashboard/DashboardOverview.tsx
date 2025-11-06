'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: number;
}

const DashboardOverview: React.FC = () => {
  const { user } = useAuth();
  const { state: cartState } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Mock orders data - در واقعیت باید از API دریافت شود
    setOrders([
      { id: 'ORD-001', date: '1403/10/30', status: 'delivered', total: 2500000, items: 3 },
      { id: 'ORD-002', date: '1403/10/28', status: 'shipped', total: 1250000, items: 2 },
      { id: 'ORD-003', date: '1403/10/25', status: 'processing', total: 750000, items: 1 }
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
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-neutral-200 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100 to-blue-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              👋
            </div>
            <div>
              <h1 className="text-4xl font-black text-neutral-900">
                خوش آمدید!
              </h1>
              <p className="text-lg text-neutral-600 mt-1">
                سلام {user?.name}، پنل مدیریت حساب کاربری شما
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/dashboard/cart" className="group bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl shadow-xl p-6 text-white hover:shadow-2xl hover:scale-105 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm font-semibold mb-2">سبد خرید</p>
              <p className="text-4xl font-black">{cartState.itemCount}</p>
            </div>
            <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-3xl">🛒</span>
            </div>
          </div>
          <p className="text-sm text-blue-100 font-medium">{formatPrice(cartState.total)}</p>
        </Link>

        <Link href="/dashboard/wishlist" className="group bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl shadow-xl p-6 text-white hover:shadow-2xl hover:scale-105 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-red-100 text-sm font-semibold mb-2">علاقه‌مندی‌ها</p>
              <p className="text-4xl font-black">{wishlistItems.length}</p>
            </div>
            <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-3xl">❤️</span>
            </div>
          </div>
          <p className="text-sm text-red-100 font-medium">محصول ذخیره شده</p>
        </Link>

        <Link href="/dashboard/orders" className="group bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl shadow-xl p-6 text-white hover:shadow-2xl hover:scale-105 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-green-100 text-sm font-semibold mb-2">کل سفارشات</p>
              <p className="text-4xl font-black">{orders.length}</p>
            </div>
            <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-3xl">📦</span>
            </div>
          </div>
          <p className="text-sm text-green-100 font-medium">سفارش ثبت شده</p>
        </Link>

        <div className="group bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl shadow-xl p-6 text-white hover:shadow-2xl hover:scale-105 transition-all cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-purple-100 text-sm font-semibold mb-2">کل خرید</p>
              <p className="text-3xl font-black">{formatPrice(orders.reduce((sum, order) => sum + order.total, 0))}</p>
            </div>
            <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-3xl">💰</span>
            </div>
          </div>
          <p className="text-sm text-purple-100 font-medium">مجموع تراکنش‌ها</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-neutral-200 p-8">
        <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg">
              📦
            </div>
            <h3 className="text-2xl font-black text-neutral-900">سفارشات اخیر</h3>
          </div>
          <Link href="/dashboard/orders" className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 font-bold rounded-xl transition-colors">
            مشاهده همه
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
        <div className="space-y-4">
          {orders.slice(0, 3).map((order) => (
            <Link key={order.id} href={`/dashboard/orders/${order.id}`} className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-gradient-to-br from-neutral-50 to-white rounded-2xl border-2 border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-3 sm:mb-0">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📦</span>
                </div>
                <div>
                  <p className="font-black text-neutral-900 group-hover:text-primary-600 transition-colors">{order.id}</p>
                  <p className="text-sm text-neutral-600 font-medium">{order.date} • {order.items} محصول</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end sm:text-right gap-4">
                <p className="font-black text-lg text-neutral-900">{formatPrice(order.total)}</p>
                <span className={`inline-block px-4 py-2 rounded-xl text-xs font-black border-2 ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link href="/dashboard/tickets" className="group bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl shadow-xl p-8 text-white hover:shadow-2xl hover:scale-105 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <span className="text-4xl">🎫</span>
            </div>
            <div>
              <h4 className="font-black text-xl mb-1">تیکت‌های پشتیبانی</h4>
              <p className="text-sm text-orange-100 font-medium">مدیریت درخواست‌های شما</p>
            </div>
          </div>
        </Link>

        <Link href="/products" className="group bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl shadow-xl p-8 text-white hover:shadow-2xl hover:scale-105 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <span className="text-4xl">🛍️</span>
            </div>
            <div>
              <h4 className="font-black text-xl mb-1">مشاهده محصولات</h4>
              <p className="text-sm text-teal-100 font-medium">خرید از فروشگاه</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardOverview;
