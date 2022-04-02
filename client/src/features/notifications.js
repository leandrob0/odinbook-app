import { createSlice } from '@reduxjs/toolkit';

const state = JSON.parse(localStorage.getItem('notifications')) || [];

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    value: state,
  },
  reducers: {
    addNotification: (state, action) => {
      const curNotif =
        state.value.notification.length === 0 ? state.value.notification : null;
      const updatedAr = curNotif
        ? curNotif.concat({
            ...action.payload,
            id: curNotif[curNotif.length - 1].id + 1,
          })
        : { ...action.payload, id: 0 };
      state.value = updatedAr;
    },
    deleteNotification: (state, action) => {
      const curNotif = state.value.notification;
      const updatedAr = curNotif.filter(
        (noti) => noti.id !== action.payload.id
      );
      state.value = updatedAr;
    },
  },
});

export const { addNotification , deleteNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
