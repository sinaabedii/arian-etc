'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { blogService } from '@/lib/blog-service';
import type { BlogComment } from '@/types/blog';
import Button from '@/components/ui/Button';

interface CommentsSectionProps {
  postSlug: string;
  comments: BlogComment[];
  onCommentAdded: () => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postSlug, comments, onCommentAdded }) => {
  const { isAuthenticated, user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await blogService.createComment({
        post_slug: postSlug,
        content: newComment,
        parent_comment_id: replyTo || undefined,
      });

      if (response.success) {
        setNewComment('');
        setReplyTo(null);
        onCommentAdded();
      } else {
        setError(response.error?.message || 'خطا در ارسال نظر');
      }
    } catch (err) {
      setError('خطا در ارسال نظر');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} دقیقه پیش`;
    if (hours < 24) return `${hours} ساعت پیش`;
    if (days < 7) return `${days} روز پیش`;
    return date.toLocaleDateString('fa-IR');
  };

  const organizeComments = (comments: BlogComment[]) => {
    const commentMap = new Map<number, BlogComment & { replies: BlogComment[] }>();
    const rootComments: (BlogComment & { replies: BlogComment[] })[] = [];

    // Initialize all comments with empty replies array
    comments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Organize into tree structure
    comments.forEach(comment => {
      const commentWithReplies = commentMap.get(comment.id)!;
      if (comment.parent_comment) {
        const parent = commentMap.get(comment.parent_comment);
        if (parent) {
          parent.replies.push(commentWithReplies);
        }
      } else {
        rootComments.push(commentWithReplies);
      }
    });

    return rootComments;
  };

  const organizedComments = organizeComments(comments);

  type CommentWithReplies = BlogComment & { replies: BlogComment[] };

  const CommentItem: React.FC<{ comment: CommentWithReplies; isReply?: boolean }> = ({ comment, isReply = false }) => (
    <div className={`${isReply ? 'mr-8 mt-3' : 'mb-6'}`}>
      <div className={`bg-white rounded-2xl shadow-md p-4 ${isReply ? 'border-r-4 border-blue-300' : ''}`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
            {comment.user_name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-neutral-900">{comment.user_name}</h4>
              <span className="text-xs text-neutral-500">{formatDate(comment.created_at)}</span>
            </div>
            <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap break-words">
              {comment.content}
            </p>
            {isAuthenticated && !isReply && (
              <button
                onClick={() => setReplyTo(comment.id)}
                className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <span>💬</span> پاسخ
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3">
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply as CommentWithReplies} isReply />
          ))}
        </div>
      )}

      {/* Reply Form */}
      {replyTo === comment.id && (
        <div className="mr-8 mt-3 bg-blue-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-blue-700">
              پاسخ به {comment.user_name}
            </span>
            <button
              onClick={() => setReplyTo(null)}
              className="text-neutral-500 hover:text-neutral-700"
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="پاسخ خود را بنویسید..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
            />
            <div className="flex gap-2 mt-2">
              <Button type="submit" size="sm" disabled={isSubmitting || !newComment.trim()}>
                {isSubmitting ? '⏳ در حال ارسال...' : '🚀 ارسال پاسخ'}
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setReplyTo(null)}>
                انصراف
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-neutral-50 to-blue-50 rounded-2xl p-6 lg:p-8">
      <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
        <span>💬</span>
        نظرات ({comments.length})
      </h3>

      {/* Comment Form */}
      {isAuthenticated ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'ک'}
            </div>
            <div>
              <p className="font-bold text-neutral-900">{user?.name}</p>
              <p className="text-sm text-neutral-500">نظر خود را بنویسید</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="نظر خود را درباره این مقاله بنویسید..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none mb-4"
            />

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 mb-4">
                <p className="text-red-700 text-sm">⚠️ {error}</p>
              </div>
            )}

            <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
              {isSubmitting ? (
                <>
                  <span className="animate-spin text-xl ml-2">⏳</span>
                  در حال ارسال...
                </>
              ) : (
                <>
                  <span className="text-xl ml-2">🚀</span>
                  ارسال نظر
                </>
              )}
            </Button>
          </form>
        </div>
      ) : (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8 text-center">
          <p className="text-yellow-800 font-medium mb-4">
            🔒 برای ارسال نظر باید وارد حساب کاربری خود شوید
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/auth/login">
              <Button>ورود</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline">ثبت‌نام</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Comments List */}
      {organizedComments.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💭</div>
          <p className="text-neutral-600 font-medium">
            هنوز نظری ثبت نشده است. اولین نفر باشید!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {organizedComments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
