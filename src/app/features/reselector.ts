import { createSelector } from "reselect";
import { RootState } from "../store";

const selectFileBar = (state: RootState) => state.fileBarSlice;
const selectFileTree = (state: RootState) => state.fileTreeSlice;

export const selectFileBarData = createSelector(
  [selectFileBar],
  (fileBar) => ({
    openedFiles: fileBar.openedFiles,
    clickedFile: fileBar.clickedFile,
  })
);

export const selectSelectedId = createSelector(
  [selectFileTree],
  (fileTree) => fileTree.selectedId
);