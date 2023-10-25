import React from "react";
import "../styles/Purchase.css";
import Navbar from "../components/Navbar";
import {Link} from 'react-router-dom';

function ProcessedPurchase(){
    return(
        <div>
            <Navbar showIcons={true} />
            <div className="centered">
                <div className="title">Su compra fue procesada</div>
                <Link to={"/"}>
                    <button className="buttonHome">Seguir navegando</button>
                </Link>
            </div>
        </div>
    );
}

export default ProcessedPurchase;