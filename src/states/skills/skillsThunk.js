import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosConfig';
import { showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';

//get all skills for suggest
export const skillsAsync = createAsyncThunk(
  'auth/skills',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.get('/api/skills');
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue({ error: error.response.data });
    } finally {
      dispatch(showLoading());
    }
  }
);
