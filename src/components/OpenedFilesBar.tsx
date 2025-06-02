import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import OpenedFilesTaps from './OpenedFilesTab';
import { findFileById } from '../utils/functions';

const OpenedFilesBar = () => {
  
  const { openedFiles } = useSelector((state: RootState) => state.fileBarSlice);
  // Removed unused variable as part of build optimization
  const {/* activeTab */} = useSelector((state: RootState) => state.fileBarSlice.clickedFile);
  const {tree} = useSelector((state: RootState) => state.fileTreeSlice);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY;
    };

    scrollContainer.addEventListener('wheel', handleWheel);
    return () => scrollContainer.removeEventListener('wheel', handleWheel);
  }, []);

    // show unsaved mark on unsaved tab
  const isModified=(fileId: string)=>{
    const treeFile = findFileById(tree, fileId);
    const openFile = openedFiles.find((file)=>file.id === fileId);
    return treeFile && openFile && treeFile.content !== openFile.content;
  }

  return (
    <div className=" w-full">
      <div
        ref={scrollRef}
        className="flex bg-[#252526] h-10 overflow-x-auto whitespace-nowrap text-sm cursor-pointer [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {openedFiles.map((file) => (
          <OpenedFilesTaps file={file} key={file.id} isModified={isModified(file.id)} />
        ))}
      </div>
    </div>
  );
};

export default OpenedFilesBar;
