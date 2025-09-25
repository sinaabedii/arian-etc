import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  image,
  features,
  price
}) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-4">
        <div className="relative h-48 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-display font-bold text-neutral-800">
            {title}
          </h3>
          
          <p className="text-neutral-600 text-sm leading-relaxed">
            {description}
          </p>
          
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-sm text-neutral-600 flex items-center">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 ml-2"></span>
                {feature}
              </li>
            ))}
          </ul>
          
          <div className="flex items-center justify-between pt-4">
            <span className="text-2xl font-bold text-primary-600">
              {price}
            </span>
            <Link href={`/products/${id}`}>
              <Button size="sm">
                مشاهده جزئیات
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
