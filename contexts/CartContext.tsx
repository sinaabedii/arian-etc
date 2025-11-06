'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartService } from '@/lib/cart-service';
import type { CartItem as ApiCartItem } from '@/types/cart';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  slug: string;
  // Backend cart item id (for update/remove)
  cartItemId?: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  getItemQuantity: (id: string) => number;
  refreshFromServer: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
          itemCount: calculateItemCount(updatedItems),
        };
      }
      
      const newItems = [...state.items, { ...action.payload, quantity: 1 }];
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        const newItems = state.items.filter(item => item.id !== action.payload.id);
        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
          itemCount: calculateItemCount(newItems),
        };
      }
      
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0,
      };
    
    case 'LOAD_CART':
      return {
        items: action.payload,
        total: calculateTotal(action.payload),
        itemCount: calculateItemCount(action.payload),
      };
    
    default:
      return state;
  }
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    // Then hydrate from server (if authenticated, service adds auth header automatically)
    refreshFromServer();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = async (id: string) => {
    // optimistic
    const prev = state.items;
    const target = prev.find(i => i.id === id);
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    try {
      if (target?.cartItemId) {
        await cartService.removeCartItem(target.cartItemId);
      }
      await refreshFromServer();
    } catch (e) {
      // rollback on failure
      dispatch({ type: 'LOAD_CART', payload: prev });
      console.error('Failed to remove cart item on server:', e);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    // optimistic
    const prev = state.items;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    try {
      const item = prev.find(i => i.id === id);
      if (item?.cartItemId) {
        await cartService.updateCartItem(item.cartItemId, { quantity });
      }
      await refreshFromServer();
    } catch (e) {
      // rollback on failure
      dispatch({ type: 'LOAD_CART', payload: prev });
      console.error('Failed to update quantity on server:', e);
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (id: string): boolean => {
    return state.items.some(item => item.id === id);
  };

  const getItemQuantity = (id: string): number => {
    const item = state.items.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  const mapApiItemToLocal = (api: any): CartItem => {
    const productId = api.product_id ?? api.product?.id ?? api.id;
    const name = api.product_name ?? api.product?.name ?? api.name ?? '';
    const slug = api.product_slug ?? api.product?.slug ?? '';
    // Try multiple fields for product image
    const imageCandidate =
      api.product_image ||
      api.image ||
      api.product?.image ||
      api.product?.primary_image ||
      api.product?.thumbnail ||
      api.product?.image_url ||
      (Array.isArray(api.product?.images) && api.product?.images?.[0]) ||
      '';
    const rawPrice = api.product_price ?? api.price ?? api.unit_price ?? 0;
    const price = parseFloat(String(rawPrice)) || 0;
    const quantity = api.quantity ?? 1;
    return {
      id: String(productId),
      name,
      price,
      image: imageCandidate,
      quantity,
      category: '',
      slug,
      cartItemId: api.id ?? api.item_id,
    };
  };

  const refreshFromServer = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await cartService.getCart(1, 100);
      if (res.success && res.data) {
        const data: any = res.data as any;
        let itemsRaw: any[] = [];
        if (Array.isArray(data)) itemsRaw = data;
        else if (Array.isArray(data.results)) itemsRaw = data.results;
        else if (Array.isArray(data.items)) itemsRaw = data.items;
        else if (Array.isArray(data.cart_items)) itemsRaw = data.cart_items;
        if (itemsRaw.length > 0) {
          const mapped = itemsRaw.map(mapApiItemToLocal);
          dispatch({ type: 'LOAD_CART', payload: mapped });
        }
      } else if (!res.success) {
        setError(res.error?.message || 'خطا در دریافت سبد خرید');
      }
    } catch (e) {
      console.error('Failed to hydrate cart from server:', e);
      setError('خطا در برقراری ارتباط با سرور');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
        refreshFromServer,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
