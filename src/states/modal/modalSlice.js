import { createSlice } from '@reduxjs/toolkit';
import { deletePostAsync } from '../posts/postThunk';
import { deletePortfolioAsync } from '../portfolios/portfoliosThunk';
import { deleteCommentAsync, deleteCommentReplyAsync } from '../comments/commentsThunk';

const initialState = {
  modalProgress: false,
  modalPortfolio: false,
  postModal: false,
  deleteConfirmId: null,
  deleteConfirmReplyId: null,
  loadingWhenDeleting: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalProgress: (state, action) => {
        state.modalProgress = action.payload
    },
    setModalPortfolio: (state, action) => {
        state.modalPortfolio = action.payload
    },
    setPostModal: (state, action) => {
        state.postModal = action.payload;
      },
    setDeleteConfirmId: (state, action) => {
        state.deleteConfirmId = action.payload;
      },
    setDeleteConfirmReplyId: (state, action) => {
        state.deleteConfirmReplyId = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deletePostAsync.pending, (state) => {
        state.loadingWhenDeleting = true;
      })
      .addCase(deletePostAsync.fulfilled, (state) => {
        state.loadingWhenDeleting = false;
      })
      .addCase(deletePostAsync.rejected, (state) => {
        state.loadingWhenDeleting = false
      })
      .addCase(deletePortfolioAsync.pending, (state) => {
        state.loadingWhenDeleting = true;
      })
      .addCase(deletePortfolioAsync.fulfilled, (state) => {
        state.loadingWhenDeleting = false;
      })
      .addCase(deletePortfolioAsync.rejected, (state) => {
        state.loadingWhenDeleting = false
      })
      .addCase(deleteCommentAsync.pending, (state) => {
        state.loadingWhenDeleting = true;
      })
      .addCase(deleteCommentAsync.fulfilled, (state) => {
        state.loadingWhenDeleting = false;
      })
      .addCase(deleteCommentAsync.rejected, (state) => {
        state.loadingWhenDeleting = false
      })
      .addCase(deleteCommentReplyAsync.pending, (state) => {
        state.loadingWhenDeleting = true;
      })
      .addCase(deleteCommentReplyAsync.fulfilled, (state) => {
        state.loadingWhenDeleting = false;
      })
      .addCase(deleteCommentReplyAsync.rejected, (state) => {
        state.loadingWhenDeleting = false
      });
  }
});

export const {setDeleteConfirmId, setDeleteConfirmReplyId, setModalPortfolio, setModalProgress, setPostModal} = modalSlice.actions;
export default modalSlice.reducer;
