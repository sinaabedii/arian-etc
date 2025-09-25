'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { bestSellingProducts, testimonials } from '@/data/mockData';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const Experience: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 lg:py-24 bg-accent-cream">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Top Left - Large Image */}
              <div className="col-span-2 lg:col-span-1">
                <div className="relative bg-primary-500 rounded-2xl p-6 h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Orange Chair"
                    width={300}
                    height={300}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              {/* Top Right - Sofa */}
              <div className="bg-secondary-100 rounded-2xl p-6 h-80">
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Modern Sofa"
                  width={300}
                  height={300}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-neutral-800 leading-tight">
                بهترین تجربه خرید و کیفیت را ارائه می‌دهیم
              </h2>
              
              <p className="text-lg text-neutral-600 leading-relaxed">
                با خیال راحت انتخاب کنید؛ تمام محصولات توسط تیم‌های حرفه‌ای و با استفاده از مواد اولیه باکیفیت تولید شده‌اند تا دوام، کارایی و زیبایی را همزمان تجربه کنید.
              </p>
            </div>

            <Button size="lg">
              اطلاعات بیشتر
            </Button>
          </div>
        </div>

        {/* Testimonial Slider Section */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-600 font-medium text-sm mb-4">
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              نظرات مشتریان راضی
            </div>
            <h3 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-4">
              آنچه مشتریان ما می‌گویند
            </h3>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              تجربه واقعی مشتریان ما از استفاده محصولات Arian ETC
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-50 via-transparent to-primary-50 rounded-4xl -z-10"></div>
            
            {/* Slider Container */}
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-3xl shadow-soft hover:shadow-medium transition-all duration-300 p-8 lg:p-12 mx-4 relative overflow-hidden">
                      {/* Quote Icon */}
                      <div className="absolute top-6 right-6 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                      </div>

                      <div className="space-y-8">
                        {/* Stars */}
                        <div className="flex justify-center space-x-1 space-x-reverse">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                        </div>
                        
                        {/* Quote */}
                        <blockquote className="text-xl lg:text-2xl text-neutral-700 leading-relaxed text-center font-medium">
                          «{testimonial.content}»
                        </blockquote>
                        
                        {/* Author Info */}
                        <div className="flex items-center justify-center space-x-4 space-x-reverse pt-4">
                          <div className="relative">
                            <Image
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              width={80}
                              height={80}
                              className="w-20 h-20 rounded-full object-cover ring-4 ring-primary-100"
                            />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-display font-bold text-xl text-neutral-800">
                              {testimonial.name}
                            </div>
                            <div className="text-primary-600 font-medium">
                              {testimonial.role}
                            </div>
                            <div className="text-neutral-500 text-sm">
                              {testimonial.company}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-primary-50 z-10 group"
              aria-label="نظر قبلی"
            >
              <svg className="w-6 h-6 text-neutral-600 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-primary-50 z-10 group"
              aria-label="نظر بعدی"
            >
              <svg className="w-6 h-6 text-neutral-600 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-3 space-x-reverse mt-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'w-12 h-3 bg-primary-500 rounded-full' 
                      : 'w-3 h-3 bg-neutral-300 hover:bg-primary-300 rounded-full'
                  }`}
                  aria-label={`رفتن به نظر ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
