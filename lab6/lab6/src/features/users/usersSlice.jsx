import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/users');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch users');
    }
  }
);

export const toggleBanUser = createAsyncThunk(
  'users/toggleBanUser',
  async ({ id, currentUserId }, { getState, rejectWithValue }) => {
    const user = getState().users.list.find(u => u.id === id);
    if (!user) return rejectWithValue('User not found');
    if (user.id === currentUserId) return rejectWithValue('Không thể khóa chính mình');

    const newStatus = user.status === 'active' ? 'locked' : 'active';
    const updated = { ...user, status: newStatus };

    try {
      await api.put(`/users/${id}`, updated);
      return updated;
    } catch (err) {
      return rejectWithValue('Cập nhật thất bại');
    }
  }
);

const initialState = {
  list: [],
  filteredUsers: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleAdminStatus(state, action) {
      const userId = action.payload;
      const user = state.list.find(u => u.id === userId);
      if (user) {
        user.role = user.role === 'admin' ? 'user' : 'admin';
        const fUser = state.filteredUsers.find(u => u.id === userId);
        if (fUser) fUser.role = user.role;
      }
    },
    applyFilter(state, action) {
      const { search = "", role = "", status = "", sortBy = "" } = action.payload;
      let filtered = [...state.list];

      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(u =>
          u.username.toLowerCase().includes(q) ||
          u.fullName.toLowerCase().includes(q)
        );
      }
      if (role) filtered = filtered.filter(u => u.role === role);
      if (status) filtered = filtered.filter(u => u.status === status);

      if (sortBy === "name-asc") filtered.sort((a, b) => a.fullName.localeCompare(b.fullName));
      if (sortBy === "name-desc") filtered.sort((a, b) => b.fullName.localeCompare(a.fullName));
      if (sortBy === "role-asc") filtered.sort((a, b) => a.role.localeCompare(b.role));
      if (sortBy === "role-desc") filtered.sort((a, b) => b.role.localeCompare(a.role));

      state.filteredUsers = filtered;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(toggleBanUser.fulfilled, (state, action) => {
        const updated = action.payload;
        state.list = state.list.map(u => u.id === updated.id ? updated : u);
        state.filteredUsers = state.filteredUsers.map(u => u.id === updated.id ? updated : u);
      });
  },
});

export const { toggleAdminStatus, applyFilter } = usersSlice.actions;
export default usersSlice.reducer;