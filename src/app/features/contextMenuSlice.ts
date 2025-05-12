import { createSlice } from '@reduxjs/toolkit';

export interface IContextMenuState {
  isVisible: boolean;
  position: { x: number; y: number } | null;
  contextType: string | null;
  contextId: string | null;
}
const initialState = {
  isVisible: false,
  position: null,
  contextType: null,
  contextId: null,
};

export const contextMenuSlice = createSlice({
  name: 'contextMenu',
  initialState,
  reducers: {
    showMenu: (state, action) => {
      const { position, contextType, contextId } = action.payload;
      state.isVisible = true;
      state.position = position;
      state.contextType = contextType;
      state.contextId = contextId;
    },
    hideMenu: (state) => {
      state.isVisible = false;
      state.position = null;
      state.contextType = null;
      state.contextId = null;
    },
  },
});

export const { showMenu, hideMenu } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;
