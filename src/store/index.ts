import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import uiReducer from "./ui/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem(
    "app_auth_v1",
    JSON.stringify({
      token: state.auth.token,
      user: state.auth.user,
    })
  );

  localStorage.setItem(
    "ui_v1",
    JSON.stringify({
      mode: state.ui.mode,
    })
  );
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
