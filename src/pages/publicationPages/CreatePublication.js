import React, { useRef, useState } from 'react';
import "../../styles/Publications.css";
import Navbar from "../../components/Navbar";
import back from "../../components/assets/arrowBack.png";
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CreatePublication = () => {
    const navigate = useNavigate();
    const hiddenFileInput = useRef(null);
    const [image, setImage] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    const [data, setData] = useState({
        name: '',
        description: '',
        tags: '',
        date: '',
        category: '',
        subcategory: '',
        image: null
    });

    const categories = ["Disney", "Spooky"];
    const subcategories = ["Villanos", "Magia"];


    const handleClickImage = (event) => {
        hiddenFileInput.current.click();
    };

    const handleChangeImage = (event) => {
        const fileUploaded = event.target.files;
        if (fileUploaded[0].name) {
            setImage(URL.createObjectURL(fileUploaded[0]));
        }
        setData({
            ...data,
            image: fileUploaded[0]
        });
    };

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
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

    const handlePublication = (event) => {
        event.preventDefault();

        if (!data.name || !data.description || !data.tags || !data.category || !data.subcategory) {
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

        if (data.image === null) {
            alert("ERROR: Debe seleccionar una imagen");
            return;
        }

        navigate('/PublicationManagement');
    };

    const CreatePublication = async(publiName, publiDescription, publitags, publidate, publiCategory, publiSubcategory, publiImage) => {
        const newData = await fetch('http://localhost:5000/createPublication',{
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: publiName,
                description: publiDescription,
                tags: publitags,
                date: publidate,
                category: publiCategory,
                subcategory: publiSubcategory,
                image: publiImage
            })
        }).then(res => res.json())
        if(newData.response === 'Publication created successfully'){
            navigate('/PublicationManagement');
            console.log('Publication created successfully');
        }
    }

    return (
        <div className="ModifyCreatePublication">
            <Navbar showIcons={true} />
            <Link to={"/PublicationManagement"}><button className="backManagementPublication"><img src={back} alt=""/></button></Link>

                <section className="layoutModifyCreatePublication">
                    <div className="gridPosition">
                        <label>Nombre</label><br />
                        <input onChange={handleInputChange} type="text" id="namePublication" name="name" /><br />

                        <label>Descripción</label><br />
                        <textarea onChange={handleInputChange} type="text" id="descriptionPublication" name="description" /><br />

                        <button type="submit" className="buttonModifyCreatePublication">Crear publicacion</button>
                    </div>
                    <div>

                        <label>Tags</label><br />
                        <input onChange={handleInputChange} type="text" id="tagsPublication" name="tags" /><br />

                        <label>Categoría</label><br />
                        <Dropdown value={selectedCategory} onChange={handleChangeCategory} options={categories} placeholder="Seleccione una opción" className="options" />
                        <br />

                        <label>Subcategoría</label><br />
                        <Dropdown value={selectedSubcategory} onChange={handleChangeSubcategory} options={subcategories} placeholder="Seleccione una opción" className="options" />
                        <br />
                    </div>
                    <div>
                        <img src={image} alt="" name="image" />
                        <button className="buttonLoadImage" type="button" onClick={handleClickImage}>Cargar imagen</button>
                        <input type="file" onChange={handleChangeImage} ref={hiddenFileInput} style={{ display: "none" }} />
                    </div>
                </section>
        </div>
    );
}

export default CreatePublication;
