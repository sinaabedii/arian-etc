'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { wishlistService } from '@/lib/wishlist-service';
import type { WishlistItem as ApiWishlistItem } from '@/types/wishlist';

export interface WishlistItem {
  // ID of wishlist entry from backend (stringified)
  id: string;
  // Product ID for convenience when matching
  productId: number;
  name: string;
  price: number;
  image: string;
  category: string;
  slug: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  addFromApiItem: (apiItem: ApiWishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  itemCount: number;
  loading: boolean;
  error: string | null;
  refreshFromServer: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist);
        setItems(wishlistItems);
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  const refreshFromServer = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await wishlistService.getWishlist(1, 50);
      if (res.success && res.data) {
        const mapped: WishlistItem[] = res.data.results.map(mapApiItemToLocal);
        setItems(mapped);
      } else {
        console.error('Wishlist fetch failed:', res.error?.message, res.error?.errors);
        setError(res.error?.message || 'خطا در دریافت لیست علاقه‌مندی‌ها');
      }
    } catch (e: any) {
      console.error('Wishlist fetch exception:', e);
      setError('خطا در برقراری ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  // Also try to hydrate from server if user is authenticated (token handled in service)
  useEffect(() => {
    refreshFromServer();
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (item: WishlistItem) => {
    setItems(prev => {
      if (prev.some(wishlistItem => wishlistItem.id === item.id)) {
        return prev; // Item already in wishlist
      }
      return [...prev, item];
    });
  };

  const mapApiItemToLocal = (apiItem: ApiWishlistItem): WishlistItem => {
    const priceStr = apiItem.product_discount_price ?? apiItem.product_price ?? '0';
    const price = parseFloat(String(priceStr)) || 0;
    return {
      id: String(apiItem.id),
      productId: apiItem.product,
      name: apiItem.product_name,
      price,
      image: apiItem.product_image || '',
      category: '',
      slug: apiItem.product_slug,
    };
  };

  const addFromApiItem = (apiItem: ApiWishlistItem) => {
    const item = mapApiItemToLocal(apiItem);
    addToWishlist(item);
  };

  const removeFromWishlist = async (id: string) => {
    // Optimistic update
    setItems(prev => prev.filter(item => item.id !== id));
    const numericId = Number(id);
    if (!Number.isNaN(numericId)) {
      try {
        await wishlistService.removeFromWishlist(numericId);
      } catch (e) {
        // If server fails, we won't rollback for simplicity
        console.error('Failed to remove wishlist item on server:', e);
      }
    }
  };

  const isInWishlist = (id: string): boolean => {
    return items.some(item => item.id === id);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        addFromApiItem,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        itemCount: items.length,
        loading,
        error,
        refreshFromServer,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
