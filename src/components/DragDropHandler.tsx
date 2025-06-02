// DragDropHandler.tsx
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { IFile } from '../interface';

interface DragDropHandlerProps {
  children: React.ReactNode;
  fileId: string;
  isFolder: boolean;
  onMoveFile: (sourceId: string, targetId: string) => void;
}

const DragDropHandler: React.FC<DragDropHandlerProps> = ({
  children,
  fileId,
  isFolder,
  onMoveFile
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    e.dataTransfer.setData('fileId', fileId);
    e.dataTransfer.setData('isFolder', isFolder.toString());
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFolder) {
      setIsDragOver(true);
      e.dataTransfer.dropEffect = 'move';
    }
  };
  
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    if (!isFolder) return;
    
    const sourceId = e.dataTransfer.getData('fileId');
    const sourceIsFolder = e.dataTransfer.getData('isFolder') === 'true';
    
    // Don't allow dropping on itself or dropping a folder into itself
    if (sourceId === fileId) return;
    
    onMoveFile(sourceId, fileId);
  };
  
  return (
    <div
      ref={dragRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${isDragOver ? 'bg-blue-900 bg-opacity-30' : ''} ${isDragging ? 'opacity-50' : ''}`}
    >
      {children}
    </div>
  );
};

export default DragDropHandler;
