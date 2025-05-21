import ResizablePanels from './components/ResizablePanels';
import { EditorProvider } from './context/EditorContext';

function App() {
  return (
    <EditorProvider>
      <div className="flex h-screen w-screen overflow-hidden ">
        <ResizablePanels />
      </div>
    </EditorProvider>
  );
}

export default App;
