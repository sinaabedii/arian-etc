'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole?: 'admin' | 'customer';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userRole = 'customer' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const customerNavItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { id: 'orders', label: 'My Orders', href: '/dashboard/orders', icon: '📦' },
    { id: 'profile', label: 'Profile', href: '/dashboard/profile', icon: '👤' },
    { id: 'favorites', label: 'Favorites', href: '/dashboard/favorites', icon: '❤️' },
    { id: 'support', label: 'Support', href: '/dashboard/support', icon: '🎧' }
  ];

  const adminNavItems = [
    { id: 'admin', label: 'Overview', href: '/admin', icon: '📊' },
    { id: 'users', label: 'Users', href: '/admin/users', icon: '👥' },
    { id: 'orders', label: 'Orders', href: '/admin/orders', icon: '📦' },
    { id: 'products', label: 'Products', href: '/admin/products', icon: '📋' },
    { id: 'analytics', label: 'Analytics', href: '/admin/analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', href: '/admin/settings', icon: '⚙️' }
  ];

  const navItems = userRole === 'admin' ? adminNavItems : customerNavItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-display font-bold text-lg text-neutral-800">CleanTech</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-bold">J</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Smith</p>
              <p className="text-xs text-gray-500 truncate">{userRole === 'admin' ? 'Administrator' : 'Customer'}</p>
            </div>
          </div>
          <div className="mt-3 flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              <Link href="/">View Site</Link>
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {userRole === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
            </h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
