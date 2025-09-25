import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-50 via-white to-neutral-50">
      <div className="container-max section-padding">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            مقایسه محصولات
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-800 mb-6">
            مقایسه هوشمند محصولات
          </h1>
          
          <p className="text-lg text-neutral-600 leading-relaxed mb-8">
            با ابزار مقایسه پیشرفته ما، بهترین محصول را برای نیازهای خود انتخاب کنید. 
            ویژگی‌ها، قیمت‌ها و مشخصات فنی را در کنار هم مشاهده کنید.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
              <div className="text-3xl mb-3">⚖️</div>
              <h3 className="font-display font-bold text-neutral-800 mb-2">
                مقایسه دقیق
              </h3>
              <p className="text-sm text-neutral-600">
                مقایسه جزئیات فنی و ویژگی‌ها
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="font-display font-bold text-neutral-800 mb-2">
                انتخاب هوشمند
              </h3>
              <p className="text-sm text-neutral-600">
                بهترین گزینه را پیدا کنید
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-display font-bold text-neutral-800 mb-2">
                جدول کامل
              </h3>
              <p className="text-sm text-neutral-600">
                نمایش تمام اطلاعات در یک نگاه
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
