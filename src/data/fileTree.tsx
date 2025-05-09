import { IFile } from '../interface';
import { v4 as uuidv4 } from 'uuid';

export const fileTree: IFile = {
  id: uuidv4(),
  name: 'VSC-clone',
  isFolder: true,
  children: [
    {
      id: uuidv4(),
      name: 'public',
      isFolder: true,
      children: [
        {
          id: uuidv4(),
          name: 'vite.svg',
          isFolder: false,
        },
        {
          id: uuidv4(),
          name: 'favicon.ico',
          isFolder: false,
        },
        {
          id: uuidv4(),
          name: 'index.html',
          isFolder: false,
        },
        {
          id: uuidv4(),
          name: 'robots.txt',
          isFolder: false,
        },
      ],
    },
    {
      id: uuidv4(),
      name: 'node_modules',
      isFolder: true,
      children: [
        {
          id: uuidv4(),
          name: 'tailwind.css',
          isFolder: false,
        },
        {
          id: uuidv4(),
          name: 'react',
          isFolder: true,
          children: [
            {
              id: uuidv4(),
              name: 'package.json',
              isFolder: false,
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      name: 'src',
      isFolder: true,
      children: [
        {
          id: uuidv4(),
          name: 'assets',
          isFolder: true,
          children: [
            {
              id: uuidv4(),
              content: `import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
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
        paddingRight: '8px',
      }}
    >
      {content ?? ''}
    </SyntaxHighlighter>
  );
};

export default FileSyntaxHighlighter customStyle lorem kl; k;klk ;lklk;l ;kl;kl; lk;lk;kl  ;lkl; ;lk;lk; lk;lkl ;;klk;lk; ={{
    minHeight: 'calc(100vh - 40px)',
    padding: '0',
    paddingBottom: '600px',
    borderRadius: '0',
    margin: '0',
    overflowY: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  }};
`,
              name: 'react.jsx',
              isFolder: false,
            },
            {
              id: uuidv4(),
              name: 'logo.png',
              isFolder: false,
            },
            {
              id: uuidv4(),
              name: 'banner.jpg',
              isFolder: false,
            },
            {
              id: uuidv4(),
              name: 'style.css',
              isFolder: false,
            },
          ],
        },
        {
          id: uuidv4(),
          name: 'components',
          isFolder: true,
          children: [
            {
              id: uuidv4(),
              name: 'Header.tsx',
              isFolder: false,
            },
            {
              id: uuidv4(),
              name: 'Footer.jsx',
              isFolder: false,
            },
            {
              id: uuidv4(),
              name: 'Sidebar.js',
              isFolder: false,
            },
          ],
        },
        {
          id: uuidv4(),
          name: 'pages',
          isFolder: true,
          children: [
            {
              id: uuidv4(),
              name: 'Home.tsx',
              isFolder: false,
            },
            {
              id: uuidv4(),
              name: 'About.jsx',
              isFolder: false,
            },
          ],
        },
        {
          id: uuidv4(),
          name: 'utils',
          isFolder: true,
          children: [
            {
              id: uuidv4(),
              name: 'helpers.ts',
              isFolder: false,
            },
            {
              id: uuidv4(),
              name: 'api.js',
              isFolder: false,
            },
          ],
        },
        {
          id: uuidv4(),
          name: 'styles',
          isFolder: true,
          children: [
            {
              id: uuidv4(),
              name: 'global.css',
              isFolder: false,
            },
            {
              id: uuidv4(),
              name: 'variables.scss',
              isFolder: false,
            },
            {
              id: uuidv4(),
              name: 'theme.less',
              isFolder: false,
            },
          ],
        },
        {
          id: uuidv4(),
          name: 'App.tsx',
          isFolder: false,
        },
        {
          id: uuidv4(),
          name: 'index.ts',
          isFolder: false,
        },
        {
          id: uuidv4(),
          name: 'main.jsx',
          isFolder: false,
        },
      ],
    },
    {
      id: uuidv4(),
      name: '.git',
      isFolder: true,
      children: [
        {
          id: uuidv4(),
          name: 'config',
          isFolder: false,
        },
        {
          id: uuidv4(),
          name: 'HEAD',
          isFolder: false,
        },
      ],
    },
    {
      id: uuidv4(),
      name: '.gitignore',
      isFolder: false,
    },
    {
      id: uuidv4(),
      name: 'package.json',
      isFolder: false,
    },
    {
      id: uuidv4(),
      name: 'package-lock.json',
      isFolder: false,
    },
    {
      id: uuidv4(),
      name: 'tsconfig.json',
      isFolder: false,
    },
    {
      id: uuidv4(),
      name: 'vite.config.ts',
      isFolder: false,
    },
    {
      id: uuidv4(),
      name: 'README.md',
      isFolder: false,
    },
    {
      id: uuidv4(),
      name: 'Dockerfile',
      isFolder: false,
    },
    {
      id: uuidv4(),
      name: '.dockerignore',
      isFolder: false,
    },
    {
      id: uuidv4(),
      name: '.env',
      isFolder: false,
    },
    {
      id: uuidv4(),
      name: '.env.example',
      isFolder: false,
    },
    {
      id: uuidv4(),
      name: 'LICENSE',
      isFolder: false,
    },
    {
      id: uuidv4(),
      name: 'CHANGELOG.md',
      isFolder: false,
    },
    {
      id: uuidv4(),
      name: 'tests',
      isFolder: true,
      children: [
        {
          id: uuidv4(),
          name: 'unit.test.js',
          isFolder: false,
        },
        {
          id: uuidv4(),
          name: 'integration.test.ts',
          isFolder: false,
        },
      ],
    },
  ],
};
