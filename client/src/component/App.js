import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import Login from "./Login";
import HomePage from "./HomePage";



const App=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;