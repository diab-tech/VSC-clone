// Updated default data to match VSCode's structure
import { v4 as uuidv4 } from 'uuid';
import { IFile } from '../../interface';

// More realistic VSCode-like default tree structure
export const createDefaultTree = (): IFile => {
  return {
    id: 'root',
    name: 'root',
    isFolder: true,
    children: [
      {
        id: uuidv4(),
        name: 'src',
        isFolder: true,
        children: [
          {
            id: uuidv4(),
            name: 'components',
            isFolder: true,
            children: [
              {
                id: uuidv4(),
                name: 'App.tsx',
                isFolder: false,
                content: `import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Editor } from './Editor';
import { Footer } from './Footer';
import './App.css';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div className={\`app \${theme}\`}>
      <Header onThemeToggle={toggleTheme} currentTheme={theme} />
      <div className="main-container">
        <Sidebar />
        <Editor />
      </div>
      <Footer />
    </div>
  );
};

export default App;`
              },
              {
                id: uuidv4(),
                name: 'Header.tsx',
                isFolder: false,
                content: `import React from 'react';
import './Header.css';

interface HeaderProps {
  onThemeToggle: () => void;
  currentTheme: 'light' | 'dark';
}

export const Header: React.FC<HeaderProps> = ({ onThemeToggle, currentTheme }) => {
  return (
    <header className="header">
      <div className="logo">VSCode Clone</div>
      <nav className="nav">
        <ul>
          <li>File</li>
          <li>Edit</li>
          <li>View</li>
          <li>Help</li>
        </ul>
      </nav>
      <button onClick={onThemeToggle} className="theme-toggle">
        {currentTheme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  );
};`
              },
              {
                id: uuidv4(),
                name: 'Sidebar.tsx',
                isFolder: false,
                content: `import React from 'react';
import './Sidebar.css';

export const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-icons">
        <div className="icon active" title="Explorer">
          <span>📁</span>
        </div>
        <div className="icon" title="Search">
          <span>🔍</span>
        </div>
        <div className="icon" title="Source Control">
          <span>⑂</span>
        </div>
        <div className="icon" title="Run and Debug">
          <span>▶</span>
        </div>
        <div className="icon" title="Extensions">
          <span>⧉</span>
        </div>
      </div>
      <div className="sidebar-content">
        <div className="explorer">
          <h3>EXPLORER</h3>
          <div className="folder">
            <span>📁 src</span>
            <div className="nested">
              <span>📁 components</span>
              <div className="nested">
                <span>📄 App.tsx</span>
                <span>📄 Header.tsx</span>
                <span>📄 Sidebar.tsx</span>
                <span>📄 Editor.tsx</span>
                <span>📄 Footer.tsx</span>
              </div>
              <span>📁 utils</span>
              <div className="nested">
                <span>📄 helpers.ts</span>
                <span>📄 constants.ts</span>
              </div>
            </div>
            <span>📄 index.tsx</span>
            <span>📄 README.md</span>
            <span>📄 package.json</span>
          </div>
        </div>
      </div>
    </div>
  );
};`
              },
              {
                id: uuidv4(),
                name: 'Editor.tsx',
                isFolder: false,
                content: `import React, { useState } from 'react';
import './Editor.css';

export const Editor: React.FC = () => {
  const [content, setContent] = useState(\`import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My VSCode Clone</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
\`);

  return (
    <div className="editor">
      <div className="tabs">
        <div className="tab active">App.tsx</div>
        <div className="tab">Header.tsx</div>
        <div className="tab">Sidebar.tsx</div>
      </div>
      <div className="editor-content">
        <div className="line-numbers">
          {content.split('\\n').map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          spellCheck="false"
        />
      </div>
    </div>
  );
};`
              },
              {
                id: uuidv4(),
                name: 'Footer.tsx',
                isFolder: false,
                content: `import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="status">
        <span>🔔 0</span>
        <span>⚠️ 0</span>
        <span>✓ Ready</span>
      </div>
      <div className="info">
        <span>UTF-8</span>
        <span>TypeScript</span>
        <span>Spaces: 2</span>
        <span>Ln 1, Col 1</span>
      </div>
    </footer>
  );
};`
              }
            ]
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
                content: `/**
 * Collection of helper functions for the application
 */

/**
 * Debounce function to limit how often a function is called
 * @param func The function to debounce
 * @param wait Wait time in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format a date to a readable string
 * @param date The date to format
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Check if an object is empty
 * @param obj The object to check
 */
export function isEmpty(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0;
}
`
              },
              {
                id: uuidv4(),
                name: 'constants.ts',
                isFolder: false,
                content: `/**
 * Application constants
 */

export const API_URL = 'https://api.example.com';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  HIGH_CONTRAST: 'high-contrast'
};

export const FILE_TYPES = {
  JAVASCRIPT: 'js',
  TYPESCRIPT: 'ts',
  REACT: 'tsx',
  HTML: 'html',
  CSS: 'css',
  JSON: 'json',
  MARKDOWN: 'md'
};

export const KEYBOARD_SHORTCUTS = {
  SAVE: 'Ctrl+S',
  FIND: 'Ctrl+F',
  REPLACE: 'Ctrl+H',
  NEW_FILE: 'Ctrl+N',
  CLOSE_TAB: 'Ctrl+W',
  FORMAT_DOCUMENT: 'Shift+Alt+F'
};

export const MAX_RECENT_FILES = 10;
export const AUTO_SAVE_DELAY = 1000; // milliseconds
`
              }
            ]
          },
          {
            id: uuidv4(),
            name: 'index.tsx',
            isFolder: false,
            content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
          }
        ]
      },
      {
        id: uuidv4(),
        name: 'public',
        isFolder: true,
        children: [
          {
            id: uuidv4(),
            name: 'index.html',
            isFolder: false,
            content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="VSCode Clone created with React"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>VSCode Clone</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
`
          },
          {
            id: uuidv4(),
            name: 'manifest.json',
            isFolder: false,
            content: `{
  "short_name": "VSCode Clone",
  "name": "Visual Studio Code Clone",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
`
          }
        ]
      },
      {
        id: uuidv4(),
        name: 'package.json',
        isFolder: false,
        content: `{
  "name": "vscode-clone",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.11",
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.4",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
`
      },
      {
        id: uuidv4(),
        name: 'tsconfig.json',
        isFolder: false,
        content: `{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
`
      },
      {
        id: uuidv4(),
        name: 'README.md',
        isFolder: false,
        content: `# VSCode Clone

This project is a clone of Visual Studio Code built with React and TypeScript.

## Features

- File explorer with folder structure
- Syntax highlighting for multiple languages
- Multiple tabs support
- Light and dark theme
- Basic editor functionality

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   \`\`\`
   git clone https://github.com/yourusername/vscode-clone.git
   \`\`\`

2. Install dependencies
   \`\`\`
   cd vscode-clone
   npm install
   \`\`\`

3. Start the development server
   \`\`\`
   npm start
   \`\`\`

## Project Structure

- \`src/components\`: React components
- \`src/utils\`: Helper functions and constants
- \`public\`: Static assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
`
      }
    ]
  };
};

// Helper to ensure all files have content
export const ensureFileContent = (node: IFile): IFile => {
  // If this is a file with no content, add empty content
  if (!node.isFolder && node.content === undefined) {
    return { ...node, content: '' };
  }
  
  // If it has children, process them recursively
  if (node.children) {
    return {
      ...node,
      children: node.children.map(ensureFileContent)
    };
  }
   
  return node;
};
