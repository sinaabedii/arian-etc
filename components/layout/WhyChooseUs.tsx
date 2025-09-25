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
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Image */}
          <div className="relative">
            <div className="relative bg-primary-50 rounded-4xl p-8 lg:p-12">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="کیفیت محصولات"
                width={500}
                height={400}
                className="w-full h-auto rounded-2xl object-cover"
              />
              
              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-medium">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-500">10K+</div>
                  <div className="text-sm text-neutral-600">مشتری راضی</div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-medium">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-500">7</div>
                  <div className="text-sm text-neutral-600">سال تجربه</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Benefits */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-neutral-800 leading-tight">
                چرا Arian ETC را انتخاب کنید؟
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                ما با سال‌ها تجربه در زمینه تولید و عرضه محصولات نظافتی، بهترین کیفیت و خدمات را به شما ارائه می‌دهیم.
              </p>
            </div>

            <div className="grid gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="flex items-start space-x-4 space-x-reverse p-6 bg-neutral-50 rounded-2xl hover:bg-primary-50 transition-colors duration-300">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg text-neutral-800 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-3">
                      {benefit.description}
                    </p>
                    <div className="text-primary-500 font-semibold text-sm">
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
