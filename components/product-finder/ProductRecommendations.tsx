import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface RecommendedProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  score: number;
  reason: string;
}

interface ProductRecommendationsProps {
  products: RecommendedProduct[];
  onRestart: () => void;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  products,
  onRestart
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-4">
          محصولات پیشنهادی برای شما
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          بر اساس نیازهای شما، این محصولات بهترین گزینه‌ها هستند
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300">
            <div className="space-y-4">
              {/* Badge for ranking */}
              <div className="flex items-center justify-between">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(product.score)}`}>
                  {index === 0 ? '🥇 بهترین انتخاب' : 
                   index === 1 ? '🥈 انتخاب دوم' : 
                   index === 2 ? '🥉 انتخاب سوم' : `انتخاب ${index + 1}`}
                </div>
                <div className="text-sm font-bold text-primary-600">
                  {product.score}% تطبیق
                </div>
              </div>

              {/* Product Image */}
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <h3 className="font-display font-bold text-neutral-800 text-lg">
                  {product.title}
                </h3>

                <div className="bg-neutral-50 p-3 rounded-lg">
                  <p className="text-sm text-neutral-700">
                    <span className="font-medium">چرا این محصول؟</span>
                    <br />
                    {product.reason}
                  </p>
                </div>

                <div className="text-2xl font-bold text-primary-600">
                  {formatPrice(product.price)}
                </div>

                <div className="flex gap-2">
                  <Link href={`/products/${product.id}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      مشاهده جزئیات
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline">
                    افزودن به سبد
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center space-y-4">
        <p className="text-neutral-600">
          آیا نتایج مطابق انتظار شما نبود؟
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onRestart} variant="outline">
            شروع مجدد تست
          </Button>
          <Link href="/products">
            <Button>
              مشاهده همه محصولات
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendations;
