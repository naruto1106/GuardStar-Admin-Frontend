import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    auth: false,
    userInfo: {},
    authentication : false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload.auth;
      state.userInfo = action.payload.userInfo;
      state.authentication = action.payload.authentication
    },
  }
});

export const { setAuth } = AuthSlice.actions;

export const getAuth = (state) => state.auth.auth;
export const getUserInfo = (state) => state.auth.userInfo;
export const getAuthentication = (state) => state.auth.authentication;

export default AuthSlice.reducer;