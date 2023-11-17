import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import "../../styles/Product.css";
import back from "../../components/assets/arrowBack.png";
import { useNavigate } from 'react-router-dom'; 

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
    const [productList, setProductList] = useState({});
    const navigate = useNavigate();

    const getProduct = async () => {
        const response = await fetch( baseAPIurl + '/products/get/' + id , {
            method: 'GET',
        }).then(res => res.json());
        setProduct(response);
    }


    const getCart = async () => {
        console.log("Me estan agregando")
        const response = await fetch(baseAPIurl + '/shoppingCart/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': username
          }
        }).then(res => res.json());
        if(response.products === null || Object.keys(response.products).length === 0){
            console.log("array vacio")
            setProductList([])
        }else{
            console.log("array lleno")
            setProductList(response.products)
        }
        console.log(response.products)
        if(Array.isArray(productList)){
            console.log("ES UN ARRAY");
            let productAddedToCart = {
                id: product.id,
                quantity: 1,
                price: product.price,
                name: product.name,
                available: product.available,
                imageURL: product.imageURL
            }
            productList.push(productAddedToCart);
            console.log("Nuevo", productList);
            updateCart();
        }
    }


    const updateCart = async() =>{
        const response = await fetch(baseAPIurl + '/shoppingCart/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                products: productList
            })
        });
        if(response.ok){
            alert('Agregado con éxito');
        }
    }

    const addCart = () => {
        console.log(username);
        if(username === '' || username === null){
            navigate('/LoginRegister');
        } else if (product.available === '0'){
            alert("No hay más unidades disponibles");
        } else{
            getCart();
        }
    }


    const getAccount = async() => {
        const response = await fetch(baseAPIurl + '/getAccount',{
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
        console.log(username);
        if(username === '' || username === null){
            console.log("No hay usuario");
        }else{
            getAccount();
        }
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