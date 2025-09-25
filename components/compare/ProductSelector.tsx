import React from 'react';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StarRating from '@/components/ui/StarRating';
import { Product } from '@/types';

interface ProductSelectorProps {
  products: Product[];
  selectedProducts: Product[];
  onProductSelect: (product: Product) => void;
  onProductRemove: (productId: string) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  products,
  selectedProducts,
  onProductSelect,
  onProductRemove
}) => {
  const isSelected = (productId: string) => 
    selectedProducts.some(p => p.id === productId);

  const formatPrice = (price: number) => new Intl.NumberFormat('fa-IR').format(price) + ' تومان';

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
            انتخاب محصولات برای مقایسه
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            حداکثر 3 محصول را برای مقایسه انتخاب کنید
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300">
              <div className="space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-neutral-800 line-clamp-2">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <StarRating rating={product.rating} />
                    <span className="text-sm text-neutral-500">
                      ({product.reviews})
                    </span>
                  </div>
                  
                  <div className="text-2xl font-bold text-primary-600">
                    {formatPrice(product.price)}
                  </div>
                  
                  <Button
                    onClick={() => 
                      isSelected(product.id) 
                        ? onProductRemove(product.id)
                        : onProductSelect(product)
                    }
                    variant={isSelected(product.id) ? "outline" : "primary"}
                    size="sm"
                    className="w-full"
                    disabled={!isSelected(product.id) && selectedProducts.length >= 3}
                  >
                    {isSelected(product.id) ? 'حذف از مقایسه' : 'افزودن به مقایسه'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSelector;
