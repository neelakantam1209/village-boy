"use client";

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { CartItem, Service, Professional } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

type DraggableItem = Service | Professional;

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: DraggableItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = useCallback((item: DraggableItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        const price = 'price' in item ? item.price : 50; // Default price for professionals
        return [...prevItems, { ...item, quantity: 1, price }];
      }
    });
    toast({
        title: "Added to Cart",
        description: `${item.name} has been added to your cart.`,
    });
  }, [toast]);

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast({
        title: "Removed from Cart",
        description: "The item has been removed from your cart.",
        variant: "destructive"
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
