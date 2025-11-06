'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { blogService } from '@/lib/blog-service';
import type { BlogPostDetail } from '@/types/blog';
import CommentsSection from '@/components/blog/CommentsSection';

const BlogDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug]);

  const loadPost = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await blogService.getPostDetail(slug);

      if (response.success && response.data) {
        setPost(response.data);
      } else {
        setError(response.error?.message || 'مقاله یافت نشد');
      }
    } catch (err) {
      setError('خطا در بارگذاری مقاله');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50">
        <div className="container-max section-padding py-12">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-96 bg-neutral-200 rounded-2xl mb-8"></div>
              <div className="h-8 bg-neutral-200 rounded mb-4"></div>
              <div className="h-4 bg-neutral-200 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50">
        <div className="container-max section-padding py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">❌</div>
              <h1 className="text-2xl font-bold text-red-900 mb-2">خطا در بارگذاری مقاله</h1>
              <p className="text-red-700 mb-6">{error || 'مقاله یافت نشد'}</p>
              <Link href="/blog">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                  بازگشت به لیست مقالات
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50">
      <div className="container-max section-padding py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-neutral-600 hover:text-blue-600 transition-colors">
              خانه
            </Link>
            <span className="text-neutral-400">←</span>
            <Link href="/blog" className="text-neutral-600 hover:text-blue-600 transition-colors">
              بلاگ
            </Link>
            <span className="text-neutral-400">←</span>
            <Link
              href={post.category?.slug ? `/blog?category=${post.category.slug}` : '/blog'}
              className="text-neutral-600 hover:text-blue-600 transition-colors"
            >
              {post.category?.name || 'بدون دسته'}
            </Link>
            <span className="text-neutral-400">←</span>
            <span className="text-neutral-900 font-medium truncate">{post.title}</span>
          </nav>

          {/* Featured Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 right-6 left-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium">
                  {post.category?.name || 'بدون دسته'}
                </span>
                {post.is_featured && (
                  <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-lg text-sm font-bold">
                    ⭐ ویژه
                  </span>
                )}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {post.title}
              </h1>
            </div>
          </div>

          {/* Meta Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {post.author?.name?.charAt(0)?.toUpperCase() || 'ن'}
                </div>
                <div>
                  <p className="font-bold text-neutral-900">{post.author?.name || 'نویسنده ناشناس'}</p>
                  <p className="text-sm text-neutral-600">{formatDate(post.published_at)}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-neutral-600">
                <span className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span className="text-sm">{post.read_time} دقیقه مطالعه</span>
                </span>
                <span className="flex items-center gap-2">
                  <span>👁️</span>
                  <span className="text-sm">{post.views_count} بازدید</span>
                </span>
                <span className="flex items-center gap-2">
                  <span>💬</span>
                  <span className="text-sm">{post.comments_count} نظر</span>
                </span>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-neutral-200">
                <span className="text-sm text-neutral-600 font-medium">برچسب‌ها:</span>
                {post.tags.map((tag) => (
                  <Link key={tag.id} href={`/blog?tag=${tag.slug}`}>
                    <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-lg text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors">
                      #{tag.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div className="bg-blue-50 border-r-4 border-blue-500 rounded-2xl p-6 mb-8">
            <p className="text-lg text-neutral-800 leading-relaxed font-medium">
              {post.excerpt}
            </p>
          </div>

          {/* Content */}
          <article className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-12">
            <div
              className="prose prose-lg max-w-none
                prose-headings:text-neutral-900 prose-headings:font-bold
                prose-p:text-neutral-700 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-neutral-900 prose-strong:font-bold
                prose-ul:text-neutral-700 prose-ol:text-neutral-700
                prose-li:text-neutral-700
                prose-blockquote:border-r-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pr-4 prose-blockquote:py-2
                prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-img:rounded-xl prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Share Section */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 mb-12 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">این مقاله را دوست داشتید؟</h3>
                <p className="text-blue-100">با دوستان خود به اشتراک بگذارید!</p>
              </div>
              <div className="flex gap-3">
                <button className="w-12 h-12 bg-white/20 rounded-xl hover:bg-white/30 transition-colors flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </button>
                <button className="w-12 h-12 bg-white/20 rounded-xl hover:bg-white/30 transition-colors flex items-center justify-center">
                  <span className="text-2xl">🔗</span>
                </button>
                <button className="w-12 h-12 bg-white/20 rounded-xl hover:bg-white/30 transition-colors flex items-center justify-center">
                  <span className="text-2xl">✉️</span>
                </button>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <CommentsSection
            postSlug={post.slug}
            comments={post.comments || []}
            onCommentAdded={loadPost}
          />

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link href="/blog">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                ← بازگشت به لیست مقالات
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailPage;
