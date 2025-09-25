import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StarRating from '@/components/ui/StarRating';
import { Product } from '@/types';

interface ComparisonFeature {
  key: string;
  label: string;
  unit: string;
}

interface ComparisonTableProps {
  selectedProducts: Product[];
  features: ComparisonFeature[];
  productDetails: Record<string, Record<string, string>>;
  onRemoveProduct: (productId: string) => void;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  selectedProducts,
  features,
  productDetails,
  onRemoveProduct
}) => {
  const formatPrice = (price: number) => new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  if (selectedProducts.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="container-max section-padding">
          <Card className="text-center py-16">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-display font-bold text-neutral-800 mb-4">
              هیچ محصولی برای مقایسه انتخاب نشده
            </h3>
            <p className="text-neutral-600">
              لطفاً حداقل یک محصول برای مقایسه انتخاب کنید
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
            جدول مقایسه محصولات
          </h2>
          <p className="text-lg text-neutral-600">
            مقایسه دقیق ویژگی‌های محصولات انتخابی
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-right p-6 font-display font-bold text-neutral-800 bg-neutral-50 min-w-[200px]">
                    ویژگی
                  </th>
                  {selectedProducts.map((product) => (
                    <th key={product.id} className="p-6 bg-neutral-50 min-w-[250px]">
                      <div className="space-y-4">
                        <div className="relative h-32 rounded-lg overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <h3 className="font-display font-bold text-neutral-800 text-sm mb-2">
                            {product.title}
                          </h3>
                          <div className="flex items-center justify-center gap-1 mb-2">
                            <StarRating rating={product.rating} size="sm" />
                            <span className="text-xs text-neutral-500">
                              ({product.reviews})
                            </span>
                          </div>
                          <div className="text-lg font-bold text-primary-600 mb-3">
                            {formatPrice(product.price)}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onRemoveProduct(product.id)}
                            >
                              حذف
                            </Button>
                            <Link href={`/products/${product.id}`}>
                              <Button size="sm">
                                جزئیات
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={feature.key} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-25'}>
                    <td className="p-6 font-medium text-neutral-700 border-l border-neutral-200">
                      {feature.label}
                      {feature.unit && (
                        <span className="text-sm text-neutral-500 mr-1">
                          ({feature.unit})
                        </span>
                      )}
                    </td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="p-6 text-center">
                        <span className="text-neutral-800">
                          {productDetails[product.id]?.[feature.key] || 'نامشخص'}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ComparisonTable;
