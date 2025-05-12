import { appIconsPath } from '../constants';

interface IProps {
  iconName: string;
  className?: string;
}

const AppIcon = ({ iconName, className }: IProps) => {
  if (iconName && Object.prototype.hasOwnProperty.call(appIconsPath, iconName)) {
    const srcPath = appIconsPath[iconName];
    return <img src={srcPath} className={className} />;
  }
};

export default AppIcon;
