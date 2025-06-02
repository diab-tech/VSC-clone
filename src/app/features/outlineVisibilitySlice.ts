// outlineSlice.ts - Redux slice for outline visibility
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OutlineState {
  isVisible: boolean;
}

const initialState: OutlineState = {
  isVisible: true
};

const outlineVisibilitySlice = createSlice({
  name: 'outlineVisibility',
  initialState,
  reducers: {
    toggleOutlineVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    setOutlineVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    }
  }
});

export const { toggleOutlineVisibility, setOutlineVisibility } = outlineVisibilitySlice.actions;
export default outlineVisibilitySlice.reducer;
