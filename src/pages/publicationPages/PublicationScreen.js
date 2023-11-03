import React from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Product.css";
import back from "../../components/assets/arrowBack.png";
import MMalefica from "../../components/assets/malefica.jpg";

export function BackMainPubli(){
    return(
        <div className="backManagementPublication"> 
            <a href="/"><img src={back} alt=""/></a>
        </div>
    )
}

function PublicationScreen(){
    return(
        <div>
            <Navbar showIcons={true} />
            <BackMainPubli />
            <div className="pagePublicationScreen">
                
                <section class="layout">
                    <div>
                        <h1>Maquillaje malefica</h1>
                        <img src={MMalefica} alt=""/>
                    </div>
                    <div className="infoContainerPublication">
                        <h2>Descripción: </h2>
                        <p>Soprende a tus amigos con los villanos de Disney</p>
                        <h2>Fecha: </h2>
                        <p>02-02-2023</p>
                        <h2>Tags: </h2>
                        <div className="tagsPublication">
                        <p>#Disney #Villanos</p>
                        </div>
                        <button className="buttonAgendarCita">Solicitar Maquillaje</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default PublicationScreen;