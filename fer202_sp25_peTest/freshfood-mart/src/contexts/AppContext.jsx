import React, { createContext, useReducer } from 'react';
import appReducer, { initialState } from '../reducers/appReducer';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // helper: fetch products from JSON server
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:9999/store');
      if (!res.ok) throw new Error('Failed to fetch store');
      const data = await res.json();
      // data.products is array
      dispatch({ type: 'SET_PRODUCTS', payload: data.products });
      dispatch({ type: 'SET_STORE', payload: { name: data.storeName, location: data.location } });
    } catch (err) {
      console.error(err);
    }
  };

  // helper: login (simple)
  const login = (username) => {
    // store minimal user in localStorage
    const user = { username };
    localStorage.setItem('freshfood_user', JSON.stringify(user));
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    localStorage.removeItem('freshfood_user');
    dispatch({ type: 'LOGOUT' });
  };

  // try to restore user from localStorage
  React.useEffect(() => {
    const u = localStorage.getItem('freshfood_user');
    if (u) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(u) });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, fetchProducts, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}
