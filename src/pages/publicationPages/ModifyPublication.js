import React, { useRef, useState, useEffect } from 'react';
import "../../styles/Publications.css";
import Navbar from "../../components/Navbar";
import back from "../../components/assets/arrowBack.png";
import { Dropdown } from 'primereact/dropdown';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import imagePlaceholder from '../../components/assets/imagePlaceHolder.png';

function ModifyPublication() {
    let { id } = useParams();
    // VARIABLES -----------------------------------------------------------------
    const navigate = useNavigate();
    const hiddenFileInput = useRef(null);
    const baseAPIurl = 'http://localhost:5000';

    const [selectedName, setSelectedName] = useState('');
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState('');
    const [blobImage, setBlobImage] = useState('NotUploaded');
    const [selectedImage, setImage] = useState(imagePlaceholder);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [parsedCategories, setParsedCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [imageURL, setImageURL] = useState('');
    const [pDate, setPDate] = useState('');
    const [pImagePath, setPImagePath] = useState('');

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

    const parseTags = (pTags) => {
        let parsedTags = '';
        for (let i = 0; i < pTags.length; i++) {
            parsedTags += '#' + pTags[i];
        }
        setSelectedTags(parsedTags);
    }

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

    const getPublication = async () => {
        const response = await fetch(baseAPIurl + '/publications/get/' + id, {
            method: 'GET'
        }).then(res => res.json());
        return response;
    }

    useEffect(() => {
        getCategories();
        let publicationVar = getPublication().then(res => {
            setSelectedName(res.name);
            setSelectedDescription(res.description);
            parseTags(res.tags);
            setImage(res.imageURL);
            setPDate(res.date);
            setPImagePath(res.imagePath);
            setImageURL(res.imageURL);
        });
    }, []);

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

    const handlePublication = async (event) => {
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
        let result = await modifyPublication(selectedName, selectedDescription, selectedTags, selectedCategory, selectedSubcategory);
        if (result.status === 200) {
            alert("Publicación modificada con éxito");
            navigate('/PublicationManagement');
        } else {
            alert("ERROR: No se pudo modificar la publicación");
        }
    };

    const modifyPublication = async (pName, pDescription, pTags, pCategory, pSubcategory) => {
        if (blobImage !== 'NotUploaded') {
            console.log('entro');
            let formData = new FormData();
            formData.append('image', blobImage)

            const uploadImage = await fetch(baseAPIurl + '/image/upload/publications/' + id.toString(), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            }).then(res => res.json());
            setImageURL(uploadImage.imageURL);
        }

        console.log(id);
        console.log(pName);
        console.log(pDescription);
        console.log(pImagePath);
        console.log(pDate);
        console.log(pTags.split(/[# ,]+/).map((tag) => tag.trim()).slice(1));
        console.log(pCategory);
        console.log(pSubcategory);
        console.log(imageURL);


        const newData = await fetch('http://localhost:5000/publications/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: pName,
                description: pDescription,
                imagePath: pImagePath,
                date: pDate,
                tags: pTags.split(/[# ,]+/).map((tag) => tag.trim()).slice(1),
                category: pCategory,
                subCategory: pSubcategory,
                imageURL: imageURL
            })
        });

        return newData;
    }

    // RETURN -----------------------------------------------------------------
    return (
        <div className="ModifyCreatePublication">
            <Navbar showIcons={true} />
            <Link to={"/PublicationManagement"}><button className="backManagementPublication"><img src={back} alt="" /></button>
            </Link>
            <h1>Modificar Publicación</h1>

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

export default ModifyPublication;
