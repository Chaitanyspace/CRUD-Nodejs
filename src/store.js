import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import uploadsReducer from './features/uploadsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    uploads: uploadsReducer,
  }
});

export default store;
