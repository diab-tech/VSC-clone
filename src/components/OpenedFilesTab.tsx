import FileIcon from './FileIcon';
import { IFile } from '../interface';
import { useDispatch, useSelector } from 'react-redux';
import { setClickedFile, setClosedFiles } from '../app/features/fileTreeSlice';
import { RootState } from '../app/store';
import AppIcon from './AppIcons';

interface IProps {
  file: IFile;
}

const OpenedFilesTaps = ({ file }: IProps) => {
  const dispatch = useDispatch();
  const {
    clickedFile,
    clickedFile: { activeTab },
    openedFiles,
  } = useSelector((state: RootState) => state.fileTreeSlice);

  const fileHandler = () => {
    dispatch(
      setClickedFile({ fileContent: file.content, fileName: file.name, activeTab: file.id })
    );
  };

  const closeTabHandler = () => {
    dispatch(setClosedFiles([file.id]));
    // if (activeTab === file.id) {
    //   dispatch(setClickedFile({ ...clickedFile, activeTab: null }));
    // }
  };
  const taps = openedFiles.map((file) => file.name);
  console.log('taps', taps);

  return (
    <div
      className={`flex items-center justify-center space-x-1 px-2 cursor-pointer group last:border last:border-r-gray-700 ${
        activeTab === file.id
          ? 'border border-t-blue-800 text-white group bg-[#1D1F21] border-l-gray-700 border-b-transparent border-r-gray-700 first:border-l-0'
          : 'text-[#808080] border border-t-transparent border-l border-b border-gray-700 first:border-l-0'
      }`}
      onClick={fileHandler}
    >
      <FileIcon fileName={file.name} isFolder={file.isFolder} />
      <span className="">{file.name}</span>
      <div
        onClick={closeTabHandler}
        className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center ${
          activeTab === file.id ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <AppIcon iconName="close" />
      </div>
    </div>
  );
};

export default OpenedFilesTaps;
