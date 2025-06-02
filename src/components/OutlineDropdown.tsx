import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { toggleFileOutlineExpanded } from '../app/features/outlineSlice';
import AppIcon from './AppIcons';
import OutlinePanel from './OutlinePanel';

interface OutlineDropdownProps {
  fileId: string;
  fileName: string;
  isFolder: boolean;
}

const OutlineDropdown: React.FC<OutlineDropdownProps> = ({ fileId, fileName, isFolder }) => {
  const dispatch = useDispatch();
  const { isVisible } = useSelector((state: RootState) => state.outline);
  const { expandedFiles } = useSelector((state: RootState) => state.outline);
  const isExpanded = expandedFiles.includes(fileId);
  const clickedFile = useSelector((state: RootState) => state.fileBarSlice.clickedFile);
  const isActive = clickedFile.activeTab === fileId;
  
  // Only show outline for non-folder items that are currently active
  const shouldShowOutline = !isFolder && isActive && isVisible;
  
  // Only show the dropdown header for non-folder items that are currently active
  const shouldShowHeader = !isFolder && isActive && isVisible;

  const handleToggleOutline = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFileOutlineExpanded(fileId));
  };

  // Don't render anything if this isn't a file or if outline is hidden
  if (isFolder || !isVisible) {
    return null;
  }

  return (
    <>
      {shouldShowHeader && (
        <div 
          className="flex items-center justify-between px-2 py-1 text-xs text-gray-400 hover:bg-gray-700 cursor-pointer ml-2 border-l border-gray-600"
          onClick={handleToggleOutline}
        >
          <div className="flex items-center">
            <AppIcon 
              iconName={isExpanded ? "chevronDown" : "chevronRight"} 
              className="mr-1 text-gray-400"
            />
            <span>Outline</span>
          </div>
        </div>
      )}
      
      {shouldShowOutline && isExpanded && (
        <div className="ml-4 border-l border-gray-600">
          <OutlinePanel />
        </div>
      )}
    </>
  );
};

export default OutlineDropdown;
