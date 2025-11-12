import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BikeContext = createContext();

export const BikeProvider = ({ children }) => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBikes = async () => {
    try {
      const res = await axios.get('http://localhost:3001/motorbikes');
      setBikes(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  return (
    <BikeContext.Provider value={{ bikes, loading, fetchBikes }}>
      {children}
    </BikeContext.Provider>
  );
};

export const useBikes = () => useContext(BikeContext);