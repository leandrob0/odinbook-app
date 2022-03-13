import { createSlice } from '@reduxjs/toolkit';

const state = JSON.parse(localStorage.getItem('user')) || { first_name: '', last_name: '', profile_pic: '', token: '' };

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: state,
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.value = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('user');
      state.value = {
        first_name: '',
        last_name: '',
        profile_pic: '',
        token: '',
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;