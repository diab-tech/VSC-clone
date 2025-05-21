import { appIconsPath } from '../constants';

interface IProps {
  iconName: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const AppIcon = ({ iconName, className, onClick }: IProps) => {
  if (iconName && Object.prototype.hasOwnProperty.call(appIconsPath, iconName)) {
    const srcPath = appIconsPath[iconName];
    return <img src={srcPath} className={className} onClick={onClick} />;
  }
};

export default AppIcon;
