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

export const { setPosts, updatePost } = postSlice.actions;
export default postSlice.reducer;
