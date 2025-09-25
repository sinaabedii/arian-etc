import React from 'react';
import CertificationCard from './CertificationCard';

interface Certification {
  name: string;
  description: string;
  icon: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-6">
            گواهینامه‌ها و مجوزها
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            محصولات ما دارای تمامی مجوزها و گواهینامه‌های بین‌المللی مورد نیاز هستند
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <CertificationCard
              key={index}
              name={cert.name}
              description={cert.description}
              icon={cert.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
