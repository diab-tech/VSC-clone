// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { hideMenu } from '../app/features/contextMenuSlice';
// import {
//   setClosedAllFiles,
//   setClosedFiles,
//   setCloseToTheRight,
//   setClickedFile,
// } from '../app/features/fileTreeSlice';
// import { RootState } from '../app/store';
// import { updateActiveFileAfterClose } from '../utils/fileTreeUtils'; // استيراد الدالة

// interface IProps {
//   position: { x: number; y: number } | null;
//   contextType: string | null;
//   contextId: string | null;
// }

// const ContextMenu = ({ position, contextType, contextId }: IProps) => {
//   const dispatch = useDispatch();
//   const { openedFiles, clickedFile } = useSelector((state: RootState) => state.fileTreeSlice);

//   useEffect(() => {
//     const handleClick = () => dispatch(hideMenu());
//     window.addEventListener('click', handleClick);
//     return () => window.removeEventListener('click', handleClick);
//   }, []);

//   const handleCloseTab = () => {
//     if (contextId) {
//       dispatch(setClosedFiles(contextId));
//       if (clickedFile.activeTab === contextId) {
//         const newClickedFile = updateActiveFileAfterClose(openedFiles, clickedFile, [contextId]);
//         dispatch(setClickedFile(newClickedFile));
//       }
//     }
//     dispatch(hideMenu());
//   };

//   const handleCloseAllTabs = () => {
//     dispatch(setClosedAllFiles());
//     dispatch(
//       setClickedFile({
//         activeTab: null,
//         fileName: '',
//         fileContent: undefined,
//       })
//     );
//     dispatch(hideMenu());
//   };

//   const handleCloseToTheRight = () => {
//     if (contextId) {
//       const index = openedFiles.findIndex((file) => file.id === contextId);
//       if (index !== -1) {
//         dispatch(setCloseToTheRight(contextId));
//         if (
//           clickedFile.activeTab &&
//           openedFiles.findIndex((f) => f.id === clickedFile.activeTab) > index
//         ) {
//           const newClickedFile = updateActiveFileAfterClose(
//             openedFiles,
//             clickedFile,
//             null,
//             contextId
//           );
//           dispatch(setClickedFile(newClickedFile));
//         }
//       }
//     }
//     dispatch(hideMenu());
//   };

//   return (
//     <div
//       style={{ top: position?.y, left: position?.x }}
//       className="absolute bg-white shadow z-50 cursor-pointer"
//     >
//       {contextType === 'TAB' && (
//         <>
//           <div onClick={handleCloseTab}>Close Tab</div>
//           <div onClick={handleCloseAllTabs}>Close All</div>
//           <div onClick={handleCloseToTheRight}>Close to the Right</div>
//         </>
//       )}
//       {contextType === 'BAR' && (
//         <>
//           <div>Do something with BAR</div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ContextMenu;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideMenu } from '../app/features/contextMenuSlice';
import {
  setClosedAllFiles,
  setClosedFiles,
  setCloseToTheRight,
} from '../app/features/fileTreeSlice';
import { RootState } from '../app/store';

interface IProps {
  position: { x: number; y: number } | null;
  contextType: string | null;
  contextId: string | null;
}

const ContextMenu = ({ position, contextType, contextId }: IProps) => {
  const dispatch = useDispatch();
  const { openedFiles } = useSelector((state: RootState) => state.fileTreeSlice);

  useEffect(() => {
    const handleClick = () => dispatch(hideMenu());
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleCloseTab = () => {
    if (contextId) {
      dispatch(setClosedFiles(contextId));
    }
    dispatch(hideMenu());
  };

  const handleCloseAllTabs = () => {
    dispatch(setClosedAllFiles());
    dispatch(hideMenu());
  };

  

  const handleCloseToTheRight = () => {
    if (contextId) {
      const index = openedFiles.findIndex((file) => file.id === contextId);
      if (index !== -1) {
        dispatch(setCloseToTheRight(contextId));
      }
    }
    dispatch(hideMenu());
  };

// const handleCloseToTheRight = () => {
//   if (contextId) {
//     dispatch(closeToTheRightAndSetActive(contextId));
//   }
// };


  return (
    <div
      style={{ top: position?.y, left: position?.x }}
      className="absolute bg-white shadow z-50 cursor-pointer"
    >
      {contextType === 'TAB' && (
        <>
          <div onClick={handleCloseTab}>Close Tab</div>
          <div onClick={handleCloseAllTabs}>Close All</div>
          <div onClick={handleCloseToTheRight}>Close to the Right</div>
        </>
      )}
      {contextType === 'BAR' && (
        <>
          <div>Do something with BAR</div>
        </>
      )}
    </div>
  );
};

export default ContextMenu;
