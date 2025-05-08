interface IProps {
  src: string;
}

const IconImg = ({ src }: IProps) => {
  return <img src={src} className="w-4 h-4" />;
};

export default IconImg;
