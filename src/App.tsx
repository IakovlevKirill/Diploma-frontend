import './App.css'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {WorkSpace} from "./components/WorkSpace/WorkSpace.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Auth} from "./components/Auth/Auth.tsx";
import {PageNotFound} from "./components/PageNotFound.tsx";
import {MenuLayout} from "./components/Menu/MenuLayout.tsx";
import {Menu} from "./components/Menu/Menu.tsx";
import {Profile} from "./components/Menu/Profile/Profile.tsx";
import {Teams} from "./components/Menu/Teams/Teams.tsx";
import {Inbox} from "./components/Menu/Inbox/Inbox.tsx";
import Templates from "./components/Menu/Templates/Templates.tsx";

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
                        path="/"
                        element={
                            <ProtectedRoute>
                                <MenuLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/menu" element={<Menu />}></Route>
                        <Route path="/profile" element={<Profile />}></Route>
                        <Route path="/teams" element={<Teams />}></Route>
                        <Route path="/inbox" element={<Inbox />}></Route>
                        <Route path="/templates" element={<Templates />}></Route>

                    </Route>

                    <Route path="/workspace/:projectId" element={<WorkSpace/>}/>

                    <Route path="*" element={<PageNotFound />} />

                </Routes>
          </BrowserRouter>
      </Provider>
  )
}

export default App
