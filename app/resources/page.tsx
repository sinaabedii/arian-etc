'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const resourceCategories = ['All', 'How-to Guides', 'Video Tutorials', 'Safety Protocols', 'Compliance', 'Best Practices', 'Webinars'];

const resources = [
  {
    id: '1',
    title: 'Proper Hand Hygiene in Healthcare Settings',
    description: 'Complete guide to hand sanitizing protocols for medical professionals and staff.',
    category: 'How-to Guides',
    type: 'Guide',
    duration: '5 min read',
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    downloadUrl: '/resources/hand-hygiene-guide.pdf',
    featured: true
  },
  {
    id: '2',
    title: 'Surface Disinfection Techniques',
    description: 'Step-by-step video demonstration of effective surface cleaning and disinfection methods.',
    category: 'Video Tutorials',
    type: 'Video',
    duration: '12 min',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: true
  },
  {
    id: '3',
    title: 'OSHA Compliance for Cleaning Chemicals',
    description: 'Understanding OSHA requirements for safe handling and storage of cleaning products.',
    category: 'Compliance',
    type: 'Document',
    duration: '8 min read',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    downloadUrl: '/resources/osha-compliance.pdf',
    featured: false
  },
  {
    id: '4',
    title: 'COVID-19 Cleaning Protocols',
    description: 'Updated cleaning and disinfection guidelines for preventing COVID-19 transmission.',
    category: 'Safety Protocols',
    type: 'Protocol',
    duration: '6 min read',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    downloadUrl: '/resources/covid-protocols.pdf',
    featured: true
  },
  {
    id: '5',
    title: 'Green Cleaning Best Practices',
    description: 'Implementing environmentally friendly cleaning practices without compromising effectiveness.',
    category: 'Best Practices',
    type: 'Guide',
    duration: '10 min read',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    downloadUrl: '/resources/green-cleaning.pdf',
    featured: false
  },
  {
    id: '6',
    title: 'Equipment Maintenance and Cleaning',
    description: 'Video tutorial on proper cleaning and maintenance of cleaning equipment.',
    category: 'Video Tutorials',
    type: 'Video',
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: false
  },
  {
    id: '7',
    title: 'Food Service Sanitization Standards',
    description: 'HACCP-compliant cleaning procedures for restaurants and food service facilities.',
    category: 'Compliance',
    type: 'Standard',
    duration: '12 min read',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    downloadUrl: '/resources/food-service-standards.pdf',
    featured: false
  },
  {
    id: '8',
    title: 'Advanced Disinfection Webinar Series',
    description: 'Monthly webinar series covering advanced topics in disinfection and infection control.',
    category: 'Webinars',
    type: 'Webinar',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    registrationUrl: '/webinars/advanced-disinfection',
    featured: true
  }
];

const upcomingWebinars = [
  {
    title: 'Healthcare Infection Control Updates',
    date: '2024-02-15',
    time: '2:00 PM EST',
    presenter: 'Dr. Sarah Mitchell, Infection Control Specialist',
    description: 'Latest CDC guidelines and best practices for healthcare facilities.',
    registrationUrl: '/webinars/healthcare-updates'
  },
  {
    title: 'Green Cleaning Certification Course',
    date: '2024-02-22',
    time: '1:00 PM EST',
    presenter: 'Michael Chen, Environmental Safety Expert',
    description: 'Comprehensive training on sustainable cleaning practices.',
    registrationUrl: '/webinars/green-certification'
  },
  {
    title: 'Food Safety and Sanitization',
    date: '2024-03-01',
    time: '3:00 PM EST',
    presenter: 'Emily Rodriguez, Food Safety Consultant',
    description: 'HACCP compliance and food service cleaning protocols.',
    registrationUrl: '/webinars/food-safety'
  }
];

const ResourcesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-neutral-800 mb-6">
              Educational Resources
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Access our comprehensive library of cleaning guides, safety protocols, training videos, and expert webinars. 
              Stay informed with the latest best practices and compliance requirements.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources, guides, videos..."
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
          <div className="flex flex-wrap justify-center gap-3">
            {resourceCategories.map((category) => (
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

      {/* Featured Resources */}
      <section className="py-16">
        <div className="container-max section-padding">
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-neutral-800 mb-8">
            Featured Resources
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="space-y-4">
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-video">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-primary-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {resource.type}
                    </div>
                    {resource.type === 'Video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-primary-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-primary-600 font-medium">{resource.category}</span>
                      <span className="text-xs text-neutral-500">{resource.duration}</span>
                    </div>
                    
                    <h3 className="font-display font-bold text-neutral-800 text-lg leading-tight">
                      {resource.title}
                    </h3>
                    
                    <p className="text-neutral-600 text-sm line-clamp-2">
                      {resource.description}
                    </p>

                    <div className="pt-2">
                      {resource.type === 'Video' ? (
                        <Button size="sm" className="w-full">
                          مشاهده ویدیو
                        </Button>
                      ) : resource.type === 'Webinar' ? (
                        <Button size="sm" className="w-full">
                          ثبت‌نام اکنون
                        </Button>
                      ) : (
                        <Button size="sm" className="w-full">
                          دانلود PDF
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-16 bg-white">
        <div className="container-max section-padding">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-neutral-800">
              All Resources
            </h2>
            <span className="text-neutral-600">
              {filteredResources.length} resources found
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-video">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 text-neutral-800 px-2 py-1 rounded text-xs font-medium">
                      {resource.type}
                    </div>
                    {resource.type === 'Video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-primary-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-primary-600 font-medium">{resource.category}</span>
                      <span className="text-xs text-neutral-500">{resource.duration}</span>
                    </div>
                    
                    <h3 className="font-display font-bold text-neutral-800 leading-tight">
                      {resource.title}
                    </h3>
                    
                    <p className="text-neutral-600 text-sm line-clamp-3">
                      {resource.description}
                    </p>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        {resource.type === 'Video' ? 'Watch' : resource.type === 'Webinar' ? 'Register' : 'Download'}
                      </Button>
                      <Button variant="outline" size="sm">
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-display font-bold text-neutral-800 mb-2">
                No resources found
              </h3>
              <p className="text-neutral-600 mb-6">
                Try adjusting your search terms or category filters.
              </p>
              <Button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-16 lg:py-24">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
              Upcoming Webinars
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Join our expert-led webinars to stay updated on the latest cleaning technologies, regulations, and best practices.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {upcomingWebinars.map((webinar, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      Webinar
                    </div>
                    <div className="text-sm text-neutral-500">
                      {new Date(webinar.date).toLocaleDateString()}
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold text-neutral-800">
                    {webinar.title}
                  </h3>

                  <div className="space-y-2 text-sm text-neutral-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {webinar.time}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {webinar.presenter}
                    </div>
                  </div>

                  <p className="text-neutral-600 text-sm">
                    {webinar.description}
                  </p>

                  <Button className="w-full">
                    Register Free
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/webinars">
              <Button variant="outline" size="lg">
                View All Webinars
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 lg:py-24 bg-primary-500">
        <div className="container-max section-padding">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest resources, industry updates, and expert insights delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button variant="secondary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
