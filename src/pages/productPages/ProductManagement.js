import React, { useState, useEffect} from "react";
import "../../styles/Product.css";
import Navbar from "../../components/Navbar";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import trash from "../../components/assets/trash.png";
import back from "../../components/assets/arrowBack.png";

// BUTTONS -----------------------------------------------------------------
export function Back(){
    return(
        <div className="buttonBack"> 
            <a href="/AccountAdmin"><img src={back} alt=""/></a>
        </div>
    )
}

export function OpenModifyProduct(pId){
    return(
        <div> 
            <a href={"/ModifyProduct/"+ pId.pId}><button className="buttonModify">Modificar</button></a>
        </div>
    )
}

export function OpenDeleteProduct(pId){
    const baseAPIurl = 'http://localhost:5000';
    const handleConfirmation = async() => {
        if (window.confirm("¿Está seguro que desea eliminar esta producto?")) {
            window.location.href = "/ProductManagement";
            const response = await fetch(baseAPIurl + '/products/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: pId.pId
                })
            }).then(res => res.json());
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

    const baseAPIurl = 'http://localhost:5000';
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const response = await fetch(baseAPIurl + '/products/get/all', {
            method: 'GET',
        }).then(res => res.json());
        setProducts(response);
    }

    useEffect(() => {
        getProducts();
    }, []);

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
                                <OpenDeleteProduct pId = {product.id}/>
                                <div className="content">
                                    <div className="imageContent">
                                        <div className="cardImage">
                                            <img src={product.imageURL} alt=""/>
                                        </div>
                                    </div>
                                    <div className="cardContent">
                                        <div className="names">{product.name}</div>
                                        <div className="description">{product.description}</div>
                                        <OpenModifyProduct pId = {product.id}/>
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