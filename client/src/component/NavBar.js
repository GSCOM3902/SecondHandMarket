import React from "react";
import { Link } from "react-router-dom";

import MemberCenter from "./MemberCenter";



const NavBar=()=>{
    return(
        <div  className="Navbar">
            <div className="NavHomePageButton">
                <Link to="/">homepage</Link>
            </div>
            <div className="NavSearchBar">searchBar</div>
            <div className="NavShoppingCar">shoppinCar</div>
            <div className="NavLoginButton">
                <MemberCenter />
            </div>
        </div>
    );
}

export default NavBar;