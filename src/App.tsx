import './App.css'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {InfiniteGameDesignDashboard} from "./components/infiniteGameDesignDashboard/infiniteGameDesignDashboard.tsx";

function App() {

  return (
      <Provider store={store}>
          <InfiniteGameDesignDashboard></InfiniteGameDesignDashboard>
      </Provider>
  )
}

export default App
