'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href?: string;
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
}

interface QuickActionsProps {
  actions: QuickAction[];
  title?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  title = 'Quick Actions',
  columns = 4,
  className = ''
}) => {
  const getColorClasses = (color: string = 'primary') => {
    switch (color) {
      case 'secondary':
        return 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200';
      case 'success':
        return 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200';
      case 'warning':
        return 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'danger':
        return 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-primary-50 hover:bg-primary-100 text-primary-700 border-primary-200';
    }
  };

  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  const ActionButton: React.FC<{ action: QuickAction }> = ({ action }) => {
    const baseClasses = `
      relative p-6 rounded-lg border-2 border-dashed transition-all duration-200
      flex flex-col items-center text-center space-y-3 min-h-[120px]
      ${action.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${getColorClasses(action.color)}
    `;

    const content = (
      <>
        <div className="text-3xl mb-2">{action.icon}</div>
        <div>
          <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
          <p className="text-xs opacity-75 leading-tight">{action.description}</p>
        </div>
        {action.disabled && (
          <div className="absolute inset-0 bg-white bg-opacity-50 rounded-lg flex items-center justify-center">
            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">Coming Soon</span>
          </div>
        )}
      </>
    );

    if (action.disabled) {
      return <div className={baseClasses}>{content}</div>;
    }

    if (action.href) {
      return (
        <Link href={action.href} className={baseClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button onClick={action.onClick} className={baseClasses}>
        {content}
      </button>
    );
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      
      <div className={`grid ${gridClasses[columns]} gap-4`}>
        {actions.map((action) => (
          <ActionButton key={action.id} action={action} />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
