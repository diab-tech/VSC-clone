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

  if (isFolder && isOpened) return <IconImg src="/icons/folder-vscode-open.svg" />;
  if (isFolder && !isOpened) return <IconImg src="/icons/folder-vscode.svg" />;
  if (!isFolder) return <IconImg src="/icons/dark/file.svg" />;
};

export default FileIcon;
