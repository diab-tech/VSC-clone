import ReactDOM from "react-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IFile } from "../interface";
import { RootState, store, AppDispatch } from "../app/store";
import {
  setClosedFiles,
  setCloseToTheRight,
} from "../app/features/filesBarSlice";
import { showMenu, hideMenu } from "../app/features/contextMenuSlice";
import AppIcon from "./AppIcons";
import FileIcon from "./FileIcon";
import ContextMenu from "../Ui/ContextMenu";

interface IProps {
  file: IFile;
  isModified?: boolean;
}

const OpenedFilesTaps = ({ file, isModified }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    clickedFile,
    clickedFile: { activeTab },
    openedFiles,
  } = useSelector((state: RootState) => state.fileBarSlice);

  const { contextId, contextType, isVisible, position } = useSelector(
    (state: RootState) => state.contextMenuSlice
  );

  // Log file information when clickedFile changes
  useEffect(() => {
    console.log("File content:", clickedFile.fileContent);
    console.log("File name:", clickedFile.fileName);
    console.log("Active tab:", clickedFile.activeTab);
  }, [clickedFile]);

  // We no longer need to update clickedFile after openedFiles changes
  // The Redux reducer (setCloseToTheRight, setClosedFiles) now handles this logic
  // This prevents duplicate dispatches of setClickedFile

  // For reference, this was the previous implementation:
  /*
  useEffect(() => {
    const currentActiveTabExists = openedFiles.some(
      (file) => file.id === clickedFile.activeTab
    );

    if (!currentActiveTabExists && openedFiles.length > 0) {
      const lastActiveFile = openedFiles[openedFiles.length - 1];
      dispatch({
        type: 'fileBarSlice/setClickedFile',
        payload: {
          activeTab: lastActiveFile.id,
          fileName: lastActiveFile.name,
          fileContent: lastActiveFile.content,
        },
      });
    } else if (openedFiles.length === 0) {
      dispatch({
        type: 'fileBarSlice/setClickedFile',
        payload: {
          activeTab: null,
          fileName: '',
          fileContent: undefined,
        },
      });
    }
  }, [openedFiles, dispatch, clickedFile.activeTab]);
  */

  // File click handler
  const fileHandler = () => {
    // Check if the file still exists in the current Redux state (not in component state)
    // This prevents trying to activate tabs that have been closed
    const currentOpenedFiles = store.getState().fileBarSlice.openedFiles;
    const currentState = store.getState().fileBarSlice;
    const fileExists = currentOpenedFiles.some((f: IFile) => f.id === file.id);

    if (fileExists) {
      // Get current tabHistory
      const currentTabHistory = [...currentState.clickedFile.tabHistory];

      // Add the new tab ID and filter to keep only the last occurrence of each ID
      const updatedTabHistory = [...currentTabHistory, file.id].filter(
        (id, index, self) => self.lastIndexOf(id) === index
      );

      dispatch({
        type: "fileBarSlice/setClickedFile",
        payload: {
          fileContent: file.content,
          fileName: file.name,
          activeTab: file.id,
          // Include the updated tabHistory in the payload
          tabHistory: updatedTabHistory,
        },
      });
    } else {
      console.log(`Tab ${file.id} no longer exists and cannot be activated`);
    }
  };

  // Close tab handler
  const closeTabHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setClosedFiles(file.id));
  };

  // Context menu handler
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(
      showMenu({
        position: { x: e.clientX, y: e.clientY },
        contextType: "TAB",
        contextId: file.id,
      })
    );
  };

  const handleCloseToTheRight = () => {
    if (contextId) {
      const index = openedFiles.findIndex(
        (file: IFile) => file.id === contextId
      );
      if (index !== -1) {
        dispatch(setCloseToTheRight(contextId));
      }
    }
    dispatch(hideMenu());
  };

  return (
<div
  className={`tab flex items-center justify-center space-x-1 px-2 cursor-pointer group last:border-r-gray-700 first:border-l-0 ${
    activeTab === file.id
      ? "active border text-white bg-[#1D1F21] border-l-gray-600 border-b-transparent border-r-gray-600 border-t-blue-800 first:border-l-0"
      : "text-[#808080] border border-t-transparent border-l border-b border-gray-600 first:border-l-0"
  } ${isModified ? "unsaved" : "saved"}`}
  onClick={fileHandler}
  onContextMenu={handleContextMenu}
>
  <div className="w-2"></div>
  <FileIcon fileName={file.name} isFolder={file.isFolder} />
  <span>{file.name}</span>
  <div className="tab-status-container">
    {isModified && (
      <div
        className={`unsaved-dot ${
          activeTab === file.id ? "unsaved-dot-active" : "unsaved-dot-inactive"
        }`}
      ></div>
    )}
    <div
      onClick={closeTabHandler}
      className="tab-close-btn"
    >
      <AppIcon iconName="close" />
    </div>
  </div>
  {isVisible &&
    position &&
    ReactDOM.createPortal(
      <ContextMenu
        position={position}
        contextType={contextType}
        contextId={contextId}
        onCloseToTheRight={handleCloseToTheRight}
      />,
      document.body
    )}
</div>  );
};

export default OpenedFilesTaps;
