'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface CTAButtonsProps {
  catalogPdfUrl: string;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({ catalogPdfUrl }) => {
  const scrollToConsultation = () => {
    const element = document.getElementById('consultation-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openPdf = () => {
    if (catalogPdfUrl) {
      window.open(catalogPdfUrl, '_blank');
    }
  };

  return (
    <div className="space-y-3">
      <Button size="lg" className="w-full" onClick={scrollToConsultation}>
        Request Free Consultation
      </Button>
      <Button variant="secondary" size="lg" className="w-full" onClick={openPdf}>
        Download PDF Catalog
      </Button>
      <Button variant="outline" size="lg" className="w-full">
        <Link href="/products" className="w-full">
          Back to Product List
        </Link>
      </Button>
    </div>
  );
};

export default CTAButtons;
