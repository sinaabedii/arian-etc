'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogService } from '@/lib/blog-service';
import type { BlogPost, BlogCategory } from '@/types/blog';
import Button from '@/components/ui/Button';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadCategories();
    loadFeaturedPosts();
  }, []);

  useEffect(() => {
    loadPosts();
  }, [selectedCategory, currentPage]);

  const loadCategories = async () => {
    try {
      const response = await blogService.getCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const loadFeaturedPosts = async () => {
    try {
      const response = await blogService.getFeaturedPosts();
      if (response.success && response.data) {
        setFeaturedPosts(response.data);
      }
    } catch (err) {
      console.error('Error loading featured posts:', err);
    }
  };

  const loadPosts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await blogService.getPosts({
        category: selectedCategory || undefined,
        page: currentPage,
        page_size: 9,
      });

      if (response.success && response.data) {
        setPosts(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 9));
      } else {
        setError(response.error?.message || 'خطا در بارگذاری مقالات');
      }
    } catch (err) {
      setError('خطا در بارگذاری مقالات');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR');
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container-max section-padding py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl text-white shadow-xl">
              📝
            </div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-neutral-900 mb-4">
            بلاگ و مقالات
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            آخرین مقالات، راهنماها و اخبار روز دنیای محصولات
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
              <span>⭐</span> مقالات ویژه
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.slice(0, 3).map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-lg text-xs font-bold">
                        ⭐ ویژه
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                          {post.category?.name || 'بدون دسته'}
                        </span>
                        <span className="text-sm text-neutral-500">
                          {post.read_time} دقیقه
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-neutral-600 text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-neutral-500">
                        <span>{formatDate(post.published_at)}</span>
                        <span className="flex items-center gap-4">
                          <span>👁️ {post.views_count}</span>
                          <span>💬 {post.comments_count}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Categories Filter */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">دسته‌بندی‌ها</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedCategory === ''
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                همه مقالات
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {cat.name}
                  {cat.posts_count !== undefined && (
                    <span className="mr-2 text-sm opacity-75">({cat.posts_count})</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center mb-8">
            <p className="text-red-700 font-medium">⚠️ {error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-neutral-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-neutral-200 rounded mb-4"></div>
                  <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">
              مقاله‌ای یافت نشد
            </h3>
            <p className="text-neutral-600">
              در این دسته‌بندی مقاله‌ای وجود ندارد
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                          {post.category?.name || 'بدون دسته'}
                        </span>
                        <span className="text-sm text-neutral-500">
                          {post.read_time} دقیقه
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-neutral-600 text-sm line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-neutral-500">
                        <span>{formatDate(post.published_at)}</span>
                        <span className="flex items-center gap-4">
                          <span>👁️ {post.views_count}</span>
                          <span>💬 {post.comments_count}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  قبلی
                </Button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl font-medium transition-all ${
                        currentPage === page
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  بعدی
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
