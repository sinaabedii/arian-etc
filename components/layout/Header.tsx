'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navigationItems, companyInfo } from '@/data/mockData';
import Button from '@/components/ui/Button';
import UserDropdown from '@/components/ui/UserDropdown';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { state: cartState } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header className={`bg-white/90 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-xl border-b-2 border-white/50' : 'shadow-lg border-b border-white/30'
    }`}>
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16 lg:h-18 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse hover:scale-105 transition-transform duration-300 flex-shrink-0 group">
            <div className="relative w-12 h-12 lg:w-18 lg:h-18 mb-4">
              <Image
                src="/images/Logo.png"
                alt="لومینا"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-black text-lg lg:text-xl bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent leading-tight group-hover:from-primary-700 group-hover:to-blue-700 transition-all">
                لومینا
              </span>
              <span className="text-xs lg:text-sm text-neutral-600 leading-tight font-medium">
                فروشگاه جامع آنلاین
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 space-x-reverse flex-1 justify-center">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || item.dropdown?.some(d => pathname === d.href);
              return (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className={`font-bold transition-all duration-300 flex items-center whitespace-nowrap py-2.5 px-4 rounded-xl ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-primary-600 to-blue-600 shadow-lg'
                        : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50/80 hover:shadow-md'
                    }`}
                  >
                    {item.label}
                    {item.dropdown && (
                      <svg className="w-4 h-4 mr-1 transition-transform group-hover:rotate-180 duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  
                  {item.dropdown && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-white/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                      <div className="py-2">
                        {item.dropdown.map((dropdownItem, idx) => {
                          const isDropdownActive = pathname === dropdownItem.href;
                          return (
                            <Link
                              key={dropdownItem.label}
                              href={dropdownItem.href}
                              className={`block px-4 py-3 text-sm font-bold transition-all duration-300 ${
                                isDropdownActive
                                  ? 'text-white bg-gradient-to-r from-primary-600 to-blue-600 shadow-md'
                                  : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50/80'
                              } ${
                                idx === 0 ? 'rounded-t-2xl' : ''
                              } ${
                                idx === item.dropdown!.length - 1 ? 'rounded-b-2xl' : ''
                              }`}
                            >
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <span className="text-primary-500">•</span>
                                <span>{dropdownItem.label}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4 space-x-reverse flex-shrink-0">
            {/* Cart & Wishlist Icons */}
            <div className="flex items-center space-x-1 lg:space-x-2 space-x-reverse">
              {/* Wishlist */}
              <Link 
                href="/wishlist" 
                className="relative p-2 hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 rounded-xl transition-all duration-300 group"
                title="علاقه‌مندی‌ها"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-neutral-600 group-hover:text-red-500 group-hover:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link 
                href="/cart" 
                className="relative p-2 hover:bg-gradient-to-br hover:from-primary-50 hover:to-blue-50 rounded-xl transition-all duration-300 group"
                title="سبد خرید"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-neutral-600 group-hover:text-primary-600 group-hover:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2-2v4m16 0H4" />
                </svg>
                {cartState.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-primary-500 to-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
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
                    <button className="px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base font-bold text-neutral-700 hover:text-primary-600 hover:bg-primary-50/80 rounded-xl transition-all duration-300 hover:shadow-md">
                      ورود
                    </button>
                  </Link>
                  <Link href="/auth/register">
                    <button className="px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base font-bold bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      ثبت‌نام
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl text-neutral-700 hover:text-primary-600 hover:bg-primary-50/80 transition-all duration-300 hover:shadow-md flex-shrink-0"
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
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t-2 border-white/50">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <div key={item.label}>
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                            isActive || openDropdown === item.label
                              ? 'text-white bg-gradient-to-r from-primary-600 to-blue-600 shadow-lg'
                              : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50/80 hover:shadow-md'
                          }`}
                        >
                          <span>{item.label}</span>
                          <svg
                            className={`w-5 h-5 transition-transform duration-200 ${
                              openDropdown === item.label ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          openDropdown === item.label ? 'max-h-96 mt-1' : 'max-h-0'
                        }`}>
                          <div className="pr-4 space-y-1">
                            {item.dropdown.map((dropdownItem) => {
                              const isDropdownActive = pathname === dropdownItem.href;
                              return (
                                <Link
                                  key={dropdownItem.label}
                                  href={dropdownItem.href}
                                  className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                                    isDropdownActive
                                      ? 'text-white bg-gradient-to-r from-primary-600 to-blue-600 shadow-md'
                                      : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50/80'
                                  }`}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <div className="flex items-center space-x-2 space-x-reverse">
                                    <span className="text-primary-500">•</span>
                                    <span>{dropdownItem.label}</span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                          isActive
                            ? 'text-white bg-gradient-to-r from-primary-600 to-blue-600 shadow-lg'
                            : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50/80 hover:shadow-md'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
              <div className="flex flex-col space-y-2 pt-4 mt-4 border-t-2 border-white/50">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 space-x-reverse p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl border-2 border-primary-200/50 shadow-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl">
                        {user?.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-neutral-900">{user?.name}</div>
                        <div className="text-sm text-neutral-600 capitalize">{user?.role}</div>
                      </div>
                    </div>
                    <Link href={user?.role === 'admin' ? '/admin' : '/dashboard'}>
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        ورود به داشبورد
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/auth/login">
                      <button className="w-full px-6 py-3 text-neutral-700 hover:text-primary-600 bg-white/80 hover:bg-primary-50/80 border-2 border-neutral-200 hover:border-primary-300 font-bold rounded-xl transition-all duration-300 hover:shadow-md">
                        ورود
                      </button>
                    </Link>
                    <Link href="/auth/register">
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        ثبت‌نام
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
