import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import backButton from '../../components/assets/back.png'
import Navbar from "../../components/Navbar"  
import '../../styles/Category.css'

export function BackAccount(){
    return(
        <div className="back"> 
            <a href="/account/manageCategories"><img src={backButton} alt=""/></a>
        </div>
    )
}

export function SearchCategory(){
    const [dropdown, setDropdown] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const OpenCloseDropdown = () =>{
        setDropdown(!dropdown);
    }

    const handleSelect = (event) => {
        setSelectedItem(event.currentTarget.textContent);
    }


    return(
        <div>
            <h1 name='categoryTitle'>Modificar Categoría</h1>
            <label name='categoryLabel'>Seleccione una categoría: </label>
            <Dropdown isOpen={dropdown} toggle={OpenCloseDropdown}>
                <DropdownToggle caret className='selectBox'>
                    {selectedItem}
                </DropdownToggle>

                <DropdownMenu>
                    <DropdownItem onClick={handleSelect}>Terror</DropdownItem>
                    <DropdownItem onClick={handleSelect}>Fantasía</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export function UpdateInfo(){
    const [isChecked, setIsChecked] = useState(false);

    const Check = () => {
      setIsChecked(!isChecked);
    };

    return(
        <div>
            <label name='categoryLabel'>Nombre</label>
            <br />
            <input type='text' name='nameCategory'/>
            <br />
            <label name='categoryLabel'>
                <input type="checkbox" name='subcategoryCheckBox' checked={isChecked} onChange={Check} />
                &nbsp;Modificar subcategoría
            </label>
            <br /><br />
            {isChecked && <UpdateSubcategories />}
            <br />
            <button name='categoryOption'>Modificar</button>
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
            <label name='categoryLabel'>
                Cantidad de subcategorías: 
                &nbsp;<input type="number" name='numberInput' value={inputCount} onChange={handleInputChange} />
            </label>
            <br />
            {inputs}
        </div>
    )
}



function ModifyCategory(){
    return(
        <div>
            <Navbar showIcons={false}/>
            <div className='modifyCategory'>
                <BackAccount />
                <SearchCategory />
                <UpdateInfo />
            </div>
        </div>
    )

}

export default ModifyCategory;