import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Lang } from "../../i18n/detectLanguage";
import { detectDefaultLanguage } from "../../i18n/detectLanguage";

const persistedUI = JSON.parse(localStorage.getItem("ui_v1") ?? "null") as {
  mode?: string;
  drawerOpen?: boolean;
  lang?: Lang;
} | null;

const initialState = {
  drawerOpen: persistedUI?.drawerOpen ?? false,
  breadcrumb: [],
  mode: persistedUI?.mode ?? "light",
  lang: persistedUI?.lang ?? detectDefaultLanguage(),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDrawerOpen(state, action: PayloadAction<boolean>) {
      state.drawerOpen = action.payload;
    },
    setMode(state, action: PayloadAction<string>) {
      state.mode = action.payload;
    },
    setLanguage(state, action: PayloadAction<Lang>) {
      state.lang = action.payload;
      localStorage.setItem("lang", state.lang);
    },
    toggleLanguage(state) {
      state.lang = state.lang === "es" ? "en" : "es";
      localStorage.setItem("lang", state.lang);
    },
  },
});

export const { setDrawerOpen, setMode, setLanguage, toggleLanguage } =
  uiSlice.actions;

export default uiSlice.reducer;
