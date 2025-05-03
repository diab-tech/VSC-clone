import { useState } from "react";
import { IFile } from "../interface";
import Icons from "../components/SVG/icons";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = () => {
    if (fileTree.isFolder === true) return "folder";
    if (fileTree.name.endsWith(".js")) return "file-type-js";
    if (fileTree.name.endsWith(".ts")) return "file-type-typescript";
    if (fileTree.name.endsWith(".json")) return "file-type-json";
    return "file-type-js"; // افتراضي
  };

  const toggleFolder = () => {
    if (fileTree.isFolder === true) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="ml-1">
      <div className="flex items-center cursor-pointer" onClick={toggleFolder}>
        {fileTree.isFolder === true ? (
          <Icons
            name={isOpen ? "chevron-down" : "chevron-right"}
            width={16}
            height={16}
            className="mr-1"
          />
        ) : (
          <span className="ml-5"></span>
        )}
        <Icons name={getIcon()} width={16} height={16} className="mr-1" />
        <span>{fileTree.name}</span>
      </div>
      {fileTree.isFolder === true && isOpen && fileTree.children && (
        <div className="ml-3">
          {fileTree.children.map((file, index) => (
            <RecursiveComponent fileTree={file} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecursiveComponent;
