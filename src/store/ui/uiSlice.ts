import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  drawerOpen: boolean;
  breadcrumb: string[];
  page: number;
  rowsPerPage: number;
  selected: string | null;
  expanded: string[];
  previousRouter: string | null;
};

const initialState: UIState = {
  drawerOpen: true,
  breadcrumb: [],
  page: 0,
  rowsPerPage: 5,
  selected: null,
  expanded: [],
  previousRouter: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDrawerOpen(state, action: PayloadAction<boolean>) {
      state.drawerOpen = action.payload;
    },
    setBreadcrumb(state, action: PayloadAction<string[]>) {
      state.breadcrumb = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setSelected(state, action: PayloadAction<string | null>) {
      state.selected = action.payload;
    },
    setExpanded(state, action: PayloadAction<string[]>) {
      state.expanded = action.payload;
    },
    setPreviousRouter(state, action: PayloadAction<string | null>) {
      state.previousRouter = action.payload;
    },
  },
});

export const {
  setDrawerOpen,
  setBreadcrumb,
  setPage,
  setRowsPerPage,
  setSelected,
  setExpanded,
  setPreviousRouter,
} = uiSlice.actions;

export default uiSlice.reducer;
