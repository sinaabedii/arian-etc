import React from 'react';
import Image from 'next/image';
import Card from '@/components/ui/Card';

interface ContactMethodProps {
  icon: string;
  title: string;
  description: string;
  contact: string;
  action: string;
}

const ContactMethod: React.FC<ContactMethodProps> = ({
  icon,
  title,
  description,
  contact,
  action
}) => {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-4">
        <div className="relative w-16 h-16 mx-auto">
          <Image
            src={icon}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="text-xl font-display font-bold text-neutral-800">
          {title}
        </h3>
        <p className="text-neutral-600 text-sm">
          {description}
        </p>
        <div className="pt-2">
          <a
            href={action}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            {contact}
          </a>
        </div>
      </div>
    </Card>
  );
};

export default ContactMethod;
