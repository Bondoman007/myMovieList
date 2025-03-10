import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("user")) || false,
  },
  reducers: {
    loginReducer: (state, action) => {
      const userData = {
        uid: action.payload.uid,
        email: action.payload.email,
        displayName: action.payload.displayName,
      };
      state.user = userData;
      sessionStorage.setItem("user", JSON.stringify(userData)); // Store only serializable data
    },
    logoutReducer: (state) => {
      state.user = false;
      sessionStorage.removeItem("user");
    },
  },
});

export const { loginReducer, logoutReducer } = authSlice.actions;
export default authSlice.reducer;
