import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = async (username, password) => {
    try {
      const res = await axios.get('http://localhost:3001/accounts');
      const found = res.data.find(
        (u) => u.username === username && u.password === password
      );
      if (found) {
        setUser(found);
        localStorage.setItem('loggedInUser', JSON.stringify(found));
        return found;
      }
      return null;
    } catch (err) {
      console.error('Login error', err);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
