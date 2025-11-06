"use client";

import React, { useState } from "react";
import { ReviewFormData } from "@/types";
import Button from "@/components/ui/Button";
import StarRating from "@/components/ui/StarRating";

interface ReviewFormProps {
  onSubmit?: (data: ReviewFormData) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    name: "",
    rating: 5,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (onSubmit) {
      onSubmit(formData);
    }

    setShowSuccess(true);
    setFormData({ name: "", rating: 5, comment: "" });
    setIsSubmitting(false);

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleInputChange = (
    field: keyof ReviewFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (showSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <div className="text-green-600 mb-2">
          <svg
            className="w-8 h-8 mx-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-1">
          Your review has been submitted
        </h3>
        <p className="text-green-600">
          Thank you for sharing your feedback with us.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6"
    >
      <h3 className="text-lg font-bold text-gray-900">Write Your Review</h3>

      {/* Name Field */}
      <div>
        <label
          htmlFor="reviewName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Name *
        </label>
        <input
          type="text"
          id="reviewName"
          required
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          placeholder="Enter your name"
        />
      </div>

      {/* Rating Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Rating *
        </label>
        <div className="flex items-center space-x-4">
          <StarRating
            rating={formData.rating}
            interactive
            onRatingChange={(rating) => handleInputChange("rating", rating)}
            size="lg"
          />
          <span className="text-sm text-gray-600">
            ({formData.rating} of 5)
          </span>
        </div>
      </div>

      {/* Comment Field */}
      <div>
        <label
          htmlFor="reviewComment"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Review *
        </label>
        <textarea
          id="reviewComment"
          required
          rows={4}
          value={formData.comment}
          onChange={(e) => handleInputChange("comment", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
          placeholder="Write your review about this product..."
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};

export default ReviewForm;
