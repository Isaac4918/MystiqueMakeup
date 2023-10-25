import React, { useState } from 'react';
import '../styles/Category.css';
import backButton from '../components/assets/back.png'
import Navbar from "../components/Navbar" 
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

export function BackAccount(){
    return(
        <div className="backAccount"> 
            <a href="/"><img src={backButton} alt=""/></a>
        </div>
    )
}

export function EraseSubCategory(){
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
            <h1>Eliminar SubCategoría</h1>
            <label>Seleccione una cateogría: </label><br />
            <Dropdown isOpen={dropdown} toggle={OpenCloseDropdown}>
                <DropdownToggle caret>
                    {selectedItem} 
                </DropdownToggle>

                <DropdownMenu>
                    <DropdownItem>Terror</DropdownItem>
                    <DropdownItem>Fantasía</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}


function DeleteSubCategory() {
    return (
        <div>
            <Navbar showIcons={false} />
            <div className="deleteSubCategory">
                <BackAccount />
                <EraseSubCategory />
            </div>
        </div>
    );
}

export default DeleteSubCategory;