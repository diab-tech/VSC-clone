import AppIcon from './AppIcons';

interface IProps {}

const WelcomeTab = ({}: IProps) => {
  return (
    <div className=" h-64 ">
      <AppIcon iconName="vscode" className="w-64 h-64 " />
    </div>
  );
};

export default WelcomeTab;
