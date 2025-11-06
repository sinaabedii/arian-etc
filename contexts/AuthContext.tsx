"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/lib/auth-service";
import { TokenManager } from "@/lib/token-manager";
import type { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User, rememberMe?: boolean) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data and token on mount
    const initAuth = async () => {
      try {
        const storedUser = TokenManager.getUserData();
        const hasToken = TokenManager.isAuthenticated();

        if (storedUser && hasToken) {
          // Try to auto-refresh token if expired
          const isValid = await authService.autoRefreshToken();
          
          if (isValid) {
            setUser(storedUser);
          } else {
            // Token refresh failed, clear everything
            TokenManager.clearAll();
            setUser(null);
          }
        } else {
          // No valid session
          TokenManager.clearAll();
          setUser(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        TokenManager.clearAll();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (user: User, rememberMe: boolean = false) => {
    setUser(user);
    TokenManager.setUserData(user, rememberMe);
    
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint
      await authService.logout();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // Clear local state and storage regardless of API call result
      setUser(null);
      TokenManager.clearAll();
    }
  };

  const refreshUser = () => {
    const storedUser = TokenManager.getUserData();
    if (storedUser) {
      setUser(storedUser);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
