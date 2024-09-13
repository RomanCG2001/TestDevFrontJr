import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Estado inicial
const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

// Obtener usuarios
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response =  await fetch ('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
});

// Crea el slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
