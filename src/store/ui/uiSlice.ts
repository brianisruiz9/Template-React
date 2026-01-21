import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const persistedUI = JSON.parse(localStorage.getItem("ui_v1") ?? "null") as {
  mode?: string;
  drawerOpen?: boolean;
} | null;

const initialState = {
  drawerOpen: persistedUI?.drawerOpen ?? false,
  breadcrumb: [],
  mode: persistedUI?.mode ?? "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDrawerOpen(state, action: PayloadAction<boolean>) {
      state.drawerOpen = action.payload;
    },
    /* setBreadcrumb(state, action: PayloadAction<string[]>) {
      state.breadcrumb = action.payload;
    }, */
    setMode(state, action: PayloadAction<string>) {
      state.mode = action.payload;
    },
  },
});

export const { setDrawerOpen, setMode } = uiSlice.actions;

export default uiSlice.reducer;
