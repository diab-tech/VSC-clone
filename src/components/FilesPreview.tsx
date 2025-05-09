import { useSelector } from 'react-redux';
import FileSyntaxHighlighter from './SyntaxHighlighter';
import { RootState } from '../app/store';

interface IProps {}

const FilesPreview = ({}: IProps) => {
  const { openedFiles, clickedFile } = useSelector((state: RootState) => state.fileTreeSlice);

  return (
    <>
      <div className="flex-1 h-full overflow-x-hidden bg-[#1E1E1E] ">
        <FileSyntaxHighlighter content={clickedFile.fileContent} />
      </div>
    </>
  );
};

export default FilesPreview;
