import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: []
  },
  reducers: {
    setUsers: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
