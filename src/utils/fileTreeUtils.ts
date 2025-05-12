// import { IClickedFile, IFile } from '../interface';

import { hideMenu } from "../app/features/contextMenuSlice";
import { setCloseToTheRight } from "../app/features/fileTreeSlice";

// export const updateActiveFileAfterClose = (
//   openedFiles: IFile[],
//   currentClickedFile: IClickedFile,
//   idsToClose: string[] | null = null,
//   closeToRightId: string | null = null
// ): IClickedFile => {
//   let remainingTabs: IFile[] = [...openedFiles];

//   // فلترة التبات المراد إغلاقها
//   if (idsToClose) {
//     remainingTabs = openedFiles.filter((file) => !idsToClose.includes(file.id));
//   } else if (closeToRightId) {
//     const index = openedFiles.findIndex((file) => file.id === closeToRightId);
//     if (index !== -1) {
//       remainingTabs = openedFiles.filter((_, i) => i <= index);
//     }
//   }

//   // التحقق إذا كان الـ activeTab الحالية لا تزال موجودة
//   const currentActiveTab = currentClickedFile.activeTab;
//   const activeTabStillExists = remainingTabs.some((file) => file.id === currentActiveTab);

//   let newActiveTab: string | null = null;
//   let newActiveFile: IFile | null = null;

//   if (activeTabStillExists) {
//     // لو الـ activeTab الحالية لسه موجودة، نستخدمها
//     newActiveTab = currentActiveTab;
//     newActiveFile = remainingTabs.find((f) => f.id === newActiveTab) || null;
//   } else {
//     // لو الـ activeTab اتقفلت، نختار أقرب تب متبقي
//     if (remainingTabs.length > 0) {
//       // نختار التب اللي كان قبل الـ closeToRightId أو آخر تب متبقي
//       const indexOfClosedTab = openedFiles.findIndex((file) => file.id === closeToRightId);
//       const previousTab = indexOfClosedTab > 0 ? openedFiles[indexOfClosedTab - 1] : null;
//       newActiveTab = previousTab ? previousTab.id : remainingTabs[remainingTabs.length - 1].id;
//       newActiveFile = remainingTabs.find((f) => f.id === newActiveTab) || null;
//     }
//   }

//   return {
//     activeTab: newActiveTab,
//     fileName: newActiveFile ? newActiveFile.name : '',
//     fileContent: newActiveFile ? newActiveFile.content : undefined,
//   };
// };

// fileTreeUtils.ts
// الطريقه اللي GPT اقترحها عشان معتمدش علي useEffect 

// import { AppThunk } from '../app/store'; // المسار المناسب

// export const closeToTheRightAndSetActive = (tabId: string): AppThunk => (dispatch, getState) => {
//     dispatch(setCloseToTheRight(tabId));
//     const { openedFiles } = getState().fileTreeSlice;
  
//     const stillExists = openedFiles.find(f => f.id === tabId);
//     const newActive = stillExists || openedFiles[openedFiles.length - 1];
  
//     if (newActive) {
//       dispatch({
//         type: 'fileTreeSlice/setClickedFile',
//         payload: {
//           activeTab: newActive.id,
//           fileName: newActive.name,
//           fileContent: newActive.content,
//         },
//       });
//     } else {
//       dispatch({
//         type: 'fileTreeSlice/setClickedFile',
//         payload: {
//           activeTab: null,
//           fileName: '',
//           fileContent: undefined,
//         },
//       });
//     }
  
//     dispatch(hideMenu());
//   };
  