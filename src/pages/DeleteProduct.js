import React from 'react';
import Navbar from "../components/Navbar";
import {Link} from 'react-router-dom';
import back from "../components/assets/arrowBack.png";

function DeleteProduct() {
    return (
        <div>
            <Navbar showIcons={true} />
            <Link to={"/ProductManagement"}><button className="backManagement"><img src={back} alt=""/></button></Link>
            <div className="centered">
                <div className="title">¿De verdad desea eliminar?</div>
                <Link to={"/ProductManagement"}>
                    <button className="buttonDeleteProduct">Confirmar</button>
                </Link>
            </div>
        </div>
    );
}

export default DeleteProduct;
