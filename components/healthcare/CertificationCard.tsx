import React from 'react';
import Image from 'next/image';
import Card from '@/components/ui/Card';

interface CertificationCardProps {
  name: string;
  description: string;
  icon: string;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  name,
  description,
  icon
}) => {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-4">
        <div className="relative w-16 h-16 mx-auto rounded-lg overflow-hidden">
          <Image
            src={icon}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        
        <h3 className="text-lg font-display font-bold text-neutral-800">
          {name}
        </h3>
        
        <p className="text-neutral-600 text-sm">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default CertificationCard;
