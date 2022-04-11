import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from './features/user';
import postReducer from './features/post';
import notifReducer from './features/notifications';

// TODO
// ADD MAX HEIGHT AND OVERFLOW SCROLL TO NOTIFICATIONS AND COMMENTS TO NOT MAKE IT INFINITE OR TOO LONG.
// ADD FRAMER MOTION ANIMATIONS TO SOME OPEN ON CLICK FUNCTIONALITIES LIKE COMMENTS AND NOTIFICATIONS.
// STYLE AND ADD NAVIGATION TO FRIENDS IN USER PROFILE.
// ADD THE USER SETTINGS TO CHANGE USER IMAGE.
// MAYBE SOME TIME ADD DELETE FUNCTIONALITIES FOR POSTS AND COMMENTS (IDK IF I WILL IMPLEMENT THIS.)

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    notification: notifReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
