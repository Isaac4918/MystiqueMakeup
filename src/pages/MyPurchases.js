import React from "react";
import "../styles/Purchase.css";
import Navbar from "../components/Navbar";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import back from "../components/assets/arrowBack.png";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function MyPurchases(){
    const [visible, setVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [purchases, setPurchases] = useState([]);
    let username = localStorage.getItem('username');
    
    const getPurchases = async() => {
        const response = await fetch('http://localhost:5000/purchases/get/all',{
          method: 'GET',
          headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json' 
          }
        }).then(res => res.json());

        let purchasesListAll = [];
        for (let i = 0; i < response.length; i++) {
            purchasesListAll.push(response[i]);
        }

        let purchasesList = []; 
        purchasesListAll.forEach(element => {
            if(element.username === username){
                purchasesList.push(element);
            }
        });

        setPurchases(purchasesList);
    }

    useEffect(() => {
        getPurchases();
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className="MyPurchases">
            <Navbar showIcons={true} />
            <Link to={"/accountUser"}><button className="backManagement"><img src={back} alt=""/></button></Link>
            <h1>Mis compras</h1>
            <div className="containerPurchase">
                <Carousel responsive={responsive}>
                    {purchases.map((purchase, index) => (
                    <div className="cardPurchase" key={index}>
                        <div className="contentPurchase">
                            <div className="cardContentPurchase">
                                <div className="numPurchase">No. {purchase.orderNumber}</div>
                                <div className="descriptionPurchase">
                                    <span style={{ color: 
                                                    purchase.scheduled === "Pendiente" ? '#6d961a' :
                                                    purchase.scheduled === "cancelada" ?  '#6d961a' :
                                                    purchase.scheduled === "aceptada" ? '#23aec1' : 
                                                    purchase.scheduled === "rechazada" ? '#fd7b7b': '#23aec1', 
                                                fontWeight: 'bold', 
                                                letterSpacing: '2px'}}>
                                        {purchase.scheduled === 'Pendiente' ? 'Pendiente':
                                        purchase.scheduled === 'aceptada' ? 'Agendada' : 
                                        purchase.scheduled === 'rechazada' ? 'Rechazada' :
                                        purchase.scheduled === 'cancelada' ? 'Pendiente' : 'Agendada'}
                                    </span>
                                </div>
                                <div className="descriptionPurchase">Fecha: {purchase.paymentDate}</div>
                                <div className="descriptionPurchase">Precio total:  ₡{purchase.finalPrice}</div>
                                <button className="buttonConsult" onClick={() => {setSelectedProduct(purchase); setVisible(true)}}>Ver productos</button>
                                <Dialog 
                                    visible={visible} 
                                    onHide={() => {setSelectedProduct(null); setVisible(false)}}
                                    style={{width: '35vw', height: '500px'}}
                                    header='Productos comprados'
                                    draggable={false}
                                    resizable={false}
                                    dismissableMask>
                                    {selectedProduct && selectedProduct.cart.products.map((product, {username}) => (
                                        <div className="descriptionPurchase" key={username}>
                                            <li>{product.name} x{product.quantity} = {product.quantity * product.price}</li>
                                        </div>
                                    ))}
                                </Dialog>
                            </div>
                        </div>
                    </div>
            ))}
                </Carousel>
            </div>
        </div>
    );
}

export default MyPurchases;