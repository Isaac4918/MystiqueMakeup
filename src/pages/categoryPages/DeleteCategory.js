import React, { useState } from 'react';
import '../../styles/Category.css'
import backButton from '../../components/assets/back.png'
import Navbar from "../../components/Navbar" 
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

export function BackAccount(){
    return(
        <div className="back"> 
            <a href="/account/manageCategories"><img src={backButton} alt=""/></a>
        </div>
    )
}

export function EraseCategory(){
    const [dropdown, setDropdown] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    const OpenCloseDropdown = () =>{
        setDropdown(!dropdown);
    }

    const handleSelect = (event) => {
        setSelectedItem(event.currentTarget.textContent);
    }


    const Check = () => {
      setIsChecked(!isChecked);
    };

    return(
        <div>
            <h1 name='categoryTitle'>Eliminar Categoría</h1>
            <label name='categoryLabel'>Seleccione categoría: </label><br />
            <Dropdown isOpen={dropdown} toggle={OpenCloseDropdown}>
                <DropdownToggle caret className='selectBox'>
                    {selectedItem} 
                </DropdownToggle>

                <DropdownMenu>
                    <DropdownItem onClick={handleSelect}>Terror</DropdownItem>
                    <DropdownItem onClick={handleSelect}>Fantasía</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <label name='categoryLabel'>
                <input type="checkbox" name='subcategoryCheckBox' checked={isChecked} onChange={Check} />
                &nbsp;Eliminar únicamente subcategoría
            </label>
            <br /><br />
            {isChecked && < DeleteSubcategories />}
            <br /><br />
            <button name='categoryOption'>Eliminar</button>
        </div>
    )
}

export function DeleteSubcategories(){
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
            <label name='categoryLabel'>Seleccione subcategoría:</label>
            <Dropdown isOpen={dropdown} toggle={OpenCloseDropdown}>
                <DropdownToggle caret className='selectBox'>
                    {selectedItem} 
                </DropdownToggle>

                <DropdownMenu>
                    <DropdownItem onClick={handleSelect}>Cruela</DropdownItem>
                    <DropdownItem onClick={handleSelect}>Bruja</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <br />
        </div>
    )
}



function DeleteCategory() {
    return (
        <div>
            <Navbar showIcons={false} />
            <div className="deleteCategory">
                <BackAccount />
                <EraseCategory />
            </div>
        </div>
    );
}

export default DeleteCategory;