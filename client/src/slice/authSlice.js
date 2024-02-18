import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    login: (state, { payload }) => {
      state.user = payload;
      localStorage.setItem('profile', JSON.stringify(payload));
    },
    logout: (state) => {
      state.user = '';
      localStorage.removeItem('profile');
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
