import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClickedFile, setOpenedFiles } from "../app/features/filesBarSlice";
import { AppDispatch, RootState } from "../app/store";
import { IFile } from "../interface";
import { doesFileExists } from "../utils/functions";
import FileIcon from "./FileIcon";
import AppIcon from "./AppIcons";
import {
  setSelectedItem,
  clearSelectedId,
  setMoveItem
} from "../app/features/fileTreeSlice";
import clsx from "clsx";
import {
  selectFileBarData,
  selectSelectedId,
} from "../app/features/reselector";
import OutlineDropdown from "./OutlineDropdown";
import ContextMenu from "./ContextMenu";
import FileOperationsModal from "./FileOperationsModal";
import DragDropHandler from "./DragDropHandler";
interface IProps {
  fileTree: IFile;
  isRoot?: boolean;
  selectedTab?: string | null;
}

  /**
   * A recursive component that renders a file tree.
   * @param {{ fileTree: IFile, isRoot?: boolean, selectedTab?: string | null }} props
   * @param {IFile} props.fileTree The file tree to render.
   * @param {boolean} [props.isRoot=false] Whether the component is the root of the file tree.
   * @param {string | null} [props.selectedTab=null] The currently selected tab.
   * @returns {JSX.Element} The rendered file tree.
   */
