import React from "react";
import { Link } from "react-router-dom";


const NavBar=()=>{
    return(
        <div  className="Navbar">
            <div className="NavHomePageButton">HomePage</div>
            <div className="NavSearchBar">searchBar</div>
            <div className="NavShoppingCar">shoppinCar</div>
            <div className="NavLoginButton">
                <Link to="/login" >
                    member center
                </Link>
            </div>
        </div>
    );
}

export default NavBar;