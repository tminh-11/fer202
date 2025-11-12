import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/payments?userId=${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue('Không tải được danh sách thanh toán');
    }
  }
);

export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const res = await api.post('/payments', paymentData);
      return res.data;
    } catch (err) {
      if (err.response?.status === 402) {
        return rejectWithValue('Tài khoản không đủ tiền');
      }
      return rejectWithValue(err.response?.data?.message || 'Tạo thanh toán thất bại');
    }
  }
);

export const refundPayment = createAsyncThunk(
  'payments/refundPayment',
  async (paymentId, { rejectWithValue }) => {
    try {
      await api.delete(`/payments/${paymentId}`);
      return paymentId;
    } catch (err) {
      return rejectWithValue('Hoàn tiền thất bại');
    }
  }
);

const initialState = {
  list: [],
  filteredPayments: [],
  isLoading: false,
  error: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    applyFilterAndSort(state, action) {
      const { semester, courseName, sortBy } = action.payload;
      let filtered = [...state.list];

      if (semester) filtered = filtered.filter(p => p.semester === semester);
      if (courseName) {
        const q = courseName.toLowerCase();
        filtered = filtered.filter(p => p.courseName.toLowerCase().includes(q));
      }

      switch (sortBy) {
        case "name-asc": filtered.sort((a, b) => a.courseName.localeCompare(b.courseName)); break;
        case "name-desc": filtered.sort((a, b) => b.courseName.localeCompare(a.courseName)); break;
        case "date-asc": filtered.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
        case "date-desc": filtered.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
        case "amount-asc": filtered.sort((a, b) => a.amount - b.amount); break;
        case "amount-desc": filtered.sort((a, b) => b.amount - a.amount); break;
      }

      state.filteredPayments = filtered;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPayments.pending, state => { state.isLoading = true; })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
        state.filteredPayments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.filteredPayments.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(refundPayment.fulfilled, (state, action) => {
        const id = action.payload;
        state.list = state.list.filter(p => p.id !== id);
        state.filteredPayments = state.filteredPayments.filter(p => p.id !== id);
      });
  },
});

export const { applyFilterAndSort } = paymentsSlice.actions;
export default paymentsSlice.reducer;