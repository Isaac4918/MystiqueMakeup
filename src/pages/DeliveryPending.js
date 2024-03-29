import React from "react";
import "../styles/Purchase.css";
import Navbar from "../components/Navbar";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import back from "../components/assets/arrowBack.png";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { parseISO } from 'date-fns';

function DeliveryPending() {
    const [visible, setVisible] = useState(false);
    const [purchases, setPurchases] = useState([]);
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [details, setDetails] = useState('');
    const [finalPrice, setFinalPrice] = useState(0);
    const [orderNumber, setOrderNumber] = useState(0);
    const [partialPrice, setPartialPrice] = useState(0);
    const [paymentDate, setPaymentDate] = useState('');
    const [receiptImageURL, setReceiptImageURL] = useState('');
    const [cart, setCart] = useState({});
    const [scheduled, setScheduled] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [receiptImagePath, setReceiptImagePath] = useState('');
    const baseAPIurl = 'http://localhost:5000';

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

    const getPurchases = async () => {
        const response = await fetch(baseAPIurl + '/purchases/get/all', {
            method: 'GET',
            headers: {
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

    const validateDateAvailability = async (pDate) => {
        const response = await fetch(baseAPIurl + '/agenda/get/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json());
        //checks if the date the user wants to schedule is available based on the start and end dates of the agenda events
        let available = true;
        for (let i = 0; i < response.length; i++) {
            let auxEvent = response[i];
            let start = new Date(parseISO(auxEvent.start));
            let end = new Date(parseISO(auxEvent.end));

            if ((pDate >= start.getTime() && pDate <= end.getTime()) || (pDate === start.getTime() && pDate === end.getTime())) {
                if (auxEvent.type === "Taller") {
                    let year = pDate.getFullYear();
                    let month = pDate.getMonth() + 1; // months are zero indexed
                    let day = pDate.getDate();
                    let formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
                    let tmpAvailable = window.confirm("El taller: '" + auxEvent.title + "' está programado el: " + formattedDate
                        + ", ¿desea programar la entrega ese día de igual forma?");
                    available = tmpAvailable;
                } else {
                    available = false;
                }
            }
        }
        console.log(available);
        return available;
    }


    const updateAcceptedDelivery = async () => {
        let date = new Date();
        date.setHours(0, 0, 0, 0);

        let dayNumber = date.getDay(); // 0d 1l 2k 3m 4j 5v 6s

        if (dayNumber === 1 || dayNumber === 3 || dayNumber === 5) {
            date.setDate(date.getDate() + 1); // add one day to the date
        }
        else if (dayNumber === 0 || dayNumber === 2 || dayNumber === 4) {
            date.setDate(date.getDate() + 2); // add two days to the date
        } else {
            date.setDate(date.getDate() + 3) //add three days to the date
        }

        //console.log("DATEEEEEE", date);
        let tmpAvailability = await validateDateAvailability(date);
        console.log(tmpAvailability);

        if (tmpAvailability === false) {
            let tmpDay = date.getDay();
            console.log(tmpDay);
            //if the date is not available, add until it is the next available date that is tuesday, thursday or saturday
            date.setDate(date.getDate() + 1);
            tmpDay = date.getDay();
            while (true) {
                if (tmpDay === 1 || tmpDay === 3 || tmpDay === 5 || tmpDay === 0) {
                    date.setDate(date.getDate() + 1);
                    tmpDay = date.getDay();
                } else {
                    let tmpAvailability2 = await validateDateAvailability(date);
                    if (tmpAvailability2 === true) {
                        break;
                    }
                    else {
                        date.setDate(date.getDate() + 1);
                        tmpDay = date.getDay();
                    }
                }
            }
        }

        let year = date.getFullYear();
        let month = date.getMonth() + 1; // months are zero indexed
        let day = date.getDate();
        let formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;

        const response = await fetch(baseAPIurl + '/purchases/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                orderNumber: orderNumber,
                username: username,
                address: address,
                receiptImagePath: receiptImagePath,
                receiptImageURL: receiptImageURL,
                partialPrice: partialPrice,
                finalPrice: finalPrice,
                scheduled: "aceptada",
                paymentDate: paymentDate,
                deliveryDate: formattedDate,
                cart: cart,
                details: details
            })
        })
        if (response.status === 200) {
            alert("Entrega agendada para el " + formattedDate);
            setVisible(false);
            window.location.reload();
        }
    }

    const updateDeclinedDelivery = async () => {
        const response = await fetch(baseAPIurl + '/purchases/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                orderNumber: orderNumber,
                username: username,
                address: address,
                receiptImagePath: receiptImagePath,
                receiptImageURL: receiptImageURL,
                partialPrice: partialPrice,
                finalPrice: finalPrice,
                scheduled: "rechazada",
                paymentDate: paymentDate,
                deliveryDate: '',
                cart: cart,
                details: details
            })
        })
        if (response.status === 200) {
            alert("Entrega rechazada");
            setVisible(false);
            window.location.reload();
        }
    }

    useEffect(() => {
        getPurchases();
    }, []);

    return (
        <div className="MyPurchases">
            <Navbar showIcons={true} />
            <Link to={"/"}><button className="backManagement"><img src={back} alt="" /></button></Link>
            <h1>Entrega de Productos Pendientes</h1>
            <div className="containerPurchase">
                <Carousel responsive={responsive}>
                    {purchases.map((purchase, index) => (
                        <div className="cardPurchase" key={index}>
                            <div className="contentPurchase">
                                <div className="cardContentPurchase">
                                    <div className="numPurchase">No. {purchase.orderNumber}</div>
                                    <div className="descriptionPurchase">
                                        <span style={{
                                            color:
                                                purchase.scheduled === "Pendiente" ? '#6d961a' :
                                                    purchase.scheduled === "cancelada" ? '#6d961a' :
                                                        purchase.scheduled === "aceptada" ? '#23aec1' :
                                                            purchase.scheduled === "rechazada" ? '#fd7b7b' : '#23aec1',
                                            fontWeight: 'bold', letterSpacing: '2px'
                                        }}>
                                            {purchase.scheduled === 'Pendiente' ? 'Pendiente' :
                                                purchase.scheduled === 'aceptada' ? 'Agendada' :
                                                    purchase.scheduled === 'rechazada' ? 'Rechazada' :
                                                        purchase.scheduled === 'cancelada' ? 'Pendiente' : 'Agendada'}
                                        </span>
                                    </div>
                                    <div className="descriptionPurchase">
                                        Usuario: {purchase.username}<br /><br />
                                        Fecha de pago: {purchase.paymentDate}<br />
                                        Fecha de entrega: {purchase.deliveryDate ? purchase.deliveryDate : '-'}</div>
                                    <button className="buttonConsult"
                                        onClick={() => {
                                            if (purchase.scheduled === "Pendiente" || purchase.scheduled === "cancelada") {
                                                setVisible(true); setOrderNumber(purchase.orderNumber);
                                                setUsername(purchase.username);
                                                setAddress(purchase.address); setReceiptImagePath(purchase.receiptImagePath);
                                                setReceiptImageURL(purchase.receiptImageURL);
                                                setPartialPrice(purchase.partialPrice); setFinalPrice(purchase.finalPrice);
                                                setPaymentDate(purchase.paymentDate);
                                                setCart(purchase.cart); setDetails(purchase.details);
                                                setScheduled(purchase.scheduled); setDeliveryDate(purchase.deliveryDate);
                                            } else {
                                                if (purchase.scheduled === "aceptada" || purchase.scheduled === "modificada") {
                                                    alert("Ya has agendado esta compra.");
                                                } else {
                                                    alert("Ya has rechazado esta compra.");
                                                }
                                            }
                                        }}>Ver detalles</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
                <Dialog
                    visible={visible}
                    onHide={() => { setVisible(false) }}
                    style={{ width: '45vw', height: '600px' }}
                    header='Comprobante de pago'
                    draggable={false}
                    resizable={false}
                    dismissableMask>
                    <div className="layoutDelievery" key={username}>
                        <div className="descriptionReceipt">
                            <img src={receiptImageURL} />
                        </div>

                        <div className="descriptionDelivery">
                            <div className="userDelivery">Usuario: {username}</div>
                            Dirección de entrega: {address} <br />
                            Detalles de la dirrección: {details} <br /><br />
                            Fecha de entrega: {deliveryDate ? deliveryDate : "Sin fecha"} <br />
                            Estado: {scheduled === "Pendiente" ? 'Pendiente' :
                                scheduled === 'aceptada' ? 'Agendada' :
                                    scheduled === 'rechazada' ? 'Rechazada' :
                                        scheduled === 'cancelada' ? 'Pendiente' : 'Agendada'}<br /><br />
                            Precio total (incluyendo envío):  ₡{finalPrice} <br />
                            <div className="layoutDeliveryButtons">
                                <button className="buttonDelivery" onClick={updateAcceptedDelivery}>Aceptar</button>
                                <button className="buttonDelivery" onClick={updateDeclinedDelivery}>Rechazar</button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}

export default DeliveryPending;