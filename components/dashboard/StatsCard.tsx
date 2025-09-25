'use client';

import React from 'react';
import Card from '@/components/ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow';
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  color = 'blue',
  className = ''
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    purple: 'text-purple-600 bg-purple-50',
    orange: 'text-orange-600 bg-orange-50',
    red: 'text-red-600 bg-red-50',
    yellow: 'text-yellow-600 bg-yellow-50'
  };

  const trendClasses = trend?.isPositive 
    ? 'text-green-600 bg-green-50' 
    : 'text-red-600 bg-red-50';

  return (
    <Card className={`text-center ${className}`}>
      <div className="space-y-3">
        {icon && (
          <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            <span className="text-2xl">{icon}</span>
          </div>
        )}
        
        <div className={`text-3xl font-bold ${color === 'blue' ? 'text-blue-600' : 
          color === 'green' ? 'text-green-600' :
          color === 'purple' ? 'text-purple-600' :
          color === 'orange' ? 'text-orange-600' :
          color === 'red' ? 'text-red-600' :
          'text-yellow-600'}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        
        <div className="text-sm text-neutral-600 font-medium">{title}</div>
        
        {subtitle && (
          <div className="text-xs text-neutral-500">{subtitle}</div>
        )}
        
        {trend && (
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${trendClasses}`}>
            <span className="mr-1">
              {trend.isPositive ? '↗' : '↘'}
            </span>
            {trend.value}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;
