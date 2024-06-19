import { createSlice } from '@reduxjs/toolkit';
import { getAllUsersAsync, getMostActiveUsers, getUserIdAsync } from './userThunk';
import { logoutUser } from '../authUser/authUserThunk';

const initialState = {
  user: null,
  users: [],
  mostActiveUsers: [],
  status: 'idle',
  page: 1,
  current_page: 1,
  last_page: 1,
  loadingPaginate: false,
  error: null,
  loading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPage: (state) => {
      state.page += 1;
    },
    setPageUserToOne: (state) => {
      state.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.users = [];
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.error = null;
        state.users = action.payload.data;
        state.user = null;
        state.mostActiveUsers = [];
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserIdAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.user = null;
      })
      .addCase(getUserIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.error = null;
        state.user = action.payload.data;
        state.users = [];
        state.mostActiveUsers = [];
      })
      .addCase(getUserIdAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMostActiveUsers.pending, (state, action) => {
        state.status = 'loading';
        state.loading = state.page === 1 ? true : false;
        state.loadingPaginate = state.page === 1 ? false : true;
        state.error = action.payload;
      })
      .addCase(getMostActiveUsers.fulfilled, (state, action) => {
        state.users = [];
        state.user = null;
        state.status = 'succeeded';
        state.loading = false;
        state.loadingPaginate = false;
        state.current_page = action.payload.current_page;
        state.last_page = action.payload.last_page;

        if (state.current_page === 1) {
          state.mostActiveUsers = action.payload.users;
        } else {
          state.mostActiveUsers = [...state.mostActiveUsers, ...action.payload.users];
        }
      })
      .addCase(getMostActiveUsers.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.loadingPaginate = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = true;
        state.status = 'idle';
        state.error = null;
        state.users = [];
        state.user = null;
        state.mostActiveUsers = [];
      });
  }
});

export const { setPage, setPageUserToOne } = userSlice.actions;
export default userSlice.reducer;
