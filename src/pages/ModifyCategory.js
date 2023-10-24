import React, { useState } from 'react';
import backButton from '../components/assets/back.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

export function BackAccount(){
    return(
        <div className="backAccount"> 
            <a href="/account/manageCategories"><img src={backButton} alt=""/></a>
        </div>
    )
}

export function searchCategory(){
    const [dropdown, setDropdown] = useState(false);

    const OpenCloseDropdown = () =>{
        setDropdown(!dropdown);
    }

    return(
        <div>
            <h1>Modificar Categoría</h1>
            <label>Seleccione una categoría: </label>
            <Dropdown isOpen={dropdown} toggle={OpenCloseDropdown}>
                <DropdownToggle caret />

                <DropdownMenu>
                    <DropdownItem>Terror</DropdownItem>
                    <DropdownItem>Fantasía</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export function updateInfo(){
    const [isChecked, setIsChecked] = useState(false);

    const Check = () => {
      setIsChecked(!isChecked);
    };

    return(
        <div>
            <label>Nombre</label>
            <br />
            <input type='text' name='nameCategory'/>
            <br />
            <label>
                <input type="checkbox" name='updateSubcategory' checked={isChecked} onChange={Check} />
                &nbsp;Modificar subcategoría
            </label>
        <br />
        {isChecked && <UpdateSubcategories />}
        <br />
        <button>Modificar Categoría</button>
    </div>
    )
}


export function UpdateSubcategories(){
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



function ModifyCategory(){

}

export default ModifyCategory;