import React, { createContext, useReducer, useEffect } from "react";
import { appReducer, initialState } from "./appReducer";
import api from "../services/api";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // restore from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("pt-fer202");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.user) {
        dispatch({ type: "LOGIN_SUCCESS", payload: { user: parsed.user, token: parsed.token } });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pt-fer202", JSON.stringify({ user: state.user, token: state.token }));
  }, [state.user, state.token]);

  // fetch payments for current user
  const fetchPaymentsForUser = async (userId) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const res = await api.get(`/payments?userId=${userId}`);
      dispatch({ type: "SET_PAYMENTS", payload: res.data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Failed to load payments" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch, fetchPaymentsForUser }}>
      {children}
    </AppContext.Provider>
  );
}
