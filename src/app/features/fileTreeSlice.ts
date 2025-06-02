// Add setReplaceTree action t// fileTreeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { IFile } from '../../interface';

// Use the enhanced default tree structure
const defaultTree: IFile = createDefaultTree();
// Helper to ensure all files have content
const ensureFileContent = (node: IFile): IFile => {
  // If this is a file with no content, add empty content
  if (!node.isFolder && node.content === undefined) {
    return { ...node, content: '' };
  }
  
  // If it has children, process them recursively
  if (node.children) {
    return {
      ...node,
      children: node.children.map(ensureFileContent)
    };
  }
   
  return node;
};
import { addNode, deleteNode, renameNode, moveNode } from '../../utils/fileTreeHelpers';
import { createDefaultTree } from '../../utils/defaultTreeData';

interface FileTreeState {
    tree: IFile;
    selectedId: string | null;
  }
  const initialState: FileTreeState = {
    tree: ensureFileContent(defaultTree),
    selectedId: null,
  };
  console.log("Initial tree:", initialState.tree);  
  
// Slice definition
export const fileTreeSlice = createSlice({
  name: 'fileTree',
  initialState,
  reducers: {
    setAddItem: (
      state,
      action: PayloadAction<{
        parentId: string;
        newItem: { name: string; isFolder: boolean };
      }>
    ) => {
      const newItem: IFile = {
        id: uuidv4(),
        name: action.payload.newItem.name,
        isFolder: action.payload.newItem.isFolder,
        children: action.payload.newItem.isFolder ? [] : undefined,
      };
      const ensuredItem = ensureFileContent(newItem);
      state.tree = addNode(state.tree, action.payload.parentId, ensuredItem)
      console.log("Updated tree:", state.tree);
    },
    setEditFileContent: (
        state,
        action: PayloadAction<{ fileId: string; newContent: string }>
      ) => {
        const updateContent = (node: IFile): IFile => {
          if (node.id === action.payload.fileId && !node.isFolder) {
            return { ...node, content: action.payload.newContent };
          }
      
          if (node.children) {
            const updatedChildren = node.children.map(updateContent);
            return { ...node, children: updatedChildren };
          }
      
          return node;
        };
      
        state.tree = updateContent(state.tree);
      },
      
    setDeleteItem: (state, action: PayloadAction<string>) => {
        const targetId = action.payload;
        const updatedTree = deleteNode(state.tree, targetId);
        if (updatedTree) {
          state.tree = updatedTree;
        }
      },
        setRenameItem: (
      state,
      action: PayloadAction<{ itemId: string; newName: string }>
    ) => {
      state.tree = renameNode(state.tree, action.payload.itemId, action.payload.newName);
    },
    setMoveItem: (
      state,
      action: PayloadAction<{ sourceId: string; targetId: string }>
    ) => {
      state.tree = moveNode(state.tree, action.payload.sourceId, action.payload.targetId);
    },
    setReplaceTree: (
      state,
      action: PayloadAction<IFile>
    ) => {
      // Process the new tree to ensure all files have content
      const processedTree = ensureFileContent(action.payload);
      // Replace the entire tree with the new one
      state.tree = processedTree;
    },
    setSelectedItem: (state, action: PayloadAction<string>) => {
        state.selectedId = action.payload;
      },
      clearSelectedId: (state) => {
        state.selectedId = null; 
      },
  },
});
          
export const { 
  setAddItem, 
  setEditFileContent, 
  setDeleteItem, 
  setRenameItem, 
  setSelectedItem, 
  clearSelectedId, 
  setMoveItem,
  setReplaceTree 
}  = fileTreeSlice.actions;
export default fileTreeSlice.reducer;
