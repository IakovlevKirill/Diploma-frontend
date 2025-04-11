import './App.css'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {InfiniteGameDesignDashboard} from "./components/infiniteGameDesignDashboard/infiniteGameDesignDashboard.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

  return (
      <Provider store={store}>
          <BrowserRouter>
                <Routes>
                    <Route path="/" element={<InfiniteGameDesignDashboard/> }/>
                </Routes>
          </BrowserRouter>
      </Provider>
  )
}

export default App