const RecursiveComponent = ({
  fileTree,
  isRoot = false,
  selectedTab,
}: IProps) => {
  const { id, name, content, isFolder, children } = fileTree;
  const [isOpen, setIsOpen] = useState(true);
  const [manuallyClosed, setManuallyClosed] = useState(false);
  const [contextMenu, setContextMenu] = useState<{x: number, y: number} | null>(null);
  const [fileOperation, setFileOperation] = useState<{
    type: 'new-file' | 'new-folder' | 'rename' | 'delete';
    parentId: string;
    itemId?: string;
    itemName?: string;
    isFolder?: boolean;
  } | null>(null);
  
  const dispatch = useDispatch<AppDispatch>();

  const { openedFiles, clickedFile } = useSelector(selectFileBarData);
  const selectedId = useSelector(selectSelectedId);

  const isFileInFolder = useCallback(
    /**
     * Checks if a file is in a folder.
     * @param {IFile} folder The folder to check.
     * @param {string | null} fileId The ID of the file to check.
     * @returns {boolean} Whether the file is in the folder.
     */
    (folder: IFile, fileId: string | null): boolean => {
      if (!folder.isFolder || !folder.children) return false;
      return folder.children.some((child) => {
        if (child.id === fileId) return true;
        return isFileInFolder(child, fileId);
      });
    },
    []
  );

  // __HANDLERS__
  const onFileClicked = () => {
    const exists = doesFileExists(openedFiles, id);

    dispatch(
      setClickedFile({
        fileContent: content,
        fileName: name,
        activeTab: id,
        tabHistory: [...clickedFile.tabHistory, id].filter(
          (tabId, index, self) => self.lastIndexOf(tabId) === index
        ),
      })
    );
    dispatch(setSelectedItem(id));
    
    if (exists) return;
    dispatch(setOpenedFiles([...openedFiles, fileTree]));
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setSelectedItem(id));
    
    if (fileTree.isFolder) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      setManuallyClosed(!newIsOpen);
    } else {
      onFileClicked();
    }
  };
  
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setSelectedItem(id));
    setContextMenu({ x: e.clientX, y: e.clientY });
  };
  
  const closeContextMenu = () => {
    setContextMenu(null);
  };
  
  const handleNewFile = () => {
    setFileOperation({
      type: 'new-file',
      parentId: id,
    });
    closeContextMenu();
  };
  
  const handleNewFolder = () => {
    setFileOperation({
      type: 'new-folder',
      parentId: id,
    });
    closeContextMenu();
  };
  
  const handleDelete = () => {
    setFileOperation({
      type: 'delete',
      parentId: isFolder ? '' : id,
      itemId: id,
      itemName: name,
      isFolder: isFolder
    });
    closeContextMenu();
  };
  
  const handleRename = () => {
    setFileOperation({
      type: 'rename',
      parentId: '',
      itemId: id,
      itemName: name,
      isFolder: isFolder
    });
    closeContextMenu();
  };
  
  const closeFileOperation = () => {
    setFileOperation(null);
  };
  // فتح المجلد الأب لو الملف اللي اتفتح موجود جواه
  useEffect(() => {
    if (
      isFolder &&
      selectedTab &&
      selectedTab !== id &&
      isOpen === false &&
      !manuallyClosed
    ) {
      if (isFileInFolder(fileTree, selectedTab)) {
        setIsOpen(true);
      }
    }
  }, [
    selectedTab,
    isFolder,
    id,
    isOpen,
    children,
    manuallyClosed,
    fileTree,
    isFileInFolder,
  ]);
  useEffect(() => {
    setManuallyClosed(false);

  }, [selectedTab]);
  // remove selectedId when click outside
  useEffect(() => {
    const delSelectedId = () => dispatch(clearSelectedId());
    window.addEventListener("click", delSelectedId);
    return () => {
      window.removeEventListener("click", delSelectedId);
    };
  }, [dispatch]);

  // Handle file/folder move via drag and drop
  const handleMoveFile = (sourceId: string, targetId: string) => {
    // Don't allow moving a folder into itself or its descendants
    if (isFolder && (sourceId === id || isDescendant(fileTree, sourceId, id))) {
      return;
    }
    
    dispatch(setMoveItem({
      sourceId,
      targetId
    }));
  };

  return (
    <DragDropHandler
      fileId={id}
      isFolder={isFolder}
      onMoveFile={handleMoveFile}
    >
      <div
        className={clsx( 
          selectedTab === id && selectedTab !== selectedId 
          ? "bg-gray-600"
          : ""
        )}
      >
        <div
          className={clsx(
            selectedId === id
          ? fileTree.isFolder 
            ? "border-1 border-blue-500 bg-[oklch(65.19%_0.204_253.14_/_0.3)]" // Apply blue background for selected folders
            : selectedTab === selectedId
              ? "border-1 border-blue-500 bg-[oklch(65.19%_0.204_253.14_/_0.3)]" // Apply blue background for selected files
              : selectedTab === id
                ? "" 
                : "border-1 border-transparent border-r-0 bg-gray-600" 
          : "border-1 border-transparent border-r-0",
            "flex items-center cursor-pointer ",
            {
              "ml-0.5 mt-0.5 font-bold text-[13px] uppercase ": isRoot,
              "hover:bg-gray-700 transition duration-100":
                selectedTab !== id && selectedId !== id && !isRoot ,
            }
          )}
          onClick={handleClick}
          onContextMenu={handleContextMenu}
        >
          {fileTree.isFolder ? (
            isOpen ? (
              <AppIcon iconName="chevronDown" />
            ) : (
              <AppIcon iconName="chevronRight" />
            )
          ) : (
            <span className="pl-[10px] "></span>
          )}

          {!isRoot && (
            <>
              <FileIcon
                fileName={fileTree.name}
                isFolder={fileTree.isFolder}
                isOpened={isOpen}
              />
            </>
          )}
          <span className={`pl-1.5 block`}>{fileTree.name}</span>
        </div>
        {fileTree.isFolder === true && isOpen && fileTree.children && (
          <>
          <div className="ml-2 border-l border-gray-600 ">
            {fileTree.children.map((file) => (
              <RecursiveComponent
                fileTree={file}
                key={file.id}
                selectedTab={clickedFile.activeTab}
              />
            ))}
          </div>
          </>
        )}
        
        {/* Add OutlineDropdown for non-folder items */}
        <OutlineDropdown 
          fileId={id}
          fileName={name}
          isFolder={isFolder}
        />
        
        {/* Context Menu */}
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            fileId={id}
            isFolder={isFolder}
            onNewFile={handleNewFile}
            onNewFolder={handleNewFolder}
            onDelete={handleDelete}
            onRename={handleRename}
          />
        )}
        
        {/* File Operations Modal */}
        {fileOperation && (
          <FileOperationsModal
            type={fileOperation.type}
            parentId={fileOperation.parentId}
            itemId={fileOperation.itemId}
            itemName={fileOperation.itemName}
            isFolder={fileOperation.isFolder}
            onClose={closeFileOperation}
          />
        )}
      </div>
    </DragDropHandler>
  );
};

export default RecursiveComponent;
