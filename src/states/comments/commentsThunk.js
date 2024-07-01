import { createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import axiosInstance from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import { getDetailPostAsync } from '../posts/postThunk';
import { setCurrentComment, setCurrentCommentReply, setStatusEditComment, setStatusEditCommentReply } from './commentsSlice';

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
export const getCommentReplyByIdAsync = createAsyncThunk(
  'comments/getCommentReplyById',
  async ({ id }, { dispatch, rejectedWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.get(`/api/reply-comments/${id}`);
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

export const updateCommentAsync = createAsyncThunk(
  'comments/updateComment',
  async (commentData, { dispatch, rejectedWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.put(`/api/comments/${commentData.id}`, commentData);
      dispatch(setStatusEditComment(null));
      dispatch(setCurrentComment());
      toast.success(response.data.message);
      commentData.setContent('');
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
export const updateCommentReplyAsync = createAsyncThunk(
  'comments/updateCommentReply',
  async (commentData, { dispatch, rejectedWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.put(`/api/reply-comments/${commentData.id}`, commentData);
      dispatch(setStatusEditCommentReply(null));
      dispatch(setCurrentCommentReply());
      toast.success(response.data.message);
      commentData.setContent('');
      dispatch(getDetailPostAsync({id: commentData.post_id}))
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
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

export const deleteCommentAsync = createAsyncThunk(
  'auth/commentDelete',
  async ({id, postId}, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.delete(`/api/comments/${id}`);
      setTimeout(() => toast.success('Comment Deleted!'), 500);
      dispatch(getDetailPostAsync({id: postId}));
      dispatch(setDeleteConfirmId(null));
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue({ error: error.response.data });
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const deleteCommentReplyAsync = createAsyncThunk(
  'auth/commentReplyDelete',
  async ({id, postId}, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.delete(`/api/reply-comments/${id}`);
      setTimeout(() => toast.success('Reply Comment Deleted!'), 500);
      dispatch(getDetailPostAsync({id: postId}));
      dispatch(setDeleteConfirmId(null));
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue({ error: error.response.data });
    } finally {
      dispatch(hideLoading());
    }
  }
);

