import { createContext, ReactNode, useState, useEffect } from "react";
import * as monaco from "monaco-editor";

export interface EditorContextType {
  editor: monaco.editor.IStandaloneCodeEditor | null;
  setEditor: (editor: monaco.editor.IStandaloneCodeEditor | null) => void;
}

const defaultValue: EditorContextType = {
  editor: null,
  setEditor: () => {}
};

export const EditorContext = createContext<EditorContextType>(defaultValue);

interface EditorProviderProps {
  children: ReactNode;
  value?: {
    editor: monaco.editor.IStandaloneCodeEditor | null;
  };
}

export const EditorProvider = ({ children, value }: EditorProviderProps) => {
  const [editor, setEditorState] = useState<monaco.editor.IStandaloneCodeEditor | null>(
    value?.editor || null
  );

  useEffect(() => {
    if (value?.editor !== undefined) {
      setEditorState(value.editor);
    }
  }, [value?.editor]);

  const setEditor = (newEditor: monaco.editor.IStandaloneCodeEditor | null) => {
    console.log("EditorContext: Setting editor", newEditor ? "(available)" : "(null)");
    setEditorState(newEditor);
  };

  return (
    <EditorContext.Provider value={{ editor, setEditor }}>
      {children}
    </EditorContext.Provider>
  );
};