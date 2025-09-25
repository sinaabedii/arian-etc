'use client';

import React, { useState } from 'react';
import { featuredProducts, bestSellingProducts } from '@/data/mockData';
import HeroSection from '@/components/compare/HeroSection';
import ProductSelector from '@/components/compare/ProductSelector';
import ComparisonTable from '@/components/compare/ComparisonTable';
import { Product } from '@/types';

const allProducts = [...featuredProducts, ...bestSellingProducts];

const comparisonFeatures = [
  { key: 'killTime', label: 'زمان از بین بردن میکروب', unit: '' },
  { key: 'coverage', label: 'پوشش سطح', unit: 'متر مربع' },
  { key: 'activeIngredient', label: 'ماده فعال', unit: '' },
  { key: 'safetyRating', label: 'رتبه ایمنی', unit: '' },
  { key: 'epaRegistered', label: 'مجوز EPA', unit: '' },
  { key: 'foodSafe', label: 'ایمن برای مواد غذایی', unit: '' },
  { key: 'fragrance', label: 'عطر و بو', unit: '' },
  { key: 'volume', label: 'حجم', unit: '' }
];

const productDetails: Record<string, Record<string, string>> = {
  '1': {
    killTime: '30 seconds',
    coverage: '200',
    activeIngredient: 'Quaternary Ammonium',
    safetyRating: 'Hospital Grade',
    epaRegistered: 'بله',
    foodSafe: 'بله',
    fragrance: 'بدون عطر',
    volume: '500ml'
  },
  '2': {
    killTime: '60 seconds',
    coverage: '150',
    activeIngredient: 'Alcohol-based',
    safetyRating: 'Commercial Grade',
    epaRegistered: 'بله',
    foodSafe: 'بله',
    fragrance: 'تازه ملایم',
    volume: '750ml'
  },
  '3': {
    killTime: '15 seconds',
    coverage: '100',
    activeIngredient: 'Benzalkonium Chloride',
    safetyRating: 'Consumer Safe',
    epaRegistered: 'بله',
    foodSafe: 'خیر',
    fragrance: 'بدون عطر',
    volume: '80 wipes'
  },
  '4': {
    killTime: '120 seconds',
    coverage: '300',
    activeIngredient: 'Citric Acid',
    safetyRating: 'Industrial Grade',
    epaRegistered: 'بله',
    foodSafe: 'خیر',
    fragrance: 'مرکبات',
    volume: '1L'
  },
  '5': {
    killTime: '45 seconds',
    coverage: '250',
    activeIngredient: 'Hydrogen Peroxide',
    safetyRating: 'Hospital Grade',
    epaRegistered: 'بله',
    foodSafe: 'بله',
    fragrance: 'بدون عطر',
    volume: '2L'
  },
  '6': {
    killTime: '90 seconds',
    coverage: '180',
    activeIngredient: 'Plant-based Enzymes',
    safetyRating: 'Eco-Friendly',
    epaRegistered: 'بله',
    foodSafe: 'بله',
    fragrance: 'طبیعی',
    volume: '500ml'
  }
};

const ComparePage: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleProductSelect = (product: Product) => {
    if (selectedProducts.length < 3) {
      setSelectedProducts(prev => [...prev, product]);
    }
  };

  const handleProductRemove = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProductSelector
        products={allProducts}
        selectedProducts={selectedProducts}
        onProductSelect={handleProductSelect}
        onProductRemove={handleProductRemove}
      />
      <ComparisonTable
        selectedProducts={selectedProducts}
        features={comparisonFeatures}
        productDetails={productDetails}
        onRemoveProduct={handleProductRemove}
      />
    </div>
  );
};

export default ComparePage;
