import OpenedFilesBar from './components/OpenedFilesBar';
import RecursiveComponent from './components/RecursiveComponent';
import { fileTree } from './data/fileTree';

function App() {
  return (
    <div className="flex">
      <div className=" w-auto bg-[#252526] text-white border-2-gray-400 border-r h-[100vh]">
        <RecursiveComponent fileTree={fileTree} />
      </div>
      <div className=" w-full ">
        <OpenedFilesBar />
      </div>
    </div>
  );
}

export default App;
