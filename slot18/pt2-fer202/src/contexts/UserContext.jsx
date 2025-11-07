import React, { createContext, useReducer, useCallback, useContext } from "react";
import api from "../services/api";
import { AppContext } from "./AppContext"; // để biết ai đang đăng nhập

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
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        ),
        filteredUsers: state.filteredUsers.map((u) =>
          u.id === action.payload.id ? action.payload : u
        ),
      };
    case "APPLY_FILTER":
      return { ...state, filteredUsers: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { state: appState } = useContext(AppContext); // lấy user đang login

  // === Fetch all users ===
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

  // === Ban or Unban user ===
  const banUser = async (id) => {
    const user = state.users.find((u) => u.id === id);
    if (!user) return;

    // 🔒 Không cho admin tự khóa chính mình
    if (user.id === appState.user?.id) {
      alert("❌ Bạn không thể khóa hoặc mở khóa tài khoản của chính mình!");
      return;
    }

    // 🔐 Chỉ admin mới được phép khóa/mở
    if (appState.user?.role !== "admin") {
      alert("🚫 Bạn không có quyền thực hiện thao tác này!");
      return;
    }

    const newStatus = user.status === "active" ? "locked" : "active";
    const updated = { ...user, status: newStatus };

    try {
      await api.put(`/users/${id}`, updated);
      dispatch({ type: "UPDATE_USER", payload: updated });
      alert(
        newStatus === "locked"
          ? `🔒 Tài khoản ${user.username} đã bị khóa.`
          : `✅ Tài khoản ${user.username} đã được mở khóa.`
      );
    } catch {
      alert("❌ Không thể cập nhật trạng thái người dùng!");
    }
  };

  // === Filter + Sort ===
  const applyFilter = useCallback(
    (filter) => {
      let list = [...state.users];

      if (filter.role) list = list.filter((u) => u.role === filter.role);
      if (filter.status) list = list.filter((u) => u.status === filter.status);
      if (filter.search) {
        const q = filter.search.toLowerCase();
        list = list.filter(
          (u) =>
            u.username.toLowerCase().includes(q) ||
            u.fullName.toLowerCase().includes(q)
        );
      }

      switch (filter.sortBy) {
        case "name-asc":
          list.sort((a, b) => a.fullName.localeCompare(b.fullName));
          break;
        case "name-desc":
          list.sort((a, b) => b.fullName.localeCompare(a.fullName));
          break;
        case "role-asc":
          list.sort((a, b) => a.role.localeCompare(b.role));
          break;
        case "role-desc":
          list.sort((a, b) => b.role.localeCompare(a.role));
          break;
        default:
          break;
      }

      dispatch({ type: "APPLY_FILTER", payload: list });
    },
    [state.users]
  );

  return (
    <UserContext.Provider
      value={{ state, fetchUsers, banUser, applyFilter }}
    >
      {children}
    </UserContext.Provider>
  );
}
