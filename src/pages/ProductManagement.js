import React from "react";
import "../styles/Product.css";
import Navbar from "../components/Navbar";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import polvos from "../components/assets/polvos.jpg";
import trash from "../components/assets/trash.png";
import labiales from "../components/assets/labiales.jpg";
import delineador from "../components/assets/delineador.jpg";
import back from "../components/assets/arrowBack.png";

// BUTTONS -----------------------------------------------------------------
export function Back(){
    return(
        <div className="buttonBack"> 
            <a href="/AccountAdmin"><img src={back} alt=""/></a>
        </div>
    )
}

export function OpenModifyProduct(){
    return(
        <div> 
            <a href="/ModifyProduct"><button className="buttonModify">Modificar</button></a>
        </div>
    )
}

export function OpenDeleteProduct(){
    const handleConfirmation = () => {
        if(window.confirm("¿De verdad desea eliminar?")){
            window.location.href = "/ProductManagement";
            //aqui se elimina el producto
        }
    }
    return(
        <div> 
            <button className="buttonDelete" onClick={handleConfirmation}><img src={trash} alt=""/></button>
        </div>
    )
}

export function OpenCreateProduct(){
    return(
        <div> 
            <a href="/CreateProduct"><button className="buttonCreate">Crear nuevo producto</button></a>
        </div>
    )
}

// FUNCTIONS -----------------------------------------------------------------
function ProductManagement(){
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

    const products = [ 
        { 
            id: 1,
            name: "Polvito mágico", 
            description: "Cubre los poros y no afecta la piel, muy barato y dispensable para la vida xd cuanto ser el limite que ocupe esta cosa sea", 
            imageURL: polvos 
        },
        { 
            id: 2,
            name: "Labial colorcito", 
            description: "Decora tus labios con estos nuevos labiales", 
            imageURL: labiales 
        },
        { 
            id: 3,
            name: "Delineador maravilla", 
            description: "Cubre los poros y no afecta la piel, muy barato y dispensable para la vida xd", 
            imageURL: delineador 
        },
        { 
            id: 4,
            name: "Gel brillo", 
            description: "Otra descripcion loca para s", 
            imageURL: labiales
        }
    ];

    return (
        <div>
            <Navbar showIcons={true} />
            <div className="pageProductManagement">
                <Back />
                <h1>Gestión de productos</h1>
                <OpenCreateProduct />
                <div className="containerProductManagement">
                    <Carousel responsive={responsive}>
                        {products.map((product) => (
                            <div className="cardProductManagement" key={product.id}>
                                <OpenDeleteProduct />
                                <div className="content">
                                    <div className="imageContent">
                                        <div className="cardImage">
                                            <img src={product.imageURL} alt=""/>
                                        </div>
                                    </div>
                                    <div className="cardContent">
                                        <div className="names">{product.name}</div>
                                        <div className="description">{product.description}</div>
                                        <OpenModifyProduct />
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

export default ProductManagement;