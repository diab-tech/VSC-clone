import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClickedFile, setOpenedFiles } from '../app/features/filesBarSlice';
import { AppDispatch, RootState } from '../app/store';
import { IFile } from '../interface';
import { doesFileExists } from '../utils/functions';
import FileIcon from './FileIcon';
import AppIcon from './AppIcons';
import { setSelectedItem } from '../app/features/fileTreeSlice';

interface IProps {
  fileTree: IFile;
  isRoot?: boolean;
  selectedItem?: string | null;
}

const RecursiveComponent = ({ fileTree, isRoot = false, selectedItem }: IProps) => {
  const { id, name, content } = fileTree;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { openedFiles, clickedFile } = useSelector((state: RootState) => state.fileBarSlice);
  // const { selectedId } = useSelector(
  //   (state: RootState) => state.fileTreeSlice
  // );

  // __HANDLERS__
  const onFileClicked = () => {
    const exists = doesFileExists(openedFiles, id);

    dispatch(
      setClickedFile({
        fileContent: content,
        fileName: name,
        activeTab: id,
        tabHistory: [...clickedFile.tabHistory, id].filter(
          (tabId, index, self) => self.lastIndexOf(tabId) === index
        ),
      })
    );
    if (exists) return;
    dispatch(setOpenedFiles([...openedFiles, fileTree]));
  };

  const toggleFolder = () => {
    if (fileTree.isFolder === true) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`${selectedItem === id ? 'bg-gray-500 w-full' : ''}`}>
      <div
        className={`flex items-center cursor-pointer  ${
          isRoot
            ? 'ml-0.5 mt-0.5 font-bold text-[13px] mr-1 not-visited:hover:ring-1 hover:ring-blue-500 transition duration-200 uppercase '
            : 'bg-transparent hover:bg-gray-700 transition duration-100'
        } `}
        onClick={toggleFolder}
      >
        {fileTree.isFolder ? (
          isOpen ? (
            <AppIcon iconName="chevronDown" />
          ) : (
            <AppIcon iconName="chevronRight" />
          )
        ) : (
          <>
            {/* <div className="h-full w-[10px] border-l-[1px] border-l-gray-600"></div> */}
            <span className="pl-[10px] "></span>
          </>
        )}

        <FileIcon fileName={fileTree.name} isFolder={fileTree.isFolder} isOpened={isOpen} />
        {fileTree.isFolder ? (
          <span className="pl-2">{fileTree.name}</span>
        ) : (
          <span className={`pl-2 `} onClick={onFileClicked}>
            {fileTree.name}
          </span>
        )}
      </div>
      {fileTree.isFolder === true && isOpen && fileTree.children && (
        <div className="ml-2 border-l border-gray-600 ">
          {fileTree.children.map((file, index) => (
            <RecursiveComponent fileTree={file} key={index} selectedItem={clickedFile.activeTab} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecursiveComponent;
