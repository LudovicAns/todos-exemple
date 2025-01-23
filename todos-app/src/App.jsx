import './index.css'
import {Route, Routes} from "react-router";
import Todos from "./pages/Todos.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/auth/Register.jsx";
import Layout from "./layouts/Layout.jsx";

function App() {

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path={``} element={<Home/>}/>
            </Route>

            <Route element={<AuthLayout/>}>
                <Route path={`register`} element={<Register/>}/>
            </Route>

            <Route path={`todos`} element={<Todos/>}/>
        </Routes>
    );
}

export default App
