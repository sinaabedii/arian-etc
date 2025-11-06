'use client';
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { chatService, type ChatSession } from '@/lib/chat-service';

interface Message {
  id: string | number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  messageId?: number;
  feedback?: boolean | null;
}

const QUICK_QUESTIONS = [
  { id: 1, icon: '🛒', q: 'چطور محصول سفارش دهم؟', a: 'برای سفارش، به صفحه محصولات بروید و محصول مورد نظر را به سبد خرید اضافه کنید.' },
  { id: 2, icon: '🚚', q: 'زمان ارسال چقدر است؟', a: 'زمان ارسال بین 2 تا 5 روز کاری است.' },
  { id: 3, icon: '💳', q: 'روش‌های پرداخت؟', a: 'کارت‌های بانکی، پرداخت اینترنتی و پرداخت در محل.' },
  { id: 4, icon: '↩️', q: 'امکان مرجوعی؟', a: 'بله، تا 7 روز پس از دریافت محصول امکان مرجوعی دارید.' },
  { id: 5, icon: '📞', q: 'تماس با پشتیبانی؟', a: 'شماره 021-12345678 یا support@lumira.com' },
  { id: 6, icon: '🎁', q: 'تخفیف خرید عمده؟', a: 'بله، برای خریدهای عمده تخفیف ویژه داریم.' },
  { id: 7, icon: '📦', q: 'پیگیری سفارش؟', a: 'با کد پیگیری در بخش "پیگیری سفارش" وضعیت را ببینید.' },
  { id: 8, icon: '🔐', q: 'امنیت خرید؟', a: 'سایت دارای SSL و استانداردهای امنیتی بین‌المللی است.' }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'quick'|'chat'>('quick');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSid, setCurrentSid] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  
  useEffect(() => { 
    if (isOpen) { 
      const s = chatService.getAllSessions(); 
      setSessions(s); 
      setCurrentSid(chatService.getCurrentSessionId()); 
    } 
  }, [isOpen]);
  
  // Load history when session changes
  useEffect(() => {
    const loadHistory = async () => {
      if (!currentSid || view !== 'chat') return;
      
      setMessages([]); // Clear first
      
      try {
        const history = await chatService.getChatHistory(currentSid);
        const msgs: Message[] = [{
          id: 'welcome',
          text: '👋 سلام! چطور می‌تونم کمکتون کنم؟',
          isBot: true,
          timestamp: new Date()
        }];
        
        if (history && history.length > 0) {
          history.forEach(item => {
            msgs.push({
              id: `u-${item.id}`,
              text: item.message,
              isBot: false,
              timestamp: new Date(item.created_at)
            });
            msgs.push({
              id: item.id,
              text: item.response,
              isBot: true,
              timestamp: new Date(item.created_at),
              messageId: item.id,
              feedback: item.was_helpful
            });
          });
        }
        
        setMessages(msgs);
      } catch (err) {
        console.error('Error loading history:', err);
        setMessages([{
          id: 'welcome',
          text: '👋 سلام! چطور می‌تونم کمکتون کنم؟',
          isBot: true,
          timestamp: new Date()
        }]);
      }
    };
    
    loadHistory();
  }, [currentSid, view]);

  const send = async () => {
    if (!input.trim()) return;
    const um: Message = { id: `u-${Date.now()}`, text: input, isBot: false, timestamp: new Date() };
    setMessages(p => [...p, um]);
    const txt = input;
    setInput('');
    setTyping(true);
    try {
      const r = await chatService.sendMessage(txt, currentSid);
      setMessages(p => [...p, { id: Date.now(), text: r.response, isBot: true, timestamp: new Date(r.timestamp), messageId: Date.now() }]);
      setSessions(chatService.getAllSessions());
    } catch {
      setMessages(p => [...p, { id: Date.now(), text: '❌ خطا در ارسال پیام', isBot: true, timestamp: new Date() }]);
    } finally { setTyping(false); }
  };

  const quickQ = (q: string, a: string) => {
    setView('chat');
    setTimeout(() => {
      setMessages(p => [...p, { id: `u-${Date.now()}`, text: q, isBot: false, timestamp: new Date() }]);
      setTyping(true);
      setTimeout(() => {
        setMessages(p => [...p, { id: Date.now(), text: a, isBot: true, timestamp: new Date() }]);
        setTyping(false);
      }, 500);
    }, 100);
  };

  const feedback = async (mid: number, h: boolean) => {
    try {
      await chatService.submitFeedback(mid, h);
      setMessages(p => p.map(m => m.messageId === mid ? { ...m, feedback: h } : m));
    } catch {}
  };

  const newS = () => {
    chatService.createNewSession();
    const newId = chatService.getCurrentSessionId();
    setSessions(chatService.getAllSessions());
    setCurrentSid(newId);
    setView('chat');
    setShowMenu(false);
  };

  const switchS = (sid: string) => {
    chatService.switchSession(sid);
    setCurrentSid(sid);
    setView('chat');
    setShowMenu(false);
  };

  const delS = (sid: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('حذف این گفتگو؟')) {
      chatService.deleteSession(sid);
      setSessions(chatService.getAllSessions());
      setCurrentSid(chatService.getCurrentSessionId());
    }
  };

  const fmt = (d: Date) => {
    const df = Math.floor((new Date().getTime() - new Date(d).getTime()) / (1000*60*60*24));
    if (df === 0) return 'امروز';
    if (df === 1) return 'دیروز';
    if (df < 7) return `${df} روز پیش`;
    return new Date(d).toLocaleDateString('fa-IR');
  };

  return (<>
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={cn(
          'relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group',
          isOpen ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:scale-110'
        )}
      >
        {!isOpen && <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 blur-lg opacity-50"></div>}
        <div className="relative z-10">
          {isOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <div className="relative">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
            </div>
          )}
        </div>
      </button>
    </div>

    {isOpen && (
      <div className="fixed inset-x-4 bottom-24 top-4 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[380px] sm:h-[580px] backdrop-blur-xl bg-white/95 rounded-2xl shadow-2xl border border-gray-200/50 flex flex-col z-50 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-3">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
              
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center ring-2 ring-white/30">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full ring-2 ring-white"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm truncate">دستیار لومیرا</h3>
                  <p className="text-xs text-white/90">آنلاین</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={newS}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              title="گفتگوی جدید"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1.5">
            <button
              onClick={() => setView('quick')}
              className={cn(
                'flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all',
                view === 'quick' ? 'bg-white text-purple-600 shadow-md' : 'bg-white/20 text-white hover:bg-white/30'
              )}
            >
              <span className="flex items-center justify-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                سوالات
              </span>
            </button>
            <button
              onClick={() => setView('chat')}
              className={cn(
                'flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all',
                view === 'chat' ? 'bg-white text-purple-600 shadow-md' : 'bg-white/20 text-white hover:bg-white/30'
              )}
            >
              <span className="flex items-center justify-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                گفتگو
              </span>
            </button>
          </div>
        </div>

        {/* Sessions Menu */}
        {showMenu && (
          <div className="absolute top-full left-0 right-0 mt-1 mx-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 max-h-72 overflow-y-auto">
            <div className="p-2.5 border-b border-gray-200 bg-gray-50">
              <h4 className="font-semibold text-xs text-gray-800">گفتگوهای من</h4>
            </div>
            <div className="divide-y divide-gray-100">
              {sessions.length === 0 ? (
                <div className="p-3 text-center text-gray-500 text-xs">هنوز گفتگویی نیست</div>
              ) : (
                sessions.map(s => (
                  <button
                    key={s.id}
                    onClick={() => switchS(s.id)}
                    className={cn(
                      'w-full p-2.5 text-right hover:bg-gray-50 transition-colors group',
                      s.id === currentSid && 'bg-blue-50'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-xs text-gray-800 truncate mb-0.5">{s.title}</h5>
                        {s.lastMessage && <p className="text-[10px] text-gray-500 truncate">{s.lastMessage}</p>}
                        <p className="text-[9px] text-gray-400 mt-0.5">{fmt(s.updatedAt)}</p>
                      </div>
                      <button
                        onClick={(e) => delS(s.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all flex-shrink-0"
                      >
                        <svg className="w-3.5 h-3.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {view === 'quick' ? (
            <div className="flex-1 overflow-y-auto p-3 bg-gradient-to-b from-gray-50 to-white">
              <p className="text-xs text-gray-600 mb-2.5">✨ سوالات متداول</p>
              <div className="space-y-1.5">
                {QUICK_QUESTIONS.map(i => (
                  <button
                    key={i.id}
                    onClick={() => quickQ(i.q, i.a)}
                    className="w-full text-right p-2.5 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl border border-gray-200 hover:border-purple-300 transition-all hover:shadow-md group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg group-hover:scale-110 transition-transform flex-shrink-0">{i.icon}</span>
                      <p className="text-xs font-medium text-gray-800 group-hover:text-purple-600 truncate flex-1">{i.q}</p>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-2.5 bg-gradient-to-b from-gray-50 to-white">
                <div className="space-y-2">
                  {messages.map(m => (
                    <div key={m.id} className={cn('flex gap-1.5 animate-fade-in', m.isBot ? 'justify-start' : 'justify-end')}>
                      {m.isBot && (
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                          </svg>
                        </div>
                      )}
                      
                      <div className={cn('flex flex-col gap-1 max-w-[85%]', !m.isBot && 'items-end')}>
                        <div className={cn(
                          'px-3 py-2 rounded-2xl text-xs shadow-sm',
                          m.isBot ? 'bg-white text-gray-800 rounded-tl-sm border border-gray-200' : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-tr-sm'
                        )}>
                          <p className="leading-relaxed whitespace-pre-wrap break-words">{m.text}</p>
                        </div>
                        
                        {m.isBot && m.messageId && (
                          <div className="flex items-center gap-1.5 px-1.5">
                            <span className="text-[9px] text-gray-500">مفید؟</span>
                            <button
                              onClick={() => feedback(m.messageId!, true)}
                              disabled={m.feedback !== null && m.feedback !== undefined}
                              className={cn(
                                'p-0.5 rounded transition-colors disabled:cursor-not-allowed',
                                m.feedback === true ? 'text-green-600 bg-green-100' : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                              )}
                            >
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                              </svg>
                            </button>
                            <button
                              onClick={() => feedback(m.messageId!, false)}
                              disabled={m.feedback !== null && m.feedback !== undefined}
                              className={cn(
                                'p-0.5 rounded transition-colors disabled:cursor-not-allowed',
                                m.feedback === false ? 'text-red-600 bg-red-100' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                              )}
                            >
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {typing && (
                    <div className="flex gap-1.5">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                      <div className="bg-white px-3 py-2 rounded-2xl shadow-sm border border-gray-200">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'0.1s'}}></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={endRef}/>
                </div>
              </div>

              {/* Input */}
              <div className="p-2.5 border-t border-gray-200 bg-white">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                    placeholder="پیام خود را بنویسید..."
                    disabled={typing}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs disabled:bg-gray-100 transition-all"
                  />
                  <button
                    onClick={send}
                    disabled={!input.trim() || typing}
                    className="px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    )}
  </>);
};

export default Chatbot;
