import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface IProps {
  content: string | undefined | null;
}

const FileSyntaxHighlighter = ({ content }: IProps) => {
  return (
    <div>
      <SyntaxHighlighter
        language="tsx" // أو js أو ts أو html حسب الكود
        style={atomDark}
        showLineNumbers
        wrapLongLines
        customStyle={{
          padding: '20px 0 0 0px',
          margin: '0',
          borderRadius: '0',
          backgroundColor: '#1e1e1e',
          lineHeight: '1.6',
          wordSpacing: '0.5ch',
          whiteSpace: 'pre-wrap',

          // wordBreak: 'break-word',
        }}
        codeTagProps={{
          style: {
            fontFamily: 'Fira Code, Consolas, monospace',
            fontSize: '16px',
            whiteSpace: 'pre-wrap',
            // wordBreak: 'break-word',
            padding: '0 0 200px 0px',
            display: 'block',
            paddingLeft: '2ch',
          },
        }}
        wrapLines
        // wrapLongLines
        // showLineNumbers
        showInlineLineNumbers
        lineNumberStyle={{
          minWidth: '2ch',
          paddingLeft: '4px',
          paddingRight: '20px',
        }}
      >
        {content ?? ''}
      </SyntaxHighlighter>
    </div>
  );
};

export default FileSyntaxHighlighter;
