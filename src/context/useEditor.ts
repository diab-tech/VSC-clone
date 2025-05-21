import { useContext } from "react";
import { EditorContext, EditorContextType } from "./EditorContext";

export const useEditor = (): EditorContextType => useContext(EditorContext);
