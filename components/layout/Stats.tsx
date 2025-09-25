import React from 'react';

const stats = [
  {
    id: 1,
    number: '10,000+',
    label: 'مشتری راضی',
    description: 'در سراسر کشور',
    icon: '👥'
  },
  {
    id: 2,
    number: '50+',
    label: 'محصول متنوع',
    description: 'برای نیازهای مختلف',
    icon: '🧴'
  },
  {
    id: 3,
    number: '99.9%',
    label: 'اثربخشی',
    description: 'در از بین بردن میکروب‌ها',
    icon: '🦠'
  },
  {
    id: 4,
    number: '24/7',
    label: 'پشتیبانی',
    description: 'در تمام ساعات شبانه‌روز',
    icon: '🎧'
  },
  {
    id: 5,
    number: '1000+',
    label: 'مرکز درمانی',
    description: 'از محصولات ما استفاده می‌کنند',
    icon: '🏥'
  },
  {
    id: 6,
    number: '7',
    label: 'سال تجربه',
    description: 'در صنعت نظافت و بهداشت',
    icon: '⭐'
  }
];

const Stats: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-primary-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-max section-padding relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
            اعتماد هزاران مشتری
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            آمار و ارقامی که نشان‌دهنده کیفیت و اعتبار محصولات ما در بازار است
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.id} 
              className="text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2 font-display">
                  {stat.number}
                </div>
                <div className="text-white font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-white/80 text-sm">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse text-white/90">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-lg font-medium">محصولات تأیید شده توسط وزارت بهداشت</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
