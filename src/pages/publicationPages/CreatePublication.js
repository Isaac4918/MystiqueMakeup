import React, { useRef, useState, useEffect } from 'react';
import "../../styles/Publications.css";
import Navbar from "../../components/Navbar";
import back from "../../components/assets/arrowBack.png";
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import imagePlaceholder from '../../components/assets/imagePlaceHolder.png';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { UpdateSubcategories } from '../categoryPages/ModifyCategory';

const CreatePublication = () => {
    // VARIABLES -----------------------------------------------------------------
    const navigate = useNavigate();
    const hiddenFileInput = useRef(null);

    const baseAPIurl = 'http://localhost:5000';
    const [selectedName, setSelectedName] = useState('');
    const [blobImage, setBlobImage] = useState('-');
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState('');
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
        //console.log("****",response);
        let categorylist = [];
        for (let i = 0; i < response.length; i++) {
            categorylist.push(response[i].name);
        }
        setParsedCategories(categorylist);
        //return;
    }
    useEffect(() => {
        getCategories();
    }, []);

    const handleClickImage = (event) => {
        hiddenFileInput.current.click();
    };

    const handleChangeImage = (event) => {
        const fileUploaded = event.target.files;
        if (fileUploaded[0].name) {
            setImage(URL.createObjectURL(fileUploaded[0]));
            setBlobImage(fileUploaded[0]);
            //console.log("====>", blobImage);
        }
    };

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

    const prueba = async (event) => {
        //console.log("====>", blobImage);

        // console.log("categories =====>", categories);
        // console.log("parsedCategories =====>", parsedCategories);
        // console.log("selectedTags =====>", selectedTags.split(/[# ,]+/).map((tag) => tag.trim()).slice(1));


        // let pruebaArray = [1,2,3,4];
        // pruebaArray = [...pruebaArray.slice(1)]
        // console.log("pruebaArray =====>", pruebaArray);

        //pTags.split("#").map((tag) => tag.trim())

    }

    const handlePublication = async(event) => {
        event.preventDefault();

        if (!selectedName || !selectedDescription || !selectedTags || !selectedCategory || !selectedSubcategory || !selectedImage) {
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

        if (selectedImage === imagePlaceholder) {
            alert("ERROR: Debe seleccionar una imagen");
            return;
        }
        if (blobImage === '-') {
            alert("ERROR: Debe seleccionar una imagen");
            return;
        }

        let result = await createPublication(selectedName, selectedDescription, selectedTags, selectedCategory, selectedSubcategory);
        if (result.status === 200) {
            alert("Publicación creada con éxito");
            navigate('/PublicationManagement');
        } else {
            alert("ERROR: No se pudo crear la publicación");
        }
    };

    const createPublication = async (pName, pDescription, pTags, pCategory, pSubcategory) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // months are zero indexed
        const day = date.getDate();
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

        // get id
        const currentId = await fetch(baseAPIurl + '/publications/get/id', {
            method: 'GET',
        }).then(res => res.json());

        // update the id
        const nextId = await fetch(baseAPIurl + '/publications/update/id', {
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

        const uploadImage = await fetch(baseAPIurl + '/image/upload/publications/' + currentId.toString(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        }).then(res => res.json());

        // save the url of the image
        let imageURL = uploadImage.imageUrl;

        //define the path of the image
        let imagePath = 'publications/' + currentId.toString();

        // create the publication
        const newData = await fetch(baseAPIurl + '/publications/create',{
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
                date: formattedDate,
                tags: pTags.split(/[# ,]+/).map((tag) => tag.trim()).slice(1),
                category: pCategory,
                subcategory: pSubcategory,
                imageURL: imageURL
            })
        });
        
        return newData;
    }

    // RETURN -----------------------------------------------------------------
    return (
        <div className="ModifyCreatePublication">
            <Navbar showIcons={true} />
            <Link to={"/PublicationManagement"}><button className="backManagementPublication"><img src={back} alt="" /></button></Link>
            <section className="layoutModifyCreatePublication">
                <div className="gridPosition">
                    <label>Nombre</label><br />
                    <input value={selectedName} onChange={(e) => setSelectedName(e.target.value)} type="text" id="namePublication" name="name" /><br />

                    <label>Descripción</label><br />
                    <textarea value={selectedDescription} onChange={(e) => setSelectedDescription(e.target.value)} type="text" id="descriptionPublication" name="description" /><br />

                    <button type="submit" className="buttonModifyCreatePublication" onClick={handlePublication}>Crear publicación</button>
                </div>
                <div>
                    <label>Tags</label><br />
                    <input value={selectedTags} onChange={(e) => setSelectedTags(e.target.value)} type="text" id="tagsPublication" name="tags" /><br />

                    <label>Categoría</label><br />
                    <Dropdown value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); getSubcategories(e.target.value); }} options={parsedCategories} placeholder="Seleccione una opción" className="options" />
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

export default CreatePublication;
