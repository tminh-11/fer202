import React, { createContext, useReducer } from 'react';
import reducer, { initialState } from '../reducers/appReducer';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetch all cars from JSON server
  const fetchCars = async () => {
    try {
      const res = await fetch('http://localhost:9999/Cars');
      if (!res.ok) throw new Error('Cannot fetch cars');
      const data = await res.json();
      dispatch({ type: 'SET_CARS', payload: data });
      dispatch({ type: 'SET_FILTERED', payload: data });
    } catch (err) {
      console.error(err);
    }
  };

  // register user (simple)
  const registerUser = (user) => {
    localStorage.setItem('car_user', JSON.stringify(user));
    dispatch({ type: 'REGISTER', payload: user });
  };

  // try restore user from localStorage
  React.useEffect(() => {
    const raw = localStorage.getItem('car_user');
    if (raw) {
      dispatch({ type: 'REGISTER', payload: JSON.parse(raw) });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, fetchCars, registerUser }}>
      {children}
    </AppContext.Provider>
  );
}
