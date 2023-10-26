import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Input, InputArea } from '../components/Input/Input';
import '../styles/Publications.css'
import { BackButton } from '../components/Buttons/BackButton';
import imagePlaceholder from '../components/assets/imagePlaceHolder.png';


function PublicationScreen() {
    const [publicationName, setPublicationName] = useState('Nombre Prueba');
    const [description, setDescription] = useState('Descripcion Prueba');
    const [tags, setTags] = useState('#Prueba #Quimica');
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

    return (
        <div>
            <Navbar />
            <section className='show-layout'>
                <div>
                    <BackButton navigateTo={"/"}/>
                    <h1>{publicationName}</h1>
                    <br/>
                    <label className='tagsLayout'>{tags}</label>
                    <br/>
                    <br/>
                    <strong className='labelLayout'>Descripción</strong>
                    <br/>
                    <label className='labelLayout'>{description}</label>
                </div>
                <div className='image-container'>
                    <img className="images" src={imageSource} alt= "Prueba"/>
                </div>
            </section>
        </div>
    );
}

export default PublicationScreen;