import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./Login";
import HomePage from "./HomePage";
import Signup from "./Signup";
import Product from "./Product";
import ShoppingCartPage from "./ShoppingCartPage";


const App=()=>{

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="product/:productID" element={<Product />} />
                <Route path="shoppingCartPage/:memberID" element={<ShoppingCartPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;