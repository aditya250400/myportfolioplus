import { createSlice } from '@reduxjs/toolkit';
import { deletePostAsync } from '../posts/postThunk';
import { deletePortfolioAsync } from '../portfolios/portfoliosThunk';

const initialState = {
  modalProgress: false,
  modalPortfolio: false,
  postModal: false,
  deleteConfirmId: null,
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
      });
  }
});

export const {setDeleteConfirmId,setModalPortfolio, setModalProgress, setPostModal} = modalSlice.actions;
export default modalSlice.reducer;
