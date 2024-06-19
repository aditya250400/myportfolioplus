import { createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosConfig';

export const portfoliosAsync = createAsyncThunk(
  'auth/portfolios',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.get('/api/my-portfolios');
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue({ error: error.response.data });
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const portfolioDetailAsync = createAsyncThunk(
  'auth/portfolioDetail',
  async ({ id }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.get(`/api/portfolios/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue({ error: error.response.data });
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const createPortfolioAsync = createAsyncThunk(
  'auth/createPortfolio',
  async ({ title, description, image, link }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('link', link);

      const response = await axiosInstance.post('/api/portfolios', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      dispatch(portfoliosAsync());

      toast.success(response.data);
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue({ error: error.response.data });
    } finally {
      dispatch(hideLoading());
    }
  }
);
