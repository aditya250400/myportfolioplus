import { createSlice } from '@reduxjs/toolkit';
import { createPortfolioAsync, portfolioDetailAsync, portfoliosAsync, updatePortfolioAsync } from './portfoliosThunk';
import { logoutUser } from '../authUser/authUserThunk';

const initialState = {
  portfolios: [],
  portfolio: null,
  status: 'idle',
  error: null,
  loading: false,
  loadingWhenCreatingPortfolio: false,
  editPortfolioStatus: false,
};

const portfolioSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {
    setEditPortfolioStatus: (state, action) => {
      state.editPortfolioStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(portfoliosAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.portfolios = [];
      })
      .addCase(portfoliosAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.error = null;
        state.portfolios = action.payload.data;
        state.portfolio = null;
      })
      .addCase(portfoliosAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(portfolioDetailAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(portfolioDetailAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.error = null;
        state.portfolio = action.payload.data;
        state.portfolios = [];
      })
      .addCase(portfolioDetailAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPortfolioAsync.pending, (state) => {
        state.status = 'loading';
        state.loadingWhenCreatingPortfolio = true;
      })
      .addCase(createPortfolioAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        state.loadingWhenCreatingPortfolio = false;
        state.error = null;
      })
      .addCase(createPortfolioAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.loadingWhenCreatingPortfolio = false;
        state.error = action.payload;
      })
      .addCase(updatePortfolioAsync.pending, (state) => {
        state.status = 'loading';
        state.loadingWhenCreatingPortfolio = true;
      })
      .addCase(updatePortfolioAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        state.loadingWhenCreatingPortfolio = false;
        state.error = null;
      })
      .addCase(updatePortfolioAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.loadingWhenCreatingPortfolio = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.portfolios = [];
      });
  }
});

export const { setEditPortfolioStatus } = portfolioSlice.actions;
export default portfolioSlice.reducer;
