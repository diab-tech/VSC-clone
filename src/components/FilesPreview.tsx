import { useDispatch, useSelector } from "react-redux";
import { setEditFileContent } from "../app/features/fileTreeSlice";
import { Editor } from "@monaco-editor/react";
import { setOpenedFiles } from "../app/features/filesBarSlice";
import { useEffect } from "react";
import { selectFileBarData } from "../app/features/reselector";
import { useEditor } from "../context/useEditor";

const FilesPreview = () => {
  const dispatch = useDispatch();
  const { openedFiles, clickedFile } = useSelector(selectFileBarData);
  const selectedFile = openedFiles.find((f) => f.id === clickedFile.activeTab);
  const content = selectedFile?.content || "";
  const { editor, setEditor } = useEditor();

  useEffect(() => {
    const handleSaveFile = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        if (content !== null && clickedFile.activeTab) {
          e.preventDefault();
          dispatch(
            setEditFileContent({
              fileId: clickedFile.activeTab,
              newContent: content,
            })
          );
        }
      }
    };
    window.addEventListener("keydown", handleSaveFile);
    return () => {
      window.removeEventListener("keydown", handleSaveFile);
    };
  }, [content, clickedFile.activeTab, dispatch]);

  const handleContentChange = (value: string | undefined) => {
    if (value && clickedFile.activeTab) {
      const updatedOpenedFiles = openedFiles.map((file) => {
        if (file.id === clickedFile.activeTab) {
          return { ...file, content: value };
        }
        return file;
      });
      dispatch(setOpenedFiles(updatedOpenedFiles));
    }
  };

  useEffect(() => {
    console.log("FilesPreview: clickedFile:", clickedFile);
    console.log("FilesPreview: selectedFile:", selectedFile);
    console.log("FilesPreview: content:", content);
    console.log("FilesPreview: Editor:", editor);
  }, [clickedFile, selectedFile, content, editor]);

  return (
    <div className="flex-1 h-[calc(100vh-40px)] overflow-x-hidden bg-[#1E1E1E] pt-3">
      {clickedFile.activeTab && (
        <Editor
          onMount={(editorInstance) => {
            setEditor(editorInstance);
            console.log("FilesPreview: Editor mounted");
          }}
          height="100%"
          defaultLanguage="javascript"
          value={content}
          onChange={handleContentChange}
          theme="vs-dark"
          options={{
            fontSize: 20,
            fontFamily: "Fira Mono, Menlo, Monaco, 'Courier New', monospace",
            fontWeight: "normal",
          }}
        />
      )}
    </div>
  );
};

export default FilesPreview;