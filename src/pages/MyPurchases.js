import React from "react";
import "../styles/Purchase.css";
import Navbar from "../components/Navbar";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import back from "../components/assets/arrowBack.png";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { Dialog } from 'primereact/dialog';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function MyPurchases(){
    const [visible, setVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);


    const purchases = [
        {
            orderedNumber: "45677",
            date: "12/10/22",
            status: "Pendiente",
            total: "3500",
            cart: ["Producto 1", "Producto 2", "Producto 3", "Producto 4", "Producto 5", "Producto 6", 
                    "Producto 7", "Producto 8", "Producto 9", "Producto 10", "Producto 11", "Producto 12",
                    "Producto 13", "Producto 14", "Producto 15", "Producto 16", "Producto 17", "Producto 18"]
        },
        {
            orderedNumber: "12345",
            date: "12/10/22",
            status: "Pendiente",
            total: "75000",
            cart: ["Producto 2000", "Producto 2", "Producto 3", "Producto 4", "Producto 5"]
        },
        {
            orderedNumber: "434334",
            date: "12/10/22",
            status: "Agendada",
            total: "4500",
            cart: ["Producto 1000", "Producto 2", "Producto 3", "Producto 4", "Producto 5"]
        },
    ]

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
                    {purchases.map((purchase) => (
                    <div className="cardPurchase" key={purchase.orderedNumber}>
                        <div className="contentPurchase">
                            <div className="cardContentPurchase">
                                <div className="numPurchase">No. {purchase.orderedNumber}</div>
                                <div className="descriptionPurchase">
                                    <span style={{ color: purchase.status === 'Agendada' ? '#6d961a' : '#23aec1', fontWeight: 'bold', letterSpacing: '2px'}}>
                                        {purchase.status}
                                    </span>
                                </div>
                                <div className="descriptionPurchase">Fecha: {purchase.date}</div>
                                <div className="descriptionPurchase">Precio total: {purchase.total}</div>
                                <button className="buttonConsult" onClick={() => {setSelectedProduct(purchase); setVisible(true)}}>Ver productos</button>
                                <Dialog 
                                    visible={visible} 
                                    onHide={() => {setSelectedProduct(null); setVisible(false)}}
                                    style={{width: '50vw', height: '500px'}}
                                    header='Productos comprados'
                                    draggable={false}
                                    resizable={false}
                                    dismissableMask>
                                    {selectedProduct && selectedProduct.cart.map((product) => (
                                        <div className="descriptionPurchase"><li>{product}</li></div>
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