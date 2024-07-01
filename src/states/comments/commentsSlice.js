import { createSlice } from '@reduxjs/toolkit';
import { createCommentAsync, getAllCommentsAsync, getCommentByIdAsync, getCommentReplyByIdAsync, updateCommentAsync, updateCommentReplyAsync } from './commentsThunk';

const initialState = {
  comments: [],
  status: 'idle',
  error: null,
  editCommentId: null,
  editCommentReplyId: null,
  loadingCurrentComment: false,
  loadingCurrentCommentReply: false,
  loadingWhenUpdatingComment: false,
  currentCommentReply: null,
  loading: false
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    }, 
    setStatusEditComment: (state, action) => {
      state.editCommentId = action.payload;
    },
    setStatusEditCommentReply: (state, action) => {
      state.editCommentReplyId = action.payload;
    },
    setCurrentComment: (state) => {
      state.currentComment = null;
    },
    setCurrentCommentReply: (state) => {
      state.currentCommentReply = null;
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
        state.loadingCurrentComment = true;
        state.currentComment = null;
      })
      .addCase(getCommentByIdAsync.fulfilled, (state, action) => {
        state.loadingCurrentComment = false;
        state.currentComment = action.payload.data;
      })
      .addCase(getCommentByIdAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.loadingCurrentComment = false;
        state.error = action.payload.error;
      })
      .addCase(getCommentReplyByIdAsync.pending, (state) => {
        state.loadingCurrentCommentReply = true;
        state.currentComment = null;
      })
      .addCase(getCommentReplyByIdAsync.fulfilled, (state, action) => {
        state.loadingCurrentCommentReply = false;
        state.currentCommentReply = action.payload.data;
      })
      .addCase(getCommentReplyByIdAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.loadingCurrentCommentReply = false;
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
      })
      .addCase(updateCommentAsync.pending, (state) => {
        state.loadingWhenUpdatingComment = true;
      })
      .addCase(updateCommentAsync.fulfilled, (state) => {
        state.loadingWhenUpdatingComment = false;

      })
      .addCase(updateCommentAsync.rejected, (state) => {
        state.loadingWhenUpdatingComment = false;

      })
      .addCase(updateCommentReplyAsync.pending, (state) => {
        state.loadingWhenUpdatingComment = true;
      })
      .addCase(updateCommentReplyAsync.fulfilled, (state) => {
        state.loadingWhenUpdatingComment = false;

      })
      .addCase(updateCommentReplyAsync.rejected, (state) => {
        state.loadingWhenUpdatingComment = false;

      });
  }
});

export const { setCurrentCommentReply ,setStatusEditCommentReply, addComment, setStatusEditComment, setCurrentComment } = commentSlice.actions;
export default commentSlice.reducer;
