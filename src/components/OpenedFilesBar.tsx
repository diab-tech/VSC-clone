import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import OpenedFilesTaps from './OpenedFilesTab';
import { useEffect, useRef } from 'react';

const OpenedFilesBar = () => {
  const { openedFiles } = useSelector((state: RootState) => state.fileTreeSlice);
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

  return (
    <div className=" w-full">
      <div
        ref={scrollRef}
        className="flex bg-[#252526] h-10 overflow-x-auto whitespace-nowrap text-sm cursor-pointer [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {openedFiles.map((file) => (
          <OpenedFilesTaps file={file} key={file.id} />
        ))}
      </div>
    </div>
  );
};

export default OpenedFilesBar;
