import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import OpenedFilesTaps from './OpenedFilesTab';
<<<<<<< HEAD
=======
import FileSyntaxHighlighter from './SyntaxHighlighter';
>>>>>>> cceab709ebe8722bd31e978dc552656dcbb832e2

const OpenedFilesBar = () => {
  const { openedFiles, clickedFile } = useSelector((state: RootState) => state.fileTreeSlice);

  return (
<<<<<<< HEAD
    <div className=" flex flex-col w-full  bg-gray-200">
      <div className="flex w-full bg-[#252526] gap- h-10">
=======
    <div className=" flex flex-col w-full  bg-gray-200 ">
      <div className=" flex bg-[#252526] h-10 overflow-x-auto whitespace-nowrap scrollbar-none text-sm cursor-pointer">
>>>>>>> cceab709ebe8722bd31e978dc552656dcbb832e2
        {openedFiles.map((file) => (
          <OpenedFilesTaps file={file} key={file.id} />
        ))}
      </div>
<<<<<<< HEAD
      <div className="bg-[#282a36] min-h-[calc(100vh-40px)] text-white">
        {clickedFile.fileContent}
=======
      <div className="max-h-[100vh] scroll-auto overflow-y-auto">
        <FileSyntaxHighlighter content={clickedFile.fileContent} />
>>>>>>> cceab709ebe8722bd31e978dc552656dcbb832e2
      </div>
    </div>
  );
};

export default OpenedFilesBar;
