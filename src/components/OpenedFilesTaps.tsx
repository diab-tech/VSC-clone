import FileIcon from "./FileIcon";
import { IFile } from "../interface";

interface IProps {
  file: IFile;
}

const OpenedFilesTaps = ({ file }: IProps) => {
  return (
    <div className="flex items-center gap-1">
      <FileIcon fileName={file.name} isFolder={file.isFolder} />
      <li className={"text-[#808080]"}>{file.name}</li>
      <span>
        <svg
          className=" hover:text-red-950 "
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.14642 9.00001L8.14641 14L8.85352 14L13.8535 9.00001L13.1464 8.2929L8.99997 12.4393L8.99997 2.00001L7.99997 2.00001L7.99997 12.4393L3.85353 8.2929L3.14642 9.00001Z"
            fill="#C5C5C5"
          />
        </svg>
      </span>
    </div>
  );
};

export default OpenedFilesTaps;
