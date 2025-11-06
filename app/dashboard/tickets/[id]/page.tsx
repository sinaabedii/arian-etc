'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ticketService } from '@/lib/ticket-service';
import type { TicketDetail } from '@/types/ticket';
import { TICKET_STATUS_LABELS, TICKET_STATUS_COLORS, TICKET_PRIORITY_LABELS, TICKET_PRIORITY_COLORS } from '@/types/ticket';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

const TicketDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const ticketId = parseInt(params?.id as string);
  
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated && ticketId) {
        loadTicket();
      } else if (!isAuthenticated) {
        router.push('/auth/login?redirect=/dashboard/tickets');
      }
    }
  }, [isAuthenticated, authLoading, ticketId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ticket?.messages]);

  const loadTicket = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await ticketService.getTicketDetail(ticketId);
      
      if (response.success && response.data) {
        setTicket(response.data);
      } else {
        setError(response.error?.message || 'خطا در بارگذاری تیکت');
      }
    } catch (err) {
      setError('خطا در بارگذاری تیکت');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    
    try {
      const response = await ticketService.addMessage(ticketId, {
        message: newMessage,
      });
      
      if (response.success) {
        setNewMessage('');
        await loadTicket();
      } else {
        alert(response.error?.message || 'خطا در ارسال پیام');
      }
    } catch (err) {
      alert('خطا در ارسال پیام');
    } finally {
      setIsSending(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎫</div>
          <p className="text-neutral-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">خطا</h2>
          <p className="text-neutral-600 mb-6">{error || 'تیکت یافت نشد'}</p>
          <Link href="/dashboard/tickets">
            <Button>بازگشت به لیست تیکت‌ها</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 lg:py-12">
      <div className="container-max section-padding">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link href="/dashboard/tickets" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
            <span>←</span>
            <span>بازگشت به لیست تیکت‌ها</span>
          </Link>

          {/* Ticket Header */}
          <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8 mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-mono rounded-xl shadow-lg">
                    {ticket.ticket_number}
                  </span>
                  <span className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-lg">
                    {ticket.category_name}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                  {ticket.subject}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                  <span className="flex items-center gap-1">
                    <span>📅</span>
                    ایجاد: {formatDate(ticket.created_at)}
                  </span>
                  {ticket.last_message_at && (
                    <span className="flex items-center gap-1">
                      <span>💬</span>
                      آخرین پیام: {formatDate(ticket.last_message_at)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${TICKET_STATUS_COLORS[ticket.status]}`}>
                  {TICKET_STATUS_LABELS[ticket.status]}
                </span>
                <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${TICKET_PRIORITY_COLORS[ticket.priority]}`}>
                  اولویت: {TICKET_PRIORITY_LABELS[ticket.priority]}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-3">توضیحات اولیه:</h3>
              <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
                {ticket.description}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden mb-6">
            {/* Messages Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span>💬</span>
                گفتگو
              </h2>
            </div>

            {/* Messages List */}
            <div className="p-8 space-y-6 max-h-[600px] overflow-y-auto">
              {ticket.messages && ticket.messages.length > 0 ? (
                ticket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.is_staff_reply ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] ${message.is_staff_reply ? '' : 'text-right'}`}>
                      {/* Sender Info */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-neutral-700">
                          {message.sender_name}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          message.is_staff_reply
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {message.is_staff_reply ? 'پشتیبانی' : 'شما'}
                        </span>
                      </div>

                      {/* Message Bubble */}
                      <div className={`rounded-2xl p-4 ${
                        message.is_staff_reply
                          ? 'bg-white border-2 border-green-200'
                          : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                      }`}>
                        <p className="leading-relaxed whitespace-pre-wrap">
                          {message.message}
                        </p>
                      </div>

                      {/* Time */}
                      <div className="mt-2 text-xs text-neutral-500">
                        {formatDate(message.created_at)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-neutral-500">
                  <div className="text-5xl mb-3">💬</div>
                  <p>هنوز پیامی وجود ندارد</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            {ticket.status !== 'closed' && (
              <div className="border-t border-neutral-200 p-6">
                <form onSubmit={handleSendMessage} className="flex gap-4">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="پیام خود را بنویسید..."
                    className="flex-1 px-5 py-4 border-2 border-neutral-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    disabled={isSending}
                  />
                  <Button
                    type="submit"
                    disabled={isSending || !newMessage.trim()}
                  >
                    {isSending ? '...' : '📤 ارسال'}
                  </Button>
                </form>
              </div>
            )}

            {ticket.status === 'closed' && (
              <div className="border-t border-neutral-200 p-6 bg-neutral-50">
                <p className="text-center text-neutral-600 flex items-center justify-center gap-2">
                  <span>🔒</span>
                  این تیکت بسته شده است و امکان ارسال پیام جدید وجود ندارد
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TicketDetailPage;
