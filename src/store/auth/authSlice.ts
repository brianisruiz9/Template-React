import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthUser } from "../../types/user";

const STORAGE_KEY = "app_auth_v1";

function loadAuth(): Pick<AuthState, "user" | "token"> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, token: null };
    const parsed = JSON.parse(raw) as { user: AuthUser; token: string };
    return {
      user: parsed.user ?? null,
      token: parsed.token ?? null,
    };
  } catch {
    return { user: null, token: null };
  }
}

const initialState: AuthState = loadAuth();

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

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          user: state.user,
          token: state.token,
        })
      );
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
