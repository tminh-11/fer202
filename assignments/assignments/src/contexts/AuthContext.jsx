import React, { createContext, useReducer, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

const initialState = {
  user: null,
  expenses: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload, error: null };
    case "LOGOUT":
      return { ...initialState };
    case "SET_EXPENSES":
      return { ...state, expenses: action.payload };
    case "ADD_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.payload),
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const user = JSON.parse(saved);
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      fetchExpenses(user.id);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await api.get("/users");
      const user = res.data.find(
        (u) => u.username === username && u.password === password
      );
      if (!user) throw new Error("Sai tên đăng nhập hoặc mật khẩu");
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      fetchExpenses(user.id);
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const fetchExpenses = async (userId) => {
    try {
      const res = await api.get(`/expenses?userId=${userId}`);
      dispatch({ type: "SET_EXPENSES", payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  const addExpense = async (expense) => {
    const res = await api.post("/expenses", expense);
    dispatch({ type: "ADD_EXPENSE", payload: res.data });
  };

  const updateExpense = async (expense) => {
    const res = await api.put(`/expenses/${expense.id}`, expense);
    dispatch({ type: "UPDATE_EXPENSE", payload: res.data });
  };

  const deleteExpense = async (id) => {
    await api.delete(`/expenses/${id}`);
    dispatch({ type: "DELETE_EXPENSE", payload: id });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        addExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}