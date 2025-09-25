import React from 'react';
import Image from 'next/image';
import { heroData } from '@/data/mockData';
import Button from '@/components/ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-accent-cream min-h-[80vh] lg:min-h-[90vh] flex items-center overflow-hidden">
      <div className="container-max section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6 mt-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-800 leading-tight">
                <span className="block">طراحی داخلی خود را</span>
                <span className="block text-primary-500">مینیمال</span>
                <span className="block">و مدرن کنید</span>
              </h1>
              
              {/* <p className="text-lg lg:text-xl text-neutral-600 max-w-lg leading-relaxed">
                {heroData.subtitle}
              </p> */}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-sm font-semibold tracking-wider">
                {heroData.cta}
              </Button>
              <Button variant="secondary" size="lg" className="text-sm font-semibold">
                مشاهده ویدئو
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 space-x-reverse pt-3">
              <div>
                <div className="text-2xl font-bold text-neutral-800">7</div>
                <div className="text-sm text-neutral-500">سال تجربه</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-800">2k+</div>
                <div className="text-sm text-neutral-500">مشتری راضی</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-800">15k+</div>
                <div className="text-sm text-neutral-500">پروژه انجام‌شده</div>
              </div>
            </div>
          </div>

          {/* Right Content - Furniture Showcase */}
          <div className="relative">
            <div className="relative bg-primary-500 rounded-4xl p-8 lg:p-12">
              {/* Main Chair Image */}
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Modern Chair"
                  width={400}
                  height={500}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full"></div>
              <div className="absolute bottom-8 left-4 w-8 h-8 bg-white/30 rounded-full"></div>
              
              {/* Hanging Plant */}
              <div className="absolute -top-8 right-8 w-24 h-32">
                <Image
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Hanging Plant"
                  width={100}
                  height={120}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Secondary Chair */}
            <div className="absolute -bottom-4 -left-8 lg:-left-12 bg-white rounded-2xl p-4 shadow-medium">
              <Image
                src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                alt="Secondary Chair"
                width={120}
                height={150}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Decorative Plants */}
            <div className="absolute -bottom-8 right-4 flex space-x-2">
              <div className="w-12 h-16 bg-neutral-800 rounded-full"></div>
              <div className="w-8 h-12 bg-primary-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-neutral-300 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-neutral-300 rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
