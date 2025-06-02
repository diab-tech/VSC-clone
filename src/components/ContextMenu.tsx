// ContextMenuComponent.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import AppIcon from './AppIcons';

interface ContextMenuProps {
  x: number;
  y: number;
  fileId: string;
  isFolder: boolean;
  onNewFile: () => void;
  onNewFolder: () => void;
  onDelete: () => void;
  onRename: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  fileId,
  isFolder,
  onNewFile,
  onNewFolder,
  onDelete,
  onRename
}) => {
  // Style for VSCode-like context menu
  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    top: `${y}px`,
    left: `${x}px`,
    backgroundColor: '#252526',
    border: '1px solid #3c3c3c',
    borderRadius: '2px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    minWidth: '160px',
    padding: '4px 0'
  };
  
  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('contextmenu', handleClickOutside);
    };
    
    // Add event listeners with a slight delay to avoid immediate triggering
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('contextmenu', handleClickOutside);
    }, 10);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('contextmenu', handleClickOutside);
    };
  }, []);

  // Style for menu items
  const menuItemStyle: React.CSSProperties = {
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  // Style for menu item hover
  const menuItemHoverStyle = {
    ...menuItemStyle,
    backgroundColor: '#094771'
  };

  // Style for separator
  const separatorStyle: React.CSSProperties = {
    height: '1px',
    backgroundColor: '#3c3c3c',
    margin: '4px 0'
  };

  return (
    <div style={menuStyle} className="context-menu">
      {isFolder && (
        <>
          <div 
            style={menuItemStyle} 
            className="hover:bg-[#094771]"
            onClick={onNewFile}
          >
            <AppIcon iconName="new-file" className="text-gray-400" />
            <span>New File</span>
          </div>
          <div 
            style={menuItemStyle} 
            className="hover:bg-[#094771]"
            onClick={onNewFolder}
          >
            <AppIcon iconName="new-folder" className="text-gray-400" />
            <span>New Folder</span>
          </div>
          <div style={separatorStyle}></div>
        </>
      )}
      <div 
        style={menuItemStyle} 
        className="hover:bg-[#094771]"
        onClick={onRename}
      >
        <AppIcon iconName="edit" className="text-gray-400" />
        <span>Rename</span>
      </div>
      <div 
        style={menuItemStyle} 
        className="hover:bg-[#094771] text-red-400"
        onClick={onDelete}
      >
        <AppIcon iconName="trash" className="text-red-400" />
        <span>Delete</span>
      </div>
    </div>
  );
};

export default ContextMenu;
