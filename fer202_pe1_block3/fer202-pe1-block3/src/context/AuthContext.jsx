import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const login = async (username, password) => {
    const res = await axios.get('http://localhost:3001/users');
    const user = res.data.find(
      u => (u.username === username || u.email === username) && u.password === password
    );
    if (user) {
      dispatch({ type: 'LOGIN', payload: username });
      return true;
    }
    return false;
  };

  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);