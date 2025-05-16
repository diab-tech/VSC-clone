import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import RecursiveComponent from "./RecursiveComponent";
import OpenedFilesBar from "./OpenedFilesBar";
import { useState } from "react";
import FilesPreview from "./FilesPreview";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import WelcomeTab from "./WelcomeTab";
import AppIcon from "./AppIcons";
import clsx from "clsx";

const ResizablePanels = () => {
  const { openedFiles } = useSelector((state: RootState) => state.fileBarSlice);
  const { tree } = useSelector((state: RootState) => state.fileTreeSlice);
  console.log("Rendering FileExplorer with tree:", tree); // عشان تتأكد
  const [panelSize, setPanelSize] = useState<number>(20); // الحجم الافتراضي 20%

  return (
    <PanelGroup
      autoSaveId="example"
      direction="horizontal"
      className="h-screen"
    >
      <Panel
        defaultSize={20}
        maxSize={50}
        onResize={(size) => setPanelSize(size)}
        className={`bg-[rgb(37,37,38)] text-white h-full overflow-y-auto ${panelSize <= 0.5 ? "" : "  border-r-4 border-[#1e1e1e] hover:border-blue-600"}`}
      >
        <div className="ellipsis flex items-center justify-between p-2.5">
          <div className="explorer text-[12px]">Explorer</div>
          <AppIcon
            iconName="ellipsis"
            className={clsx(
              "w-6 h-5 hover:cursor-pointer hover:bg-[rgb(75,75,75)] transition duration-100 rounded-md"
            )}
          />
        </div>

        <div className="h-full overflow-y-auto whitespace-nowrap text-sm  [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <RecursiveComponent fileTree={tree} isRoot />
          <div className="h-10"></div>
        </div>
      </Panel>
      <PanelResizeHandle
        className={clsx(
          // "hover:border-r-4 hover:cursor-col-resize hover:border-blue-600"
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
