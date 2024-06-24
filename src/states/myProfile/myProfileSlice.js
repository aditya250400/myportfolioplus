import { createSlice } from "@reduxjs/toolkit";
import {
  createMyBackgroundProfileAsync,
  createMyBiodataAsync,
  createMyPhotoProfileAsync,
  myProfileAsync,
  updateMyBackgroundPhotoProfileAsync,
  updateMyBiodataAsync,
  updateMyPhotoProfileAsync,
} from "./myProfileThunk";
import { logoutUser } from "../authUser/authUserThunk";

const initialState = {
  myProfile: null,
  status: "idle",
  error: null,
  loading: true,
  loadingPhotoProfile: true,
  loadingBackground: true,
  loadingWhenCreatingBiodata: false,
};

const myProfileSlice = createSlice({
  name: "myProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(myProfileAsync.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.loadingPhotoProfile = true;
        state.loadingBackground = true;
      })
      .addCase(myProfileAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.loadingPhotoProfile = false;
        state.loadingBackground = false;
        state.error = null;
        state.myProfile = action.payload.myProfile;
      })
      .addCase(myProfileAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.loadingPhotoProfile = false;
        state.loadingBackground = false;
        state.error = action.payload;
      })
      // create and update background start
      .addCase(createMyBackgroundProfileAsync.pending, (state) => {
        state.loadingBackground = true;
        state.loadingWhenCreatingBiodata = true;
      })
      .addCase(createMyBackgroundProfileAsync.fulfilled, (state) => {
        state.loadingBackground = false;
        state.loadingWhenCreatingBiodata = false;
      })
      .addCase(createMyBackgroundProfileAsync.rejected, (state) => {
        state.loadingBackground = false;
        state.loadingWhenCreatingBiodata = false;
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

      // Update My Biodata Start
      .addCase(updateMyBiodataAsync.pending, (state) => {
        state.loadingWhenCreatingBiodata = true;
      })
      .addCase(updateMyBiodataAsync.fulfilled, (state) => {
        state.loadingWhenCreatingBiodata = false;
      })
      .addCase(updateMyBiodataAsync.rejected, (state) => {
        state.loadingWhenCreatingBiodata = false;
      })
      // Update My Biodata End

      // Create My Biodata Start
      .addCase(createMyBiodataAsync.pending, (state) => {
        state.loadingWhenCreatingBiodata = true;
      })
      .addCase(createMyBiodataAsync.fulfilled, (state) => {
        state.loadingWhenCreatingBiodata = false;
      })
      .addCase(createMyBiodataAsync.rejected, (state) => {
        state.loadingWhenCreatingBiodata = false;
      })
      // Create My Biodata End

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
      .addCase(logoutUser.fulfilled, (state) => {
        state.myProfile = null;
        state.status = "idle";
        state.error = null;
        state.loading = true;
        state.loadingPhotoProfile = false;
        state.loadingBackground = false;
      });
  },
});

export default myProfileSlice.reducer;
