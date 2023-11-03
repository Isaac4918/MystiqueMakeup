import React from "react";
import "../../styles/Publications.css";
import Navbar from "../../components/Navbar";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import trash from "../../components/assets/trash.png";
import back from "../../components/assets/arrowBack.png";
import MBruja from "../../components/assets/bruja.jpg";
import MMalefica from "../../components/assets/malefica.jpg";
import MUrsula from "../../components/assets/ursula.jpg";

// BUTTONS -----------------------------------------------------------------
export function Back(){
    return(
        <div className="buttonBack"> 
            <a href="/AccountAdmin"><img src={back} alt=""/></a>
        </div>
    )
}

export function OpenModifyPublication(){
    return(
        <div> 
            <a href="/ModifyPublication"><button className="buttonModifyPublication">Modificar</button></a>
        </div>
    )
}

export function OpenDeletePublication(){
    const handleConfirmation = () => {
        if (window.confirm("¿Está seguro que desea eliminar esta publicación?")) {
            window.location.href = "/PublicationManagement";
            //aqui se elimina la publicacion
        }
    }
    return(
        <div> 
            <button className="buttonDeletePublication" onClick={handleConfirmation}><img src={trash} alt=""/></button>
        </div>
    )
}

export function OpenCreatePublication(){
    return(
        <div> 
            <a href="/CreatePublication"><button className="buttonCreatePublication">Crear nueva publicación</button></a>
        </div>
    )
}

// FUNCTIONS -----------------------------------------------------------------
function PublicationManagement(){
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
        <div>
            <Navbar showIcons={true} />
            <div className="pagePublicationManagement">
                <Back />
                <h1>Gestión de publicaciones</h1>
                <OpenCreatePublication />
                <div className="containerPublicationManagement">
                    <Carousel responsive={responsive}>
                        <div className="cardPublicationManagement">
                            <OpenDeletePublication />
                            <div className="contentPublication">
                                <div className="imageContentPublication">
                                    <div className="cardImagePublication">
                                        <img src={MBruja} alt=""/>
                                    </div>
                                </div>
                                <div className="cardContentPublication">
                                    <div className="namesPublication">Maquillaje Bruja</div>
                                    <div className="descriptionPublication">Has Magia</div>
                                    <OpenModifyPublication />
                                </div>
                            </div>
                        </div>
                        <div className="cardPublicationManagement">
                            <OpenDeletePublication />
                            <div className="contentPublication">
                                <div className="imageContentPublication">
                                    <div className="cardImagePublication">
                                        <img src={MMalefica} alt=""/>
                                    </div>
                                </div>
                                <div className="cardContentPublication">
                                    <div className="namesPublication">Maquillaje Malefica</div>
                                    <div className="descriptionPublication">Sorprende a tus amigos con villanos de Disney</div>
                                    <OpenModifyPublication />
                                </div>
                            </div>
                        </div>
                        <div className="cardPublicationManagement">
                            <OpenDeletePublication />
                            <div className="contentPublication">
                                <div className="imageContentPublication">
                                    <div className="cardImagePublication">
                                        <img src={MUrsula} alt=""/>
                                    </div>
                                </div>
                                <div className="cardContentPublication">
                                    <div className="namesPublication">Maquillaje Ursula</div>
                                    <div className="descriptionPublication">Sorprende a tus amigos con villanos de Disney</div>
                                    <OpenModifyPublication />
                                </div>
                            </div>
                        </div>
                        <div className="cardPublicationManagement">
                            <OpenDeletePublication />
                            <div className="contentPublication">
                                <div className="imageContentPublication">
                                    <div className="cardImagePublication">
                                        <img src={MUrsula} alt=""/>
                                    </div>
                                </div>
                                <div className="cardContentPublication">
                                    <div className="namesPublication">Maquillaje Ursula</div>
                                    <div className="descriptionPublication">Sorprende a tus amigos con villanos de Disney</div>
                                    <OpenModifyPublication />
                                </div>
                            </div>
                        </div>
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default PublicationManagement;