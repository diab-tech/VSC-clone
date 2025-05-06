import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IFile } from "../../interface";

export interface IInitialState {
  openedFiles: IFile[];
}

const initialState: IInitialState = {
  openedFiles: [],
};

export const fileTreeSlice = createSlice({
  name: "fileTreeSlice",
  initialState,
  reducers: {
    setOpenedFiles: (state, action: PayloadAction<IFile[]>) => {
      state.openedFiles = action.payload;
    },
  },
});

export const { setOpenedFiles } = fileTreeSlice.actions;

export default fileTreeSlice.reducer;
