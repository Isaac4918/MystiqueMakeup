import React from "react";
import "../styles/Product.css";
import Navbar from "../components/Navbar";
import back from "../components/assets/arrowBack.png";
import polvos from "../components/assets/polvos.jpg";
import {Link} from 'react-router-dom';

function ModifyProduct(props) {
    return (
        <div className="ModifyProduct">
            <Navbar showIcons={true} />
                <Link to={"/ProductManagement"}><button className="backManagement"><img src={back} alt=""/></button></Link>
                <h1>Polvo mágico</h1>
                <section class="layoutModifyProduct">
                    <div>
                        <label>Nombre</label><br />
                        <input type="text" id="nameProduct" name="nameProduct"/><br />
                    
                        <label>Descripción</label><br />
                        <input type="text" id="descriptionProduct" name="descriptionProduct"/><br />

                        <label>Precio</label><br />
                        <input type="text" id="priceProduct" name="priceProduct"/><br />

                        <label>Disponibles</label><br />
                        <input type="text" id="availableProduct" name="availableProduct"/><br />

                        <Link to={"/ProductManagement"}><button className="buttonModifyProduct">Modificar producto</button></Link>
                    </div>

                    <div>
                        <img src={polvos} alt=""/>
                        <Link to={"/"}><button className="buttonLoadImage">Cargar imagen</button></Link>
                    </div>
                </section>
        </div>
    );
}

export default ModifyProduct;