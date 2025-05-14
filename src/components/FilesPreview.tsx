import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setEditFileContent } from "../app/features/fileTreeSlice";
import { Editor } from "@monaco-editor/react";
import { setOpenedFiles } from "../app/features/filesBarSlice";
import { useEffect } from "react";

const FilesPreview = () => {
  const dispatch = useDispatch();
  const openedFiles = useSelector(
    (state: RootState) => state.fileBarSlice.openedFiles
  );
  const {activeTab} = useSelector(
    (state: RootState) => state.fileBarSlice.clickedFile
  );
  const selectedFile = openedFiles.find(f => f.id === activeTab);
  const content = selectedFile?.content || "";
  
  // Save File
  useEffect(()=>{
    const handleSaveFile=(e:KeyboardEvent)=>{
      if((e.ctrlKey || e.metaKey) && e.key === 's'){
        if(content !== null && activeTab){
          e.preventDefault();
          dispatch(setEditFileContent({fileId:activeTab,newContent:content}))
        }
      }
    }
    window.addEventListener('keydown',handleSaveFile);
    return()=>{
      window.removeEventListener('keydown',handleSaveFile);
    }
  },[content,activeTab,dispatch])


  const handleContentChange = (value: string | undefined) => {
    if (value && activeTab) {
      // Update the openedFiles array with the new content
      const updatedOpenedFiles = openedFiles.map(file => {
        if (file.id === activeTab) {
          return { ...file, content: value };
        }
        return file;
      });
      
      dispatch(setOpenedFiles(updatedOpenedFiles));
    }
  }

  return (
    <>

      <div className="flex-1 h-[calc(100vh-40px)] overflow-x-hidden bg-[#1E1E1E] pt-3">
        {activeTab && (
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={content}
            onChange={handleContentChange}
            theme="vs-dark"
            options={{
              fontSize: 20, // Change to your preferred size
              fontFamily: "Fira Mono, Menlo, Monaco, 'Courier New', monospace", // Change to your preferred font
              fontWeight: "normal", // or "normal"
              // You can add more Monaco options here
            }}
          />
        ) }
      </div>
    </>
  );
};

export default FilesPreview;
