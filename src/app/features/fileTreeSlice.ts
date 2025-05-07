import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IFile } from '../../interface';

export interface IInitialState {
  activeTab: string | null;
  openedFiles: IFile[];
  clickedFile: IClickedFile;
}
export interface IClickedFile {
  fileName: string;
  fileContent: string | undefined;
}

const initialState: IInitialState = {
  activeTab: null,
  openedFiles: [],
  clickedFile: {
    fileName: '',
    fileContent: '',
  },
};

export const fileTreeSlice = createSlice({
  name: 'fileTreeSlice',
  initialState,
  reducers: {
    setOpenedFiles: (state, action: PayloadAction<IFile[]>) => {
      state.openedFiles = action.payload;
    },
    setClickedFile: (state, action: PayloadAction<IClickedFile>) => {
      state.clickedFile = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setOpenedFiles, setClickedFile, setActiveTab } = fileTreeSlice.actions;

export default fileTreeSlice.reducer;
