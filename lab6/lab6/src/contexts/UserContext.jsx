// src/contexts/UserContext.js (thay thế hoàn toàn)
import { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  toggleBanUser,
  toggleAdminStatus,
  applyFilter,
} from '../features/users/usersSlice';
import { useContext as useAppContext } from './AppContext';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const dispatch = useDispatch();
  const { state: appState } = useAppContext(); // lấy user hiện tại

  const usersState = useSelector(state => state.users);
  const currentUserId = appState.user?.id;

  const fetchUsersHandler = () => dispatch(fetchUsers());
  const banUserHandler = (id) => dispatch(toggleBanUser({ id, currentUserId }));
  const toggleAdminHandler = (userId) => dispatch(toggleAdminStatus(userId));
  const applyFilterHandler = (filter) => {
    // logic filter giữ nguyên như cũ, chỉ dispatch kết quả
    // (có thể viết trong slice hoặc ở đây)
    // ở đây mình để đơn giản: tính rồi dispatch
    // ... (copy logic từ applyFilter cũ)
    // rồi dispatch(applyFilter(filteredList))
  };

  return (
    <UserContext.Provider value={{
      state: usersState,
      fetchUsers: fetchUsersHandler,
      banUser: banUserHandler,
      toggleAdminStatus: toggleAdminHandler,
      applyFilter: applyFilterHandler,
    }}>
      {children}
    </UserContext.Provider>
  );
}