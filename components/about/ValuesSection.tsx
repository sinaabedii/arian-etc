import React from 'react';
import Card from '@/components/ui/Card';

const values = [
  {
    icon: '🎯',
    title: 'کیفیت بالا',
    description: 'تعهد ما به ارائه محصولات با بالاترین کیفیت و استانداردهای بین‌المللی'
  },
  {
    icon: '🔬',
    title: 'نوآوری',
    description: 'تحقیق و توسعه مداوم برای ارائه راه‌حل‌های پیشرفته و مؤثر'
  },
  {
    icon: '🌱',
    title: 'محیط زیست',
    description: 'حفاظت از محیط زیست با تولید محصولات سازگار با طبیعت'
  },
  {
    icon: '🤝',
    title: 'اعتماد',
    description: 'ایجاد روابط بلندمدت مبتنی بر اعتماد و رضایت مشتریان'
  }
];

const ValuesSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
            ارزش‌های ما
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            اصول و ارزش‌هایی که ما را در مسیر ارائه بهترین خدمات راهنمایی می‌کنند
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <div className="space-y-4">
                <div className="text-4xl mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-neutral-800">
                  {value.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
