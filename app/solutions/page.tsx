import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Industry Solutions | AkandChimiHazar',
  description: 'Specialized cleaning and disinfecting solutions for healthcare, food service, education, and commercial industries',
  keywords: 'industry solutions, healthcare cleaning, food service sanitizing, commercial disinfectants',
};

const industries = [
  {
    id: 'healthcare',
    title: 'Healthcare & Medical',
    description: 'Hospital-grade disinfectants and infection control solutions for medical facilities, clinics, and healthcare environments.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['99.9% Pathogen Elimination', 'CDC Approved', 'Non-Toxic Formulas', 'Fast Acting'],
    stats: { facilities: '2,500+', compliance: '100%', satisfaction: '98%' },
    href: '/solutions/healthcare'
  },
  {
    id: 'foodservice',
    title: 'Food Service & Restaurants',
    description: 'Food-safe cleaning products that meet HACCP standards for restaurants, kitchens, and food processing facilities.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['HACCP Compliant', 'Food Contact Safe', 'Grease Cutting', 'Sanitizing Power'],
    stats: { restaurants: '5,000+', inspections: '99.8%', savings: '35%' },
    href: '/solutions/foodservice'
  },
  {
    id: 'education',
    title: 'Schools & Education',
    description: 'Child-safe cleaning solutions for schools, universities, and educational facilities with high traffic areas.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['Child Safe', 'Low Odor', 'Multi-Surface', 'Bulk Packaging'],
    stats: { schools: '1,200+', students: '500K+', safety: '100%' },
    href: '/solutions/education'
  },
  {
    id: 'office',
    title: 'Office & Commercial',
    description: 'Professional cleaning solutions for office buildings, retail spaces, and commercial environments.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['Professional Grade', 'Cost Effective', 'Pleasant Scent', 'Easy Application'],
    stats: { buildings: '3,000+', sqft: '50M+', efficiency: '40%' },
    href: '/solutions/office'
  },
  {
    id: 'hospitality',
    title: 'Hotels & Hospitality',
    description: 'Guest-safe cleaning products for hotels, resorts, and hospitality venues that maintain high cleanliness standards.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['Guest Safe', 'Quick Drying', 'Stain Removal', 'Odor Control'],
    stats: { hotels: '800+', rooms: '100K+', rating: '4.8/5' },
    href: '/solutions/hospitality'
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing & Industrial',
    description: 'Heavy-duty industrial cleaners and degreasers for manufacturing facilities and industrial environments.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['Heavy Duty', 'Degreasing Power', 'Equipment Safe', 'Concentrated Formula'],
    stats: { facilities: '600+', equipment: '99.9%', downtime: '-60%' },
    href: '/solutions/manufacturing'
  }
];

const benefits = [
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    title: 'Industry Expertise',
    description: 'Deep understanding of specific industry requirements and regulations'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920277.png',
    title: 'Compliance Assurance',
    description: 'Products meet all relevant industry standards and certifications'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828640.png',
    title: 'Custom Solutions',
    description: 'Tailored product recommendations based on your specific needs'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/1067/1067566.png',
    title: 'Ongoing Support',
    description: 'Training, technical support, and regular compliance updates'
  }
];

const SolutionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-neutral-800 mb-6">
              Industry Solutions
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Specialized cleaning and disinfecting solutions tailored to meet the unique requirements of your industry. 
              From healthcare to hospitality, we have the expertise and products you need.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-neutral-800">
                  Why Choose Industry-Specific Solutions?
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Every industry has unique cleaning challenges, regulatory requirements, and safety standards. 
                  Our specialized solutions ensure you get the right products for your specific environment.
                </p>
              </div>
              <Button size="lg">
                Find Your Industry
              </Button>
            </div>
            <div className="relative">
              <div className="bg-primary-500 rounded-2xl p-8 h-96">
                <Image
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Professional cleaning in various industries"
                  width={500}
                  height={400}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 lg:py-24">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
              Industries We Serve
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Discover specialized cleaning solutions designed for your industry's unique challenges and requirements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Card key={industry.id} className="group hover:shadow-xl transition-all duration-300">
                <div className="space-y-6">
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-video">
                    <Image
                      src={industry.image}
                      alt={industry.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-display font-bold text-neutral-800">
                      {industry.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {industry.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      {industry.features.map((feature, index) => (
                        <div key={index} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded">
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
                      {Object.entries(industry.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-primary-600">{value}</div>
                          <div className="text-xs text-neutral-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    <Link href={industry.href}>
                      <Button className="w-full" size="sm">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
              Why Partner With Us
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We bring decades of industry expertise and specialized knowledge to help you maintain the highest standards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Image
                      src={benefit.icon}
                      alt={benefit.title}
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-neutral-800">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary-500">
        <div className="container-max section-padding">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Our experts can develop specialized cleaning protocols and product recommendations for your unique requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary-500">
                Contact Expert
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
