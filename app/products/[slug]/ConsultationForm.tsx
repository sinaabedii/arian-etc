'use client';

import React, { useState } from 'react';
import { ConsultationFormData } from '@/types';
import Button from '@/components/ui/Button';

interface ConsultationFormProps {
  productTitle: string;
  onSubmit?: (data: ConsultationFormData) => void;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ productTitle, onSubmit }) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    email: '',
    organization: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (onSubmit) {
      onSubmit(formData);
    }

    setShowSuccess(true);
    setFormData({ name: '', phone: '', email: '', organization: '', message: '' });
    setIsSubmitting(false);

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleInputChange = (field: keyof ConsultationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (showSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <div className="text-green-600 mb-2">
          <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-1">
          Your request has been submitted
        </h3>
        <p className="text-green-600">
          Our specialists will contact you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <div id="consultation-form" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <h3 className="text-lg font-bold text-gray-900">
          Request Free Consultation
        </h3>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isCollapsed ? 'rotate-0' : 'rotate-180'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Form Content */}
      {!isCollapsed && (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <p className="text-gray-600">
            To receive free consultation about <strong>{productTitle}</strong>, please fill out the form below.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label htmlFor="consultName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="consultName"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="consultPhone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="consultPhone"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Email Field */}
            <div>
              <label htmlFor="consultEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="consultEmail"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="example@email.com"
              />
            </div>

            {/* Organization Field */}
            <div>
              <label htmlFor="consultOrg" className="block text-sm font-medium text-gray-700 mb-2">
                Organization/Company
              </label>
              <input
                type="text"
                id="consultOrg"
                value={formData.organization}
                onChange={(e) => handleInputChange('organization', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Enter your organization name"
              />
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="consultMessage" className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <textarea
              id="consultMessage"
              rows={4}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
              placeholder="Write your questions or additional details..."
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ConsultationForm;
