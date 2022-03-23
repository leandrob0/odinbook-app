import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    value: { posts: [] },
  },
  reducers: {
    setPosts: (state, action) => {
      state.value = action.payload;
    },
    addPost: (state, action) => {
      state.value.posts = state.value.posts.concat(action.payload);
    },
  },
});

export const { setPosts, addPost } = postSlice.actions;
export default postSlice.reducer;
