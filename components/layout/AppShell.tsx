'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Chatbot from '../ui/Chatbot';

const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAuth = pathname?.startsWith('/auth');
  const isDashboard = pathname?.startsWith('/dashboard');
  const isHomePage = pathname === '/';

  if (isAuth) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      {isHomePage && <Chatbot />}
      {!isDashboard && <Footer />}
    </>
  );
};

export default AppShell;
