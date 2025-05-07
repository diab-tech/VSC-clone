import FileIcon from './FileIcon';
import { IFile } from '../interface';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab, setClickedFile } from '../app/features/fileTreeSlice';
import { RootState } from '../app/store';

interface IProps {
  file: IFile;
}

const OpenedFilesTaps = ({ file }: IProps) => {
  const dispatch = useDispatch();
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
      }`}
      onClick={fileHandler}
    >
      <FileIcon fileName={file.name} isFolder={file.isFolder} />
      <span className="">{file.name}</span>
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
    </div>
  );
};

export default OpenedFilesTaps;
