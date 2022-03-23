import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    value: { posts: [] },
  },
  reducers: {
    setPosts: (state, action) => {
      state.value = { posts: action.payload};
    },
    addPost: (state, action) => {
      const curPosts = state.value ? state.value.posts : null;
      const updatedAr = curPosts
        ? curPosts.concat(action.payload)
        : action.payload;
      state.value = {posts: updatedAr};
    },
  },
});

export const { setPosts, addPost } = postSlice.actions;
export default postSlice.reducer;
