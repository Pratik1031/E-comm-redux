import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    address: '',
  },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setUserName, setUserAddress } = userSlice.actions;
export const selectUserName = (state) => state.user.name;
export const selectUserAddress = (state) => state.user.address;
export default userSlice.reducer;
