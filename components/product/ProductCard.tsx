'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types/product';
import { STOCK_STATUS } from '@/types/product';
import { cartService } from '@/lib/cart-service';
import { wishlistService } from '@/lib/wishlist-service';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addFromApiItem } = useWishlist();
  const { addItem } = useCart();
  const stockInfo = STOCK_STATUS[product.stock_status];
  
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [showSuccessCart, setShowSuccessCart] = useState(false);
  const [showSuccessWishlist, setShowSuccessWishlist] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('fa-IR').format(numPrice);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      router.push('/auth/login?redirect=/products');
      return;
    }

    setIsAddingToCart(true);
    setErrorMessage(null);
    try {
      const response = await cartService.addToCart({
        product_id: product.id,
        quantity: 1,
      });
      
      if (response.success) {
        // Sync local cart so Cart page reflects immediately
        const price = parseFloat(product.final_price || '0') || 0;
        const image = (typeof product.primary_image === 'string' && product.primary_image.trim())
          ? product.primary_image
          : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=60';
        addItem({
          id: String(product.id),
          name: product.name,
          price,
          image,
          category: product.category_name,
          slug: product.slug,
        });
        setShowSuccessCart(true);
        setTimeout(() => setShowSuccessCart(false), 2000);
      } else {
        const errorMsg = response.error?.message || 'خطا در افزودن به سبد خرید';
        setErrorMessage(errorMsg);
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error('خطا در افزودن به سبد:', error);
      setErrorMessage('خطا در برقراری ارتباط با سرور');
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      router.push('/auth/login?redirect=/products');
      return;
    }

    setIsAddingToWishlist(true);
    setErrorMessage(null);
    try {
      const response = await wishlistService.addToWishlist({
        product: product.id,
      });
      
      if (response.success) {
        if (response.data) {
          addFromApiItem(response.data as any);
        }
        setShowSuccessWishlist(true);
        setTimeout(() => setShowSuccessWishlist(false), 2000);
      } else {
        let errorMsg = response.error?.message || 'خطا در افزودن به علاقه‌مندی';
        
        // Handle duplicate wishlist error
        if (response.error?.errors?.product) {
          const productErrors = response.error.errors.product;
          if (Array.isArray(productErrors) && productErrors.some(err => 
            err.includes('already in your wishlist') || err.includes('already exists')
          )) {
            errorMsg = 'این محصول قبلاً به علاقه‌مندی‌های شما اضافه شده است';
          }
        }
        
        setErrorMessage(errorMsg);
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error('خطا در افزودن به علاقه‌مندی:', error);
      setErrorMessage('خطا در برقراری ارتباط با سرور');
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col hover:scale-[1.02] border border-neutral-100 hover:border-primary-200">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
          <Image
            src={
              typeof product.primary_image === 'string' && product.primary_image.trim()
                ? product.primary_image
                : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=60'
            }
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Badges */}
          <div className="absolute top-3 right-3 left-3 flex items-start justify-between gap-2">
            {/* Featured Badge */}
            {product.is_featured && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl text-xs font-bold shadow-lg backdrop-blur-sm animate-pulse">
                ⭐ ویژه
              </span>
            )}
            
            {/* Discount Badge */}
            {product.has_discount && product.discount_percentage > 0 && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl text-xs font-bold shadow-lg backdrop-blur-sm">
                {product.discount_percentage}٪ تخفیف
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="absolute bottom-3 right-3">
            <span className={`px-3 py-1.5 ${stockInfo.bgColor} ${stockInfo.color} rounded-xl text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20`}>
              {stockInfo.label}
            </span>
          </div>

          {/* Action Buttons (Top Right) */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            {/* Wishlist Button */}
            <button
              onClick={handleAddToWishlist}
              disabled={isAddingToWishlist}
              className="w-11 h-11 bg-white/90 backdrop-blur-md hover:bg-red-50 border-2 border-white hover:border-red-200 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50"
              title="افزودن به علاقه‌مندی‌ها"
            >
              {showSuccessWishlist ? (
                <span className="text-red-500 text-xl">✓</span>
              ) : (
                <span className="text-red-500 text-xl">{isAddingToWishlist ? '⏳' : '♥'}</span>
              )}
            </button>
          </div>

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Brand & Category */}
          <div className="flex items-center gap-2 mb-2">
            {product.brand && (
              <span className="px-2.5 py-1 bg-gradient-to-r from-neutral-100 to-neutral-50 text-neutral-700 rounded-lg text-xs font-semibold border border-neutral-200">
                {product.brand}
              </span>
            )}
            <span className="px-2.5 py-1 bg-gradient-to-r from-primary-50 to-blue-50 text-primary-700 rounded-lg text-xs font-semibold border border-primary-200">
              {product.category_name}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-base font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[48px]">
            {product.name}
          </h3>

          {/* Short Description */}
          {product.short_description && (
            <p className="text-sm text-neutral-600 line-clamp-2 mb-3 flex-1">
              {product.short_description}
            </p>
          )}

          {/* Price Section */}
          <div className="mt-auto pt-3 border-t border-neutral-100">
            {product.has_discount ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                    {formatPrice(product.final_price)} تومان
                  </span>
                </div>
                <span className="text-sm text-neutral-400 line-through">
                  {formatPrice(product.price)} تومان
                </span>
              </div>
            ) : (
              <span className="text-lg font-black text-neutral-900">
                {formatPrice(product.final_price)} تومان
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-3 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transform sm:translate-y-2 sm:group-hover:translate-y-0 transition-all duration-300">
            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart || !product.is_in_stock}
              className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-neutral-300 disabled:to-neutral-400 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-[1.02]"
            >
              {showSuccessCart ? (
                <>✓ افزوده شد</>
              ) : isAddingToCart ? (
                <>⏳</>
              ) : (
                <>🛒 افزودن</>
              )}
            </button>
            
            {/* View Details */}
            <button className="px-4 py-3 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]">
              جزئیات
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-2 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs text-center">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none"></div>
      </div>
    </Link>
  );
};

export default ProductCard;
