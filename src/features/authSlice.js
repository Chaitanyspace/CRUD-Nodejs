import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const res = await api.apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  return res;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const res = await api.apiFetch('/api/auth/logout', { method: 'POST' });
  return res;
});

const slice = createSlice({
  name: 'auth',
  initialState: { loggedIn: false, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.loggedIn = action.payload.ok === true; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(logout.fulfilled, (state) => { state.loggedIn = false; });
  }
});

export const selectAuth = (s) => s.auth;
export default slice.reducer;
