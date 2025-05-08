import OpenedFilesBar from './components/OpenedFilesBar';
import RecursiveComponent from './components/RecursiveComponent';
import { fileTree } from './data/fileTree';

function App() {
  return (
    <div className="flex overflow-hidden max-h-[100vh] ">
      <div className=" w-[300px] bg-[#252526] text-white border-2-gray-400 border-r max-h-[100vh] scroll-auto overflow-y-auto">
        <RecursiveComponent fileTree={fileTree} />
      </div>
      <div className="w-[calc(100%-300px)]">
        <OpenedFilesBar />
      </div>
    </div>
  );
}

export default App;
