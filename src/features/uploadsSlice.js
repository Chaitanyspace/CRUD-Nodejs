import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

export const getPresign = createAsyncThunk('uploads/getPresign', async ({ filename, contentType }) => {
  const q = `?filename=${encodeURIComponent(filename)}&contentType=${encodeURIComponent(contentType)}`;
  return await api.apiFetch('/api/upload/presign' + q);
});

export const completeUpload = createAsyncThunk('uploads/complete', async ({ key, fileName }) => {
  return await api.apiFetch('/api/uploads/complete', { method: 'POST', body: JSON.stringify({ key, fileName }) });
});

export const listUploads = createAsyncThunk('uploads/list', async () => {
  return await api.apiFetch('/api/uploads');
});

const slice = createSlice({
  name: 'uploads',
  initialState: { presign: null, list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPresign.fulfilled, (state, action) => { state.presign = action.payload; })
      .addCase(completeUpload.fulfilled, (state, action) => { /* no-op */ })
      .addCase(listUploads.fulfilled, (state, action) => { state.list = action.payload.uploads || []; });
  }
});

export default slice.reducer;
