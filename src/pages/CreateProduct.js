import React from "react";
import { useRef , useState } from 'react';
import "../styles/Product.css";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import back from "../components/assets/arrowBack.png";
import imagePlaceholder from '../components/assets/imagePlaceHolder.png';

import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

function CreateProduct() {
    // VARIABLES -----------------------------------------------------------------
    const navigate = useNavigate();    
    const hiddenFileInput = useRef(null);

    const [selectedName, setSelectedName] = useState('');
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [selectedAvailable, setSelectedAvailable] = useState(0);
    
    const [selectedImage, setImage] = useState(imagePlaceholder);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    const categories = ["Labios", "Piel"];
    const subcategories = ["Terror", "Fantasia"];

    // 
    const handleClickImage = (event) => {
        hiddenFileInput.current.click();
    };

    const handleChangeImage = (event) => {
        const fileUploaded = event.target.files;

        if (fileUploaded[0].name) {
            setImage(URL.createObjectURL(fileUploaded[0]));
        }
    };

    const handleProduct = (event) => {
        event.preventDefault();

        if (!selectedName || !selectedDescription || !selectedPrice || !selectedAvailable || !selectedCategory || !selectedSubcategory || !selectedImage) {
            alert("ERROR: Todos los campos son obligatorios");
            return;
        }

        if (selectedDescription.length > 122) {
            alert("ERROR: La descripción es muy larga, el máximo es 122 caracteres");
            return;
        }

        if (selectedDescription.length < 28) {
            alert("ERROR: La descripción es muy corta, el mínimo es 28 caracteres");
            return;
        }

        if (selectedName.length > 22) {
            alert("ERROR: El nombre es muy largo, el máximo es 22 caracteres");
            return;
        }

        if (selectedDescription.length < 3) {
            alert("ERROR: La descripción es muy corta, el mínimo es 3 caracteres");
            return;
        }

        if (!/^\d+$/.test(selectedAvailable)){
            alert("ERROR: El número de disponibles debe ser un número entero");
            return;
        }

        if(!/^\d+(\.\d+)?$/.test(selectedPrice)){
            alert("ERROR: El precio debe ser un número entero o decimal");
            return;
        }

        if(selectedImage === imagePlaceholder){
            alert("ERROR: Debe seleccionar una imagen");
            return;
        }

        navigate('/ProductManagement');
    }

    const createProduct = async(pName, pDescription, pPrice, pAvailable, pCategory, pSubcategory, pImage) => {
        const newData = await fetch('http://localhost:5000/createProduct',{
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: pName,
                description: pDescription,
                price: pPrice,
                available: pAvailable,
                category: pCategory,
                subcategory: pSubcategory,
                image: pImage
            })
        }).then(res => res.json())
        if(newData.response === 'Product created successfully'){
            navigate('/ProductManagement');
            console.log('Product created successfully');
        }
    }

    return (
        <div className="ModifyCreateProduct">
            <Navbar showIcons={true} />
            <Link to={"/ProductManagement"}><button className="backManagement"><img src={back} alt=""/></button></Link>
            <h1>Crear Poducto</h1>
            
            <section className="layoutModifyCreateProduct">
                <div className="gridPosition">
                    <label>Nombre</label><br />
                    <input value={selectedName} onChange={(e) => setSelectedName(e.target.value)} type="text" id="nameProduct" name="name"/><br />
                
                    <label>Descripción</label><br />
                    <textarea value={selectedDescription} onChange={(e) => setSelectedDescription(e.target.value)} type="text" id="descriptionProduct" name="description"/><br />

                    <button type="submit" className="buttonModifyCreateProduct" onClick={handleProduct}>Crear producto</button>
                </div>
                <div>
                    <label>Precio</label><br />
                    <input value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)} type="number" min="0" id="priceProduct" name="price"/><br />

                    <label>Disponibles</label><br />
                    <input value={selectedAvailable} onChange={(e) => setSelectedAvailable(e.target.value)} type="number" min="0" id="availableProduct" name="available"/><br />

                    <label>Categoría</label><br />
                    <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} options={categories} placeholder="Seleccione una opción" className="options" />
                    <br />

                    <label>Subcategoría</label><br />
                    <Dropdown value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)} options={subcategories} placeholder="Seleccione una opción" className="options" />
                    <br />
                
                </div>
                <div>
                    <img src={selectedImage} alt="" name="image"/>
                    <button className="buttonLoadImage" type="button" onClick={handleClickImage}>Cargar imagen</button>
                    <input type="file" onChange={handleChangeImage} ref={hiddenFileInput} style={{display: "none"}}/>
                </div>
            </section>
        </div>
    );
}

export default CreateProduct;