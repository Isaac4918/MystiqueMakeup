import React, { useState } from 'react';
import '../../styles/Category.css'
import backButton from '../../components/assets/back.png'
import Navbar from "../../components/Navbar" 
import { useNavigate } from 'react-router-dom';

export function BackAccount(){
    return(
        <div className="back"> 
            <a href="/account/manageCategories"><img src={backButton} alt=""/></a>
        </div>
    )
}

export function InfoCategory(){
    const [isChecked, setIsChecked] = useState(false);
    const [inputCount, setInputCount] = useState("0");
    const [selectedCategory, setSelectedCategory] = useState('');
    const [inputs, setInputs] = useState([]);
    const [inputValues, setInputValues] = useState([]);
    const navigate = useNavigate();

    const Check = () => {
      setIsChecked(!isChecked);
    };

    const checkInputValues = () => {
        for(let i = 0; i < inputValues.length; i++) {
            if(inputValues[i] === '') {
                return true;
            }
        }
        return false;
    }

    const handleInputChange = (event) => {
        const newInputCount = event.target.value;
        setInputCount(newInputCount);

        if (newInputCount < inputCount) {
            setInputValues(inputValues.slice(0, newInputCount));
        } else if (newInputCount > inputCount) {
            setInputValues(prevInputValues => [...prevInputValues, ...new Array(newInputCount - inputCount).fill('')]);
        }

        setInputCount(event.target.value);
        const newInputs = [];
        for(let i = 0; i < event.target.value; i++) {
            newInputs.push(
                <input 
                  key={i} 
                  type="text" 
                  name='generateInputs' 
                  onChange={event => {
                    const newValue = event.target.value;
                    setInputValues(prevInputValues => {
                      const newInputValues = [...prevInputValues];
                      newInputValues[i] = { name: newValue };
                      return newInputValues;
                    });
                  }}
                />
              );
        }
        setInputs(newInputs);
    }

    const handleConfirmation = async(event) => {
        event.preventDefault();

        if(!selectedCategory || !isChecked){
            alert('Todos los campos son obligatorios');
        }

        else if(inputCount === "0"){
            alert('Ingrese la cantidad de subcategorías');
        }

        else if(checkInputValues()){
            alert('Todos los campos son obligatorios');
        }

        else{
            let result = await createCategory(selectedCategory, inputValues);
            if (result.status === 200) {
                alert("Categoría creada con éxito");
                navigate('/account/manageCategories');
            } else {
                alert("ERROR: No se pudo crear la publicación");
            }
        }
    }

    const createCategory = async (pCategory, pSubcategories) => {

        // get id
        const currentId = await fetch('http://localhost:5000/category/get/id', {
            method: 'GET',
        }).then(res => res.json());

        // update the id
        const nextId = await fetch('http://localhost:5000/category/update/id', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, body: JSON.stringify({
                id: currentId + 1
            })
        });

        // create the category
        const response = await fetch('http://localhost:5000/category/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: currentId,
                name: pCategory,
                subCategories: pSubcategories
            })
        });

        return response;
    }

    return(
        <div>
            <h1 name='categoryTitle'>Crear Categoría</h1>
            <label name='categoryLabel'>Nombre</label>
            <br />
            <input type='text' name='nameCategory' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}/>
            <br />
            <label name='categoryLabel'>
                <input type="checkbox" name='subcategoryCheckBox' checked={isChecked} onChange={Check} />
                &nbsp;Agregar subcategoría
            </label>
            <br />
            {
                isChecked && 
                        <div>
                            <label name='categoryLabel'>
                                Cantidad de subcategorías: 
                                &nbsp;<input type="number" min="0" name='numberInput' value={inputCount} onChange={handleInputChange} />
                            </label>
                            <br />
                            {inputs}
                        </div> 
            }
            <br />
            <button name='categoryOption' onClick={handleConfirmation}>Crear</button>
        </div>
    )
}



function CreateCategory(){
    return(
        <div>
            <Navbar showIcons={false} />
            <div className='createCategory'>
                <BackAccount />
                <InfoCategory/>
            </div>
        </div>
    )
}

export default CreateCategory;