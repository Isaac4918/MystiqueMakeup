import React, { useRef, useState } from 'react';
import "../../styles/Publications.css";
import Navbar from "../../components/Navbar";
import back from "../../components/assets/arrowBack.png";
import { Dropdown } from 'primereact/dropdown';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import imagePlaceholder from '../../components/assets/imagePlaceHolder.png';

const ModifyPublication = () => {
    // VARIABLES -----------------------------------------------------------------
    const navigate = useNavigate();
    const hiddenFileInput = useRef(null);

    const [selectedName, setSelectedName] = useState('');
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState('');

    const [selectedImage, setImage] = useState(imagePlaceholder);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    const categories = ["Disney", "Spooky"];
    const subcategories = ["Villanos", "Magia"];

    // FUNCTIONS -----------------------------------------------------------------
    const handleClickImage = (event) => {
        hiddenFileInput.current.click();
    };

    const handleChangeImage = (event) => {
        const fileUploaded = event.target.files;
        if (fileUploaded[0].name) {
            setImage(URL.createObjectURL(fileUploaded[0]));
        }
    };

    const handlePublication = (event) => {
        event.preventDefault();

        if (!selectedName || !selectedDescription|| !selectedTags|| !selectedCategory || !selectedSubcategory || !selectedImage) {
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

        if(selectedImage === imagePlaceholder){
            alert("ERROR: Debe seleccionar una imagen");
            return;
        }

        navigate('/PublicationManagement');
    };

    const modifyPublication = async(pName, pDescription, pTags, pCategory, pSubcategory, pImage) => {
        const newData = await fetch('http://localhost:5000/createPublication',{
            method: 'PATCH',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: pName,
                description: pDescription,
                tags: pTags,
                category: pCategory,
                subcategory: pSubcategory,
                image: pImage
            })
        }).then(res => res.json())
        if(newData.response === 'Publication created successfully'){
            navigate('/PublicationManagement');
            console.log('Publication created successfully');
        }
    }

    // RETURN -----------------------------------------------------------------
    return (
        <div className="ModifyCreatePublication">
            <Navbar showIcons={true} />
            <Link to={"/PublicationManagement"}><button className="backManagementPublication"><img src={back} alt="" /></button>
            </Link>
            <h1>Maquillaje Ursula</h1>

            <section className="layoutModifyCreatePublication">
                <div className="gridPosition">
                    <label>Nombre</label><br />
                    <input value={selectedName} onChange={(e) => setSelectedName(e.target.value)} type="text" id="namePublication" name="name" /><br />

                    <label>Descripción</label><br />
                    <textarea value={selectedDescription} onChange={(e) => setSelectedDescription(e.target.value)} type="text" id="descriptionPublication" name="description" /><br />

                    <button type="submit" className="buttonModifyCreatePublication" onClick={handlePublication}>Modificar publicación</button>
                </div>
                <div>
                    <label>Tags</label><br />
                    <input value={selectedTags} onChange={(e) => setSelectedTags(e.target.value)} type="text" id="tagsPublication" name="tags" /><br />

                    <label>Categoría</label><br />
                    <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} options={categories} placeholder="Seleccione una opción" className="options" />
                    <br />

                    <label>Subcategoría</label><br />
                    <Dropdown value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)} options={subcategories} placeholder="Seleccione una opción" className="options" />
                    <br />
                </div>
                <div>
                    <img src={selectedImage} alt="" name="image" />
                    <button className="buttonLoadImage" type="button" onClick={handleClickImage}>Cargar imagen</button>
                    <input type="file" onChange={handleChangeImage} ref={hiddenFileInput} style={{ display: "none" }} />
                </div>
            </section>
        </div>
    );
}

export default ModifyPublication;
