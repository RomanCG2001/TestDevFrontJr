// src/redux/todosSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: []
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    }
  }
});

export const { setTodos } = todosSlice.actions;

export default todosSlice.reducer;
