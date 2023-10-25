import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Product.css";
import back from "../components/assets/arrowBack.png";
import polvos from "../components/assets/polvos.jpg";

function ProductScreen(){
    return(
        <div>
            <Navbar showIcons={true} />
            <div className="pageProductScreen">
                <div className="buttonBack"> 
                    <a href="/"><img src={back} alt=""/></a>
                </div>
                <section class="layout">
                    <div>
                        <h1>Polvo magico</h1>
                        <img src={polvos} alt=""/>
                    </div>
                    <div className="infoContainer">
                        <h2>Descripción: </h2>
                        <p>Polvitosssssswfbwjkenfjknenfewnvjnevwnejkvnewjnvjkwnevkjnwe</p>
                        <h2>Precio: </h2>
                        <p>$1200</p>
                        <h2>Cantidad disponible: </h2>
                        <p>20</p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ProductScreen;