import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosConfig';
import { showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';

//get my profile
export const myProfileAsync = createAsyncThunk(
  'auth/myProfile',
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

//create my biodata
const createMyBiodataAsync = createAsyncThunk(
  'auth/createMyBiodata',
  async (
    { about, headline, role, location, skills, linkedIn, website, name, setOpenModal, email },
    { dispatch, rejectWithValue }
  ) => {
    try {
      await axiosInstance.post('/api/biodatas', {
        about,
        headline,
        role,
        location,
        skills,
        linkedIn,
        website
      });

      await axiosInstance.put('/api/users', { name, email });

      toast.success('success edit your biodata');

      dispatch(myProfileAsync());
      setOpenModal(false);
    } catch (error) {
      toast.error(error.response.data);
      rejectWithValue({ error: error.response.data });
    }
  }
);

//create my photo Profile
const createMyPhotoProfileAsync = createAsyncThunk(
  'auth/createMyPhotoProfile',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.post('/api/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch(myProfileAsync());
      toast.success('Success Edit Your Photo Profile');
    } catch (error) {
      toast.error(error.response.data);
      rejectWithValue({ error: error.response.data });
    }
  }
);
//create my background Profile
const createMyBackgroundProfileAsync = createAsyncThunk(
  'auth/createMyBackgroundProfile',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.post('/api/backgrounds', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch(myProfileAsync());
      toast.success('Success Edit Your Background Photo Profile');
    } catch (error) {
      toast.error(error.response.data);
      rejectWithValue({ error: error.response.data });
    }
  }
);

//update my biodata
const updateMyBiodataAsync = createAsyncThunk(
  'auth/updateMyBiodataAsync',
  async (
    { about, headline, role, location, skills, linkedIn, website, name, setOpenModal, email, id },
    { dispatch, rejectWithValue }
  ) => {
    try {
      await axiosInstance.put(`/api/biodatas/${id}`, {
        about,
        headline,
        role,
        location,
        skills,
        linkedIn,
        website
      });

      await axiosInstance.put('/api/users', { name, email });

      toast.success('Success Edit Your Profile');

      dispatch(myProfileAsync());
      setOpenModal(false);
    } catch (error) {
      toast.error(error.response.data);
      rejectWithValue({ error: error.response.data });
    }
  }
);

//update My photo profile
const updateMyPhotoProfileAsync = createAsyncThunk(
  'auth/updateMyPhotoProfile',
  async ({ formData, id }, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.post(`/api/photos/${id}`, formData);
      dispatch(myProfileAsync());
      toast.success('Success Edit Your Photo Profile');
    } catch (error) {
      toast.error(error.response.data);
      rejectWithValue({ error: error.response.data });
    }
  }
);
//update My photo profile
const updateMyBackgroundPhotoProfileAsync = createAsyncThunk(
  'auth/updateMyBackgroundPhotoProfile',
  async ({ formData, id }, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.post(`/api/backgrounds/${id}`, formData);
      dispatch(myProfileAsync());
      toast.success('Success Edit Your Background Photo Profile');
    } catch (error) {
      toast.error(error.response.data);
      rejectWithValue({ error: error.response.data });
    }
  }
);

export {
  createMyBiodataAsync,
  createMyPhotoProfileAsync,
  updateMyBiodataAsync,
  updateMyPhotoProfileAsync,
  createMyBackgroundProfileAsync,
  updateMyBackgroundPhotoProfileAsync
};
