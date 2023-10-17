import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return ( 
  	<div className="navabar">
        <div className="leftSide">
        </div>
        <div className="rightSide">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </div>
    </div>
  );
};
 
 export default Navbar;