// OpenFilesSidePanel.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { setOpenedFiles } from '../app/features/filesBarSlice';
import AppIcon from './AppIcons';
import FileIcon from './FileIcon';
import clsx from 'clsx';

const OpenFilesSidePanel: React.FC = () => {
  const dispatch = useDispatch();
  const { openedFiles, clickedFile } = useSelector((state: RootState) => state.fileBarSlice);
  
  // Close all open files
  const handleCloseAll = () => {
    dispatch(setOpenedFiles([]));
  };
  
  // Close a specific file
  const handleCloseFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedFiles = openedFiles.filter(file => file.id !== id);
    dispatch(setOpenedFiles(updatedFiles));
  };
  
  // Handle file click to activate it
  const handleFileClick = (id: string) => {
    dispatch({
      type: 'fileBarSlice/setClickedFile',
      payload: { activeTab: id }
    });
  };
  
  return (
    <div className="bg-[rgb(37,37,38)] text-white h-full overflow-y-auto">
      <div className="flex items-center justify-between p-2.5">
        <div className="text-[12px] uppercase font-semibold">Open Editors</div>
        <div className="flex items-center">
          <AppIcon
            iconName="close"
            className={clsx(
              "w-4 h-4 hover:cursor-pointer hover:bg-[rgb(75,75,75)] transition duration-100 rounded-md",
              openedFiles.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            )}
            onClick={openedFiles.length > 0 ? handleCloseAll : undefined}
          />
        </div>
      </div>
      
      <div className="h-full overflow-y-auto whitespace-nowrap text-sm [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {openedFiles.length === 0 ? (
          <div className="px-4 py-2 text-gray-400 italic">No open editors</div>
        ) : (
          <div>
            {openedFiles.map((file) => (
              <div 
                key={file.id}
                className={clsx(
                  "flex items-center px-2 py-1 cursor-pointer",
                  clickedFile.activeTab === file.id ? "bg-[#04395e]" : "hover:bg-gray-700"
                )}
                onClick={() => handleFileClick(file.id)}
              >
                <FileIcon fileName={file.name} isFolder={false} />
                <span className="pl-1.5 block truncate">{file.name}</span>
                <div className="ml-auto">
                  <AppIcon
                    iconName="close"
                    className="w-4 h-4 hover:bg-[rgb(75,75,75)] rounded-sm opacity-0 hover:opacity-100 group-hover:opacity-100"
                    onClick={(e) => handleCloseFile(file.id, e)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenFilesSidePanel;
