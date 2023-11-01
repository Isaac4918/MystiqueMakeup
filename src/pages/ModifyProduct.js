import React from "react";
import { useRef , useState } from 'react';
import "../styles/Product.css";
import Navbar from "../components/Navbar";
import back from "../components/assets/arrowBack.png";
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

const ModifyProduct = () => {
    // Variable of Modify Product
    const navigate = useNavigate();    
    const hiddenFileInput = useRef(null);
    const [image, setImage] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        available: '',
        category: '',
        subcategory: '',
        image: null
    });

    const categories = ["Labios", "Piel"];
    const subcategories = ["Terror", "Fantasia"];

    // Image
    const handleClickImage = (event) => {
        hiddenFileInput.current.click();
    };

    const handleChangeImage = (event) => {
        const fileUploaded = event.target.files;
        console.log(fileUploaded[0].name); 

        if (fileUploaded[0].name) {
            setImage(URL.createObjectURL(fileUploaded[0]));
        }

        setData({
            ...data,
            image : fileUploaded[0]
        })
    };

    // Categories and subcategories
    const handleChangeCategory = (event) => {
        setSelectedCategory(event.target.value)
        setData({
            ...data,
            category : event.target.value
        })
    }

    const handleChangeSubcategory = (event) => {
        setSelectedSubcategory(event.target.value)
        setData({
            ...data,
            subcategory : event.target.value
        })
    }

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

        if (!data.name || !data.description || !data.price || !data.available || !data.category || !data.subcategory) {
            alert("ERROR: Todos los campos son obligatorios");
            return;
        }

        if (data.description.length > 122) {
            alert("ERROR: La descripción es muy larga, el máximo es 122 caracteres");
            return;
        }

        if (data.name.length > 22) {
            alert("ERROR: El nombre es muy largo, el máximo es 22 caracteres");
            return;
        }

        if (!/^\d+$/.test(data.available)){
            alert("ERROR: available");
            return;
        }

        if(!/^\d+(\.\d+)?$/.test(data.price)){
            alert("ERROR: price");
            return;
        }

        if(data.image === null){
            alert("ERROR: Debe seleccionar una imagen");
            return;
        }

        //poner que prices y disponibles sean numeros

        navigate('/ProductManagement');

        //falta conexión con el API
        //addData(data.name, data.description, data.price, data.available, data.category, data.subcategory, true);
    };

    return (
        <div className="ModifyCreateProduct">
            <Navbar showIcons={true} />
            <form onSubmit={sendData}>
                <Link to={"/ProductManagement"}><button className="backManagement"><img src={back} alt=""/></button></Link>
                <h1>Polvo mágico</h1>
                
                <section className="layoutModifyCreateProduct">
                    <div className="gridPosition">
                        <label>Nombre</label><br />
                        <input onChange={handleInputChange} type="text" id="nameProduct" name="name"/><br />
                    
                        <label>Descripción</label><br />
                        <textarea onChange={handleInputChange} type="text" id="descriptionProduct" name="description"/><br />

                        <button type="submit" className="buttonModifyCreateProduct">Modificar producto</button>
                    </div>
                    <div>
                        <label>Precio</label><br />
                        <input onChange={handleInputChange} type="text" id="priceProduct" name="price"/><br />

                        <label>Disponibles</label><br />
                        <input onChange={handleInputChange} type="text" id="availableProduct" name="available"/><br />

                        <label>Categoría</label><br />
                        <Dropdown value={selectedCategory} onChange={handleChangeCategory} options={categories} placeholder="Seleccione una opción" className="options" />
                        <br />

                        <label>Subcategoría</label><br />
                        <Dropdown value={selectedSubcategory} onChange={handleChangeSubcategory} options={subcategories} placeholder="Seleccione una opción" className="options" />
                        <br />
                    
                    </div>
                    <div>
                        <img src={image} alt="" name="image"/>
                        <button className="buttonLoadImage" type="button" onClick={handleClickImage}>Cargar imagen</button>
                        <input type="file" onChange={handleChangeImage} ref={hiddenFileInput} style={{display: "none"}}/>
                    </div>
                </section>
            </form>        
        </div>
    );
}

export default ModifyProduct;