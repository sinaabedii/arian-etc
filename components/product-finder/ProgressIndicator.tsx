import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepTitles
}) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-neutral-600">
          مرحله {currentStep} از {totalSteps}
        </span>
        <span className="text-sm font-medium text-primary-600">
          {Math.round(progressPercentage)}% تکمیل شده
        </span>
      </div>

      <div className="relative">
        {/* Progress Bar Background */}
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {stepTitles.map((title, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              style={{ width: `${100 / totalSteps}%` }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${
                  index + 1 <= currentStep
                    ? 'bg-primary-500 text-white'
                    : index + 1 === currentStep + 1
                    ? 'bg-primary-100 text-primary-600 ring-2 ring-primary-200'
                    : 'bg-neutral-200 text-neutral-500'
                }`}
              >
                {index + 1 < currentStep ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-xs text-neutral-600 mt-2 text-center max-w-20">
                {title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
