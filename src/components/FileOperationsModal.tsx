// FileOperationsModal.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAddItem, setDeleteItem, setRenameItem } from '../app/features/fileTreeSlice';

interface FileOperationsModalProps {
  type: 'new-file' | 'new-folder' | 'rename' | 'delete';
  parentId: string;
  itemId?: string;
  itemName?: string;
  isFolder?: boolean;
  onClose: () => void;
}

const FileOperationsModal: React.FC<FileOperationsModalProps> = ({
  type,
  parentId,
  itemId,
  itemName,
  isFolder,
  onClose
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(itemName || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'delete') {
      if (itemId) {
        dispatch(setDeleteItem(itemId));
        onClose();
      }
      return;
    }
    
    // Validation for name
    if (!name.trim()) {
      setError('Name cannot be empty');
      return;
    }
    
    // Handle different operations
    switch (type) {
      case 'new-file':
        dispatch(setAddItem({
          parentId,
          newItem: { name, isFolder: false }
        }));
        break;
      case 'new-folder':
        dispatch(setAddItem({
          parentId,
          newItem: { name, isFolder: true }
        }));
        break;
      case 'rename':
        if (itemId) {
          dispatch(setRenameItem({
            itemId,
            newName: name
          }));
        }
        break;
    }
    
    onClose();
  };

  const getTitle = () => {
    switch (type) {
      case 'new-file': return 'New File';
      case 'new-folder': return 'New Folder';
      case 'rename': return 'Rename';
      case 'delete': return 'Delete';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#252526] border border-[#3c3c3c] rounded-sm shadow-lg p-4 w-80">
        <h2 className="text-white text-lg mb-4">{getTitle()}</h2>
        
        {type === 'delete' ? (
          <div>
            <p className="text-white mb-4">
              Are you sure you want to delete {isFolder ? 'folder' : 'file'} "{itemName}"?
              {isFolder && <span className="text-red-400 block mt-2">This will delete all contents inside the folder.</span>}
            </p>
            <div className="flex justify-end gap-2">
              <button 
                className="px-4 py-1 bg-[#3c3c3c] text-white rounded hover:bg-[#4c4c4c]"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleSubmit}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">
                {type === 'new-file' ? 'File Name' : 
                 type === 'new-folder' ? 'Folder Name' : 'New Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-[#3c3c3c] text-white border border-[#6c6c6c] rounded focus:outline-none focus:border-blue-500"
                autoFocus
              />
              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>
            <div className="flex justify-end gap-2">
              <button 
                type="button"
                className="px-4 py-1 bg-[#3c3c3c] text-white rounded hover:bg-[#4c4c4c]"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {type === 'new-file' || type === 'new-folder' ? 'Create' : 'Rename'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FileOperationsModal;
