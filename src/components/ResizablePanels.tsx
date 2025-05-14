import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import RecursiveComponent from './RecursiveComponent';
// import { fileTree } from '../data/fileTree';
import OpenedFilesBar from './OpenedFilesBar';
import { useState } from 'react';
import FilesPreview from './FilesPreview';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import WelcomeTab from './WelcomeTab';

interface IProps {}

const ResizablePanels = ({}: IProps) => {
  const { openedFiles } = useSelector((state: RootState) => state.fileBarSlice);
  const { tree } = useSelector((state: RootState) => state.fileTreeSlice);

  const [panelSize, setPanelSize] = useState<number>(20); // الحجم الافتراضي 20%

  return (
    <PanelGroup autoSaveId="example" direction="horizontal" className="h-screen">
      <Panel
        defaultSize={20}
        maxSize={50}
        onResize={(size) => setPanelSize(size)}
        className={`bg-[#252526] text-white h-full overflow-y-auto ${
          panelSize <= 0.5 ? '' : 'border-r-2 border-gray-700 hover:border-blue-600'
        }`}
      >
        <div className="h-full overflow-y-auto whitespace-nowrap text-sm cursor-pointer [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <RecursiveComponent fileTree={tree} isRoot />
          <div className="h-10"></div>
        </div>
      </Panel>
      <PanelResizeHandle />
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
