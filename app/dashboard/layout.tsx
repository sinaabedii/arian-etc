'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import CreateTicketModal from '@/components/tickets/CreateTicketModal';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login?redirect=/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  const menuItems: MenuItem[] = [
    { id: 'overview', label: 'نمای کلی', icon: '📊', href: '/dashboard' },
    { id: 'profile', label: 'پروفایل', icon: '👤', href: '/dashboard/profile' },
    { id: 'orders', label: 'سفارشات', icon: '📦', href: '/dashboard/orders' },
    { id: 'tickets', label: 'تیکت‌ها', icon: '🎫', href: '/dashboard/tickets' },
    { id: 'cart', label: 'سبد خرید', icon: '🛒', href: '/dashboard/cart' },
    { id: 'wishlist', label: 'مورد علاقه‌ها', icon: '❤️', href: '/dashboard/wishlist' },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 text-lg">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50">
      <div className="container-max section-padding py-6 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed bottom-6 left-6 z-50 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <span className="text-2xl">{isSidebarOpen ? '✕' : '☰'}</span>
          </button>

          {/* Sidebar */}
          <aside className={`
            fixed lg:relative inset-y-0 right-0 z-40
            w-72 lg:w-80 flex-shrink-0
            bg-white rounded-2xl shadow-xl border border-neutral-100
            transition-transform duration-300 lg:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
            overflow-hidden
          `}>
            {/* Profile Header */}
            <div className="relative p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
              <div className="absolute top-0 left-0 w-full h-full opacity-10"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-4xl font-bold text-blue-600">
                    {user?.name?.charAt(0).toUpperCase() || 'ک'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-center mb-1">{user?.name || 'کاربر عزیز'}</h2>
                <p className="text-sm text-center text-blue-100">{user?.email}</p>
              </div>
            </div>

            {/* Menu */}
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href === '/dashboard' && pathname === '/dashboard');
                  
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 rounded-xl
                          transition-all duration-200 font-medium
                          ${isActive
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                            : 'text-neutral-700 hover:bg-neutral-100'
                          }
                        `}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Actions */}
            <div className="p-4 border-t border-neutral-100 space-y-2">
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => setIsTicketModalOpen(true)}
              >
                <span className="ml-2">➕</span>
                تیکت جدید
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm" className="w-full">
                  <span className="ml-2">🏠</span>
                  صفحه اصلی
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={handleLogout}
              >
                <span className="ml-2">🚪</span>
                خروج
              </Button>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-30"
            />
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        onSuccess={() => router.push('/dashboard/tickets')}
      />
    </div>
  );
}
