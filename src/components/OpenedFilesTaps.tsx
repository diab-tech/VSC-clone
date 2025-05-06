import FileIcon from "./FileIcon";
import { ReactComponent as CloseIcon } from "../../icons/light/close.svg";

interface IProps {
  file: {
    name: string;
    isFolder: boolean;
  };
  isActive: boolean;
}

const OpenedFilesTaps = ({ file, isActive }: IProps) => {
  return (
    <div className="flex items-center gap-1">
      <FileIcon fileName={file.name} isFolder={file.isFolder} />
      <li className={isActive ? "text-white font-bold" : "text-[#808080]"}>{file.name}</li>
      <CloseIcon className="text-red-800 w-6 h-6" />;
    </div>
  );
};

export default OpenedFilesTaps;
