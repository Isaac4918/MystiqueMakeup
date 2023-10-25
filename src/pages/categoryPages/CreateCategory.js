import React, { useState } from 'react';
import '../styles/Category.css'
import backButton from '../components/assets/back.png'
import Navbar from "../../components/Navbar" 

export function BackAccount(){
    return(
        <div className="backCategories"> 
            <a href="/account/manageCategories"><img src={backButton} alt=""/></a>
        </div>
    )
}

export function InfoCategory(){
    const [isChecked, setIsChecked] = useState(false);

    const Check = () => {
      setIsChecked(!isChecked);
    };

    return(
        <div>
            <h1 name='categoryTitle'>Crear Categoría</h1>
            <label>Nombre</label>
            <br />
            <input type='text' name='nameCategory'/>
            <br />
            <label>
                <input type="checkbox" name='subcategoryCheckBox' checked={isChecked} onChange={Check} />
                &nbsp;Agregar subcategoría
            </label>
            <br />
            {isChecked && <AddSubcategories />}
            <br />
            <button name='categoryOption'>Crear</button>
        </div>
    )
}

export function AddSubcategories(){
    const [inputCount, setInputCount] = useState(0);
    const [inputs, setInputs] = useState([]);

    const handleInputChange = (event) => {
        setInputCount(event.target.value);
        const newInputs = [];
        for(let i = 0; i < event.target.value; i++) {
          newInputs.push(<input key={i} type="text" name='generateInputs'/>);
        }
        setInputs(newInputs);
    }

    return(
        <div>
            <label>
                Cantidad de subcategorías: 
                &nbsp;<input type="number" name='numberInput' value={inputCount} onChange={handleInputChange} />
            </label>
            <br />
            {inputs}
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