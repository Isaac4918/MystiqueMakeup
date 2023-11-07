import React from "react";
import "../styles/Purchase.css";
import Navbar from "../components/Navbar";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import back from "../components/assets/arrowBack.png";
import {Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';

function DeliveryPending(){
    const [visible, setVisible] = useState(false);
    const [purchases, setPurchases] = useState([]);

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

        setPurchases(purchasesListAll);
    }

    useEffect(() => {
        getPurchases();
    }, []);

    return (
        <div className="MyPurchases">
            <Navbar showIcons={true} />
            <Link to={"/"}><button className="backManagement"><img src={back} alt=""/></button></Link>
            <h1>Entrega de Productos Pendientes</h1>
            <div className="containerPurchase">
                <Carousel responsive={responsive}>
                    {purchases.map((purchase, index) => (
                        <div className="cardPurchase" key={index}>
                            <div className="contentPurchase">
                                <div className="cardContentPurchase">
                                    <div className="numPurchase">No. {purchase.orderNumber}</div>
                                    <div className="descriptionPurchase">
                                        <span style={{ color: purchase.scheduled ? '#6d961a' : '#23aec1', fontWeight: 'bold', letterSpacing: '2px'}}>
                                            {purchase.scheduled ? 'Agendada' : 'Pendiente'}
                                        </span>
                                    </div>
                                    <div className="descriptionPurchase">Usuario: {purchase.username}</div>
                                    <div className="descriptionPurchase">Fecha de pago: {purchase.paymentDate}</div>
                                    <button className="buttonConsult" onClick={() => {setVisible(true)}}>Ver comprobante</button>
                                    <Dialog 
                                        visible={visible} 
                                        onHide={() => {setVisible(false)}}
                                        style={{width: '50vw', height: '500px'}}
                                        header='Comprobante de pago'
                                        draggable={false}
                                        resizable={false}
                                        dismissableMask>
                                            <div className="descriptionPurchase" key={purchase.username}><img src={purchase.receiptImageURL}/></div>
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

export default DeliveryPending;