import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    value: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.value = action.payload;
    },
    addPost: (state, action) => {
      const curPosts = state.value ? state.value : null;
      const updatedAr = curPosts
        ? curPosts.concat(action.payload)
        : [action.payload];
      state.value = updatedAr;
    },
  },
});

export const { setPosts, addPost } = postSlice.actions;
export default postSlice.reducer;
