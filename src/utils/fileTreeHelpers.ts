import { IFile } from "../interface";


  // Helper function to recursively find and update nodes
export const addNode = (node: IFile, parentId: string, newItem: IFile): IFile => {
  if (node.id === parentId && node.isFolder) {
    return {
      ...node,
      children: [...(node.children || []), newItem],
    };
  }

  if (node.children) {
    return {
      ...node,
      children: node.children.map(child => addNode(child, parentId, newItem)),
    };
  }

  return node;
};

export const deleteNode = (node: IFile, targetId: string): IFile | null => {
  if (node.id === targetId) return null;

  if (node.children) {
    const updatedChildren = node.children
      .map(child => deleteNode(child, targetId))
      .filter(Boolean) as IFile[];

    return { ...node, children: updatedChildren };
  }

  return node;
};

export const renameNode = (node: IFile, targetId: string, newName: string): IFile => {
  if (node.id === targetId) {
    return { ...node, name: newName };
  }

  if (node.children) {
    return {
      ...node,
      children: node.children.map(child =>
        renameNode(child, targetId, newName)
      ),
    };
  }

  return node;
};

  