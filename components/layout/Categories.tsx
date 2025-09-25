import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/ui/Card';

const categories = [
  {
    id: 1,
    title: 'ضدعفونی‌کننده‌ها',
    description: 'محصولات ضدعفونی با گرید بیمارستانی',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 12,
    href: '/products?category=disinfectants',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'شوینده‌ها',
    description: 'پاک‌کننده‌های چندمنظوره و تخصصی',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 18,
    href: '/products?category=cleaners',
    color: 'bg-green-500'
  },
  {
    id: 3,
    title: 'دستمال‌های مرطوب',
    description: 'دستمال‌های ضدباکتری و پاک‌کننده',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 8,
    href: '/products?category=wipes',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    title: 'محصولات صنعتی',
    description: 'راهکارهای نظافتی برای صنایع',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 15,
    href: '/products?category=industrial',
    color: 'bg-orange-500'
  }
];

const Categories: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="container-max section-padding">
        {/* بخش عنوان */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-4">
            دسته‌بندی محصولات
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            محصولات نظافتی و ضدعفونی ما را بر اساس نیاز خود انتخاب کنید
          </p>
        </div>

        {/* شبکه دسته‌بندی‌ها */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={category.href} className="group">
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                {/* تصویر دسته‌بندی */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={`absolute top-4 right-4 w-3 h-3 ${category.color} rounded-full`} />
                </div>

                {/* محتوای دسته‌بندی */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500">
                      {category.productCount} محصول
                    </span>
                    <svg className="w-5 h-5 text-primary-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* مشاهده همه دکمه */}
        <div className="text-center mt-12">
          <Link 
            href="/products"
            className="inline-flex items-center px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200"
          >
            مشاهده همه محصولات
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
