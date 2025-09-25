'use client';

import * as React from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'customer';
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  redirectTo = '/dashboard' 
}: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // For demo purposes with mock data, we'll be more permissive
  // In a real app, you'd want proper authentication checks
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show a simple login prompt instead of redirecting
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">
            This page requires authentication. In this demo, you can use any email with password "password".
          </p>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500 mb-2">Demo credentials:</p>
            <p className="text-sm font-mono">Email: john@example.com</p>
            <p className="text-sm font-mono">Password: password</p>
          </div>
        </div>
      </div>
    );
  }

  // For demo purposes, allow access regardless of role
  return <>{children}</>;
};

export default ProtectedRoute;
