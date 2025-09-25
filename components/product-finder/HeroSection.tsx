import React from 'react';
import Button from '@/components/ui/Button';

interface HeroSectionProps {
  onStartQuiz: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartQuiz }) => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-50 via-white to-neutral-50">
      <div className="container-max section-padding">
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-6xl mb-6">🔍</div>
          
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-800 mb-6">
            یابنده محصول هوشمند
          </h1>
          
          <p className="text-lg text-neutral-600 leading-relaxed mb-8">
            با پاسخ به چند سوال ساده، بهترین محصولات نظافتی را برای نیازهای خاص خود پیدا کنید. 
            سیستم هوشمند ما محصولات مناسب را بر اساس صنعت، سطوح و نیازهای شما پیشنهاد می‌دهد.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
              <div className="text-3xl mb-3">❓</div>
              <h3 className="font-display font-bold text-neutral-800 mb-2">
                سوالات ساده
              </h3>
              <p className="text-sm text-neutral-600">
                فقط ۳ سوال در ۲ دقیقه
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-display font-bold text-neutral-800 mb-2">
                تحلیل هوشمند
              </h3>
              <p className="text-sm text-neutral-600">
                الگوریتم پیشرفته تطبیق
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-display font-bold text-neutral-800 mb-2">
                پیشنهاد دقیق
              </h3>
              <p className="text-sm text-neutral-600">
                محصولات مناسب شما
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Button size="lg" onClick={onStartQuiz}>
              شروع تست یابنده محصول
            </Button>
            <p className="text-sm text-neutral-500">
              رایگان و بدون نیاز به ثبت نام
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
