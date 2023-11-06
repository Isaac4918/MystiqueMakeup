import React from "react";
import { useRef , useState, useEffect } from 'react';
import "../../styles/Product.css";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import back from "../../components/assets/arrowBack.png";
import imagePlaceholder from '../../components/assets/imagePlaceHolder.png';

import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

function CreateProduct() {
    // VARIABLES -----------------------------------------------------------------
    const navigate = useNavigate();    
    const hiddenFileInput = useRef(null);
    const baseAPIurl = 'http://localhost:5000';

    const [selectedName, setSelectedName] = useState('');
    const [blobImage, setBlobImage] = useState('-');
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [selectedAvailable, setSelectedAvailable] = useState(0);
    
    const [selectedImage, setImage] = useState(imagePlaceholder);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    const [categories, setCategories] = useState([]);
    const [parsedCategories, setParsedCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    // FUNCTIONS -----------------------------------------------------------------
    const getCategories = async () => {
        const response = await fetch(baseAPIurl + '/category/all', {
            method: 'GET',
        }).then(res => res.json());
        setCategories(response);
        let categorylist = [];
        for (let i = 0; i < response.length; i++) {
            categorylist.push(response[i].name);
        }
        setParsedCategories(categorylist);
    }

    useEffect(() => {
        getCategories();
    }, []);

    const getSubcategories = (pCategory) => {
        let subcategorylist = [];
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].name === pCategory) {
                for (let j = 0; j < categories[i].subCategories.length; j++) {
                    subcategorylist.push(categories[i].subCategories[j].name);
                }
            }
        }
        setSubcategories(subcategorylist);
    }
    
    const handleClickImage = (event) => {
        hiddenFileInput.current.click();
    };

    const handleChangeImage = (event) => {
        const fileUploaded = event.target.files;
        if (fileUploaded[0]) {
            setImage(URL.createObjectURL(fileUploaded[0]));
            setBlobImage(fileUploaded[0]);
        }
    };

    const handleProduct = async(event) => {
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

        let result = await createProduct(selectedName, selectedDescription, selectedCategory, selectedSubcategory, selectedPrice, selectedAvailable);
        if (result.status === 200) {
            alert("Producto creado con éxito");
            navigate('/ProductManagement');
        } else {
            alert("ERROR: No se pudo crear el producto");
        }

    }

    const createProduct = async(pName, pDescription, pCategory, pSubcategory, pPrice, pAvailable) => {
        // get id
        const currentId = await fetch(baseAPIurl + '/products/get/id', {
            method: 'GET',
        }).then(res => res.json());

        // update the id
        const nextId = await fetch(baseAPIurl + '/products/update/id', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, body: JSON.stringify({
                id: currentId + 1
            })
        });

        // upload the image
        let formData = new FormData();
        formData.append('image', blobImage)

        const uploadImage = await fetch(baseAPIurl + '/image/upload/products/' + currentId.toString(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        }).then(res => res.json());

        // save the url of the image
        let imageURL = uploadImage.imageUrl;

        //define the path of the image
        let imagePath = 'Products/' + currentId.toString();
        
        // create the product
        const newData = await fetch('http://localhost:5000/products/create',{
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: currentId,
                name: pName,
                description: pDescription,
                imagePath: imagePath,
                category: pCategory,
                subcategory: pSubcategory,
                price: pPrice,
                available: pAvailable,
                imageURL: imageURL
            })
        })
        
        return newData;
    }

    

    // RETURN -----------------------------------------------------------------
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
                    <Dropdown value={selectedCategory} onChange={(e) => {setSelectedCategory(e.target.value); getSubcategories(e.target.value)}} options={parsedCategories} placeholder="Seleccione una opción" className="options" />
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