import { createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosConfig';
import { myProfileAsync } from '../myProfile/myProfileThunk';
import { setDeleteConfirmId, setModalPortfolio } from '../modal/modalSlice';
import { getMostActiveUsers } from '../user/userThunk';
import { setEditPortfolioStatus } from './portfoliosSlice';

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


export const deletePortfolioAsync = createAsyncThunk(
  'auth/portfolioDelete',
  async ({id, navigate}, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.delete(`/api/portfolios/${id}`);
      setTimeout(() => toast.success('Portfolio Deleted!'), 500);
      navigate(-1);
      dispatch(setDeleteConfirmId(null));
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
      dispatch(myProfileAsync());
      dispatch(setModalPortfolio(false));
      dispatch(getMostActiveUsers({page: 1}));
      setTimeout(() => toast.success('Portfolio Successfull Created!\nCheck Your Profile'), 500);
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue({ error: error.response.data });
    } finally {
      dispatch(hideLoading());
    }
  }
);
export const updatePortfolioAsync = createAsyncThunk(
  'auth/updatePortfolio',
  async ({ title, description, image, link, id }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('link', link);
      formData.append('_method', 'PUT');
      if(image !== null) {
        formData.append('image', image);
      }

      const response = await axiosInstance.post(`/api/portfolios/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      dispatch(portfolioDetailAsync({id}));
      dispatch(myProfileAsync());
      dispatch(setModalPortfolio(false));
      dispatch(setEditPortfolioStatus(false));
      setTimeout(() => toast.success('Portfolio Successfull Updated!'), 500);
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue({ error: error.response.data });
    } finally {
      dispatch(hideLoading());
    }
  }
);
