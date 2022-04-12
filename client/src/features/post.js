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
        ? curPosts.unshift(action.payload)
        : [action.payload];
      state.value = updatedAr;
    },
    updatePost: (state, action) => {
      const curPosts = state.value;
      for (let i = 0; i < curPosts; i++) {
        if (action.payload.post._id === curPosts[i]._id) {
          curPosts[i] = action.payload.post;
        }
      }
      state.value = curPosts;
    },
  },
});

export const { setPosts, addPost, updatePost } = postSlice.actions;
export default postSlice.reducer;
