import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  price: string;
}

interface ProductsSectionProps {
  products: Product[];
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ products }) => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
            محصولات تخصصی بهداشتی
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            مجموعه کاملی از محصولات ضدعفونی و نظافت برای محیط‌های بیمارستانی و درمانی
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              image={product.image}
              features={product.features}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
