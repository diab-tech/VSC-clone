// import { IFile } from "../interface";


//   // Helper function to recursively find and update nodes
// export const addNode = (node: IFile, parentId: string, newItem: IFile): IFile => {
//   if (node.id === parentId && node.isFolder) {
//     return {
//       ...node,
//       children: [...(node.children || []), newItem],
//     };
//   }

//   if (node.children) {
//     return {
//       ...node,
//       children: node.children.map(child => addNode(child, parentId, newItem)),
//     };
//   }

//   return node;
// };

// export const deleteNode = (node: IFile, targetId: string): IFile | null => {
//   if (node.id === targetId) return null;

//   if (node.children) {
//     const updatedChildren = node.children
//       .map(child => deleteNode(child, targetId))
//       .filter(Boolean) as IFile[];

//     return { ...node, children: updatedChildren };
//   }

//   return node;
// };

// export const renameNode = (node: IFile, targetId: string, newName: string): IFile => {
//   if (node.id === targetId) {
//     return { ...node, name: newName };
//   }

//   if (node.children) {
//     return {
//       ...node,
//       children: node.children.map(child =>
//         renameNode(child, targetId, newName)
//       ),
//     };
//   }

//   return node;
// };

  // Dry your self

  import { IFile } from "../interface";

// دالة عامة للبحث وتعديل الشجرة
export const findAndUpdateNode = (
  node: IFile,
  targetId: string,
  updateFn: (node: IFile) => IFile | null
): IFile | null => {
  // لو وصلنا للعقدة المطلوبة، نفذ التعديل
  if (node.id === targetId) {
    return updateFn(node);
  }

  // لو فيه أبناء، كرر العملية عليهم
  if (node.children) {
    const updatedChildren = node.children
      .map((child) => findAndUpdateNode(child, targetId, updateFn))
      .filter((child): child is IFile => child !== null); // إزالة null
    return { ...node, children: updatedChildren };
  }

  // لو مفيش تغيير، ارجع العقدة زي ما هي
  return node;
};

// إضافة عقدة جديدة
export const addNode = (node: IFile, parentId: string, newItem: IFile): IFile => {
  return findAndUpdateNode(node, parentId, (currentNode) => {
    if (!currentNode.isFolder) return currentNode; // لو مش مجلد، ارجع بدون تغيير
    return {
      ...currentNode,
      children: [...(currentNode.children || []), newItem],
    };
  }) || node;
};

// حذف عقدة
export const deleteNode = (node: IFile, targetId: string): IFile | null => {
  return findAndUpdateNode(node, targetId, () => null);
};

// إعادة تسمية عقدة
export const renameNode = (node: IFile, targetId: string, newName: string): IFile => {
  return findAndUpdateNode(node, targetId, (currentNode) => ({
    ...currentNode,
    name: newName,
  })) || node;
};

export const moveNode = (
  tree: IFile,
  nodeId: string,
  newParentId: string
): IFile => {
  // 1. ابحث عن العقدة اللي هتنقلها
  let targetNode: IFile | null = null;
  const findNode = (node: IFile): IFile | null => {
    if (node.id === nodeId) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findNode(child);
        if (found) return found;
      }
    }
    return null;
  };
  targetNode = findNode(tree);
  if (!targetNode) return tree; // لو ملقتش العقدة، ارجع الشجرة زي ما هي

  // 2. احذف العقدة من مكانها القديم
  const updatedTree = deleteNode(tree, nodeId);
  if (!updatedTree) return tree;

  // 3. ضيف العقدة في الأب الجديد
  return addNode(updatedTree, newParentId, targetNode);
};