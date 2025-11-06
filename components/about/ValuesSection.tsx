import React from 'react';
import Card from '@/components/ui/Card';

const values = [
  {
    icon: '✅',
    title: 'کیفیت تضمینی',
    description: 'تمامی محصولات با ضمانت اصالت و کیفیت از برندهای معتبر داخلی و خارجی',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: '🚀',
    title: 'ارسال سریع',
    description: 'ارسال رایگان برای سفارش‌های بالای 500 هزار تومان و تحویل اکسپرس در تهران',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: '💰',
    title: 'قیمت مناسب',
    description: 'بهترین قیمت‌ها با تضمین بازگشت وجه و امکان مقایسه قیمت با سایر فروشگاه‌ها',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: '🎧',
    title: 'پشتیبانی 24/7',
    description: 'تیم پشتیبانی حرفه‌ای آماده پاسخگویی به سوالات شما در تمام ساعات شبانه‌روز',
    color: 'from-orange-500 to-red-500'
  }
];

const ValuesSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl text-white shadow-xl mx-auto mb-6">
            ⭐
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-neutral-900 mb-4">
            چرا لومینا؟
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            تعهد ما به ارائه بهترین تجربه خرید آنلاین با کیفیت، سرعت و اعتماد
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border-2 border-neutral-200 p-6 text-center hover:shadow-2xl hover:scale-[1.05] hover:border-primary-300 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-black text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
