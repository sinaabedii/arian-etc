import React from 'react';
import Image from 'next/image';

const partners = [
  {
    id: 1,
    name: 'بیمارستان امام خمینی',
    logo: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    category: 'بیمارستان'
  },
  {
    id: 2,
    name: 'هتل‌های اسپیناس',
    logo: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    category: 'هتلداری'
  },
  {
    id: 3,
    name: 'رستوران‌های دیزی سرا',
    logo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    category: 'رستوران'
  },
  {
    id: 4,
    name: 'مجتمع تجاری ایران مال',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    category: 'مراکز تجاری'
  },
  {
    id: 5,
    name: 'دانشگاه تهران',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    category: 'آموزشی'
  },
  {
    id: 6,
    name: 'شرکت پتروشیمی',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    category: 'صنعتی'
  }
];

const Partners: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-neutral-50">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-neutral-800 mb-4">
            مشتریان و شرکای تجاری ما
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            بیش از 1000 سازمان و مرکز معتبر از محصولات ما استفاده می‌کنند
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner) => (
            <div 
              key={partner.id}
              className="group text-center"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-medium transition-all duration-300 group-hover:scale-105">
                <div className="relative w-16 h-16 mx-auto mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="font-semibold text-sm text-neutral-800 mb-1 group-hover:text-primary-500 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-xs text-neutral-500">
                  {partner.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-lg text-neutral-800">
              تأیید وزارت بهداشت
            </h3>
            <p className="text-neutral-600 text-sm">
              تمام محصولات دارای مجوز و تأیید وزارت بهداشت
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-lg text-neutral-800">
              گواهی ISO 9001
            </h3>
            <p className="text-neutral-600 text-sm">
              سیستم مدیریت کیفیت مطابق استانداردهای بین‌المللی
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-lg text-neutral-800">
              پشتیبانی 24/7
            </h3>
            <p className="text-neutral-600 text-sm">
              خدمات پس از فروش و پشتیبانی در تمام ساعات
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
