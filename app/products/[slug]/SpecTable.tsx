import React from 'react';
import { ProductSpec } from '@/types';

interface SpecTableProps {
  specs: ProductSpec[];
}

const SpecTable: React.FC<SpecTableProps> = ({ specs }) => {
  if (!specs || specs.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Technical Specifications</h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {specs.map((spec, index) => (
          <div
            key={index}
            className={`px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-2 ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            <dt className="text-sm font-medium text-gray-600 sm:text-right">
              {spec.label}
            </dt>
            <dd className="text-sm text-gray-900 sm:text-left">
              {spec.value}
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecTable;
