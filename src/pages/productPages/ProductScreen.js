import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import "../../styles/Product.css";
import back from "../../components/assets/arrowBack.png";

export function BackMain(){
    return(
        <div className="backManagement"> 
            <a href="/"><img src={back} alt=""/></a>
        </div>
    )
}

function ProductScreen(){
    let { id } = useParams();
    const [product, setProduct] = useState({});
    const baseAPIurl = 'http://localhost:5000';

    const getProduct = async () => {
        const response = await fetch( baseAPIurl + '/products/get/' + id , {
            method: 'GET',
        }).then(res => res.json());
        setProduct(response);
    }

    getProduct();

    return(
        <div>
            <Navbar showIcons={true} />
            <BackMain />
            <div className="pageProductScreen">
                <section className="layout">
                    <div>
                        <h1>{product.name}</h1>
                        <img src={product.imageURL} alt=""/>
                    </div>
                    <div className="infoContainer">
                        <h2>Descripción: </h2>
                        <p>{product.description}</p>
                        <h2>Precio: </h2>
                        <p>{"₡ " + product.price}</p>
                        <h2>Cantidad disponible: </h2>
                        <p>{product.available}</p>
                        <button className="buttonAgregarCarrito">Agregar al carrito</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ProductScreen;