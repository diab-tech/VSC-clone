// FolderOpenHandler.tsx
import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IFile } from '../interface';
import AppIcon from './AppIcons';

interface FolderOpenHandlerProps {
  onFolderOpen: (folderStructure: IFile) => void;
  className?: string;
}

const FolderOpenHandler: React.FC<FolderOpenHandlerProps> = ({
  onFolderOpen,
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const buildTreeFromFiles = async (files: FileList): Promise<IFile> => {
    const root: IFile = {
      id: uuidv4(),
      name: 'root',
      isFolder: true,
      children: []
    };

    const pathMap = new Map<string, IFile>();
    pathMap.set('', root);

    const readFileContent = (file: File): Promise<string> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve((e.target?.result as string) || '');
        };
        reader.onerror = () => resolve('');
        reader.readAsText(file);
      });
    };

    for (const file of Array.from(files)) {
      const pathParts = file.webkitRelativePath.split('/');
      const fileName = pathParts.pop()!;
      let currentPath = '';
      let parent = root;

      for (const part of pathParts) {
        currentPath += (currentPath ? '/' : '') + part;
        if (!pathMap.has(currentPath)) {
          const folder: IFile = {
            id: uuidv4(),
            name: part,
            isFolder: true,
            children: []
          };
          pathMap.set(currentPath, folder);
          parent.children!.push(folder);
        }
        parent = pathMap.get(currentPath)!;
      }

      const content = await readFileContent(file);

      const newFile: IFile = {
        id: uuidv4(),
        name: fileName,
        isFolder: false,
        content
      };

      parent.children!.push(newFile);
    }

    return root;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    try {
      const folderStructure = await buildTreeFromFiles(e.target.files);
      onFolderOpen(folderStructure);
    } catch (error) {
      console.error('Error processing folder:', error);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`${className}`}>
      <button
        onClick={handleButtonClick}
        className="flex items-center px-3 py-1 text-sm bg-[#0e639c] hover:bg-[#1177bb] text-white rounded"
      >
        <AppIcon iconName="folderOpen" className="w-4 h-4 mr-1" />
        <span>Open Folder</span>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        webkitdirectory="true"
        directory="true"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FolderOpenHandler;
// This component allows users to open a folder and read its contents.