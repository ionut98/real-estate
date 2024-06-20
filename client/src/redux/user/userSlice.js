import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateStart: (state) => {
      state.isLoading = true;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    updateFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    deleteStart: (state) => {
      state.isLoading = true;
    },
    deleteSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.isLoading = false;
    },
    deleteFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateFailure,
  updateStart,
  updateSuccess,
  deleteFailure,
  deleteStart,
  deleteSuccess,
} = userSlice.actions;

export default userSlice.reducer;
