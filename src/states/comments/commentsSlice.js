import { createSlice } from '@reduxjs/toolkit';
import { createCommentAsync, getAllCommentsAsync, getCommentByIdAsync } from './commentsThunk';

const initialState = {
  comments: [],
  status: 'idle',
  error: null,
  loading: false
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCommentsAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(getAllCommentsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getAllCommentsAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getCommentByIdAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(getCommentByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getCommentByIdAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(createCommentAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(createCommentAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.error = action.payload.error;
      });
  }
});

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;
