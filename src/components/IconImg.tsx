interface IProps {
  src: string;
}

const IconImg = ({ src }: IProps) => {
  return <img src={src} className="w-5 h-5" />;
};

export default IconImg;
