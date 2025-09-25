'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: number;
}

interface Recommendation {
  id: string;
  title: string;
  image: string;
  price: number;
  reason: string;
}

const UserDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { state: cartState } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [orders, setOrders] = useState<Order[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Mock data - در واقعیت باید از API دریافت شود
    setOrders([
      { id: 'ORD-001', date: '1403/10/30', status: 'delivered', total: 2500000, items: 3 },
      { id: 'ORD-002', date: '1403/10/28', status: 'shipped', total: 1250000, items: 2 },
      { id: 'ORD-003', date: '1403/10/25', status: 'processing', total: 750000, items: 1 }
    ]);

    setRecommendations([
      {
        id: '1',
        title: 'ضدعفونی‌کننده اولتراکلین',
        image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        price: 250000,
        reason: 'بر اساس خریدهای قبلی شما'
      },
      {
        id: '2',
        title: 'پاک‌کننده کف حرفه‌ای',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        price: 190000,
        reason: 'محصولات مرتبط'
      },
      {
        id: '3',
        title: 'دستمال مرطوب ضدباکتری',
        image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        price: 85000,
        reason: 'پرفروش‌ترین محصول'
      }
    ]);

    setLoading(false);
  }, [isAuthenticated]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'shipped': return 'text-blue-600 bg-blue-50';
      case 'processing': return 'text-yellow-600 bg-yellow-50';
      case 'pending': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const tabs = [
    { id: 'overview', label: 'نمای کلی', icon: '📊' },
    { id: 'orders', label: 'سفارشات', icon: '📦' },
    { id: 'profile', label: 'پروفایل', icon: '👤' },
    { id: 'recommendations', label: 'پیشنهادی', icon: '⭐' }
  ];

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-display font-bold text-neutral-800 mb-4">
            دسترسی محدود
          </h2>
          <p className="text-neutral-600 mb-6">
            برای دسترسی به داشبورد، لطفاً وارد حساب کاربری خود شوید.
          </p>
          <Link href="/auth/login">
            <Button>ورود به حساب کاربری</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-max section-padding">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 lg:py-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-4 lg:mb-0">
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name || ''}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary-500 flex items-center justify-center text-white text-lg lg:text-xl font-bold">
                    {user?.name?.charAt(0) || 'ک'}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg lg:text-2xl font-display font-bold text-neutral-800 truncate">
                  خوش آمدید، {user?.name || 'کاربر عزیز'}
                </h1>
                <p className="text-sm lg:text-base text-neutral-600 truncate">{user?.email}</p>
              </div>
            </div>
            <div className="flex flex-col xs:flex-row gap-2 lg:gap-3 w-full lg:w-auto">
              <Link href="/products" className="flex-1 lg:flex-none">
                <Button variant="outline" size="sm" className="w-full lg:w-auto">
                  مشاهده محصولات
                </Button>
              </Link>
              <Link href="/contact" className="flex-1 lg:flex-none">
                <Button size="sm" className="w-full lg:w-auto">
                  پشتیبانی
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-max section-padding py-4 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="p-0 overflow-hidden">
              <div className="p-3 lg:p-4 bg-primary-50 border-b">
                <h3 className="font-display font-semibold text-neutral-800 text-sm lg:text-base">داشبورد</h3>
              </div>
              <nav className="p-1 lg:p-2">
                <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center justify-center lg:justify-start space-x-2 lg:space-x-3 space-x-reverse px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-center lg:text-right transition-colors whitespace-nowrap flex-shrink-0 lg:w-full ${
                        activeTab === tab.id
                          ? 'bg-primary-500 text-white'
                          : 'text-neutral-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-base lg:text-lg">{tab.icon}</span>
                      <span className="font-medium text-xs lg:text-sm">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-4 lg:space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                  <Card className="p-3 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="mb-2 lg:mb-0">
                        <p className="text-xs lg:text-sm text-neutral-600">سبد خرید</p>
                        <p className="text-lg lg:text-2xl font-bold text-neutral-800">{cartState.itemCount}</p>
                        <p className="text-xs text-neutral-500 truncate">{formatPrice(cartState.total)}</p>
                      </div>
                      <div className="w-8 h-8 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center self-end lg:self-auto">
                        <span className="text-lg lg:text-2xl">🛒</span>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-3 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="mb-2 lg:mb-0">
                        <p className="text-xs lg:text-sm text-neutral-600">علاقه‌مندی‌ها</p>
                        <p className="text-lg lg:text-2xl font-bold text-neutral-800">{wishlistItems.length}</p>
                        <p className="text-xs text-neutral-500">محصول ذخیره شده</p>
                      </div>
                      <div className="w-8 h-8 lg:w-12 lg:h-12 bg-red-100 rounded-lg flex items-center justify-center self-end lg:self-auto">
                        <span className="text-lg lg:text-2xl">❤️</span>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-3 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="mb-2 lg:mb-0">
                        <p className="text-xs lg:text-sm text-neutral-600">کل سفارشات</p>
                        <p className="text-lg lg:text-2xl font-bold text-neutral-800">{orders.length}</p>
                        <p className="text-xs text-neutral-500">سفارش ثبت شده</p>
                      </div>
                      <div className="w-8 h-8 lg:w-12 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center self-end lg:self-auto">
                        <span className="text-lg lg:text-2xl">📦</span>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-3 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="mb-2 lg:mb-0">
                        <p className="text-xs lg:text-sm text-neutral-600">کل خرید</p>
                        <p className="text-lg lg:text-2xl font-bold text-neutral-800">{formatPrice(orders.reduce((sum, order) => sum + order.total, 0))}</p>
                      </div>
                      <div className="w-8 h-8 lg:w-12 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center self-end lg:self-auto">
                        <span className="text-lg lg:text-2xl">💰</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Recent Orders */}
                <Card className="p-3 lg:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6">
                    <h3 className="text-lg lg:text-xl font-display font-bold text-neutral-800 mb-2 sm:mb-0">سفارشات اخیر</h3>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab('orders')} className="self-start sm:self-auto">
                      مشاهده همه
                    </Button>
                  </div>
                  <div className="space-y-3 lg:space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 bg-gray-50 rounded-lg gap-2 sm:gap-0">
                        <div className="flex items-center space-x-3 lg:space-x-4 space-x-reverse">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-primary-600 font-bold text-sm lg:text-base">📦</span>
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-neutral-800 text-sm lg:text-base">{order.id}</div>
                            <div className="text-xs lg:text-sm text-neutral-600">{order.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:block sm:text-left">
                          <div className="font-bold text-neutral-800 text-sm lg:text-base">{formatPrice(order.total)}</div>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Recommendations Preview */}
                <Card className="p-3 lg:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6">
                    <h3 className="text-lg lg:text-xl font-display font-bold text-neutral-800 mb-2 sm:mb-0">پیشنهاد ویژه برای شما</h3>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab('recommendations')} className="self-start sm:self-auto">
                      مشاهده همه
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
                    {recommendations.slice(0, 2).map((product) => (
                      <div key={product.id} className="flex items-center space-x-3 lg:space-x-4 space-x-reverse p-3 lg:p-4 bg-gray-50 rounded-lg">
                        <div className="relative w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-neutral-800 mb-1 text-sm lg:text-base truncate">{product.title}</h4>
                          <p className="text-xs lg:text-sm text-neutral-600 mb-2 line-clamp-1">{product.reason}</p>
                          <div className="text-sm lg:text-lg font-bold text-primary-600">{formatPrice(product.price)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'orders' && (
              <Card className="p-3 lg:p-6">
                <div className="mb-4 lg:mb-6">
                  <h3 className="text-lg lg:text-xl font-display font-bold text-neutral-800 mb-2">تاریخچه سفارشات</h3>
                  <p className="text-sm lg:text-base text-neutral-600">پیگیری و مدیریت سفارشات شما</p>
                </div>
                <div className="space-y-3 lg:space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-3 lg:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 lg:mb-4">
                        <div className="mb-2 sm:mb-0">
                          <h4 className="font-bold text-neutral-800 text-base lg:text-lg">{order.id}</h4>
                          <p className="text-sm lg:text-base text-neutral-600">ثبت شده در {order.date}</p>
                        </div>
                        <span className={`inline-block px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium ${getStatusColor(order.status)} self-start sm:self-auto`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                        <div className="text-xs lg:text-sm text-neutral-600">
                          {order.items} محصول
                        </div>
                        <div className="flex items-center justify-between sm:justify-end space-x-3 lg:space-x-4 space-x-reverse">
                          <div className="text-lg lg:text-xl font-bold text-neutral-800">{formatPrice(order.total)}</div>
                          <Button size="sm" variant="outline" className="text-xs lg:text-sm">جزئیات</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'profile' && (
              <Card>
                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold text-neutral-800 mb-2">تنظیمات پروفایل</h3>
                  <p className="text-neutral-600">مدیریت اطلاعات حساب کاربری</p>
                </div>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">نام کامل</label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">شماره تلفن</label>
                    <input
                      type="tel"
                      placeholder="09123456789"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">آدرس</label>
                    <textarea
                      rows={3}
                      placeholder="آدرس کامل خود را وارد کنید"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="submit">ذخیره تغییرات</Button>
                    <Button variant="outline" type="button">تغییر رمز عبور</Button>
                  </div>
                </form>
              </Card>
            )}

            {activeTab === 'recommendations' && (
              <Card>
                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold text-neutral-800 mb-2">محصولات پیشنهادی</h3>
                  <p className="text-neutral-600">محصولات متناسب با نیاز و سلیقه شما</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="font-bold text-neutral-800 mb-2">{product.title}</h4>
                      <p className="text-sm text-neutral-600 mb-3">{product.reason}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-primary-600">{formatPrice(product.price)}</div>
                        <Button size="sm">افزودن به سبد</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
