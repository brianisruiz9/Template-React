import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "../../types/user";

const STORAGE_KEY = "app_auth_v1";

const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as {
  token: string | null;
  user: AuthUser | null;
} | null;

const initialState = {
  token: persisted?.token ?? null,
  user: persisted?.user ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
