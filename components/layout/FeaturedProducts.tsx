'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const featuredProducts = [
  {
    id: 1,
    title: 'گوشی هوشمند',
    description: 'جدیدترین مدل‌های گوشی با تکنولوژی روز',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 'از ۵ میلیون تومان',
    discount: '۲۰٪ تخفیف',
    link: '/products?category=smartphones',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'لپ تاپ و کامپیوتر',
    description: 'بهترین برندها برای کار و بازی',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 'از ۱۰ میلیون تومان',
    discount: '۱۵٪ تخفیف',
    link: '/products?category=laptops',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: 'ساعت هوشمند',
    description: 'سلامت و تناسب اندام را رصد کنید',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 'از ۲ میلیون تومان',
    discount: '۳۰٪ تخفیف',
    link: '/products?category=watches',
    color: 'from-rose-500 to-orange-500'
  },
  {
    id: 4,
    title: 'هدفون و ایرپاد',
    description: 'صدای بی‌نقص با کیفیت استودیویی',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 'از ۱ میلیون تومان',
    discount: '۲۵٪ تخفیف',
    link: '/products?category=audio',
    color: 'from-teal-500 to-green-500'
  }
];

const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-neutral-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="hidden md:block absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="hidden md:block absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="container-max section-padding relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-primary-100 to-blue-100 text-primary-700 rounded-full text-sm font-bold">
              ⭐ محصولات ویژه
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            محصولات پیشنهادی ما
          </h2>
          <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
            بهترین محصولات با تخفیف‌های ویژه فقط برای شما
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product, index) => (
            <Link
              key={product.id}
              href={product.link}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 h-full">
                {/* Image */}
                <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    {product.discount}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-600 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg md:text-xl font-bold text-primary-600">
                      {product.price}
                    </span>
                    <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>مشاهده</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 lg:mt-16">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>مشاهده همه محصولات</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;
