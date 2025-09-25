'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface GalleryProps {
  images: string[];
  title: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
        <Image
          src={images[selectedImage]}
          alt={`${title} - Main Image`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                'relative aspect-square bg-gray-50 rounded-lg overflow-hidden transition-all duration-200',
                'hover:ring-2 hover:ring-primary-500 hover:ring-offset-2',
                selectedImage === index
                  ? 'ring-2 ring-primary-500 ring-offset-2'
                  : 'opacity-70 hover:opacity-100'
              )}
              aria-label={`Select image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${title} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="text-center text-sm text-gray-500">
        {selectedImage + 1} of {images.length} images
      </div>
    </div>
  );
};

export default Gallery;
