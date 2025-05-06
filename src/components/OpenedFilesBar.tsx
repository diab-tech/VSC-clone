import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import OpenedFilesTaps from "./OpenedFilesTaps";

interface IProps {}
const OpenedFilesBar = ({}: IProps) => {
  const { openedFiles } = useSelector((state: RootState) => state.fileTreeSlice);

  return (
    <div className="flex gap-4 bg-[#252526] h-10 text-[#808080] items-center px-2">
      {openedFiles.map((file, index) => (
        <OpenedFilesTaps file={file} isActive={index === openedFiles.length - 1} />
      ))}
    </div>
  );
};

export default OpenedFilesBar;
