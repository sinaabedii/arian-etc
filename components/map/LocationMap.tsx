'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  height?: string;
  markerText?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({
  lat = 35.77857469321197,
  lng = 51.423923904739006,
  zoom = 15,
  height = '400px',
  markerText = 'لومینا'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Only initialize if we haven't already
    if (mapRef.current && !mapInstanceRef.current) {
      // Fix default icon issue with webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      // Initialize map
      const map = L.map(mapRef.current).setView([lat, lng], zoom);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Custom icon
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative">
            <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-bounce">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      // Add marker
      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      // Add popup
      marker.bindPopup(`
        <div class="text-center p-2" dir="rtl">
          <div class="font-bold text-lg text-neutral-800 mb-1">${markerText}</div>
          <div class="text-sm text-neutral-600">تهران، ایران</div>
          <a 
            href="https://www.google.com/maps?q=${lat},${lng}" 
            target="_blank" 
            class="text-primary-600 hover:text-primary-700 text-sm mt-2 inline-block"
          >
            مشاهده در گوگل مپ
          </a>
        </div>
      `).openPopup();

      mapInstanceRef.current = map;
    }

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, zoom, markerText]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
      <div ref={mapRef} style={{ height, width: '100%' }} />
      
      {/* Custom CSS for marker animation */}
      <style jsx global>{`
        .custom-marker {
          background: none;
          border: none;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .leaflet-popup-content {
          margin: 8px;
          font-family: 'IRANSans', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default LocationMap;
