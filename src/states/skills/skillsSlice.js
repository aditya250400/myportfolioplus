import { createSlice } from '@reduxjs/toolkit';
import { logoutUser } from '../authUser/authUserThunk';
import { skillsAsync } from './skillsThunk';

const initialState = {
  skills: [],
  status: 'idle',
  error: null,
  loading: false
};

const skills = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(skillsAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(skillsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.error = null;
        state.skills = action.payload.data;
      })
      .addCase(skillsAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.skills = [];
        state.status = 'idle';
        state.error = null;
        state.loading = false;
      });
  }
});

export default skills.reducer;
