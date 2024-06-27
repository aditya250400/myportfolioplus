import { createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import axiosInstance from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import { getDetailPostAsync } from '../posts/postThunk';

export const getAllCommentsAsync = createAsyncThunk(
  'comments/getAllComments',
  async (_, { dispatch, rejectedWithValue }) => {
    dispatch(showLoading(true));
    try {
      const response = await axiosInstance.get('/api/comments');
      return response.data;
    } catch (error) {
      return rejectedWithValue({ error: error.data.message });
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const getCommentByIdAsync = createAsyncThunk(
  'comments/getCommentById',
  async ({ id }, { dispatch, rejectedWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.get(`/api/comments/${id}`);
      return response.data;
    } catch (error) {
      rejectedWithValue({ error: error.data.message });
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const createCommentAsync = createAsyncThunk(
  'comments/createComment',
  async (commentData, { dispatch, rejectedWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.post('/api/comments', commentData);
      toast.success(response.data.message);
      commentData.setComment('');
      dispatch(getDetailPostAsync({id: commentData.post_id}))
      return response.data;
    } catch (error) {
      toast.error(error.data.message);
      return rejectedWithValue({ error: error.data.message });
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const createReplyCommentAsync = createAsyncThunk(
  'comments/createReplyComment',
  async (commentData, { dispatch, rejectedWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.post('/api/reply-comments', commentData);
      toast.success(response.data.message);
      commentData.setCommentReply('');
      dispatch(getDetailPostAsync({id: commentData.post_id}))
      return response.data;
    } catch (error) {
      toast.error(error.data.message);
      return rejectedWithValue({ error: error.data.message });
    } finally {
      dispatch(hideLoading());
    }
  }
);
