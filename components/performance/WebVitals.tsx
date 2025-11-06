'use client';

import { useEffect } from 'react';

// Define metric interface since web-vitals might not be installed
interface Metric {
  name: string;
  value: number;
  id: string;
  delta: number;
}

// Mock web vitals functions if package is not available
const mockMetricFunction = (callback: (metric: Metric) => void) => {
};

function sendToAnalytics(metric: any) {
  
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

const WebVitals: React.FC = () => {
  useEffect(() => {
    // Core Web Vitals metrics
    // To use real web vitals, install: npm install web-vitals
    // Then uncomment and import the functions:
    // getCLS(sendToAnalytics);
    // getFID(sendToAnalytics);
    // getFCP(sendToAnalytics);
    // getLCP(sendToAnalytics);
    // getTTFB(sendToAnalytics);
    
    // For now, using mock functions
    mockMetricFunction(sendToAnalytics);
  }, []);

  return null; // این کامپوننت UI ندارد
};

export default WebVitals;
