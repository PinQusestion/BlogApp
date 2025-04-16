import { createSlice } from "@reduxjs/toolkit";

// Modern: initialState named clearly and kept separately
const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logOut: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

// Export actions to use in components
export const { login, logOut } = authSlice.actions;

// Export the reducer to include in the store
export default authSlice.reducer;
