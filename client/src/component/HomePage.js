import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";



const HomePage=()=>{
    return(
        <div>
            <NavBar />
        </div>
    );
};

export default HomePage;
