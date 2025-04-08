import './App.css'
import {LeftSidebar} from "./components/LeftSidebar.tsx";
import {RightSidebar} from "./components/RightSidebar.tsx";
import {CanvasArea} from "./components/CanvasArea.tsx";

function App() {

  return (
      <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">
          <LeftSidebar />
          <CanvasArea />
          <RightSidebar />
      </div>
  )
}

export default App
