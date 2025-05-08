import { appIconsPath } from '../constants';

interface IProps {
  iconName: string;
}

const AppIcon = ({ iconName }: IProps) => {
  if (iconName && Object.prototype.hasOwnProperty.call(appIconsPath, iconName)) {
    const srcPath = appIconsPath[iconName];
    return <img src={srcPath} />;
  }
};

export default AppIcon;
