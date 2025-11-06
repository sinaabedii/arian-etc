import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { productService } from '@/lib/product-service';
import type { ProductDetail } from '@/types/product';
import ProductDetailClient from './ProductDetailClient';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const res = await productService.getProductDetail(params.slug);
  if (!res.success || !res.data) return { title: 'محصول یافت نشد' };
  const p = res.data;
  return {
    title: p.name,
    description: p.short_description || p.description?.slice(0, 160),
    openGraph: {
      title: p.name,
      description: p.short_description || '',
      images: p.images?.length
        ? [{ url: p.images[0].image, width: 1200, height: 630, alt: p.images[0].alt_text || p.name }]
        : [],
    },
  };
}

const ProductDetailPage = async ({ params }: ProductPageProps) => {
  const [detailRes, relatedRes] = await Promise.all([
    productService.getProductDetail(params.slug),
    productService.getRelatedProducts(params.slug),
  ]);

  if (!detailRes.success || !detailRes.data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-8">
        <div className="max-w-md mx-auto text-center bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-200 p-12">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-5xl">😕</div>
          </div>
          <h1 className="text-3xl font-black text-neutral-900 mb-3">محصول یافت نشد</h1>
          <p className="text-neutral-600 mb-8 leading-relaxed">ممکن است اتصال به سرور موقتاً دچار مشکل شده باشد یا محصول مورد نظر وجود نداشته باشد.</p>
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            بازگشت به محصولات
          </Link>
        </div>
      </div>
    );
  }

  const product: ProductDetail = detailRes.data as ProductDetail;
  const related = relatedRes.success && relatedRes.data ? relatedRes.data : [];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-neutral-200/50 sticky top-0 z-40 shadow-sm">
        <div className="container-max section-padding py-4">
          <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-neutral-600 hover:text-primary-600 transition-colors font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              خانه
            </Link>
            <span className="text-neutral-300">/</span>
            <Link href="/products" className="text-neutral-600 hover:text-primary-600 transition-colors font-medium">محصولات</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-900 font-bold truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <ProductDetailClient product={product} related={related} />
    </>
  );
};

export default ProductDetailPage;
