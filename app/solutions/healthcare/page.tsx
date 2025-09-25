import React from 'react';
import HeroSection from '@/components/healthcare/HeroSection';
import ProductsSection from '@/components/healthcare/ProductsSection';
import CertificationsSection from '@/components/healthcare/CertificationsSection';

const healthcareProducts = [
  {
    id: '1',
    title: 'Hospital Grade Disinfectant',
    description: 'EPA-registered hospital-grade disinfectant that kills 99.9% of germs and viruses',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    features: ['Kills 99.9% of germs', 'EPA registered', 'Hospital grade', 'Fast acting'],
    price: '$24.99'
  },
  {
    id: '2',
    title: 'Medical Surface Cleaner',
    description: 'Specialized cleaner for medical equipment and surfaces',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    features: ['Safe for equipment', 'Non-corrosive', 'Quick dry', 'Residue-free'],
    price: '$18.99'
  },
  {
    id: '3',
    title: 'Surgical Instrument Cleaner',
    description: 'Professional-grade cleaner for surgical instruments',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    features: ['Instrument safe', 'Enzymatic formula', 'Biofilm removal', 'Sterilization prep'],
    price: '$32.99'
  }
];

const certifications = [
  {
    name: 'EPA Registered',
    description: 'Environmental Protection Agency approved',
    icon: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  },
  {
    name: 'CDC Approved',
    description: 'Centers for Disease Control guidelines',
    icon: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  },
  {
    name: 'Hospital Grade',
    description: 'Meets hospital disinfection standards',
    icon: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  },
  {
    name: 'FDA Compliant',
    description: 'Food and Drug Administration compliant',
    icon: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  }
];

const HealthcarePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProductsSection products={healthcareProducts} />
      <CertificationsSection certifications={certifications} />
    </div>
  );
};

export default HealthcarePage;
