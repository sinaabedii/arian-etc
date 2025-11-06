import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { featuredProducts } from '@/data/mockData';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const Features: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-3 md:mb-4">
            پرفروش‌ترین محصولات
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
            محبوب‌ترین محصولات ما را که ترکیبی از کیفیت بالا و کارایی هستند، کشف کنید.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group cursor-pointer" padding="none">
              <div className="relative overflow-hidden rounded-t-xl md:rounded-t-2xl">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs md:text-sm font-medium">
                    تخفیف
                  </div>
                )}
              </div>
              
              <div className="p-4 md:p-5 lg:p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm text-neutral-500 font-medium">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    <span className="text-xs md:text-sm text-neutral-600">{product.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-display font-semibold text-base md:text-lg text-neutral-800 mb-2">
                  {product.title}
                </h3>
                
                <p className="text-neutral-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 sm:space-x-reverse">
                    <span className="text-base sm:text-lg md:text-xl font-bold text-neutral-800">
                      {product.price} تومان
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs sm:text-sm text-neutral-500 line-through">
                        {product.originalPrice} تومان
                      </span>
                    )}
                  </div>
                  <Button size="sm" variant="outline" className="text-xs md:text-sm w-full sm:w-auto">
                    افزودن به سبد
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg">
            <Link href="/products">
              مشاهده همه محصولات
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
