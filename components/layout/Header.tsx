'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navigationItems, companyInfo } from '@/data/mockData';
import Button from '@/components/ui/Button';
import UserDropdown from '@/components/ui/UserDropdown';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { state: cartState } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse hover:opacity-80 transition-opacity flex-shrink-0">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              <Image
                src="/images/logo (3).png"
                alt="لومینا"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-bold text-lg lg:text-xl text-neutral-800 leading-tight">
                لومینا
              </span>
              <span className="text-xs lg:text-sm text-neutral-500 leading-tight">
                فروشگاه جامع آنلاین
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-center">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="text-neutral-600 hover:text-primary-500 font-medium transition-colors duration-200 flex items-center whitespace-nowrap"
                >
                  {item.label}
                  {item.dropdown && (
                    <svg className="w-4 h-4 mr-1 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                
                {item.dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-neutral-600 hover:text-primary-500 hover:bg-primary-50 transition-colors duration-200"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4 space-x-reverse flex-shrink-0">
            {/* Cart & Wishlist Icons */}
            <div className="flex items-center space-x-1 lg:space-x-2 space-x-reverse">
              {/* Wishlist */}
              <Link 
                href="/wishlist" 
                className="relative p-2 text-neutral-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                title="علاقه‌مندی‌ها"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium animate-pulse">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link 
                href="/cart" 
                className="relative p-2 text-neutral-600 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-all duration-200 group"
                title="سبد خرید"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2-2v4m16 0H4" />
                </svg>
                {cartState.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center font-medium animate-pulse">
                    {cartState.itemCount > 9 ? '9+' : cartState.itemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Auth Actions */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3 space-x-reverse">
              {isAuthenticated ? (
                <UserDropdown />
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm" className="font-medium text-sm lg:text-base">
                      ورود
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm" className="font-medium text-sm lg:text-base">
                      ثبت‌نام
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="باز/بسته کردن منو"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-200">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-neutral-600 hover:text-primary-500 font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-neutral-200">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user?.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user?.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{user?.role}</div>
                      </div>
                    </div>
                    <Link href={user?.role === 'admin' ? '/admin' : '/dashboard'}>
                      <Button className="w-full" size="sm">
                        ورود به داشبورد
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button variant="ghost" size="sm" className="w-full">
                        ورود
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button size="sm" className="w-full">
                        ثبت‌نام
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
