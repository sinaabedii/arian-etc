'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { ProductDetail, Product } from '@/types/product';
import { STOCK_STATUS } from '@/types/product';
import { cartService } from '@/lib/cart-service';
import { wishlistService } from '@/lib/wishlist-service';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import ProductCard from '@/components/product/ProductCard';
import ProductReviews from '@/components/product/ProductReviews';
import { useCart } from '@/contexts/CartContext';

interface ProductDetailClientProps {
  product: ProductDetail;
  related: Product[];
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product, related }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const { addFromApiItem } = useWishlist();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [showSuccessCart, setShowSuccessCart] = useState(false);
  const [showSuccessWishlist, setShowSuccessWishlist] = useState(false);
  const [errorCart, setErrorCart] = useState<string | null>(null);
  const [errorWishlist, setErrorWishlist] = useState<string | null>(null);

  const stockInfo = STOCK_STATUS[product.stock_status];
  
  const images: string[] = Array.isArray(product.images) && product.images.length > 0
    ? product.images.map((img) => 
        typeof img.image === 'string' && img.image.trim() 
          ? img.image 
          : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=60'
      )
    : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=60'];

  const formatPrice = (price: string | number) => {
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('fa-IR').format(isNaN(num) ? 0 : num);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=/products/${product.slug}`);
      return;
    }

    setIsAddingToCart(true);
    setErrorCart(null);
    try {
      const response = await cartService.addToCart({
        product_id: product.id,
        quantity: quantity,
      });
      
      if (response.success) {
        // Sync local cart context so cart page shows items immediately
        addItem({
          id: String(product.id),
          name: product.name,
          price: parseFloat(product.final_price || '0') || 0,
          image: images[0],
          category: product.category_name,
          slug: product.slug,
        });
        if (quantity > 1) {
          const current = getItemQuantity(String(product.id));
          updateQuantity(String(product.id), current + (quantity - 1));
        }
        setShowSuccessCart(true);
        setTimeout(() => setShowSuccessCart(false), 3000);
      } else {
        const errorMsg = response.error?.message || 'خطا در افزودن به سبد خرید';
        setErrorCart(errorMsg);
        setTimeout(() => setErrorCart(null), 5000);
      }
    } catch (error) {
      console.error('خطا در افزودن به سبد:', error);
      setErrorCart('خطا در برقراری ارتباط با سرور');
      setTimeout(() => setErrorCart(null), 5000);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=/products/${product.slug}`);
      return;
    }

    setIsAddingToWishlist(true);
    setErrorWishlist(null);
    try {
      const response = await wishlistService.addToWishlist({
        product: product.id,
      });
      
      if (response.success) {
        if (response.data) {
          addFromApiItem(response.data as any);
        }
        setShowSuccessWishlist(true);
        setTimeout(() => setShowSuccessWishlist(false), 3000);
      } else {
        // Handle specific error for duplicate wishlist item
        let errorMsg = response.error?.message || 'خطا در افزودن به علاقه‌مندی';
        
        // Check if it's a duplicate error from the errors object
        if (response.error?.errors?.product) {
          const productErrors = response.error.errors.product;
          if (Array.isArray(productErrors) && productErrors.some(err => 
            err.includes('already in your wishlist') || err.includes('already exists')
          )) {
            errorMsg = 'این محصول قبلاً به علاقه‌مندی‌های شما اضافه شده است';
          }
        }
        
        setErrorWishlist(errorMsg);
        setTimeout(() => setErrorWishlist(null), 5000);
      }
    } catch (error) {
      console.error('خطا در افزودن به علاقه‌مندی:', error);
      setErrorWishlist('خطا در برقراری ارتباط با سرور');
      setTimeout(() => setErrorWishlist(null), 5000);
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section with Product Info */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-neutral-200/50">
        <div className="container-max section-padding py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-3xl overflow-hidden shadow-2xl group border-2 border-neutral-100">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  unoptimized
                  priority
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Wishlist Button */}
                <button
                  onClick={handleAddToWishlist}
                  disabled={isAddingToWishlist}
                  className="absolute top-4 left-4 w-16 h-16 bg-white/95 hover:bg-white backdrop-blur-md border-2 border-white hover:border-red-200 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 z-10"
                  title="افزودن به علاقه‌مندی‌ها"
                >
                  {showSuccessWishlist ? (
                    <span className="text-red-500 text-3xl">✓</span>
                  ) : (
                    <span className="text-red-500 text-3xl">{isAddingToWishlist ? '⏳' : '♥'}</span>
                  )}
                </button>

                {/* Badges */}
                {product.is_featured && (
                  <div className="absolute top-4 right-4">
                    <span className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl text-sm font-black shadow-xl backdrop-blur-sm animate-pulse border-2 border-white/50">
                      ⭐ محصول ویژه
                    </span>
                  </div>
                )}

                {product.has_discount && product.discount_percentage > 0 && (
                  <div className="absolute bottom-4 right-4">
                    <span className="px-5 py-2.5 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 text-white rounded-2xl text-base font-black shadow-xl backdrop-blur-sm border-2 border-white/50">
                      {product.discount_percentage}٪ تخفیف
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
                        selectedImage === index
                          ? 'ring-4 ring-primary-500 ring-offset-2 scale-105 border-primary-500 shadow-lg'
                          : 'border-neutral-200 opacity-70 hover:opacity-100 hover:scale-105 hover:border-primary-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - تصویر ${index + 1}`}
                        fill
                        sizes="120px"
                        unoptimized
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Category */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-4 leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {product.brand && (
                    <span className="px-4 py-2 bg-gradient-to-r from-neutral-100 to-neutral-50 text-neutral-700 rounded-xl text-sm font-bold border border-neutral-200 shadow-sm">
                      🏷️ برند: {product.brand}
                    </span>
                  )}
                  {product.category_name && (
                    <span className="px-4 py-2 bg-gradient-to-r from-primary-50 to-blue-50 text-primary-700 rounded-xl text-sm font-bold border border-primary-200 shadow-sm">
                      📦 {product.category_name}
                    </span>
                  )}
                  {product.sku && (
                    <span className="px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 rounded-xl text-sm font-bold border border-amber-200 shadow-sm">
                      #️⃣ کد: {product.sku}
                    </span>
                  )}
                </div>

                {product.short_description && (
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    {product.short_description}
                  </p>
                )}
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 rounded-3xl p-8 shadow-xl border-2 border-primary-100">
                {product.has_discount ? (
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-black bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {formatPrice(product.final_price)}
                      </span>
                      <span className="text-2xl font-bold text-neutral-700">تومان</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl text-neutral-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                      <span className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl text-sm font-black shadow-lg">
                        🔥 {product.discount_percentage}٪ تخفیف
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-black bg-gradient-to-r from-neutral-800 to-neutral-900 bg-clip-text text-transparent">
                      {formatPrice(product.final_price)}
                    </span>
                    <span className="text-2xl font-bold text-neutral-700">تومان</span>
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-4">
                <span className={`px-5 py-2.5 ${stockInfo.bgColor} ${stockInfo.color} rounded-xl text-base font-bold shadow-md`}>
                  {stockInfo.label}
                </span>
                {typeof product.stock_quantity === 'number' && product.stock_quantity > 0 && (
                  <span className="text-neutral-600 font-medium">
                    موجودی: {new Intl.NumberFormat('fa-IR').format(product.stock_quantity)} عدد
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              {product.is_in_stock && (
                <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl p-6 shadow-lg border-2 border-neutral-200">
                  <label className="flex items-center gap-2 text-base font-bold text-neutral-800 mb-4">
                    <span>🔢</span>
                    تعداد:
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-14 h-14 bg-gradient-to-br from-neutral-100 to-neutral-200 hover:from-neutral-200 hover:to-neutral-300 rounded-xl font-black text-2xl transition-all shadow-md hover:shadow-lg hover:scale-105"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 h-14 text-center border-2 border-primary-200 bg-white rounded-xl font-black text-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-md"
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-14 h-14 bg-gradient-to-br from-neutral-100 to-neutral-200 hover:from-neutral-200 hover:to-neutral-300 rounded-xl font-black text-2xl transition-all shadow-md hover:shadow-lg hover:scale-105"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || !product.is_in_stock}
                  className="flex-1 py-5 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-700 hover:via-emerald-700 hover:to-green-700 disabled:from-neutral-300 disabled:to-neutral-400 disabled:cursor-not-allowed text-white font-black rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-xl shadow-2xl hover:shadow-green-500/50 hover:scale-[1.02] disabled:hover:scale-100 border-2 border-green-700 disabled:border-neutral-400"
                >
                  {showSuccessCart ? (
                    <>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      افزوده شد
                    </>
                  ) : isAddingToCart ? (
                    <>
                      <div className="animate-spin w-6 h-6 border-3 border-white border-t-transparent rounded-full"></div>
                      در حال افزودن...
                    </>
                  ) : (
                    <>
                      🛒 افزودن به سبد خرید
                    </>
                  )}
                </button>
              </div>

              {/* Error Messages */}
              {errorCart && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {errorCart}
                </div>
              )}
              {errorWishlist && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {errorWishlist}
                </div>
              )}

              {/* Additional Info */}
              {(product.model_number || product.weight || product.dimensions) && (
                <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-6 space-y-3 border border-neutral-200 shadow-md">
                  <h3 className="font-bold text-neutral-900 mb-2 flex items-center gap-2">
                    <span>ℹ️</span>
                    مشخصات فنی
                  </h3>
                  {product.model_number && (
                    <div className="flex items-center justify-between py-3 border-b border-neutral-200/50">
                      <span className="text-neutral-600 font-medium">🏷️ مدل:</span>
                      <span className="font-bold text-neutral-900">{product.model_number}</span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex items-center justify-between py-3 border-b border-neutral-200/50">
                      <span className="text-neutral-600 font-medium">⚖️ وزن:</span>
                      <span className="font-bold text-neutral-900">{product.weight}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex items-center justify-between py-3">
                      <span className="text-neutral-600 font-medium">📏 ابعاد:</span>
                      <span className="font-bold text-neutral-900">{product.dimensions}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      {product.description && (
        <div className="container-max section-padding py-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-neutral-200 p-8 lg:p-12">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-neutral-200">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg">
                📝
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-neutral-900">
                توضیحات محصول
              </h2>
            </div>
            <div 
              className="prose prose-neutral prose-lg max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>
      )}

      {/* Product Reviews */}
      <div className="container-max section-padding py-12">
        <ProductReviews productId={product.id} productName={product.name} />
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="container-max section-padding py-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg">
              🔗
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-neutral-900">
                محصولات مرتبط
              </h2>
              <p className="text-neutral-600 mt-1">محصولاتی که ممکن است علاقه‌مند باشید</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailClient;
