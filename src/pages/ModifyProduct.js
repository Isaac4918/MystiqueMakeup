import React from "react";
import { useRef, useEffect, useState} from 'react';
import "../styles/Product.css";
import Navbar from "../components/Navbar";
import back from "../components/assets/arrowBack.png";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import {Link} from 'react-router-dom';

const ModifyProduct = () => {
    // Variable of Modify Product
    const hiddenFileInput = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const [dropdownCategory, setDropdownCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [dropdownSubcategory, setDropdownSubcategory] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        available: '',
        category: '',
        subcategory: '',
        imageUrl: null
    });

    // Image
    const handleClickImage = (event) => {
        hiddenFileInput.current.click();
    };

    const handleChangeImage = (event) => {
        const fileUploaded = event.target.files[0];
        setSelectedImage(fileUploaded);
        console.log(selectedImage);

        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    };

    useEffect(() => {
        if (selectedImage) {
          setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    // Categories and subcategories
    const OpenCloseDropdownCategory = () =>{
        setDropdownCategory(!dropdownCategory);
    }

    const OpenCloseDropdownSubcategory = () =>{
        setDropdownSubcategory(!dropdownSubcategory);
    }

    const handleChangeCategory = (event) => {
        setSelectedCategory(event.currentTarget.textContext);
    };

    const handleChangeSubcategory = (event) => {
        setSelectedSubcategory(event.currentTarget.textContext);
    };

    // Modify product
    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const sendData = (event) => {
        event.preventDefault();
        console.log(data);

        // Validación de los datos
        if (!data.name || !data.description || !data.price || !data.available || !data.category || !data.subcategory || data.imageUrl === null) {
            alert("ERROR: " + "Todos los campos son obligatorios");
            return;
        }

        //falta conexión con el API
        //addData(data.name, data.description, data.price, data.available, data.category, data.subcategory, true);
    };

    return (
        <div className="ModifyProduct">
            <form onSubmit={sendData}>
                <Navbar showIcons={true} />
                <Link to={"/ProductManagement"}><button className="backManagement"><img src={back} alt=""/></button></Link>
                <h1>Polvo mágico</h1>
                
                <section className="layoutModifyProduct">
                    <div className="gridPosition">
                        <label>Nombre</label><br />
                        <input onChange={handleInputChange} type="text" id="nameProduct" name="name"/><br />
                    
                        <label>Descripción</label><br />
                        <textarea onChange={handleInputChange} type="text" id="descriptionProduct" name="description"/><br />

                        <a href="/ProductManagement" alt=""><button type="submit" className="buttonModifyProduct">Modificar producto</button></a>
                    </div>
                    <div>
                        <label>Precio</label><br />
                        <input onChange={handleInputChange} type="text" id="priceProduct" name="price"/><br />

                        <label>Disponibles</label><br />
                        <input onChange={handleInputChange} type="text" id="availableProduct" name="available"/><br />

                        <label>Categoría</label><br />
                        <Dropdown isOpen={dropdownCategory} toggle={OpenCloseDropdownCategory}>
                            <DropdownToggle caret className='rectangule'>
                                Seleccione una opción {selectedCategory} 
                            </DropdownToggle>
                            <DropdownMenu className="options">
                                <DropdownItem onClick={handleChangeCategory}>Terror</DropdownItem>
                                <DropdownItem onClick={handleChangeCategory}>Fantasía</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <label>Subcategoría</label><br />
                        <Dropdown isOpen={dropdownSubcategory} toggle={OpenCloseDropdownSubcategory}>
                            <DropdownToggle caret className='rectangule'>
                                Seleccione una opción {selectedSubcategory}
                            </DropdownToggle>
                            <DropdownMenu className="options">
                                <DropdownItem onClick={handleChangeSubcategory}>Hola</DropdownItem>
                                <DropdownItem onClick={handleChangeSubcategory}>Hola</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                    </div>
                    <div>
                        <img src={imageUrl} alt="" name="imageUrl"/>
                        <button className="buttonLoadImage" type="button" onClick={handleClickImage}>Cargar imagen</button>
                        <input type="file" onChange={handleChangeImage} ref={hiddenFileInput} style={{display: "none"}}/>
                    </div>
                </section>
            </form>        
        </div>
    );
}

export default ModifyProduct;