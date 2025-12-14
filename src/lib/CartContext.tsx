"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CartItem } from './types';

interface CartContextType {
  items: CartItem[];
  totalAmount: number;
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const calculateTotal = (cartItems: CartItem[]) => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(i => i.productId === item.productId);
      const quantityToAdd = item.quantity || 1;
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        const newQuantity = Math.min(updated[existingIndex].quantity + quantityToAdd, item.stock);
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQuantity };
        return updated;
      }
      
      return [...prev, { ...item, quantity: quantityToAdd } as CartItem];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems(prev => prev.filter(item => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setItems(prev => {
      const item = prev.find(i => i.productId === productId);
      if (!item) return prev;
      
      const validQuantity = Math.max(1, Math.min(quantity, item.stock));
      return prev.map(i => 
        i.productId === productId ? { ...i, quantity: validQuantity } : i
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalAmount = calculateTotal(items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      totalAmount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
