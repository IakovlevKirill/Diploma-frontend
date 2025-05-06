import './App.css'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {WorkSpace} from "./components/WorkSpace/WorkSpace.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Auth} from "./components/Auth.tsx";
import {PageNotFound} from "./components/PageNotFound.tsx";
import {Menu} from "./components/Menu/Menu.tsx";

const ProtectedRoute = ({ children } : any) => {
    const isAuthenticated = !!localStorage.getItem('authToken'); // Пример проверки авторизации

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return children;
};


export const App = () => {

  return (
      <Provider store={store}>
          <BrowserRouter>
                <Routes>

                    <Route path="/auth" element={<Auth/> }/>
                    <Route
                        index
                        path="/"
                        element={
                        <ProtectedRoute>
                            <Menu/>
                        </ProtectedRoute>}
                    />

                    <Route path="/workspace/:projectId" element={<WorkSpace/>}/>

                    <Route path="*" element={<PageNotFound />} />

                </Routes>
          </BrowserRouter>
      </Provider>
  )
}

export default App
