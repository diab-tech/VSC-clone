import RecursiveComponent from "./components/RecursiveComponent";
import { fileTree } from "./data/fileTree";

function App() {
  return (
    <>
      <RecursiveComponent fileTree={fileTree} />
    </>
  );
}

export default App;
