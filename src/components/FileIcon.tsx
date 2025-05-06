import React from "react";
import Icons from "./SVG/icons";

interface IProps {
  fileName: string;
  isFolder: boolean;
}

const FileIcon = ({ fileName, isFolder }: IProps) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  const getIconName = () => {
    if (isFolder) {
      if (fileName === "node_modules") return "folder-node_modules";
      if (fileName === ".git") return "folder-git";
      if (fileName === "tests" || fileName === "__tests__") return "folder-tests";
      if (fileName === "dist") return "folder-dist";
      return "folder";
    } else {
      // خريطة الامتدادات
      const iconMap: { [key: string]: string } = {
        js: "file-type-js",
        ts: "file-type-typescript",
        json: "file-type-json",
        py: "file-type-python",
        css: "file-type-css",
        html: "file-type-html",
        java: "file-type-java",
        php: "file-type-php",
        md: "file-type-markdown",
        yaml: "file-type-yaml",
        yml: "file-type-yaml",
        xml: "file-type-xml",
        sql: "file-type-sql",
        go: "file-type-go",
        rb: "file-type-ruby",
        vue: "file-type-vue",
        jsx: "file-type-jsx",
        tsx: "file-type-tsx",
        png: "file-type-png",
        jpg: "file-type-jpg",
      };

      return iconMap[extension] || "file-type-html"; // افتراضي
    }
  };

  return <Icons name={getIconName()} width={16} height={16} />;
};

export default FileIcon;
