import React from "react";
import '../styles/Cart.css'; 
import Navbar from "../components/Navbar" 

function Cart() {
  return (
    <div className="Cart">
          <Navbar showIcons={true} />
    </div>
  );
}

export default Cart;