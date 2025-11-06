'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center justify-center px-4 py-16">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-300/40 to-blue-400/40 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-300/40 to-pink-400/40 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-300/40 to-cyan-400/40 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full">
        <div className="text-center space-y-8">
          {/* 3D 404 Number */}
          <div className="relative inline-block perspective-1000">
            <div className="relative group">
              {/* Shadow/Depth Layers */}
              <div className="absolute inset-0 transform translate-x-4 translate-y-4 opacity-20">
                <h1 className="text-9xl md:text-[200px] lg:text-[280px] font-black text-primary-600">404</h1>
              </div>
              <div className="absolute inset-0 transform translate-x-2 translate-y-2 opacity-40">
                <h1 className="text-9xl md:text-[200px] lg:text-[280px] font-black text-primary-500">404</h1>
              </div>
              
              {/* Main Number with Gradient */}
              <h1 className="relative text-9xl md:text-[200px] lg:text-[280px] font-black bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x group-hover:scale-105 transition-transform duration-500">
                404
              </h1>
              
              {/* Floating Emoji Decorations */}
              <div className="absolute -top-8 -right-8 text-6xl animate-bounce-slow">🔍</div>
              <div className="absolute -bottom-4 -left-8 text-5xl animate-spin-slow">❓</div>
              <div className="absolute top-1/2 -right-12 text-4xl animate-float">🤔</div>
            </div>
          </div>

          {/* Error Message Card */}
          <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-8 md:p-12 transform hover:scale-105 transition-all duration-500">
            <div className="space-y-6">
              

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900">
                اوه! صفحه پیدا نشد
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
                صفحه‌ای که به دنبالش می‌گردی وجود نداره یا ممکنه منتقل شده باشه.
                <br />
                نگران نباش، می‌تونی به صفحه اصلی برگردی! 🏠
              </p>

              
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/">
              <button className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-black text-lg rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 min-w-[240px]">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  بازگشت به خانه
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </Link>

            <Link href="/products">
              <button className="group px-8 py-4 bg-white/80 backdrop-blur-xl hover:bg-white border-2 border-neutral-200 hover:border-primary-300 text-neutral-800 font-black text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 min-w-[240px]">
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  مشاهده محصولات
                </span>
              </button>
            </Link>
          </div>

          {/* Help Text */}
          <div className="pt-8">
            <p className="text-neutral-500 text-sm">
              در صورت تکرار این خطا، لطفاً با{' '}
              <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-bold underline underline-offset-4">
                پشتیبانی
              </Link>
              {' '}تماس بگیرید
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-30 animate-float-slow">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-blue-400 rounded-2xl transform rotate-12"></div>
      </div>
      <div className="absolute bottom-20 right-10 opacity-30 animate-float animation-delay-2000">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
      </div>
      <div className="absolute top-1/2 left-20 opacity-20 animate-float animation-delay-4000">
        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl transform -rotate-12"></div>
      </div>

      {/* Add Custom Animations in globals.css or inline styles */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
