'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const sustainabilityMetrics = [
  { label: 'CO2 Reduction', value: '45%', description: 'Lower carbon footprint vs traditional cleaners' },
  { label: 'Recyclable Packaging', value: '100%', description: 'All containers are fully recyclable' },
  { label: 'Biodegradable Formula', value: '95%', description: 'Ingredients break down naturally' },
  { label: 'Water Conservation', value: '30%', description: 'Less water needed for effective cleaning' }
];

const ecoProducts = [
  {
    id: '1',
    title: 'EcoClean Multi-Surface',
    description: 'Plant-based cleaner with zero harsh chemicals',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    certifications: ['Green Seal', 'EPA Safer Choice', 'USDA BioPreferred'],
    impact: { co2: '-60%', water: '-40%', waste: '-50%' },
    price: '$15.99'
  },
  {
    id: '2',
    title: 'Natural Glass Cleaner',
    description: 'Streak-free cleaning with natural ingredients',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    certifications: ['Green Seal', 'Cradle to Cradle'],
    impact: { co2: '-55%', water: '-35%', waste: '-45%' },
    price: '$12.99'
  },
  {
    id: '3',
    title: 'Biodegradable Floor Cleaner',
    description: 'Safe for septic systems and waterways',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    certifications: ['EPA Safer Choice', 'USDA BioPreferred'],
    impact: { co2: '-50%', water: '-30%', waste: '-40%' },
    price: '$18.99'
  }
];

const initiatives = [
  {
    title: 'Carbon Neutral Manufacturing',
    description: 'Our facilities run on 100% renewable energy and offset all carbon emissions',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    impact: 'Zero net carbon emissions',
    status: 'Achieved 2023'
  },
  {
    title: 'Packaging Innovation',
    description: 'Concentrated formulas reduce packaging by 75% and use recycled materials',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    impact: '75% less packaging waste',
    status: 'In Progress'
  },
  {
    title: 'Water Conservation',
    description: 'Advanced formulations require less water for dilution and rinsing',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    impact: '30% water reduction',
    status: 'Achieved 2024'
  },
  {
    title: 'Circular Economy',
    description: 'Container return program and ingredient sourcing from renewable sources',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    impact: '90% renewable ingredients',
    status: 'Target 2025'
  }
];

const SustainabilityPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const ImpactCalculator = () => {
    const [usage, setUsage] = useState('');
    const [productType, setProductType] = useState('eco');
    const [result, setResult] = useState<any>(null);

    const calculateImpact = () => {
      const monthlyUsage = parseFloat(usage);
      const ecoImpact = {
        co2: monthlyUsage * 0.5, // kg CO2 saved
        water: monthlyUsage * 2, // liters saved
        waste: monthlyUsage * 0.1 // kg waste reduced
      };
      const traditionalImpact = {
        co2: monthlyUsage * 1.2,
        water: monthlyUsage * 3.5,
        waste: monthlyUsage * 0.25
      };

      setResult({
        eco: ecoImpact,
        traditional: traditionalImpact,
        savings: {
          co2: traditionalImpact.co2 - ecoImpact.co2,
          water: traditionalImpact.water - ecoImpact.water,
          waste: traditionalImpact.waste - ecoImpact.waste
        },
        annualSavings: {
          co2: (traditionalImpact.co2 - ecoImpact.co2) * 12,
          water: (traditionalImpact.water - ecoImpact.water) * 12,
          waste: (traditionalImpact.waste - ecoImpact.waste) * 12
        }
      });
    };

    return (
      <Card className="p-6">
        <h3 className="text-xl font-display font-bold text-neutral-800 mb-6">
          Environmental Impact Calculator
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Usage (bottles/units)
            </label>
            <input
              type="number"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              placeholder="Enter monthly usage"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <Button onClick={calculateImpact} className="w-full">
            Calculate Environmental Impact
          </Button>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Monthly Environmental Savings:</h4>
                <div className="space-y-1 text-sm text-green-700">
                  <div>CO2 Reduction: {result.savings.co2.toFixed(1)} kg</div>
                  <div>Water Saved: {result.savings.water.toFixed(1)} liters</div>
                  <div>Waste Reduced: {result.savings.waste.toFixed(1)} kg</div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Annual Environmental Impact:</h4>
                <div className="space-y-1 text-sm text-blue-700">
                  <div>CO2 Reduction: {result.annualSavings.co2.toFixed(1)} kg/year</div>
                  <div>Water Saved: {result.annualSavings.water.toFixed(1)} liters/year</div>
                  <div>Waste Reduced: {result.annualSavings.waste.toFixed(1)} kg/year</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  Sustainability First
                </div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-neutral-800 leading-tight">
                  Cleaning for a Better Planet
                </h1>
                <p className="text-xl text-neutral-600 leading-relaxed">
                  Our commitment to sustainability drives everything we do. From eco-friendly formulations to 
                  carbon-neutral manufacturing, we're cleaning up the world responsibly.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Explore Eco Products
                </Button>
                <Button variant="outline" size="lg">
                  Sustainability Report
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-green-500 rounded-2xl p-8 h-96">
                <Image
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Sustainable cleaning and environment"
                  width={500}
                  height={400}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-green-500">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Our Environmental Impact
            </h2>
            <p className="text-white/90 text-lg">
              Measurable results in our journey toward sustainability
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {sustainabilityMetrics.map((metric, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl font-bold mb-2">{metric.value}</div>
                <div className="text-lg font-medium mb-1">{metric.label}</div>
                <div className="text-sm opacity-90">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eco Products */}
      <section className="py-16 lg:py-24">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
              Eco-Friendly Product Line
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Powerful cleaning performance with minimal environmental impact. Our eco-friendly products 
              deliver professional results while protecting the planet.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ecoProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Eco-Friendly
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-neutral-800 text-lg">
                      {product.title}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {product.certifications.map((cert, index) => (
                        <span key={index} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                          {cert}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="font-medium text-blue-700">{product.impact.co2}</div>
                        <div className="text-blue-600">CO2</div>
                      </div>
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="font-medium text-blue-700">{product.impact.water}</div>
                        <div className="text-blue-600">Water</div>
                      </div>
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="font-medium text-blue-700">{product.impact.waste}</div>
                        <div className="text-blue-600">Waste</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-neutral-800">
                        {product.price}
                      </div>
                      <Button size="sm">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
              Sustainability Initiatives
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our comprehensive approach to environmental responsibility across all aspects of our business.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="relative w-full lg:w-48 h-48 lg:h-auto">
                    <Image
                      src={initiative.image}
                      alt={initiative.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-display font-bold text-neutral-800">
                        {initiative.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        initiative.status.includes('Achieved') 
                          ? 'bg-green-100 text-green-700' 
                          : initiative.status.includes('Progress')
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                      }`}>
                        {initiative.status}
                      </span>
                    </div>
                    <p className="text-neutral-600 mb-4">
                      {initiative.description}
                    </p>
                    <div className="text-sm font-medium text-primary-600">
                      Impact: {initiative.impact}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Calculator */}
      <section className="py-16 lg:py-24">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
              Calculate Your Environmental Impact
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              See how switching to our eco-friendly products can reduce your environmental footprint.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ImpactCalculator />
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
              Environmental Certifications
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-neutral-800">Green Seal Certified</h3>
                <p className="text-neutral-600 text-sm">Independent verification of environmental standards</p>
              </div>
            </Card>

            <Card className="text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-neutral-800">EPA Safer Choice</h3>
                <p className="text-neutral-600 text-sm">Meets EPA criteria for safer chemical ingredients</p>
              </div>
            </Card>

            <Card className="text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l2.09 6.26L20 9.27l-5 4.87 1.18 6.88L12 17.77l-4.18 3.25L9 14.14 4 9.27l5.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-neutral-800">USDA BioPreferred</h3>
                <p className="text-neutral-600 text-sm">Contains verified biobased content</p>
              </div>
            </Card>

            <Card className="text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-neutral-800">Cradle to Cradle</h3>
                <p className="text-neutral-600 text-sm">Designed for circular economy principles</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-green-500">
        <div className="container-max section-padding">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Join Our Sustainability Mission
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Partner with us to reduce your environmental impact while maintaining the highest cleaning standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Switch to Eco Products
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-green-500">
                Download Impact Report
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SustainabilityPage;
