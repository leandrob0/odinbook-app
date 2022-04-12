import { createSlice } from '@reduxjs/toolkit';

const state = JSON.parse(localStorage.getItem('notifications')) || [];

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    value: state,
  },
  reducers: {
    setNotifications: (state, action) => {
      state.value = action.payload;
      localStorage.setItem('notifications', JSON.stringify(state.value));
    },
    deleteNotification: (state, action) => {
      const curNotif = state.value;
      const updatedAr = curNotif.filter(
        (noti) => noti._id !== action.payload.id
      );
      state.value = updatedAr;
      localStorage.setItem('notifications', JSON.stringify(updatedAr));
    },
  },
});

export const { setNotifications , deleteNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
