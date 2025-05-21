// app/features/editorSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as monaco from "monaco-editor";

interface EditorState {
  editorInstance: monaco.editor.IStandaloneCodeEditor | null;
}

const initialState: EditorState = {
  editorInstance: null,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditorInstance: (state, action: PayloadAction<monaco.editor.IStandaloneCodeEditor>) => {
      state.editorInstance = action.payload;
    },
  },
});

export const { setEditorInstance } = editorSlice.actions;
export default editorSlice.reducer;
