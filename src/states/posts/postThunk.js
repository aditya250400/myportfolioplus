import { createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosConfig';
import { myProfileAsync } from '../myProfile/myProfileThunk';
import { setDeleteConfirmId, setModalProgress } from '../modal/modalSlice';

export const postsAsync = createAsyncThunk(
  'auth/posts',
  async ({ searchInput, page }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.get(`/api/posts?search=${searchInput}&page=${page}`);
      return {
        posts: response.data.data.data,
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page
      };
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue({ error: error.response.data });
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const deletePostAsync = createAsyncThunk(
  'auth/postsDelete',
  async ({id}, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.delete(`/api/posts/${id}`);
      dispatch(getMyPostAsync({page: 1, searchInput: ''}));
      dispatch(setDeleteConfirmId(null));
      setTimeout(() => toast.success('Post Deleted!'));
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue({ error: error.response.data });
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const mostLikedPostsAsync = createAsyncThunk(
  'auth/most-liked-posts',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.get('/api/most-liked-posts');
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue({ error: error.response.data });
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const getMyPostAsync = createAsyncThunk(
  'auth/getMyPost',
  async ({ searchInput, page }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.get(`/api/my-posts?search=${searchInput}&page=${page}`);
      return {
        posts: response.data.data.data,
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page
      };
    } catch (error) {
      toast.error(error.response.data.data);
      return rejectWithValue({ error: error.response.data });
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const getUserPostAsync = createAsyncThunk(
  'auth/getUserPost',
  async ({ searchInput, page, id }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.get(`/api/user-post/${id}?search=${searchInput}&page=${page}`);
      return {
        posts: response.data.data.data,
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page
      };
    } catch (error) {
      toast.error(error.response.data.data);
      return rejectWithValue({ error: error.response.data });
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const getDetailPostAsync = createAsyncThunk(
  'posts/getDetailPost',
  async ({ id }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.get(`/api/posts/${id}`);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue({ error: error.response.data });
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const createPostAsync = createAsyncThunk(
  'auth/createPost',
  async ({ content, image, navigate }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());

    try {
      const formData = new FormData();
      formData.append('content', content);
      if(image !== null) {
        formData.append('image', image);
      }

      const response = await axiosInstance.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setTimeout(() => toast.success(response.data.message) , 500);
      dispatch(postsAsync({page: 1, searchInput: ""}));
      dispatch(myProfileAsync());
      dispatch(setModalProgress(false));
      dispatch(navigate('/'));
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue({ error: error.response.data });
    }
  }
);
export const updatePostAsync = createAsyncThunk(
  'auth/updatePost',
  async ({ content, image, id, removeImage }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());

    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('_method', 'PUT');
      if(image !== null) {
        formData.append('image', image);
      }
      if(removeImage) {
        formData.append('remove_image', removeImage);
      }

      const response = await axiosInstance.post(`/api/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setTimeout(() => toast.success(response.data.message) , 500);
      dispatch(getMyPostAsync({page: 1, searchInput: ""}));
      dispatch(myProfileAsync());
      dispatch(setModalProgress(false));
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue({ error: error.response.data });
    }
  }
);

export const upVotesPostAsync = createAsyncThunk(
  'post/upVotesPost',
  async ({ id }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.post(`/api/posts/${id}/up-vote`);
      return response.data.message;
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue({ error: error.response.data });
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const downVotesPostAsync = createAsyncThunk(
  'post/downVotesPost',
  async ({ id }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.delete(`/api/posts/${id}/down-vote`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue({ error: error.response.data });
    } finally {
      dispatch(hideLoading());
    }
  }
);
