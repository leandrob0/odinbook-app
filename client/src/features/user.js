import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: { first_name: '', last_name: '', profile_pic: '', token: '' },
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      //localStorage.removeItem('user');
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