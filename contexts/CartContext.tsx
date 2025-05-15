import React, { createContext, useContext, useReducer } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  total: number;
};

const CartContext = createContext<{
  cart: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}>(null!);


export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  function cartReducer(state: CartState, action: any) {
    switch (action.type) {
      case 'ADD_ITEM':
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          return {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            total: state.total + action.payload.price
          };
        }
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          total: state.total + action.payload.price
        };
        
      case 'REMOVE_ITEM':
        const itemToRemove = state.items.find(item => item.id === action.payload);
        if (!itemToRemove) return state;
        
        if (itemToRemove.quantity > 1) {
          return {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
            total: state.total - itemToRemove.price
          };
        }
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload),
          total: state.total - itemToRemove.price
        };

      case 'CLEAR_CART':
        return { items: [], total: 0 };

      default:
        return state;
    }
  }

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext); 