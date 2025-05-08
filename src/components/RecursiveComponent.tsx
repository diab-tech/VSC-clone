import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD
import { setActiveTab, setClickedFile, setOpenedFiles } from '../app/features/fileTreeSlice';
=======
import { setClickedFile, setOpenedFiles } from '../app/features/fileTreeSlice';
>>>>>>> cceab709ebe8722bd31e978dc552656dcbb832e2
import { AppDispatch, RootState } from '../app/store';
import { IFile } from '../interface';
import { doesFileExists } from '../utils/functions';
import FileIcon from './FileIcon';

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IProps) => {
<<<<<<< HEAD
  const { id, isFolder, name, children, content } = fileTree;
=======
  const { id, name, content } = fileTree;
>>>>>>> cceab709ebe8722bd31e978dc552656dcbb832e2
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { openedFiles } = useSelector((state: RootState) => state.fileTreeSlice);

  // __HANDLERS__
  const onFileClicked = () => {
    const exists = doesFileExists(openedFiles, id);
<<<<<<< HEAD
    dispatch(setClickedFile({ fileContent: content, fileName: name }));
    dispatch(setActiveTab(id));
=======
    dispatch(setClickedFile({ fileContent: content, fileName: name, activeTab: id }));
>>>>>>> cceab709ebe8722bd31e978dc552656dcbb832e2
    if (exists) return;
    dispatch(setOpenedFiles([...openedFiles, fileTree]));
  };

  const toggleFolder = () => {
    if (fileTree.isFolder === true) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="ml-1">
      <div className="flex items-center cursor-pointer" onClick={toggleFolder}>
<<<<<<< HEAD
        <FileIcon fileName={fileTree.name} isFolder={fileTree.isFolder} />
=======
        <FileIcon fileName={fileTree.name} isFolder={fileTree.isFolder} isOpened={isOpen} />
>>>>>>> cceab709ebe8722bd31e978dc552656dcbb832e2
        {fileTree.isFolder ? (
          <span className="ml-5">{fileTree.name}</span>
        ) : (
          <span className="ml-5" onClick={onFileClicked}>
            {fileTree.name}
          </span>
        )}
      </div>
      {fileTree.isFolder === true && isOpen && fileTree.children && (
        <div className="ml-3">
          {fileTree.children.map((file, index) => (
            <RecursiveComponent fileTree={file} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecursiveComponent;
