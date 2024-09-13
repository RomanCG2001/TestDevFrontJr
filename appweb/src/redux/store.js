// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postsReducer from './postsSlice';
import todosReducer from './todosSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postsReducer,
    todos: todosReducer
  }
});
