import React, { useEffect, useState } from "react";
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
function Back() {
    return (
        <div className="buttonBack">
            <a href="/AccountAdmin"><img src={back} alt="" /></a>
        </div>
    )
}

function OpenModifyPublication(pId) {
    return (
        <div>
            <a href={"/ModifyPublication/"+ pId.pId}><button className="buttonModifyPublication">Modificar</button></a>
        </div>
    )
}

function OpenDeletePublication(pId) {
    const baseAPIurl = 'http://localhost:5000';
    const handleConfirmation = async() => {
        if (window.confirm("¿Está seguro que desea eliminar esta publicación?")) {
            window.location.href = "/PublicationManagement";
            const response = await fetch(baseAPIurl + '/publications/delete', {
                method: 'DELETE',
                body: JSON.stringify({
                    id: pId.pId
                })
            }).then(res => res.json());
        }
    }
    return (
        <div>
            <button className="buttonDeletePublication" onClick={handleConfirmation}><img src={trash} alt="" /></button>
        </div>
    )
}

function OpenCreatePublication() {
    return (
        <div>
            <a href="/CreatePublication"><button className="buttonCreatePublication">Crear nueva publicación</button></a>
        </div>
    )
}

// FUNCTIONS -----------------------------------------------------------------
function PublicationManagement() {
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

    const [publications, setPublications] = useState([]);

    const getPublications = async () => {
        const response = await fetch(baseAPIurl + '/publications/get/all', {
            method: 'GET',
        }).then(res => res.json());
        setPublications(response);
    }

    useEffect(() => {
        getPublications();
    }, []);

    const test = () => {
        console.log(publications);
    }

    return (
        <div>
            <Navbar showIcons={true} />
            <div className="pagePublicationManagement">
                <Back />
                <h1>Gestión de publicaciones</h1>
                <OpenCreatePublication />
                <div className="containerPublicationManagement">
                    <Carousel responsive={responsive}>
                        {publications.map((publication) => (
                            <div className="cardPublicationManagement">
                                <OpenDeletePublication pId = {publication.id}/>
                                <div className="contentPublication">
                                    <div className="imageContentPublication">
                                        <div className="cardImagePublication">
                                            <img src={publication.imageURL} alt="" />
                                        </div>
                                    </div>
                                    <div className="cardContentPublication">
                                        <div className="namesPublication">{publication.name}</div>
                                        <div className="descriptionPublication">{publication.description}</div>
                                        <OpenModifyPublication pId = {publication.id}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default PublicationManagement;