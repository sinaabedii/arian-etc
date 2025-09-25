'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const tools = [
  {
    id: 'dilution-calculator',
    title: 'Dilution Calculator',
    description: 'Calculate proper mixing ratios for concentrated cleaning products',
    icon: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    category: 'Mixing',
    featured: true
  },
  {
    id: 'coverage-estimator',
    title: 'Coverage Estimator',
    description: 'Determine how much product you need for your space',
    icon: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    category: 'Planning',
    featured: true
  },
  {
    id: 'cost-calculator',
    title: 'Cost Calculator',
    description: 'Compare cleaning costs across different products and methods',
    icon: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    category: 'Financial',
    featured: true
  },
  {
    id: 'usage-tracker',
    title: 'Usage Tracker',
    description: 'Monitor consumption and predict reorder timing',
    icon: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    category: 'Management',
    featured: false
  },
  {
    id: 'roi-calculator',
    title: 'ROI Calculator',
    description: 'Calculate return on investment for switching products',
    icon: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    category: 'Financial',
    featured: false
  },
  {
    id: 'schedule-planner',
    title: 'Cleaning Schedule Planner',
    description: 'Create optimized cleaning schedules for your facility',
    icon: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    category: 'Planning',
    featured: false
  }
];

const ToolsPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // Dilution Calculator Component
  const DilutionCalculator = () => {
    const [concentrate, setConcentrate] = useState('');
    const [water, setWater] = useState('');
    const [ratio, setRatio] = useState('1:10');
    const [result, setResult] = useState<any>(null);

    const calculateDilution = () => {
      const [concentratePart, waterPart] = ratio.split(':').map(Number);
      const totalVolume = parseFloat(concentrate) + parseFloat(water);
      
      if (concentrate && !water) {
        const calculatedWater = (parseFloat(concentrate) * waterPart) / concentratePart;
        setResult({
          concentrate: parseFloat(concentrate),
          water: calculatedWater,
          total: parseFloat(concentrate) + calculatedWater,
          ratio: ratio
        });
      } else if (water && !concentrate) {
        const calculatedConcentrate = (parseFloat(water) * concentratePart) / waterPart;
        setResult({
          concentrate: calculatedConcentrate,
          water: parseFloat(water),
          total: calculatedConcentrate + parseFloat(water),
          ratio: ratio
        });
      }
    };

    return (
      <Card className="p-6">
        <h3 className="text-xl font-display font-bold text-neutral-800 mb-6">
          Dilution Calculator
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dilution Ratio
            </label>
            <select
              value={ratio}
              onChange={(e) => setRatio(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="1:10">1:10 (Light Cleaning)</option>
              <option value="1:5">1:5 (Medium Cleaning)</option>
              <option value="1:3">1:3 (Heavy Cleaning)</option>
              <option value="1:1">1:1 (Maximum Strength)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Concentrate (ml)
              </label>
              <input
                type="number"
                value={concentrate}
                onChange={(e) => setConcentrate(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Water (ml)
              </label>
              <input
                type="number"
                value={water}
                onChange={(e) => setWater(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <Button onClick={calculateDilution} className="w-full">
            Calculate
          </Button>

          {result && (
            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <h4 className="font-medium text-primary-800 mb-2">Results:</h4>
              <div className="space-y-1 text-sm text-primary-700">
                <div>Concentrate: {result.concentrate.toFixed(1)} ml</div>
                <div>Water: {result.water.toFixed(1)} ml</div>
                <div>Total Solution: {result.total.toFixed(1)} ml</div>
                <div>Ratio: {result.ratio}</div>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  // Coverage Estimator Component
  const CoverageEstimator = () => {
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [productType, setProductType] = useState('spray');
    const [result, setResult] = useState<any>(null);

    const coverageRates = {
      spray: 200, // sq ft per bottle
      wipes: 100, // sq ft per pack
      concentrate: 500 // sq ft per bottle when diluted
    };

    const calculateCoverage = () => {
      const area = parseFloat(length) * parseFloat(width);
      const rate = coverageRates[productType as keyof typeof coverageRates];
      const unitsNeeded = Math.ceil(area / rate);
      
      setResult({
        area,
        unitsNeeded,
        productType,
        rate
      });
    };

    return (
      <Card className="p-6">
        <h3 className="text-xl font-display font-bold text-neutral-800 mb-6">
          Coverage Estimator
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Type
            </label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="spray">Disinfectant Spray</option>
              <option value="wipes">Cleaning Wipes</option>
              <option value="concentrate">Concentrate (Diluted)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Length (feet)
              </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Enter length"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Width (feet)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Enter width"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <Button onClick={calculateCoverage} className="w-full">
            Calculate Coverage
          </Button>

          {result && (
            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <h4 className="font-medium text-primary-800 mb-2">Results:</h4>
              <div className="space-y-1 text-sm text-primary-700">
                <div>Total Area: {result.area} sq ft</div>
                <div>Coverage Rate: {result.rate} sq ft per unit</div>
                <div>Units Needed: {result.unitsNeeded}</div>
                <div>Product Type: {result.productType}</div>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  // Cost Calculator Component
  const CostCalculator = () => {
    const [currentProduct, setCurrentProduct] = useState({ price: '', coverage: '', frequency: '' });
    const [newProduct, setNewProduct] = useState({ price: '', coverage: '', frequency: '' });
    const [result, setResult] = useState<any>(null);

    const calculateCost = () => {
      const currentMonthly = (parseFloat(currentProduct.price) / parseFloat(currentProduct.coverage)) * parseFloat(currentProduct.frequency);
      const newMonthly = (parseFloat(newProduct.price) / parseFloat(newProduct.coverage)) * parseFloat(newProduct.frequency);
      const savings = currentMonthly - newMonthly;
      const savingsPercent = (savings / currentMonthly) * 100;

      setResult({
        currentMonthly,
        newMonthly,
        savings,
        savingsPercent,
        annualSavings: savings * 12
      });
    };

    return (
      <Card className="p-6">
        <h3 className="text-xl font-display font-bold text-neutral-800 mb-6">
          Cost Calculator
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-neutral-800 mb-3">Current Product</h4>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                placeholder="Price ($)"
                value={currentProduct.price}
                onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                placeholder="Coverage (sq ft)"
                value={currentProduct.coverage}
                onChange={(e) => setCurrentProduct({...currentProduct, coverage: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                placeholder="Uses/month"
                value={currentProduct.frequency}
                onChange={(e) => setCurrentProduct({...currentProduct, frequency: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-neutral-800 mb-3">New Product</h4>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                placeholder="Price ($)"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                placeholder="Coverage (sq ft)"
                value={newProduct.coverage}
                onChange={(e) => setNewProduct({...newProduct, coverage: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                placeholder="Uses/month"
                value={newProduct.frequency}
                onChange={(e) => setNewProduct({...newProduct, frequency: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <Button onClick={calculateCost} className="w-full">
            Compare Costs
          </Button>

          {result && (
            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <h4 className="font-medium text-primary-800 mb-2">Cost Comparison:</h4>
              <div className="space-y-1 text-sm text-primary-700">
                <div>Current Monthly Cost: ${result.currentMonthly.toFixed(2)}</div>
                <div>New Monthly Cost: ${result.newMonthly.toFixed(2)}</div>
                <div className={result.savings > 0 ? 'text-green-700' : 'text-red-700'}>
                  Monthly {result.savings > 0 ? 'Savings' : 'Increase'}: ${Math.abs(result.savings).toFixed(2)} ({Math.abs(result.savingsPercent).toFixed(1)}%)
                </div>
                <div className={result.annualSavings > 0 ? 'text-green-700' : 'text-red-700'}>
                  Annual {result.annualSavings > 0 ? 'Savings' : 'Increase'}: ${Math.abs(result.annualSavings).toFixed(2)}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  const renderTool = () => {
    switch (activeTool) {
      case 'dilution-calculator':
        return <DilutionCalculator />;
      case 'coverage-estimator':
        return <CoverageEstimator />;
      case 'cost-calculator':
        return <CostCalculator />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-neutral-800 mb-6">
              Smart Tools & Calculators
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Make informed decisions with our suite of professional tools. Calculate dilution ratios, estimate coverage, 
              compare costs, and optimize your cleaning operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-neutral-800">
                  Professional-Grade Calculators
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Our tools are designed by industry experts to help you make precise calculations, 
                  reduce waste, and optimize your cleaning budget.
                </p>
              </div>
              <Button size="lg">
                Try Tools Now
              </Button>
            </div>
            <div className="relative">
              <div className="bg-primary-500 rounded-2xl p-8 h-96">
                <Image
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Calculator and planning tools"
                  width={500}
                  height={400}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 lg:py-24">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
              Available Tools
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Choose from our collection of specialized calculators and planning tools designed for cleaning professionals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className={`cursor-pointer ${
                  activeTool === tool.id ? 'ring-2 ring-primary-500' : ''
                }`}
                onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
              >
                <Card 
                  className={`group hover:shadow-xl transition-all duration-300 ${
                    activeTool === tool.id ? 'bg-primary-50' : ''
                  }`}
                >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-xl overflow-hidden">
                      <Image
                        src={tool.icon}
                        alt={tool.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {tool.featured && (
                      <div className="bg-primary-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Popular
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-primary-600 font-medium mb-1">
                        {tool.category}
                      </div>
                      <h3 className="text-xl font-display font-bold text-neutral-800">
                        {tool.title}
                      </h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    <Button 
                      className="w-full" 
                      size="sm"
                      variant={activeTool === tool.id ? "secondary" : "primary"}
                    >
                      {activeTool === tool.id ? 'Close Tool' : 'Use Tool'}
                    </Button>
                  </div>
                </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Tool */}
      {activeTool && (
        <section className="py-16 bg-white">
          <div className="container-max section-padding">
            <div className="max-w-2xl mx-auto">
              {renderTool()}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
              Why Use Our Tools?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-display font-semibold text-neutral-800">
                  Accurate Calculations
                </h3>
                <p className="text-neutral-600 text-sm">
                  Industry-tested formulas ensure precise results every time
                </p>
              </div>
            </Card>

            <Card className="text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-display font-semibold text-neutral-800">
                  Cost Savings
                </h3>
                <p className="text-neutral-600 text-sm">
                  Optimize usage and reduce waste with precise measurements
                </p>
              </div>
            </Card>

            <Card className="text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-display font-semibold text-neutral-800">
                  Time Efficient
                </h3>
                <p className="text-neutral-600 text-sm">
                  Quick calculations save time on planning and preparation
                </p>
              </div>
            </Card>

            <Card className="text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-display font-semibold text-neutral-800">
                  Professional Results
                </h3>
                <p className="text-neutral-600 text-sm">
                  Achieve consistent, professional-grade cleaning outcomes
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary-500">
        <div className="container-max section-padding">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Need Custom Calculations?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Our technical team can help you with complex calculations and custom formulations for your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Contact Technical Team
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary-500">
                Request Custom Tool
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToolsPage;
