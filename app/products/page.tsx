import React from 'react';
import { Metadata } from 'next';
import { mockProductDetails } from '@/data/mockProducts';
import ProductsClient from './ProductsClient';

// Metadata for Products page
export const metadata: Metadata = {
  title: 'محصولات نظافتی و ضدعفونی',
  description: 'مجموعه کامل محصولات نظافتی و ضدعفونی آکند شیمی خزر با کیفیت حرفه‌ای، مجوز EPA و استاندارد بیمارستانی. شوینده‌ها، ضدعفونی کننده‌ها و محصولات بهداشتی.',
  keywords: [
    'محصولات نظافتی',
    'ضدعفونی کننده',
    'شوینده حرفه‌ای',
    'محصولات بهداشتی',
    'EPA approved',
    'استاندارد بیمارستانی',
    'نظافت صنعتی',
    'آکند شیمی خزر'
  ],
  openGraph: {
    title: 'محصولات نظافتی و ضدعفونی آکند شیمی خزر',
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
