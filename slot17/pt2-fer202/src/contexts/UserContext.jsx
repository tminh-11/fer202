import React, { createContext, useReducer, useCallback } from "react";
import api from "../services/api";

export const UserContext = createContext();

const initialState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
};

function userReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload, filteredUsers: action.payload };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map(u => u.id === action.payload.id ? action.payload : u),
        filteredUsers: state.filteredUsers.map(u => u.id === action.payload.id ? action.payload : u),
      };
    case "APPLY_FILTER":
      return { ...state, filteredUsers: action.payload };
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUsers = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const res = await api.get("/users");
      dispatch({ type: "SET_USERS", payload: res.data });
    } catch {
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch users" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const banUser = async (id) => {
    const user = state.users.find(u => u.id === id);
    if (!user) return;
    const updated = { ...user, status: "locked" };
    await api.put(`/users/${id}`, updated);
    dispatch({ type: "UPDATE_USER", payload: updated });
  };

  const applyFilter = useCallback((filter) => {
    let list = [...state.users];

    if (filter.role) list = list.filter(u => u.role === filter.role);
    if (filter.status) list = list.filter(u => u.status === filter.status);
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(u => u.username.toLowerCase().includes(q) || u.fullName.toLowerCase().includes(q));
    }

    switch (filter.sortBy) {
      case "name-asc": list.sort((a, b) => a.fullName.localeCompare(b.fullName)); break;
      case "name-desc": list.sort((a, b) => b.fullName.localeCompare(a.fullName)); break;
      default: break;
    }

    dispatch({ type: "APPLY_FILTER", payload: list });
  }, [state.users]);

  return (
    <UserContext.Provider value={{ state, fetchUsers, banUser, applyFilter }}>
      {children}
    </UserContext.Provider>
  );
}
