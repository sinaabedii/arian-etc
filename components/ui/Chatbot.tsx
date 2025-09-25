'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'سلام! من اینجا هستم تا در مورد محصولات نظافتی و ضدعفونی ما به شما کمک کنم. چطور می‌تونم کمکتون کنم؟',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('قیمت') || message.includes('price') || message.includes('cost') || message.includes('هزینه')) {
      return 'محصولات ما از ۱۲.۹۹ تومان برای دستمال‌ها تا ۸۹.۹۹ تومان برای پاک‌کننده‌های صنعتی متغیر است. آیا قیمت محصول خاصی را می‌خواهید؟';
    }
    
    if (message.includes('ضدعفونی') || message.includes('disinfect') || message.includes('میکروب') || message.includes('kill germs')) {
      return 'ضدعفونی‌کننده اولتراکلین ما ۹۹.۹٪ میکروب‌ها، باکتری‌ها و ویروس‌ها را در فقط ۳۰ ثانیه از بین می‌برد! دارای مجوزهای بهداشتی و برای تمام سطوح ایمن است.';
    }
    
    if (message.includes('ایمن') || message.includes('safe') || message.includes('سمی') || message.includes('toxic')) {
      return 'تمام محصولات ما برای استفاده ایمن طراحی شده‌اند. غیرسمی و در اطراف کودکان و حیوانات خانگی ایمن هستند. خط محصولات سبز ما از مواد طبیعی استفاده می‌کند.';
    }
    
    if (message.includes('بیمارستان') || message.includes('hospital') || message.includes('درمانی') || message.includes('healthcare')) {
      return 'بله! محصولات ما گرید بیمارستانی دارند و در بیش از ۱۰٬۰۰۰ مرکز درمانی استفاده می‌شوند. تمام استانداردهای بهداشتی را رعایت می‌کنند.';
    }
    
    if (message.includes('کرونا') || message.includes('covid') || message.includes('coronavirus') || message.includes('ویروس') || message.includes('virus')) {
      return 'ضدعفونی‌کننده‌های ما علیه کووید-۱۹، ویروس‌های آنفلوآنزا و سایر عوامل بیماری‌زا مؤثر هستند. حفاظت قابل اعتماد برای خانواده و محل کار شما فراهم می‌کنند.';
    }
    
    if (message.includes('سفارش') || message.includes('خرید') || message.includes('order') || message.includes('buy') || message.includes('purchase')) {
      return 'می‌توانید کاتالوگ کامل محصولات ما را مرور کنید و برای سفارش‌های عمده مشاوره درخواست کنید. نمونه رایگان برای مشتریان تجاری ارائه می‌دهیم!';
    }
    
    if (message.includes('ترکیبات') || message.includes('ingredients') || message.includes('فرمول') || message.includes('formula')) {
      return 'محصولات ما از ترکیبات آمونیوم چهارتایی و سایر مواد فعال تأیید شده استفاده می‌کنند. تمام فرمولاسیون‌ها pH خنثی و زیست‌تخریب‌پذیر هستند.';
    }
    
    if (message.includes('سلام') || message.includes('hello') || message.includes('hi') || message.includes('درود')) {
      return 'سلام! خوشحالم که می‌تونم در مورد محصولات نظافتی‌مون کمکتون کنم. چه چیزی می‌خواهید بدونید؟';
    }
    
    if (message.includes('ممنون') || message.includes('متشکر') || message.includes('thank')) {
      return 'خواهش می‌کنم! آیا چیز دیگری هست که بتونم در مورد محصولات نظافتی‌مون کمکتون کنم؟';
    }
    
    // Default response
    return 'خوشحالم که می‌تونم کمکتون کنم! برای اطلاعات تفصیلی محصولات، قیمت‌گذاری یا سوالات فنی، می‌تونید مستقیماً با متخصصان ما تماس بگیرید. کدوم جنبه از محصولات نظافتی‌مون براتون جالبه؟';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center',
            isOpen 
              ? 'bg-gray-600 hover:bg-gray-700' 
              : 'bg-primary-500 hover:bg-primary-600'
          )}
          aria-label="باز/بسته کردن چت"
        >
          {isOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-primary-500 text-white p-4 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">دستیار Arian ETC</h3>
                <p className="text-xs opacity-90">آنلاین</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  message.isBot ? 'justify-start' : 'justify-end'
                )}
              >
                <div
                  className={cn(
                    'max-w-xs px-3 py-2 rounded-lg text-sm',
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-primary-500 text-white'
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="پیام خود را بنویسید..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
