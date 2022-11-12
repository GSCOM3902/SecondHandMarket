import React from "react";
import { Link } from "react-router-dom";

import MemberCenter from "./MemberCenter";
import ShoppingCart from "./ShoppingCart";


const NavBar=()=>{
    return(
        <div  className="Navbar">
            <div className="NavLoginButton">
                <MemberCenter />
            </div>
            <div className="NavShoppingCart"><ShoppingCart /></div>
            <div className="NavHomePageButton">
                <Link to="/">homepage</Link>
            </div>
            <div className="NavSearchBar">searchBar</div>
        </div>
    );
}

export default NavBar;