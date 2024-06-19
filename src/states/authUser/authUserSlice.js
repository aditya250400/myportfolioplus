import { createSlice } from '@reduxjs/toolkit';
import { authUserAsync, checkAuthStatus, logoutUser } from './authUserThunk';

const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
  loading: false
};

const authUserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authUserAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(authUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(authUserAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.token = localStorage.getItem('access_token');
        }
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = 'idle';
        state.error = null;
      });
  }
});

export default authUserSlice.reducer;
