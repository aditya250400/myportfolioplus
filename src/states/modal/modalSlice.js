import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalProgress: false,
  modalPortfolio: false,
  postModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalProgress: (state, action) => {
        state.modalProgress = action.payload
    },
    setModalPortfolio: (state, action) => {
        state.modalPortfolio = action.payload
    },
    setPostModal: (state, action) => {
        state.postModal = action.payload;
      },
  },
});

export const {setModalPortfolio, setModalProgress, setPostModal} = modalSlice.actions;
export default modalSlice.reducer;
