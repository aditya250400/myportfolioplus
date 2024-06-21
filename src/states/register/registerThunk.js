import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosConfig';
import { toast } from 'react-toastify';

export const registerAsync = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, password_confirmation }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/register', {
        name,
        email,
        password,
        password_confirmation
      });
      setTimeout(() => toast.success(response.data.message), 500);
      return { success: true, message: response.data.message };
    } catch (error) {
      if (error.message === 'Network Error') {
        toast.error('Network Error: Please check your connection');
        return rejectWithValue({ error: 'No internet connection' });
      }
      const errorMessage = error.response?.data?.message ?? error.response.data;
      toast.error(errorMessage);
      return rejectWithValue({ success: false, error: errorMessage });
    }
  }
);
