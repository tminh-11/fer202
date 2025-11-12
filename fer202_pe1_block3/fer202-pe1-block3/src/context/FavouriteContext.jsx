import React, { createContext, useContext, useReducer } from 'react';

const FavouriteContext = createContext();

const favReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return state.includes(action.payload)
        ? state.filter(id => id !== action.payload)
        : [...state, action.payload];
    default:
      return state;
  }
};

export const FavouriteProvider = ({ children }) => {
  const [favourites, dispatch] = useReducer(favReducer, []);

  const toggleFavourite = (id) => {
    dispatch({ type: 'TOGGLE', payload: id });
  };

  return (
    <FavouriteContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite = () => useContext(FavouriteContext);