import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface IProps {
  content: string | undefined;
}

const FileSyntaxHighlighter = ({ content }: IProps) => {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={atomDark}
      WrapLongLines={true}
      customStyle={{
        minHeight: 'calc(100vh - 40px)',
        padding: '0',
        paddingBottom: '600px',
        borderRadius: '0',
        margin: '0',
        overflowX: 'auto',
        // whiteSpace: 'pre-wrap',
        // wordBreak: 'break-word',
      }}
      codeTagProps={{
        style: {
          // whiteSpace: 'pre-wrap',
          // wordBreak: 'break-word',
          display: 'block',
          paddingLeft: '3ch',
        },
      }}
      showLineNumbers
      lineNumberStyle={{
        minWidth: '2ch',
        paddingLeft: '4px',
        paddingRight: '20px',
      }}
    >
      {content ?? ''}
    </SyntaxHighlighter>
  );
};

export default FileSyntaxHighlighter;
