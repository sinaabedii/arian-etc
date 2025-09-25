'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { featuredProducts, bestSellingProducts } from '@/data/mockData';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StarRating from '@/components/ui/StarRating';

const allProducts = [...featuredProducts, ...bestSellingProducts];

const filters = {
  categories: ['All', 'Disinfectants', 'Cleaners', 'Wipes', 'Industrial', 'Healthcare', 'Eco-Friendly'],
  priceRanges: [
    { label: 'Under $20', min: 0, max: 20 },
    { label: '$20 - $50', min: 20, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: 'Over $100', min: 100, max: Infinity }
  ],
  features: ['EPA Registered', 'Food Safe', 'Hospital Grade', 'Eco-Friendly', 'Fast Acting', 'Unscented'],
  surfaces: ['Hard Surfaces', 'Glass', 'Metal', 'Fabric', 'Food Contact'],
  industries: ['Healthcare', 'Food Service', 'Education', 'Office', 'Home']
};

const sortOptions = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' }
];

const CatalogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<any>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedSurfaces, setSelectedSurfaces] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      // Search term
      if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Category
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Price range
      if (selectedPriceRange && 
          (product.price < selectedPriceRange.min || product.price > selectedPriceRange.max)) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedPriceRange, selectedFeatures, selectedSurfaces, selectedIndustries, sortBy]);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const toggleSurface = (surface: string) => {
    setSelectedSurfaces(prev => 
      prev.includes(surface) 
        ? prev.filter(s => s !== surface)
        : [...prev, surface]
    );
  };

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry) 
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedPriceRange(null);
    setSelectedFeatures([]);
    setSelectedSurfaces([]);
    setSelectedIndustries([]);
  };

  const activeFiltersCount = 
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedPriceRange ? 1 : 0) +
    selectedFeatures.length +
    selectedSurfaces.length +
    selectedIndustries.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-800 mb-6">
              Product Catalog
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Explore our complete range of professional cleaning and disinfecting products with advanced filtering options.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products by name, category, or use case..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {filters.categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-neutral-600 hover:bg-primary-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container-max section-padding">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-display font-bold text-neutral-800">
                    Filters
                  </h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Clear All ({activeFiltersCount})
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium text-neutral-800 mb-3">Price Range</h4>
                    <div className="space-y-2">
                      {filters.priceRanges.map((range, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="radio"
                            name="priceRange"
                            checked={selectedPriceRange === range}
                            onChange={() => setSelectedPriceRange(selectedPriceRange === range ? null : range)}
                            className="mr-3 text-primary-600"
                          />
                          <span className="text-sm text-neutral-600">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-medium text-neutral-800 mb-3">Features</h4>
                    <div className="space-y-2">
                      {filters.features.map((feature) => (
                        <label key={feature} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedFeatures.includes(feature)}
                            onChange={() => toggleFeature(feature)}
                            className="mr-3 text-primary-600"
                          />
                          <span className="text-sm text-neutral-600">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Surfaces */}
                  <div>
                    <h4 className="font-medium text-neutral-800 mb-3">Suitable Surfaces</h4>
                    <div className="space-y-2">
                      {filters.surfaces.map((surface) => (
                        <label key={surface} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedSurfaces.includes(surface)}
                            onChange={() => toggleSurface(surface)}
                            className="mr-3 text-primary-600"
                          />
                          <span className="text-sm text-neutral-600">{surface}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Industries */}
                  <div>
                    <h4 className="font-medium text-neutral-800 mb-3">Industries</h4>
                    <div className="space-y-2">
                      {filters.industries.map((industry) => (
                        <label key={industry} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedIndustries.includes(industry)}
                            onChange={() => toggleIndustry(industry)}
                            className="mr-3 text-primary-600"
                          />
                          <span className="text-sm text-neutral-600">{industry}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </button>
                <span className="text-neutral-600">
                  {filteredProducts.length} products found
                </span>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white text-neutral-600'}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white text-neutral-600'}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <div className="space-y-4">
                      <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                        {product.originalPrice && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                            Sale
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm text-primary-600 font-medium">
                          {product.category}
                        </div>
                        <h3 className="font-display font-bold text-neutral-800 text-lg leading-tight">
                          {product.title}
                        </h3>
                        <p className="text-neutral-600 text-sm line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-neutral-800">
                            ${product.price}
                          </div>
                          {product.originalPrice && (
                            <div className="text-sm text-neutral-500 line-through">
                              ${product.originalPrice}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <StarRating rating={product.rating} size="sm" />
                          <div className="text-xs text-neutral-500 mt-1">
                            {product.reviews} reviews
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm">
                            Compare
                          </Button>
                          <Button variant="outline" size="sm">
                            Quote
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <div className="flex gap-6 p-6">
                      <div className="relative w-32 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="text-sm text-primary-600 font-medium mb-1">
                            {product.category}
                          </div>
                          <h3 className="font-display font-bold text-neutral-800 text-xl mb-2">
                            {product.title}
                          </h3>
                          <p className="text-neutral-600">
                            {product.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <StarRating rating={product.rating} size="sm" />
                          <span className="text-sm text-neutral-500">
                            {product.reviews} reviews
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-between items-end">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-neutral-800">
                            ${product.price}
                          </div>
                          {product.originalPrice && (
                            <div className="text-sm text-neutral-500 line-through">
                              ${product.originalPrice}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Button size="sm">
                            View Details
                          </Button>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Compare
                            </Button>
                            <Button variant="outline" size="sm">
                              Quote
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-display font-bold text-neutral-800 mb-2">
                  No products found
                </h3>
                <p className="text-neutral-600 mb-6">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <Button onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
