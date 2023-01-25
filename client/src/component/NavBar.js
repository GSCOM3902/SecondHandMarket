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
                <a href="/">
                    <div className="homePageIcon"></div>
                </a>
                {/* 首頁使用 a tag，因為我希望返回首頁是把所有資料刷新 */}
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