'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ticketService } from '@/lib/ticket-service';
import type { Ticket } from '@/types/ticket';
import { TICKET_STATUS_LABELS, TICKET_STATUS_COLORS, TICKET_PRIORITY_LABELS, TICKET_PRIORITY_COLORS } from '@/types/ticket';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import CreateTicketModal from '@/components/tickets/CreateTicketModal';

const DashboardTicketsPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated) {
        loadTickets();
      } else {
        router.push('/auth/login?redirect=/dashboard/tickets');
      }
    }
  }, [isAuthenticated, authLoading, selectedStatus, selectedPriority]);

  const loadTickets = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await ticketService.getMyTickets({
        page_size: 100,
        status: selectedStatus || undefined,
        priority: selectedPriority || undefined,
      });
      
      if (response.success && response.data) {
        const results: any = response.data.results;
        if (Array.isArray(results) && results.length > 0 && results[0]?.results) {
          setTickets(results[0].results as Ticket[]);
        } else if (Array.isArray(results)) {
          setTickets(results as Ticket[]);
        }
      } else {
        setError(response.error?.message || 'خطا در بارگذاری تیکت‌ها');
      }
    } catch (err) {
      setError('خطا در بارگذاری تیکت‌ها');
    } finally {
      setIsLoading(false);
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

  if (authLoading || (isLoading && tickets.length === 0)) {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-neutral-200 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <span className="text-3xl">🎫</span>
            </div>
            <div>
              <h1 className="text-4xl font-black text-neutral-900">
                تیکت‌های پشتیبانی
              </h1>
              <p className="text-neutral-600 mt-1">
                مشاهده و پیگیری تیکت‌های شما
              </p>
            </div>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            تیکت جدید
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-neutral-200 p-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  فیلتر بر اساس وضعیت
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
                >
                  <option value="">همه</option>
                  <option value="open">باز</option>
                  <option value="in_progress">در حال بررسی</option>
                  <option value="waiting_customer">در انتظار مشتری</option>
                  <option value="resolved">حل شده</option>
                  <option value="closed">بسته شده</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  فیلتر بر اساس اولویت
                </label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
                >
                  <option value="">همه</option>
                  <option value="low">کم</option>
                  <option value="normal">عادی</option>
                  <option value="high">بالا</option>
                  <option value="urgent">فوری</option>
                </select>
              </div>
            </div>
      </div>

      {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-red-700 flex items-center gap-2">
                <span>⚠️</span> {error}
              </p>
            </div>
          )}

          {/* Tickets List */}
          {isLoading ? (
            <div className="grid gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="h-6 bg-neutral-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : tickets.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                تیکتی وجود ندارد
              </h3>
              <p className="text-neutral-600 mb-6">
                هنوز تیکتی ثبت نکرده‌اید
              </p>
              <Button onClick={() => setIsModalOpen(true)}>
                ایجاد اولین تیکت
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {tickets.map((ticket) => (
                <Link key={ticket.id} href={`/dashboard/tickets/${ticket.id}`}>
                  <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer group">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        {/* Ticket Number & Category */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-mono rounded-lg">
                            {ticket.ticket_number}
                          </span>
                          <span className="text-sm text-neutral-500">
                            {ticket.category_name}
                          </span>
                        </div>

                        {/* Subject */}
                        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {ticket.subject}
                        </h3>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                          <span className="flex items-center gap-1">
                            <span>📅</span>
                            {formatDate(ticket.created_at)}
                          </span>
                          {ticket.last_message_at && (
                            <span className="flex items-center gap-1">
                              <span>💬</span>
                              آخرین پیام: {formatDate(ticket.last_message_at)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Status & Priority Badges */}
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${TICKET_STATUS_COLORS[ticket.status]}`}>
                          {TICKET_STATUS_LABELS[ticket.status]}
                        </span>
                        <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${TICKET_PRIORITY_COLORS[ticket.priority]}`}>
                          {TICKET_PRIORITY_LABELS[ticket.priority]}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => loadTickets()}
      />
    </div>
  );
};

export default DashboardTicketsPage;
