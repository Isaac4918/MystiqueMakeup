import React, { useState, useEffect } from "react";
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
    let username = localStorage.getItem('username');
    const [visible, setVisible] = useState(true);
    let productAdded = [];

    const getProduct = async () => {
        const response = await fetch( baseAPIurl + '/products/get/' + id , {
            method: 'GET',
        }).then(res => res.json());
        setProduct(response);
    }

    /*
    username: pObj.username,
    products: pObj.products

    export interface ProductAddedToCart {
    productId: number;
    quantity: number;
    price: number;
    }

    export interface ShoppingCart {
    username: string;
    products: ProductAddedToCart[];
    }
    */

    const updateCart = async() =>{
        const response = await fetch('http://localhost:5000/shoppingCart/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                products: productAdded
            })
        });
    }

    const addCart = () => {
        productAdded.push(product);
        console.log(productAdded);
        updateCart();
    }


    const getAccount = async() => {
        const response = await fetch('http://localhost:5000/getAccount',{
          method: 'GET',
          headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': username 
          }
        });
    
        if(response.ok){
          const data = await response.json();
          if(data.account.admin === true){
            setVisible(false);
          }else{
            setVisible(true);
          }
        }
        
    }

    useEffect(() => {
        getAccount();
    }, []);

    getProduct();


    return(
        <div>
            <Navbar showIcons={false} />
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
                        {visible && 
                        <button className="buttonAgregarCarrito" onClick={addCart}>Agregar al carrito</button>
                        }
                        
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ProductScreen;