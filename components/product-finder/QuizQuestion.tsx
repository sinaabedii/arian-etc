'use client';

import React from 'react';
import Image from 'next/image';
import Card from '@/components/ui/Card';

interface QuestionOption {
  value: string;
  label: string;
  icon: string;
}

interface QuizQuestionProps {
  question: string;
  type: 'single' | 'multiple';
  options: QuestionOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  type,
  options,
  selectedValues,
  onSelectionChange
}) => {
  const handleOptionClick = (value: string) => {
    if (type === 'single') {
      onSelectionChange([value]);
    } else {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
      onSelectionChange(newValues);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl font-display font-bold text-neutral-800 mb-4">
          {question}
        </h2>
        <p className="text-neutral-600">
          {type === 'multiple' ? 'می‌توانید چند گزینه انتخاب کنید' : 'یک گزینه انتخاب کنید'}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {options.map((option) => (
          <div
            key={option.value}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg p-6 rounded-2xl border ${
              selectedValues.includes(option.value)
                ? 'ring-2 ring-primary-500 bg-primary-50 border-primary-200'
                : 'hover:bg-neutral-50 border-neutral-200 bg-white'
            }`}
            onClick={() => handleOptionClick(option.value)}
          >
            <div className="text-center space-y-4">
              <div className="relative h-24 rounded-lg overflow-hidden">
                <Image
                  src={option.icon}
                  alt={option.label}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-display font-semibold text-neutral-800">
                  {option.label}
                </h3>
                
                <div className={`w-5 h-5 mx-auto rounded-full border-2 transition-colors ${
                  selectedValues.includes(option.value)
                    ? 'bg-primary-500 border-primary-500'
                    : 'border-neutral-300'
                }`}>
                  {selectedValues.includes(option.value) && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
