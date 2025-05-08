import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import OpenedFilesTaps from './OpenedFilesTab';
import FileSyntaxHighlighter from './SyntaxHighlighter';

const OpenedFilesBar = () => {
  const { openedFiles, clickedFile } = useSelector((state: RootState) => state.fileTreeSlice);

  return (
    <div className=" flex flex-col w-full  bg-gray-200 ">
      <div className=" flex bg-[#252526] h-10 overflow-x-auto whitespace-nowrap scrollbar-none text-sm cursor-pointer">
        {openedFiles.map((file) => (
          <OpenedFilesTaps file={file} key={file.id} />
        ))}
      </div>
      <div className="max-h-[100vh] scroll-auto overflow-y-auto">
        <FileSyntaxHighlighter content={clickedFile.fileContent} />
      </div>
    </div>
  );
};

export default OpenedFilesBar;
