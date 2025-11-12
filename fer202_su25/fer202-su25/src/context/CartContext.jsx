import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload.id);

    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = async (bike) => {
    if (bike.stock > 0) {
      await axios.patch(`http://localhost:3001/motorbikes/${bike.id}`, {
        stock: bike.stock - 1
      });
      dispatch({ type: 'ADD_TO_CART', payload: bike });
    }
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeFromCart = async (id) => {
    const item = cart.find(i => i.id === id);
    if (item) {
      await axios.patch(`http://localhost:3001/motorbikes/${id}`, {
        stock: item.stock + item.quantity
      });
    }
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);