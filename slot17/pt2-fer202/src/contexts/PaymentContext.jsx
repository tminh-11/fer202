import React, { createContext, useReducer, useCallback } from "react";
import api from "../services/api";

const initialState = {
  payments: [],
  filteredPayments: [],
  loading: false,
  error: null,
};

function paymentReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_PAYMENTS":
      return {
        ...state,
        payments: action.payload,
        filteredPayments: action.payload,
      };
    case "ADD_PAYMENT":
      return {
        ...state,
        payments: [...state.payments, action.payload],
        filteredPayments: [...state.filteredPayments, action.payload],
      };
    case "UPDATE_PAYMENT":
      return {
        ...state,
        payments: state.payments.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
        filteredPayments: state.filteredPayments.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "DELETE_PAYMENT":
      return {
        ...state,
        payments: state.payments.filter((p) => p.id !== action.payload),
        filteredPayments: state.filteredPayments.filter(
          (p) => p.id !== action.payload
        ),
      };
    case "APPLY_FILTER_SORT":
      return { ...state, filteredPayments: action.payload };
    default:
      return state;
  }
}

export const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  // === CRUD ===
  const fetchPayments = useCallback(async (userId) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const res = await api.get(`/payments?userId=${userId}`);
      dispatch({ type: "SET_PAYMENTS", payload: res.data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch payments" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const addPayment = async (payment) => {
    try {
      const res = await api.post("/payments", payment);
      dispatch({ type: "ADD_PAYMENT", payload: res.data });
    } catch {
      dispatch({ type: "SET_ERROR", payload: "Failed to add payment" });
    }
  };

  const updatePayment = async (payment) => {
    try {
      const res = await api.put(`/payments/${payment.id}`, payment);
      dispatch({ type: "UPDATE_PAYMENT", payload: res.data });
    } catch {
      dispatch({ type: "SET_ERROR", payload: "Failed to update payment" });
    }
  };

  const deletePayment = async (id) => {
    try {
      await api.delete(`/payments/${id}`);
      dispatch({ type: "DELETE_PAYMENT", payload: id });
    } catch {
      dispatch({ type: "SET_ERROR", payload: "Failed to delete payment" });
    }
  };

  // === FILTER & SORT ===
  const applyFilterAndSort = useCallback(
    (filter) => {
      let list = [...state.payments];

      if (filter.semester)
        list = list.filter((p) => p.semester === filter.semester);

      if (filter.courseName) {
        const q = filter.courseName.toLowerCase();
        list = list.filter((p) => p.courseName.toLowerCase().includes(q));
      }

      switch (filter.sortBy) {
        case "name-asc":
          list.sort((a, b) => a.courseName.localeCompare(b.courseName));
          break;
        case "name-desc":
          list.sort((a, b) => b.courseName.localeCompare(a.courseName));
          break;
        case "date-asc":
          list.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case "date-desc":
          list.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "amount-asc":
          list.sort((a, b) => a.amount - b.amount);
          break;
        case "amount-desc":
          list.sort((a, b) => b.amount - a.amount);
          break;
        default:
          break;
      }

      dispatch({ type: "APPLY_FILTER_SORT", payload: list });
    },
    [state.payments]
  );

  return (
    <PaymentContext.Provider
      value={{
        state,
        dispatch,
        fetchPayments,
        addPayment,
        updatePayment,
        deletePayment,
        applyFilterAndSort,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
