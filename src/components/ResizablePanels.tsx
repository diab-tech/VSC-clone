import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import RecursiveComponent from "./RecursiveComponent";
import OpenedFilesBar from "./OpenedFilesBar";
import { useState, useEffect, useRef } from "react";
import FilesPreview from "./FilesPreview";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { toggleOutlineVisibility } from "../app/features/outlineVisibilitySlice";
import { setReplaceTree } from "../app/features/fileTreeSlice";
import EllipsisMenu from "./EllipsisMenu";
import WelcomeTab from "./WelcomeTab";
import AppIcon from "./AppIcons";
import clsx from "clsx";
import MobileResizeHandler from "./MobileResizeHandler";
import TouchDragHandler from "./TouchDragHandler";
import OpenFilesSidePanel from "./OpenFilesSidePanel";
import FolderOpenHandler from "./FolderOpenHandler";

const ResizablePanels = () => {
  const dispatch = useDispatch();
  const { openedFiles } = useSelector((state: RootState) => state.fileBarSlice);
  const { tree } = useSelector((state: RootState) => state.fileTreeSlice);
  const isOutlineVisible = useSelector((state: RootState) => state.outlineVisibility.isVisible);
  const [panelSize, setPanelSize] = useState<number>(20); // الحجم الافتراضي 20%
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const panelGroupRef = useRef<HTMLDivElement>(null);
  
  // Detect mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Handle mobile drag
  const handleMobileDrag = (deltaX: number) => {
    if (!panelGroupRef.current) return;
    
    const containerWidth = panelGroupRef.current.clientWidth;
    const deltaPercent = (deltaX / containerWidth) * 100;
    
    // Calculate new size as percentage
    let newSize = panelSize + deltaPercent;
    
    // Clamp to reasonable values
    newSize = Math.max(10, Math.min(80, newSize));
    
    setPanelSize(newSize);
    setIsDragging(true);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <PanelGroup
      autoSaveId="example"
      direction="horizontal"
      className={`h-screen ${isDragging ? 'select-none' : ''}`}
      ref={panelGroupRef}
    >
      <Panel
        defaultSize={20}
        maxSize={50}
        onResize={(size) => setPanelSize(size)}
        className={`bg-[rgb(37,37,38)] text-white h-full overflow-y-auto ${panelSize <= 0.5 ? "" : "  border-r-4 border-[#1e1e1e] hover:border-blue-600"} relative`}
      >
        <div className="ellipsis flex items-center justify-between p-2.5">
          <div className="explorer text-[12px]">Explorer</div>
          <EllipsisMenu 
            onToggleOutline={() => dispatch(toggleOutlineVisibility())}
            isOutlineVisible={useSelector((state: RootState) => state.outlineVisibility.isVisible)}
          />
        </div>

        <div className="flex flex-col h-full">
          {/* Folder Open Button */}
          <div className="mb-2 px-2">
            <FolderOpenHandler 
              onFolderOpen={(folderStructure) => {
                dispatch(setReplaceTree(folderStructure));
              }}
              className="mb-2"
            />
          </div>
          
          {/* Open Files Side Panel */}
          <div className="mb-2">
            <OpenFilesSidePanel />
          </div>
          
          {/* Outline Panel */}
          {isOutlineVisible && (
            <div className="flex-grow overflow-y-auto whitespace-nowrap text-sm [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <RecursiveComponent fileTree={tree} isRoot />
              <div className="h-10"></div>
            </div>
          )}
        </div>
        
        {/* Mobile resize handlers */}
        {isMobile && (
          <>
            <MobileResizeHandler
              onResize={setPanelSize}
              initialSize={panelSize}
              minSize={10}
              maxSize={80}
            />
            <TouchDragHandler
              onDrag={handleMobileDrag}
              onDragEnd={handleDragEnd}
              className={`${isDragging ? 'bg-blue-500 bg-opacity-20' : ''}`}
            />
          </>
        )}
      </Panel>
      <PanelResizeHandle
        className={clsx(
          isMobile ? "hidden" : "hover:border-r-4 hover:cursor-col-resize hover:border-blue-600"
        )}
      />
      {openedFiles.length > 0 ? (
        <Panel
          className="h-full overflow-y-auto bg-[#1e1e1e]"
          suppressContentEditableWarning={true}
          defaultChecked
          suppressHydrationWarning
          spellCheck="false"
          autoSave="true"
          autoCorrect="true"
        >
          <OpenedFilesBar />
          <FilesPreview />
        </Panel>
      ) : (
        <Panel className="flex items-center justify-center h-full overflow-hidden bg-[#1e1e1e]">
          <WelcomeTab />
        </Panel>
      )}
    </PanelGroup>
  );
};

export default ResizablePanels;
