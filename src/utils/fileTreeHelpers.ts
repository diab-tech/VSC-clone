// fileTreeHelpers.ts - Extended with move functionality
import { IFile } from '../interface';

// Add a new node to the tree
export const addNode = (tree: IFile, parentId: string, newNode: IFile): IFile => {
  if (tree.id === parentId && tree.isFolder) {
    return {
      ...tree,
      children: [...(tree.children || []), newNode]
    };
  }

  if (tree.children) {
    return {
      ...tree,
      children: tree.children.map(child => addNode(child, parentId, newNode))
    };
  }

  return tree;
};

// Delete a node from the tree
export const deleteNode = (tree: IFile, nodeId: string): IFile | null => {
  // If this is the node to delete, return null
  if (tree.id === nodeId) {
    return null;
  }

  // If this node has children, filter out the node to delete
  if (tree.children) {
    const newChildren = tree.children
      .map(child => deleteNode(child, nodeId))
      .filter(Boolean) as IFile[];

    return {
      ...tree,
      children: newChildren
    };
  }

  // Otherwise, return the node unchanged
  return tree;
};

// Rename a node in the tree
export const renameNode = (tree: IFile, nodeId: string, newName: string): IFile => {
  if (tree.id === nodeId) {
    return {
      ...tree,
      name: newName
    };
  }

  if (tree.children) {
    return {
      ...tree,
      children: tree.children.map(child => renameNode(child, nodeId, newName))
    };
  }

  return tree;
};

// Move a node to a new parent
export const moveNode = (tree: IFile, sourceId: string, targetId: string): IFile => {
  // First, find the node to move
  let nodeToMove: IFile | null = null;
  
  const findNode = (node: IFile): void => {
    if (node.id === sourceId) {
      nodeToMove = { ...node };
      return;
    }
    
    if (node.children) {
      node.children.forEach(findNode);
    }
  };
  
  findNode(tree);
  
  if (!nodeToMove) {
    return tree;
  }
  
  // Then delete the original node
  const treeWithoutNode = deleteNode(tree, sourceId);
  
  if (!treeWithoutNode) {
    return tree; // This shouldn't happen, but just in case
  }
  
  // Finally, add the node to its new parent
  return addNode(treeWithoutNode, targetId, nodeToMove);
};

// Check if a node is a descendant of another node
export const isDescendant = (tree: IFile, ancestorId: string, descendantId: string): boolean => {
  if (tree.id === ancestorId) {
    if (tree.children) {
      return tree.children.some(child => 
        child.id === descendantId || isDescendant(child, child.id, descendantId)
      );
    }
    return false;
  }
  
  if (tree.children) {
    return tree.children.some(child => isDescendant(child, ancestorId, descendantId));
  }
  
  return false;
};
