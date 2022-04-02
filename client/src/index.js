import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from './features/user';
import postReducer from './features/post';
import socketReducer from './features/socket';

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    socket: socketReducer,
  },
  middleware: () => getDefaultMiddleware({serializableCheck: false})
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
