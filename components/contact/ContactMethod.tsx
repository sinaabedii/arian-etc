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
  // Determine if icon is an image path/URL or an emoji/text
  const isImage = typeof icon === 'string' && (icon.startsWith('/') || icon.startsWith('http'));

  // Build proper href based on contact type
  const buildHref = () => {
    const lower = title.toLowerCase();
    if (lower.includes('تلفن') || lower.includes('phone') || contact.replace(/\s/g, '').startsWith('+') || contact.startsWith('09')) {
      const digits = contact.replace(/[^+\d]/g, '');
      return `tel:${digits}`;
    }
    if (lower.includes('ایمیل') || lower.includes('email') || contact.includes('@')) {
      return `mailto:${contact}`;
    }
    if (lower.includes('آدرس') || lower.includes('address')) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact)}`;
    }
    return '#';
  };

  return (
    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-4">
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          {isImage ? (
            <Image
              src={icon}
              alt={title}
              fill
              sizes="64px"
              className="object-contain"
            />
          ) : (
            <span aria-hidden className="text-4xl leading-none select-none">{icon}</span>
          )}
        </div>
        <h3 className="text-xl font-display font-bold text-neutral-800">
          {title}
        </h3>
        <p className="text-neutral-600 text-sm">
          {description}
        </p>
        <div className="pt-2">
          <a
            href={buildHref()}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            {action}
          </a>
          <div className="mt-1 text-sm text-neutral-600 ltr:font-mono rtl:font-sans">{contact}</div>
        </div>
      </div>
    </Card>
  );
};

export default ContactMethod;
