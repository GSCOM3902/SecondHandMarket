import React,{useState} from "react";
import { Link } from "react-router-dom";

import MemberCenter from "./MemberCenter";
import ShoppingCart from "./ShoppingCart";
import SearchBar from "./SearchBar";


const NavBar=(props)=>{

 

    return(
        <div  className="Navbar">
            <div className="NavLoginButton">
                <MemberCenter />
            </div>
            <div className="NavShoppingCart"><ShoppingCart /></div>
            <div className="NavHomePageButton">
                <Link to="/"><div className="homePageIcon"></div></Link>
            </div>
            <div className="NavSearchBar">
                <SearchBar 
                    changeSearchText={props.changeSearchText}
                />
            </div>
        </div>
    );
}

export default NavBar;