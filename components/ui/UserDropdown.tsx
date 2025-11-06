'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

const UserDropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) return null;

  const menuItems = [
    ...(user.role === 'customer' ? [
      { label: 'داشبورد', href: '/dashboard', icon: '📊' },
      { label: 'سفارش‌های من', href: '/dashboard', icon: '📦' },
      { label: 'پروفایل', href: '/profile', icon: '👤' },
      { label: 'علاقه‌مندی‌ها', href: '/wishlist', icon: '❤️' },
    ] : []),
    ...(user.role === 'admin' ? [
      { label: 'داشبورد مدیریت', href: '/dashboard', icon: '🔧' },
      { label: 'مدیریت کاربران', href: '/dashboard', icon: '👥' },
      { label: 'سفارش‌ها', href: '/dashboard', icon: '📦' },
      { label: 'محصولات', href: '/products', icon: '📋' },
      { label: 'گزارش‌ها', href: '/dashboard', icon: '📈' },
    ] : []),
    { label: 'تنظیمات', href: '/dashboard', icon: '⚙️' },
    { label: 'راهنمایی و پشتیبانی', href: '/contact', icon: '🎧' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="منوی کاربر"
      >
        <div className="relative w-8 h-8 bg-primary-100 rounded-full overflow-hidden">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-xs text-gray-500">{user.role === 'admin' ? 'مدیر' : 'کاربر'}</div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 bg-primary-100 rounded-full overflow-hidden">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary-500 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3 text-base">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                setShowLogoutConfirm(true);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <span className="mr-3 text-base">🚪</span>
              خروج
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[200] bg-black/60 grid place-items-center p-4">
          <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-white/60 shadow-2xl">
            <div className="p-6">
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 shadow">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">تایید خروج</h3>
                  <p className="text-sm text-neutral-600">آیا مطمئن هستید که می‌خواهید خارج شوید؟</p>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 text-sm font-bold text-neutral-700 bg-white/80 hover:bg-neutral-100 border border-neutral-200 rounded-xl transition-all"
                >
                  انصراف
                </button>
                <button
                  onClick={() => {
                    setShowLogoutConfirm(false);
                    logout();
                  }}
                  className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  خروج
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
