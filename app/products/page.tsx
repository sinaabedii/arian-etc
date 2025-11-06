import React from 'react';
import { Metadata } from 'next';
import ProductsClient from './ProductsClient';

// Metadata for Products page
export const metadata: Metadata = {
  title: 'محصولات - فروشگاه آنلاین لومینا',
  description: 'مجموعه کامل محصولات لومینا - الکترونیک، پوشاک، لوازم خانگی، مواد غذایی و هزاران محصول دیگر. خرید آنلاین با بهترین قیمت، کیفیت تضمین شده و ارسال رایگان.',
  keywords: [
    'محصولات لومینا',
    'خرید آنلاین',
    'فروشگاه اینترنتی',
    'الکترونیک',
    'پوشاک',
    'لوازم خانگی',
    'مواد غذایی',
    'ارسال رایگان'
  ],
  openGraph: {
    title: 'محصولات فروشگاه آنلاین لومینا',
    description: 'هزاران محصول با کیفیت، قیمت مناسب و ارسال سریع',
    images: ['/images/products-og.jpg'],
  },
  alternates: {
    canonical: 'https://lumina-shop.com/products',
  },
};

const ProductsPage = () => {
  return <ProductsClient />;
};

export default ProductsPage;
