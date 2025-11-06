'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { productService } from '@/lib/product-service';
import type { Product, ProductFilters } from '@/types/product';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';

const ProductsClient: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStockStatus, setSelectedStockStatus] = useState<number>(0);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const PAGE_SIZE = 12;

  useEffect(() => {
    // Read from URL params
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    
    setSelectedCategory(category);
    setSearchQuery(search);
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedCategory, searchQuery, selectedStockStatus, priceRange, sortBy, showFeaturedOnly]);

  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const filters: ProductFilters = {
        page: currentPage,
        page_size: PAGE_SIZE,
      };

      if (searchQuery) filters.search = searchQuery;
      if (selectedCategory) filters.category_slug = selectedCategory;
      if (selectedStockStatus > 0) filters.stock_status = selectedStockStatus as 1 | 2 | 3 | 4;
      if (priceRange.min) filters.min_price = parseFloat(priceRange.min);
      if (priceRange.max) filters.max_price = parseFloat(priceRange.max);
      if (sortBy) filters.ordering = sortBy;
      if (showFeaturedOnly) filters.is_featured = true;

      const response = await productService.getProducts(filters);

      if (response.success && response.data) {
        setProducts(response.data.results);
        setTotalCount(response.data.count);
        setTotalPages(Math.ceil(response.data.count / PAGE_SIZE));
      } else {
        setError(response.error?.message || 'خطا در بارگذاری محصولات');
      }
    } catch (err) {
      setError('خطا در بارگذاری محصولات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({ search: searchQuery, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateURL = (params: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value.toString());
      } else {
        newParams.delete(key);
      }
    });

    router.push(`/products?${newParams.toString()}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedStockStatus(0);
    setPriceRange({ min: '', max: '' });
    setSortBy('');
    setShowFeaturedOnly(false);
    router.push('/products');
  };

  if (isLoading && products.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="container-max section-padding">
          {/* Hero Loading */}
          <div className="mb-12 animate-pulse">
            <div className="h-48 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded-3xl mb-8"></div>
          </div>
          
          <div className="text-center mb-8">
            <div className="h-10 w-48 bg-neutral-200 rounded-xl mx-auto mb-4"></div>
            <div className="h-6 w-32 bg-neutral-100 rounded-lg mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-neutral-100 rounded-2xl h-96 shadow-md"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && products.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="container-max section-padding">
          <div className="max-w-md mx-auto text-center bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-neutral-200 p-12">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-4xl">😕</div>
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">خطا در بارگذاری</h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">{error}</p>
            <button
              onClick={loadProducts}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              تلاش مجدد
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 py-16 md:py-20">
        <style jsx>{`
          .bg-grid-pattern {
            background-image: 
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
            background-size: 50px 50px;
          }
        `}</style>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="container-max section-padding relative z-10">
          <div className="text-center text-white">
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
              <span className="text-sm font-medium">🛍️ فروشگاه آنلاین لومینا</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 drop-shadow-lg">
              محصولات ما
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              {totalCount > 0 
                ? `${new Intl.NumberFormat('fa-IR').format(totalCount)} محصول با کیفیت در انتظار شماست` 
                : 'در حال جستجوی بهترین محصولات...'}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black">100K+</div>
                <div className="text-sm text-white/80">محصول</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black">⚡</div>
                <div className="text-sm text-white/80">ارسال سریع</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black">✓</div>
                <div className="text-sm text-white/80">کیفیت تضمینی</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-max section-padding py-12">

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-neutral-200/50 p-6 md:p-8 mb-8">
          {/* Filter Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-500 rounded-xl flex items-center justify-center text-white text-xl">
                🔍
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900">جستجو و فیلتر</h2>
                <p className="text-sm text-neutral-600">محصول مورد نظر خود را پیدا کنید</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="lg:col-span-2">
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجوی محصول..."
                  className="w-full px-4 py-3 pr-12 bg-neutral-50 border-2 border-neutral-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 group-hover:text-primary-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none cursor-pointer hover:border-primary-300"
            >
              <option value="">🔄 مرتب‌سازی</option>
              <option value="name">📝 نام (الف-ی)</option>
              <option value="-name">📝 نام (ی-الف)</option>
              <option value="final_price">💰 قیمت (کم به زیاد)</option>
              <option value="-final_price">💰 قیمت (زیاد به کم)</option>
              <option value="-created_at">✨ جدیدترین</option>
            </select>

            {/* Stock Status */}
            <select
              value={selectedStockStatus}
              onChange={(e) => setSelectedStockStatus(parseInt(e.target.value))}
              className="px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none cursor-pointer hover:border-primary-300"
            >
              <option value="0">📦 وضعیت موجودی</option>
              <option value="1">✅ موجود</option>
              <option value="2">❌ ناموجود</option>
              <option value="3">⏳ به‌زودی</option>
              <option value="4">📞 تماس بگیرید</option>
            </select>
          </div>

          {/* Price Range & Featured */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="💵 حداقل قیمت"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              className="px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
            />
            <input
              type="number"
              placeholder="💵 حداکثر قیمت"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              className="px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
            />
            <label className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary-50 to-blue-50 border-2 border-primary-200 rounded-xl cursor-pointer hover:border-primary-300 transition-all group">
              <input
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 cursor-pointer"
              />
              <span className="font-medium text-primary-700 group-hover:text-primary-800">⭐ محصولات ویژه</span>
            </label>
          </div>

          {/* Clear Filters */}
          {(searchQuery || selectedCategory || selectedStockStatus > 0 || priceRange.min || priceRange.max || showFeaturedOnly) && (
            <div className="mt-6 pt-4 border-t border-neutral-200 text-center">
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-medium rounded-xl transition-all hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                پاک کردن فیلترها
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-neutral-300">
            <div className="text-8xl mb-6 animate-bounce">📦</div>
            <h3 className="text-3xl font-bold text-neutral-900 mb-3">
              محصولی یافت نشد
            </h3>
            <p className="text-lg text-neutral-600 mb-8 max-w-md mx-auto">
              متأسفانه محصولی با این مشخصات پیدا نکردیم. لطفاً فیلترهای دیگری را امتحان کنید
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              مشاهده همه محصولات
            </button>
          </div>
        ) : (
          <>
            {/* Products Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-neutral-700">
                نمایش <span className="font-bold text-primary-600">{products.length}</span> محصول از{' '}
                <span className="font-bold text-primary-600">{new Intl.NumberFormat('fa-IR').format(totalCount)}</span>
              </p>
              {isLoading && (
                <div className="flex items-center gap-2 text-primary-600">
                  <div className="animate-spin w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full"></div>
                  <span className="text-sm">در حال بارگذاری...</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-3 bg-white border-2 border-neutral-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100 font-medium"
                  >
                    ← قبلی
                  </button>
                  
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-3 rounded-xl font-bold transition-all hover:scale-105 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg'
                            : 'bg-white border-2 border-neutral-200 hover:border-primary-500 hover:bg-primary-50 text-neutral-700'
                        }`}
                      >
                        {new Intl.NumberFormat('fa-IR').format(page)}
                      </button>
                    );
                  })}
                  
                  {totalPages > 5 && (
                    <>
                      <span className="px-2 text-neutral-400">...</span>
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className={`px-4 py-3 rounded-xl font-bold transition-all hover:scale-105 ${
                          currentPage === totalPages
                            ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg'
                            : 'bg-white border-2 border-neutral-200 hover:border-primary-500 hover:bg-primary-50 text-neutral-700'
                        }`}
                      >
                        {new Intl.NumberFormat('fa-IR').format(totalPages)}
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-3 bg-white border-2 border-neutral-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100 font-medium"
                  >
                    بعدی →
                  </button>
                </div>

                <p className="text-sm text-neutral-600">
                  صفحه <span className="font-bold text-primary-600">{new Intl.NumberFormat('fa-IR').format(currentPage)}</span> از{' '}
                  <span className="font-bold text-primary-600">{new Intl.NumberFormat('fa-IR').format(totalPages)}</span>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductsClient;
