
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideMenu } from "../app/features/contextMenuSlice";
import {
  setClosedAllFiles,
  setClosedFiles,
  setCloseToTheRight,
} from "../app/features/filesBarSlice";
import { RootState } from "../app/store";

interface IProps {
  position: { x: number; y: number } | null;
  contextType: string | null;
  contextId: string | null;
  onCloseToTheRight?: () => void;
}

const ContextMenu = ({ position, contextType, contextId, onCloseToTheRight }: IProps) => {
  const dispatch = useDispatch();
  const { openedFiles } = useSelector(
    (state: RootState) => state.fileBarSlice
  );

  useEffect(() => {
    const handleClick = () => dispatch(hideMenu());
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
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
    if (onCloseToTheRight) {
      // Use the callback passed from parent component if available
      onCloseToTheRight();
    } else if (contextId) {
      // Fall back to default implementation
      const index = openedFiles.findIndex((file) => file.id === contextId);
      if (index !== -1) {
        dispatch(setCloseToTheRight(contextId));
      }
    }
    dispatch(hideMenu());
  };

  return (
    <div
      style={{ top: position?.y, left: position?.x }}
      className="absolute bg-white shadow z-50 cursor-pointer"
    >
      {contextType === "TAB" && (
        <>
          <div onClick={handleCloseTab}>Close Tab</div>
          <div onClick={handleCloseAllTabs}>Close All</div>
          <div onClick={handleCloseToTheRight}>Close to the Right</div>
        </>
      )}
      {contextType === "BAR" && (
        <>
          <div>Do something with BAR</div>
        </>
      )}
    </div>
  );
};

export default ContextMenu;
