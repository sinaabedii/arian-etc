'use client';

import React, { useState } from 'react';
import { featuredProducts, bestSellingProducts } from '@/data/mockData';
import { Product } from '@/types';
import HeroSection from '@/components/product-finder/HeroSection';
import QuizQuestion from '@/components/product-finder/QuizQuestion';
import ProgressIndicator from '@/components/product-finder/ProgressIndicator';
import ProductRecommendations from '@/components/product-finder/ProductRecommendations';
import Button from '@/components/ui/Button';

interface RecommendedProduct extends Product {
  score: number;
  reason: string;
}

const allProducts = [...featuredProducts, ...bestSellingProducts];

const quizQuestions = [
  {
    id: 'industry',
    question: 'What industry do you work in?',
    type: 'single' as const,
    options: [
      { value: 'healthcare', label: 'Healthcare & Medical', icon: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { value: 'foodservice', label: 'Food Service & Restaurant', icon: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { value: 'education', label: 'Schools & Education', icon: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { value: 'office', label: 'Office & Commercial', icon: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { value: 'home', label: 'Home & Residential', icon: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'surfaces',
    question: 'What surfaces do you need to clean?',
    type: 'multiple' as const,
    options: [
      { value: 'hard', label: 'Hard Surfaces (counters, floors)', icon: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { value: 'glass', label: 'Glass & Windows', icon: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { value: 'fabric', label: 'پارچه و مبلمان', icon: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { value: 'metal', label: 'فلز و استیل ضدزنگ', icon: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'needs',
    question: 'نیازهای اصلی نظافتی شما چیست؟',
    type: 'multiple' as const,
    options: [
      { value: 'disinfect', label: 'از بین بردن میکروب و ویروس', icon: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { value: 'degrease', label: 'حذف چربی و روغن', icon: 'https://images.unsplash.com/photo-1556909114-4f6e0d4d72c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { value: 'sanitize', label: 'ضدعفونی عمومی', icon: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { value: 'eco', label: 'گزینه‌های سازگار با محیط زیست', icon: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'frequency',
    question: 'چه میزان نظافت می‌کنید؟',
    type: 'single' as const,
    options: [
      { value: 'daily', label: 'روزانه', icon: '🗓️' },
      { value: 'weekly', label: 'هفتگی', icon: '📅' },
      { value: 'monthly', label: 'ماهانه', icon: '📆' },
      { value: 'asneeded', label: 'در صورت نیاز', icon: '⏰' }
    ]
  }
];

const ProductFinderPage: React.FC = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);

  const stepTitles = ['صنعت', 'سطوح', 'نیازها', 'تکرار'];

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (questionId: string, values: string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: values }));
  };

  const nextStep = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      generateRecommendations();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const generateRecommendations = () => {
    // Simple recommendation logic based on answers
    let recommended = [...allProducts];
    
    // Filter based on industry
    const industry = answers.industry?.[0];
    if (industry === 'healthcare') {
      recommended = recommended.filter(p => p.category === 'Disinfectants' || p.category === 'Healthcare');
    } else if (industry === 'foodservice') {
      recommended = recommended.filter(p => p.category === 'Industrial' || p.category === 'Cleaners');
    } else if (industry === 'home') {
      recommended = recommended.filter(p => p.category === 'Eco-Friendly' || p.category === 'Wipes');
    }

    // Add scoring based on needs
    const recommendedWithScores: RecommendedProduct[] = recommended.map(product => ({
      ...product,
      score: Math.floor(Math.random() * 40) + 60, // Score between 60-100
      reason: getRecommendationReason(product, answers)
    }));

    recommendedWithScores.sort((a, b) => b.score - a.score);
    setRecommendations(recommendedWithScores.slice(0, 3));
    setShowResults(true);
  };

  const getRecommendationReason = (product: Product, answers: Record<string, string[]>) => {
    const reasons = [];
    const industry = answers.industry?.[0];
    if (industry === 'healthcare' && product.category === 'Disinfectants') {
      reasons.push('Perfect for healthcare environments');
    }
    if (answers.needs?.includes('disinfect')) {
      reasons.push('Kills 99.9% of germs and viruses');
    }
    if (answers.needs?.includes('eco') && product.category === 'Eco-Friendly') {
      reasons.push('Environmentally friendly formula');
    }
    return reasons.join(' • ') || 'Great all-purpose solution';
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setRecommendations([]);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen">
        <HeroSection onStartQuiz={handleStartQuiz} />
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen">
        <section className="py-16 lg:py-24">
          <div className="container-max section-padding">
            <ProductRecommendations
              products={recommendations}
              onRestart={resetQuiz}
            />
          </div>
        </section>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentStep];
  const currentAnswers = answers[currentQuestion.id] || [];

  return (
    <div className="min-h-screen">
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-max section-padding">
          <ProgressIndicator
            currentStep={currentStep + 1}
            totalSteps={quizQuestions.length}
            stepTitles={stepTitles}
          />

          <QuizQuestion
            question={currentQuestion.question}
            type={currentQuestion.type}
            options={currentQuestion.options}
            selectedValues={currentAnswers}
            onSelectionChange={(values) => handleAnswer(currentQuestion.id, values)}
          />

          <div className="flex justify-center gap-4 mt-8">
            {currentStep > 0 && (
              <Button variant="outline" onClick={prevStep}>
                قبلی
              </Button>
            )}
            
            <Button 
              onClick={nextStep}
              disabled={currentAnswers.length === 0}
            >
              {currentStep === quizQuestions.length - 1 ? 'مشاهده نتایج' : 'بعدی'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductFinderPage;
