import React from "react";
import "../styles/Navbar.css";
import searchIcon from "../components/assets/search.png";
import shoppingIcon from "../components/assets/shoppingbag.png";
import accountIcon from "../components/assets/user.png";

const Navbar = () => {
  return ( 
  	<div className="navbar">
        <div className="leftSide">
            <a href="/"><h2>Mystique Makeup</h2></a>
        </div>
        <div className="rightSide">
          <li><a href="/"><img src={shoppingIcon} alt=""/></a></li>
          <li><a href="/LoginRegister"><img src={accountIcon} alt=""/></a></li>
          <li><a href="/"><img src={searchIcon} alt=""/></a></li>
        </div>
    </div>
  );
};
 
export default Navbar;