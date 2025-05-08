import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IFile } from '../../interface';

export interface IInitialState {
  openedFiles: IFile[];
  clickedFile: IClickedFile;
}

export interface IClickedFile {
  activeTab: string | null;
  fileName: string;
  fileContent: string | undefined;
}

const initialState: IInitialState = {
  openedFiles: [],
  clickedFile: {
    activeTab: null,
    fileName: '',
    fileContent: undefined,
  },
};

export const fileTreeSlice = createSlice({
  name: 'fileTreeSlice',
  initialState,
  reducers: {
    setOpenedFiles: (state, action: PayloadAction<IFile[]>) => {
      state.openedFiles = action.payload;
    },
    setClosedFiles: (state, action: PayloadAction<string[]>) => {
      const idsToClose = action.payload;
      state.openedFiles = state.openedFiles.filter((file) => !idsToClose.includes(file.id));
    },
    setClickedFile: (state, action: PayloadAction<IClickedFile>) => {
      state.clickedFile = action.payload;
    },
  },
});

export const { setOpenedFiles, setClickedFile, setClosedFiles } = fileTreeSlice.actions;

export default fileTreeSlice.reducer;
