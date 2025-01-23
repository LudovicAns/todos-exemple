import './index.css'
import {Route, Routes} from "react-router";
import Todos from "./pages/Todos.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/auth/Register.jsx";

function App() {

    return (
        <Routes>
            <Route index element={<Home/>}/>

            <Route element={<AuthLayout/>}>
                <Route path={`register`} element={<Register/>}></Route>
            </Route>

            <Route path={`todos`} element={<Todos/>}/>
        </Routes>
    );
}

export default App
