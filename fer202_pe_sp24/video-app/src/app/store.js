import { configureStore } from '@reduxjs/toolkit';
import videoReducer from '../features/videoSlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    videos: videoReducer,
    auth: authReducer
  }
});