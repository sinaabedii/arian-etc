import React from 'react';
import Image from 'next/image';

const benefits = [
  {
    id: 1,
    title: 'کیفیت تضمین‌شده',
    description: 'تمام محصولات ما دارای استانداردهای بین‌المللی و گواهی‌های معتبر هستند',
    icon: '🏆',
    stats: '99.9% رضایت مشتری'
  },
  {
    id: 2,
    title: 'ارسال سریع',
    description: 'ارسال رایگان برای سفارش‌های بالای 500 هزار تومان در سراسر کشور',
    icon: '🚚',
    stats: 'ارسال در 24 ساعت'
  },
  {
    id: 3,
    title: 'پشتیبانی 24/7',
    description: 'تیم متخصص ما آماده پاسخگویی و مشاوره در تمام ساعات شبانه‌روز',
    icon: '🎧',
    stats: 'پاسخ در کمتر از 1 ساعت'
  },
  {
    id: 4,
    title: 'قیمت مناسب',
    description: 'بهترین قیمت در بازار با امکان خرید عمده و تخفیف‌های ویژه',
    icon: '💰',
    stats: 'تا 30% تخفیف عمده'
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative bg-primary-50 rounded-3xl md:rounded-4xl p-6 md:p-8 lg:p-12">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="کیفیت محصولات"
                width={500}
                height={400}
                className="w-full h-auto rounded-xl md:rounded-2xl object-cover"
              />
              
              {/* Floating Stats */}
              <div className="hidden md:block absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-medium">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-500">50K+</div>
                  <div className="text-xs md:text-sm text-neutral-600">مشتری راضی</div>
                </div>
              </div>
              
              <div className="hidden md:block absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-medium">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-500">100K+</div>
                  <div className="text-xs md:text-sm text-neutral-600">محصول متنوع</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Benefits */}
          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-neutral-800 leading-tight">
                چرا لومینا را انتخاب کنید؟
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-neutral-600 leading-relaxed">
                ما با تنوع بی‌نظیر محصولات و خدمات با کیفیت، تجربه‌ای متفاوت از خرید آنلاین را برای شما رقم می‌زنیم.
              </p>
            </div>

            <div className="grid gap-4 md:gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="flex items-start space-x-3 md:space-x-4 space-x-reverse p-4 md:p-5 lg:p-6 bg-neutral-50 rounded-xl md:rounded-2xl hover:bg-primary-50 transition-colors duration-300">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-2xl shadow-sm">
                    {benefit.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-base md:text-lg text-neutral-800 mb-1 md:mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-600 text-xs md:text-sm mb-2 md:mb-3">
                      {benefit.description}
                    </p>
                    <div className="text-primary-500 font-semibold text-xs md:text-sm">
                      {benefit.stats}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
