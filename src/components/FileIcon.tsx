<<<<<<< HEAD
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
=======
import { extensionIconPath } from '../constants';
import IconImg from './IconImg';

interface IProps {
  fileName: string;
  isFolder?: boolean;
  isOpened?: boolean;
}

const FileIcon = ({ fileName, isFolder, isOpened }: IProps) => {
  // تحويل اسم الملف للحروف الصغيرة للتعامل مع الحساسية
  const normalizedFileName = fileName.toLowerCase();
  // استخراج الامتداد
  const extension = normalizedFileName.split('.').pop();
  // تحقق من اسم الملف الكامل أولاً
  const key = Object.keys(extensionIconPath).find((k) => normalizedFileName === k) || extension;

  if (key && Object.prototype.hasOwnProperty.call(extensionIconPath, key)) {
    const srcPath = isFolder
      ? isOpened
        ? `${extensionIconPath[key]}-open.svg`
        : `${extensionIconPath[key]}.svg`
      : `${extensionIconPath[key]}.svg`;
    return <IconImg src={srcPath} />;
  }

  if (isFolder && isOpened) return <IconImg src="/vsc-icons/dark/folder-opened.svg" />;
  if (isFolder && !isOpened) return <IconImg src="/vsc-icons/dark/folder.svg" />;
  if (!isFolder) return <IconImg src="/vsc-icons/dark/file-code.svg" />;
>>>>>>> cceab709ebe8722bd31e978dc552656dcbb832e2
};

export default FileIcon;
