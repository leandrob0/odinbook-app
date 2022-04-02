import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    value: localStorage.getItem('socket') || {},
  },
  reducers: {
    setSocket: (state, action) => {
      localStorage.setItem('socket', action.payload);
      state.value = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
