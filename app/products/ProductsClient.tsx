'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import StarRating from '@/components/ui/StarRating';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { ProductDetail } from '@/types';

interface ProductsClientProps {
  products: ProductDetail[];
}

const ProductsClient: React.FC<ProductsClientProps> = ({ products }) => {
  const { addItem, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const calculateAverageRating = (reviews: any[]) => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('fa-IR').format(price) + ' تومان';

  const handleAddToCart = (product: ProductDetail) => {
    addItem({
      id: product.slug,
      name: product.title,
      price: product.price,
      image: product.images[0],
      category: product.category,
      slug: product.slug,
    });
  };

  const handleToggleWishlist = (product: ProductDetail) => {
    if (isInWishlist(product.slug)) {
      removeFromWishlist(product.slug);
    } else {
      addToWishlist({
        id: product.slug,
        name: product.title,
        price: product.price,
        image: product.images[0],
        category: product.category,
        slug: product.slug,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-max section-padding py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              محصولات مفید و اعتیادآور
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              محصولاتی را کشف کنید که مشکلات واقعی را حل می‌کنند و الگوهای رفتاری مثبت ایجاد می‌کنند
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container-max section-padding py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => {
            const averageRating = calculateAverageRating(product.reviews);
            return (
              <Card key={product.slug} className="group" padding="none">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <Link href={`/products/${product.slug}`}>
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  </Link>
                  <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </div>
                  <button
                    onClick={() => handleToggleWishlist(product)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    {isInWishlist(product.slug) ? (
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <StarRating rating={averageRating} size="sm" />
                  </div>

                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-display font-semibold text-lg text-gray-900 mb-2 hover:text-primary-600 cursor-pointer">
                      {product.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.shortDesc}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-primary-600">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.reviews.length} نظر
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1"
                      size="sm"
                      disabled={isInCart(product.slug)}
                    >
                      {isInCart(product.slug) ? (
                        <>
                          <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          در سبد خرید
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                          </svg>
                          افزودن به سبد
                        </>
                      )}
                    </Button>
                    <Link href={`/products/${product.slug}`}>
                      <Button size="sm" variant="outline">
                        جزئیات
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM10 18V8.414L4 13v5h12v-5l-6-4.586z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">محصولی یافت نشد</h3>
            <p className="text-gray-600">در حال حاضر محصولی موجود نیست.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">محصول مورد نظر را پیدا نکردید؟</h2>
          <p className="text-gray-600 mb-6">با کارشناسان ما تماس بگیرید تا بهترین راه‌حل را به شما معرفی کنند.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">تماس با کارشناس</Button>
            <Button variant="secondary" size="lg">مشاهده کاتالوگ کامل</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsClient;
