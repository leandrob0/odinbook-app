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
        state.value ? state.value : null;
      const updatedAr = curNotif.lenght > 0
        ? curNotif.concat({
            ...action.payload,
            id: curNotif[curNotif.length - 1].id + 1,
          })
        : [{ ...action.payload, id: 0 }];
      state.value = updatedAr;
      localStorage.setItem('notifications', JSON.stringify(updatedAr));
    },
    deleteNotification: (state, action) => {
      const curNotif = state.value;
      const updatedAr = curNotif.filter(
        (noti) => noti.id !== action.payload.id
      );
      state.value = updatedAr;
      localStorage.setItem('notifications', JSON.stringify(updatedAr));
    },
  },
});

export const { addNotification , deleteNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
