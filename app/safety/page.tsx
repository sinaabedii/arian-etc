'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const safetyCategories = ['All', 'SDS Sheets', 'Certifications', 'Training Materials', 'Regulatory Updates', 'Risk Assessment'];

const safetyDocuments = [
  {
    id: '1',
    title: 'UltraClean Disinfectant - Safety Data Sheet',
    category: 'SDS Sheets',
    type: 'PDF',
    size: '2.4 MB',
    lastUpdated: '2024-01-15',
    description: 'Complete safety information including hazard identification, first aid measures, and handling procedures.',
    downloadUrl: '/safety/sds/ultraclean-disinfectant.pdf',
    productId: '1'
  },
  {
    id: '2',
    title: 'EPA Registration Certificate',
    category: 'Certifications',
    type: 'PDF',
    size: '1.8 MB',
    lastUpdated: '2024-01-10',
    description: 'Official EPA registration documentation for hospital-grade disinfectants.',
    downloadUrl: '/safety/certs/epa-registration.pdf',
    featured: true
  },
  {
    id: '3',
    title: 'Chemical Handling Training Module',
    category: 'Training Materials',
    type: 'Interactive',
    size: 'Online',
    lastUpdated: '2024-01-20',
    description: 'Interactive training course on safe handling and storage of cleaning chemicals.',
    accessUrl: '/training/chemical-handling',
    featured: true
  },
  {
    id: '4',
    title: 'OSHA Compliance Update - January 2024',
    category: 'Regulatory Updates',
    type: 'Document',
    size: '1.2 MB',
    lastUpdated: '2024-01-25',
    description: 'Latest OSHA requirements for workplace safety with cleaning chemicals.',
    downloadUrl: '/safety/updates/osha-jan-2024.pdf',
    featured: true
  },
  {
    id: '5',
    title: 'Workplace Risk Assessment Tool',
    category: 'Risk Assessment',
    type: 'Calculator',
    size: 'Online Tool',
    lastUpdated: '2024-01-12',
    description: 'Interactive tool to assess chemical exposure risks in your workplace.',
    accessUrl: '/tools/risk-assessment',
    featured: false
  },
  {
    id: '6',
    title: 'ProClean Multi-Surface - Safety Data Sheet',
    category: 'SDS Sheets',
    type: 'PDF',
    size: '2.1 MB',
    lastUpdated: '2024-01-18',
    description: 'Safety information for multi-surface cleaner including composition and emergency procedures.',
    downloadUrl: '/safety/sds/proclean-multi-surface.pdf',
    productId: '2'
  }
];

const certifications = [
  {
    name: 'EPA Registration',
    description: 'All disinfectants registered with Environmental Protection Agency',
    icon: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    validUntil: '2025-12-31',
    certNumber: 'EPA-12345-67'
  },
  {
    name: 'FDA Compliance',
    description: 'Food contact surface cleaners meet FDA requirements',
    icon: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    validUntil: '2025-06-30',
    certNumber: 'FDA-FCN-2024-001'
  },
  {
    name: 'ISO 9001:2015',
    description: 'Quality management system certification',
    icon: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    validUntil: '2025-03-15',
    certNumber: 'ISO-9001-2024-789'
  },
  {
    name: 'Green Seal Certified',
    description: 'Environmentally responsible cleaning products',
    icon: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    validUntil: '2025-09-20',
    certNumber: 'GS-37-2024'
  }
];

const emergencyContacts = [
  {
    type: 'Poison Control',
    number: '1-800-222-1222',
    description: '24/7 emergency poison information',
    availability: '24/7'
  },
  {
    type: 'CHEMTREC',
    number: '1-800-424-9300',
    description: 'Chemical transportation emergency response',
    availability: '24/7'
  },
  {
    type: 'Technical Support',
    number: '1-555-123-4567',
    description: 'Product-specific safety questions',
    availability: 'Mon-Fri 8AM-6PM EST'
  },
  {
    type: 'Emergency Spill Response',
    number: '1-555-123-SPILL',
    description: 'Large spill or exposure incidents',
    availability: '24/7'
  }
];

const SafetyPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocuments = safetyDocuments.filter(doc => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredDocuments = safetyDocuments.filter(doc => doc.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium">
                  Safety First
                </div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-neutral-800 leading-tight">
                  Safety & Compliance Center
                </h1>
                <p className="text-xl text-neutral-600 leading-relaxed">
                  Access comprehensive safety data sheets, certifications, training materials, and compliance documentation. 
                  Your safety is our top priority.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Download SDS Sheets
                </Button>
                <Button variant="outline" size="lg">
                  Emergency Contacts
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-red-500 rounded-2xl p-8 h-96">
                <Image
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Safety equipment and protocols"
                  width={500}
                  height={400}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 bg-red-500">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Emergency Contacts
            </h2>
            <p className="text-white/90 text-lg">
              Keep these numbers handy for any chemical-related emergencies
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="text-center">
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-neutral-800">
                    {contact.type}
                  </h3>
                  <div className="text-2xl font-bold text-red-600">
                    {contact.number}
                  </div>
                  <p className="text-neutral-600 text-sm">
                    {contact.description}
                  </p>
                  <div className="text-xs text-neutral-500 bg-gray-100 px-2 py-1 rounded">
                    {contact.availability}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-16">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
              Safety Documentation
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Find the safety information you need quickly with our comprehensive document library.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search safety documents, SDS sheets, certifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {safetyCategories.map((category) => (
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

          {/* Featured Documents */}
          {selectedCategory === 'All' && (
            <div className="mb-16">
              <h3 className="text-2xl font-display font-bold text-neutral-800 mb-8">
                Most Requested Documents
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredDocuments.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                          {doc.category}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {doc.size}
                        </div>
                      </div>

                      <h4 className="font-display font-bold text-neutral-800 leading-tight">
                        {doc.title}
                      </h4>

                      <p className="text-neutral-600 text-sm line-clamp-2">
                        {doc.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span>Updated: {new Date(doc.lastUpdated).toLocaleDateString()}</span>
                        <span>{doc.type}</span>
                      </div>

                      <Button size="sm" className="w-full">
                        {doc.type === 'Interactive' || doc.type === 'Calculator' ? 'Access Tool' : 'Download'}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Documents */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-display font-bold text-neutral-800">
                All Safety Documents
              </h3>
              <span className="text-neutral-600">
                {filteredDocuments.length} documents found
              </span>
            </div>

            <div className="space-y-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        {doc.type === 'PDF' ? (
                          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                          </svg>
                        ) : doc.type === 'Interactive' ? (
                          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                          </svg>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-display font-bold text-neutral-800 mb-1">
                          {doc.title}
                        </h4>
                        <p className="text-neutral-600 text-sm mb-2">
                          {doc.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-neutral-500">
                          <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded">
                            {doc.category}
                          </span>
                          <span>Size: {doc.size}</span>
                          <span>Updated: {new Date(doc.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button size="sm">
                        {doc.type === 'Interactive' || doc.type === 'Calculator' ? 'Access' : 'Download'}
                      </Button>
                      <Button variant="outline" size="sm">
                        Share
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-display font-bold text-neutral-800 mb-2">
                  هیچ سندی یافت نشد
                </h3>
                <p className="text-neutral-600 mb-6">
                  لطفاً عبارات جستجو یا فیلترهای دسته‌بندی را تغییر دهید.
                </p>
                <Button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>
                  پاک کردن فیلترها
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* گواهینامه‌ها */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
              Our Certifications
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We maintain the highest industry standards and certifications to ensure product safety and quality.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center">
                <div className="space-y-4">
                  <div className="relative w-16 h-16 mx-auto rounded-lg overflow-hidden">
                    <Image
                      src={cert.icon}
                      alt={cert.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-display font-bold text-neutral-800">
                    {cert.name}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {cert.description}
                  </p>
                  <div className="space-y-1 text-xs text-neutral-500">
                    <div>Cert #: {cert.certNumber}</div>
                    <div>Valid until: {new Date(cert.validUntil).toLocaleDateString()}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Certificate
                  </Button>
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
              Need Safety Training?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Our safety experts can provide on-site training and consultation to ensure your team follows proper safety protocols.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Schedule Training
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary-500">
                Contact Safety Expert
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SafetyPage;
