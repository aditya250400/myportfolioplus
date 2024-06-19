import { createSlice } from '@reduxjs/toolkit';
import {
  createMyBackgroundProfileAsync,
  createMyPhotoProfileAsync,
  myProfileAsync,
  updateMyBackgroundPhotoProfileAsync,
  updateMyPhotoProfileAsync
} from './myProfileThunk';
import { logoutUser } from '../authUser/authUserThunk';

const initialState = {
  myProfile: null,
  status: 'idle',
  error: null,
  loading: true,
  loadingPhotoProfile: true,
  loadingBackground: true
};

const myProfileSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(myProfileAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.loadingPhotoProfile = true;
        state.loadingBackground = true;
      })
      .addCase(myProfileAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.loadingPhotoProfile = false;
        state.loadingBackground = false;
        state.error = null;
        state.myProfile = action.payload.myProfile;
      })
      .addCase(myProfileAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.loadingPhotoProfile = false;
        state.loadingBackground = false;
        state.error = action.payload;
      })
      // create and update background start
      .addCase(createMyBackgroundProfileAsync.pending, (state) => {
        state.loadingBackground = true;
      })
      .addCase(createMyBackgroundProfileAsync.fulfilled, (state) => {
        state.loadingBackground = false;
      })
      .addCase(createMyBackgroundProfileAsync.rejected, (state) => {
        state.loadingBackground = false;
      })
      .addCase(updateMyBackgroundPhotoProfileAsync.pending, (state) => {
        state.loadingBackground = true;
      })
      .addCase(updateMyBackgroundPhotoProfileAsync.fulfilled, (state) => {
        state.loadingBackground = false;
      })
      .addCase(updateMyBackgroundPhotoProfileAsync.rejected, (state) => {
        state.loadingBackground = false;
      })
      // create and update background end

      // create and update photo profile start
      .addCase(createMyPhotoProfileAsync.pending, (state) => {
        state.loadingPhotoProfile = true;
      })
      .addCase(createMyPhotoProfileAsync.fulfilled, (state) => {
        state.loadingPhotoProfile = false;
      })
      .addCase(createMyPhotoProfileAsync.rejected, (state) => {
        state.loadingPhotoProfile = false;
      })
      .addCase(updateMyPhotoProfileAsync.pending, (state) => {
        state.loadingPhotoProfile = true;
      })
      .addCase(updateMyPhotoProfileAsync.fulfilled, (state) => {
        state.loadingPhotoProfile = false;
      })
      .addCase(updateMyPhotoProfileAsync.rejected, (state) => {
        state.loadingPhotoProfile = false;
      })
      // create and update photo profile end

      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.loadingPhotoProfile = true;
        state.loadingBackground = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.myProfile = null;
        state.status = 'idle';
        state.error = null;
        state.loading = true;
        state.loadingPhotoProfile = false;
        state.loadingBackground = false;
      });
  }
});

export default myProfileSlice.reducer;
