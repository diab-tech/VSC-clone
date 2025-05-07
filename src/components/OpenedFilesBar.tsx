import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import OpenedFilesTaps from './OpenedFilesTab';

const OpenedFilesBar = () => {
  const { openedFiles, clickedFile } = useSelector((state: RootState) => state.fileTreeSlice);

  return (
    <div className=" flex flex-col w-full  bg-gray-200">
      <div className="flex w-full bg-[#252526] gap- h-10">
        {openedFiles.map((file) => (
          <OpenedFilesTaps file={file} key={file.id} />
        ))}
      </div>
      <div className="bg-[#282a36] min-h-[calc(100vh-40px)] text-white">
        {clickedFile.fileContent}
      </div>
    </div>
  );
};

export default OpenedFilesBar;
