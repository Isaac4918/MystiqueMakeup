import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Input, InputArea } from '../../components/Input/Input';
import '../../styles/Publications.css'
import { BackButton } from '../../components/Buttons/BackButton';
import {Combobox} from '../../components/Combobox/Combobox';
import { StdButton } from '../../components/Buttons/StdButton';
import imagePlaceholder from '../../components/assets/imagePlaceHolder.png';


function CreatePublication() {
    const [publicationName, setPublicationName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [imageSource, setImageSource] = useState(imagePlaceholder);

    const handleSubmit = () => {
        console.log('publicationName: ', publicationName);
        console.log('description', description);
        console.log('tags', tags);
        // handle form submission logic here
    };

    const handleChangeInputs = (id,value) => {
        if(id === "publicationName"){
            setPublicationName(value);
            //console.log('publicationName: ', publicationName);
        }
        else if(id === "description"){
            setDescription(value);
            //console.log('description', description);
        }
        else if(id === "tags"){
            setTags(value);
            //console.log('tags', tags);
        }
    }

    let options = [1,2,3];
    let options2 = [1,2,3];

    return (
        <div>
            <Navbar />
            <section className='create-layout'>
                <div>
                    <BackButton navigateTo={"/"}/>
                    <h1>Crear Publicación</h1>
                    <br/>
                    <label className='labelLayout'>Nombre</label>
                    <br/>
                    <Input id="publicationName" type="text" placeholder="Nombre de la publicación" handleChange={handleChangeInputs}/>
                    <br/>
                    <label className='labelLayout'>Descripción</label>
                    <br/>
                    <InputArea id="description" type="text" placeholder="Descripción" area={true} handleChange={handleChangeInputs}/>
                </div>
                <div>
                    <label className='labelLayout'>Seleccione Categoría</label>
                    <br/>
                    <Combobox options={options}/>
                    <br/>
                    <label className='labelLayout'>Seleccione Sub-categoría</label>
                    <br/>
                    <Combobox options={options2}/>
                    <br/>
                    <label className='labelLayout'>Tags</label>
                    <br/>
                    <Input id="tags" type="text" placeholder="Tags de la publicación" handleChange={handleChangeInputs}/>
                </div>
                <div className='image-container'>
                    <img className="images" src={imageSource} alt= "Prueba"/>
                    <br/>
                    <StdButton text="Seleccionar Imagen" handleClick={() => console.log("Seleccionar Imagen")}/>
                </div>
            </section>
            <section>
                <StdButton text="Crear Publicación" buttonType = "Accept" handleClick={handleSubmit}/>
            </section>
        </div>
    );
}

export default CreatePublication;