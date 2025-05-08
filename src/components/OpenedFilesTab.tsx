import FileIcon from './FileIcon';
import { IFile } from '../interface';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD
import { setActiveTab, setClickedFile } from '../app/features/fileTreeSlice';
import { RootState } from '../app/store';
=======
import { setClickedFile, setClosedFiles } from '../app/features/fileTreeSlice';
import { RootState } from '../app/store';
import AppIcon from './AppIcons';
>>>>>>> cceab709ebe8722bd31e978dc552656dcbb832e2

interface IProps {
  file: IFile;
}

const OpenedFilesTaps = ({ file }: IProps) => {
  const dispatch = useDispatch();
<<<<<<< HEAD
  const { activeTab } = useSelector((state: RootState) => state.fileTreeSlice);

  const fileHandler = () => {
    dispatch(setClickedFile({ fileContent: file.content, fileName: file.name }));
    dispatch(setActiveTab(file.id));
  };
  return (
    <div
      className={`flex items-center gap-1 ${
        activeTab === file.id
          ? 'border-t-2 border-amber-300 text-white'
          : 'text-[#808080] border-t-2 border-transparent'
=======
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
>>>>>>> cceab709ebe8722bd31e978dc552656dcbb832e2
      }`}
      onClick={fileHandler}
    >
      <FileIcon fileName={file.name} isFolder={file.isFolder} />
      <span className="">{file.name}</span>
<<<<<<< HEAD
      {/* <span>
        <svg
          className=" hover:text-red-950 "
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.14642 9.00001L8.14641 14L8.85352 14L13.8535 9.00001L13.1464 8.2929L8.99997 12.4393L8.99997 2.00001L7.99997 2.00001L7.99997 12.4393L3.85353 8.2929L3.14642 9.00001Z"
            fill="#C5C5C5"
          />
        </svg>
      </span> */}
=======
      <div
        onClick={closeTabHandler}
        className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center ${
          activeTab === file.id ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <AppIcon iconName="close" />
      </div>
>>>>>>> cceab709ebe8722bd31e978dc552656dcbb832e2
    </div>
  );
};

export default OpenedFilesTaps;
