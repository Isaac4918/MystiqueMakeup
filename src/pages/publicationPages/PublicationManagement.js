import React from "react";
import "../../styles/Product.css";
import Navbar from "../../components/Navbar";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import polvos from "../../components/assets/polvos.jpg";
import trash from "../../components/assets/trash.png";
import labiales from "../../components/assets/labiales.jpg";
import delineador from "../../components/assets/delineador.jpg";
import back from "../../components/assets/arrowBack.png";


function Back(){
    return(
        <div className="buttonBack"> 
            <a href="/AccountAdmin"><img src={back} alt=""/></a>
        </div>
    )
}

function OpenModifyProduct(){
    return(
        <div> 
            <a href="/ModifyProduct"><button className="buttonModify">Modificar</button></a>
        </div>
    )
}

function OpenDeleteProduct(){
    return(
        <div> 
            <a href="/DeleteProduct"><button className="buttonDelete"><img src={trash} alt=""/></button></a>
        </div>
    )
}

function OpenCreateProduct(){
    return(
        <div> 
            <a href="/CreateProduct"><button className="buttonCreate">Crear nuevo producto</button></a>
        </div>
    )
}

function createCarrouselElement(data){
    console.log("======>",data.imagePath);
    const imagePublication = require(data.imagePath);
    return(
        <div className="cardProductManagement">
            <OpenDeleteProduct />
            <div className="content">
                <div className="imageContent">
                    <div className="cardImage">
                        <img src={imagePublication} alt=""/>
                    </div>
                </div>
                <div className="cardContent">
                    <div className="names">{data.name}</div>
                    <div className="description">{data.description}</div>
                    <OpenModifyProduct />
                </div>
            </div>
        </div>
    )

}

const dataList = [
    {
        name: "Polvito mágico",
        description: "Cubre los poros y no afecta la piel, muy barato y dispensable para la vida xd cuanto ser el limite que ocupe esta cosa sea",
        imagePath: "./../../components/assets/polvos.jpg"
    },
    {
        name: "Labial colorcito",
        description: "Decora tus labios con estos nuevos labiales",
        imagePath: "../../components/assets/labiales.jpg"
    },
    {
        name: "Delineador maravilla",
        description: "Cubre los poros y no afecta la piel, muy barato y dispensable para la vida xd",
        imagePath: "../../components/assets/delineador.jpg"
    }
]


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
            <div className="pageProductManagement">
                <Back />
                <h1>Gestión de productos</h1>
                <OpenCreateProduct />
                <div className="containerProductManagement">
                    <Carousel responsive={responsive}>
                        {dataList.map((data) => createCarrouselElement(data))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default PublicationManagement;