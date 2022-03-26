import { createSlice } from '@reduxjs/toolkit';

const state = JSON.parse(localStorage.getItem('user')) || {
  id: '',
  first_name: '',
  last_name: '',
  profile_pic: '',
  friends: [],
  friendRequests: [],
};

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
      localStorage.clear();
      state.value = {
        id: '',
        first_name: '',
        last_name: '',
        profile_pic: '',
        friends: [],
        friendRequests: [],
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
