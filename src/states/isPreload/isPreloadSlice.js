import { createSlice } from '@reduxjs/toolkit';
import { isPreloadAsync } from './isPreloadThunk';

const initialState = {
  isPreload: true
};

const isPreloadSlice = createSlice({
  name: 'isPreload',
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(isPreloadAsync.pending, (state) => {
        state.isPreload = true;
      })
      .addCase(isPreloadAsync.fulfilled, (state) => {
        state.isPreload = false;
      })
      .addCase(isPreloadAsync.rejected, (state) => {
        state.isPreload = false;
      });
  }
});

export default isPreloadSlice.reducer;
