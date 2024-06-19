import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosConfig';
import { showLoading } from 'react-redux-loading-bar';

export const isPreloadAsync = createAsyncThunk(
  'auth/checkStatus',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.get('/api/me');
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    } finally {
      dispatch(showLoading());
    }
  }
);
