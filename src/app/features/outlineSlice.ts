// outlineSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OutlineState {
  isVisible: boolean;
  expandedFiles: string[]; // IDs of files with expanded outline
}

const initialState: OutlineState = {
  isVisible: true,
  expandedFiles: [],
};

export const outlineSlice = createSlice({
  name: 'outline',
  initialState,
  reducers: {
    toggleOutlineVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    setOutlineVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
    toggleFileOutlineExpanded: (state, action: PayloadAction<string>) => {
      const fileId = action.payload;
      const index = state.expandedFiles.indexOf(fileId);
      
      if (index > -1) {
        // File is already expanded, remove it
        state.expandedFiles.splice(index, 1);
      } else {
        // File is not expanded, add it
        state.expandedFiles.push(fileId);
      }
    },
    setFileOutlineExpanded: (state, action: PayloadAction<{fileId: string, expanded: boolean}>) => {
      const { fileId, expanded } = action.payload;
      const index = state.expandedFiles.indexOf(fileId);
      
      if (expanded && index === -1) {
        // Add to expanded files
        state.expandedFiles.push(fileId);
      } else if (!expanded && index > -1) {
        // Remove from expanded files
        state.expandedFiles.splice(index, 1);
      }
    }
  },
});

export const { 
  toggleOutlineVisibility, 
  setOutlineVisibility,
  toggleFileOutlineExpanded,
  setFileOutlineExpanded
} = outlineSlice.actions;

export default outlineSlice.reducer;
