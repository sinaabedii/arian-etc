import React from 'react';
import { Metadata } from 'next';
import { mockProductDetails } from '@/data/mockProducts';
import ProductsClient from './ProductsClient';

// Metadata for Products page
export const metadata: Metadata = {
  title: 'محصولات',
  description: 'مجموعه کامل محصولات لومینا - مواد غذایی، لوازم خانگی، پوشاک، لوازم الکترونیکی و هزاران محصول دیگر. خرید آنلاین با بهترین قیمت و کیفیت.',
  keywords: [
    'محصولات لومینا',
    'خرید آنلاین',
    'مواد غذایی',
    'محصولات بهداشتی',
    'EPA approved',
    'استاندارد بیمارستانی',
    'نظافت صنعتی',
    '  '
  ],
  openGraph: {
    title: 'محصولات نظافتی و ضدعفونی   ',
    description: 'مجموعه کامل محصولات نظافتی و ضدعفونی با کیفیت حرفه‌ای و مجوز EPA',
    images: ['/images/products-og.jpg'],
  },
  alternates: {
    canonical: 'https://akandchimi.com/products',
  },
};

const ProductsPage = async () => {
  // Server Component: fetch or read products data here if needed
  const products = mockProductDetails;
  return <ProductsClient products={products} />;
};

export default ProductsPage;
