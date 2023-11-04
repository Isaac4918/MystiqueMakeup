import React from "react";
import "../styles/Purchase.css";
import Navbar from "../components/Navbar";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import back from "../components/assets/arrowBack.png";
import {Link} from 'react-router-dom';

function DeliveryPending(){
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
            <Link to={"/"}><button className="backManagement"><img src={back} alt=""/></button></Link>
            <h1>Entrega de Productos Pendientes</h1>
            <div className="containerPurchase">
                <Carousel responsive={responsive}>
                    <div className="cardPurchase">
                        <div className="contentPurchase">
                            <div className="cardContentPurchase">
                                <div className="numPurchase">No. 45677</div>
                                <div className="descriptionPurchase">Fecha: 12/10/22</div>
                                <button className="buttonConsult">Agendar entrega</button>
                            </div>
                        </div>
                    </div>
                    <div className="cardPurchase">
                        <div className="contentPurchase">
                            <div className="cardContentPurchase">
                                <div className="numPurchase">No. 12345</div>
                                <div className="descriptionPurchase">Fecha: 12/10/22</div>
                                <button className="buttonConsult">Agendar entrega</button>
                            </div>
                        </div>
                    </div>
                    <div className="cardPurchase">
                        <div className="contentPurchase">
                            <div className="cardContentPurchase">
                                <div className="numPurchase">No. 434334</div>
                                <div className="descriptionPurchase">Fecha: 12/10/22</div>
                                <button className="buttonConsult">Agendar entrega</button>
                            </div>
                        </div>
                    </div>
                    <div className="cardPurchase">
                        <div className="contentPurchase">
                            <div className="cardContentPurchase">
                                <div className="numPurchase">No. 33333</div>
                                <div className="descriptionPurchase">Fecha: 12/10/22</div>
                                <button className="buttonConsult">Agendar entrega</button>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    );
}

export default DeliveryPending;