import { createSlice } from '@reduxjs/toolkit';
import { registerAsync } from './registerThunk';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  loading: false
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default registerSlice.reducer;
