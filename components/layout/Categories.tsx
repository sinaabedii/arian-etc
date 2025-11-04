import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/ui/Card';

const categories = [
  {
    id: 1,
    title: '🛒 مواد غذایی',
    description: 'مواد خوراکی، نوشیدنی و لبنیات',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 850,
    href: '/products?category=food',
    color: 'bg-green-500',
    icon: '🛒'
  },
  {
    id: 2,
    title: '🏠 لوازم خانگی',
    description: 'وسایل آشپزخانه و برقی',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 620,
    href: '/products?category=home',
    color: 'bg-blue-500',
    icon: '🏠'
  },
  {
    id: 3,
    title: '👕 پوشاک و کفش',
    description: 'لباس و اکسسوری',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 1240,
    href: '/products?category=fashion',
    color: 'bg-pink-500',
    icon: '👕'
  },
  {
    id: 4,
    title: '💻 الکترونیکی',
    description: 'موبایل، لپ‌تاپ و لوازم',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 580,
    href: '/products?category=electronics',
    color: 'bg-purple-500',
    icon: '💻'
  },
  {
    id: 5,
    title: '✨ زیبایی و بهداشت',
    description: 'آرایشی و بهداشتی',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 390,
    href: '/products?category=beauty',
    color: 'bg-rose-500',
    icon: '✨'
  },
  {
    id: 6,
    title: '📚 کتاب و لوازم التحریر',
    description: 'کتاب و لوازم تحریر',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 720,
    href: '/products?category=books',
    color: 'bg-amber-500',
    icon: '📚'
  },
  {
    id: 7,
    title: '🏃 ورزش و سرگرمی',
    description: 'لوازم ورزشی و سرگرمی',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 470,
    href: '/products?category=sports',
    color: 'bg-cyan-500',
    icon: '🏃'
  },
  {
    id: 8,
    title: '🎁 هدایا و سوغات',
    description: 'هدیه و سوغاتی',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    productCount: 340,
    href: '/products?category=gifts',
    color: 'bg-red-500',
    icon: '🎁'
  }
];

const Categories: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="container-max section-padding">
        {/* بخش عنوان */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-4">
            خرید بر اساس دسته‌بندی
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            هزاران محصول در دسته‌بندی‌های مختلف برای راحتی خرید شما
          </p>
        </div>

        {/* شبکه دسته‌بندی‌ها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.href} className="group">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full">
                {/* تصویر دسته‌بندی */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* بج رنگی */}
                  <div className={`absolute top-3 right-3 w-10 h-10 sm:w-12 sm:h-12 ${category.color} rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm bg-opacity-90`}>
                    <span className="text-xl sm:text-2xl">{category.icon}</span>
                  </div>
                </div>

                {/* محتوای دسته‌بندی */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-display font-bold text-neutral-800 mb-1 sm:mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {category.title}
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-neutral-500 font-medium">
                      {category.productCount}+ محصول
                    </span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
