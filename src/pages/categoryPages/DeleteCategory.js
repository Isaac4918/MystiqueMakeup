import React, { useState, useEffect } from 'react';
import '../../styles/Category.css'
import backButton from '../../components/assets/back.png'
import Navbar from "../../components/Navbar" 
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { useNavigate } from 'react-router-dom';

export function BackAccount(){
    return(
        <div className="back"> 
            <a href="/account/manageCategories"><img src={backButton} alt=""/></a>
        </div>
    )
}

export function EraseCategory(){
    const [dropdownCategory, setDropdownCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedKeyCategory, setSelectedKeyCategory] = useState(0);
    const [dropdownSubcategory, setDropdownSubcategory] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [parsedCategories, setParsedCategories] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const OpenCloseDropdownCategory = () =>{
        setDropdownCategory(!dropdownCategory);
    }

    const handleSelectCategory = (event) => {
        setSelectedCategory(event.currentTarget.textContent);
        setSelectedKeyCategory(event.currentTarget.getAttribute('data-key'))
    }

    const OpenCloseDropdownSubcategory = () =>{
        setDropdownSubcategory(!dropdownSubcategory);
    }

    const handleSelectSubcategory = (event) => {
        setSelectedSubcategory(event.currentTarget.textContent);
    }

    const Check = () => {
      setIsChecked(!isChecked);
    }

    const getCategories = async () => {
        const response = await fetch('http://localhost:5000/category/all', {
            method: 'GET',
        }).then(res => res.json());

        let categorylist = [];
        for (let i = 0; i < response.length; i++) {
            categorylist.push(response[i]);
        }
        setParsedCategories(categorylist);
    }
    useEffect(() => {
        getCategories();
    }, []);

    const handleConfirmation = async (event) => {
        event.preventDefault();

        if(!selectedCategory){
            alert('Debe elegir una categoría');
        }

        else if(window.confirm("¿Está seguro que desea eliminar la categoría " + selectedCategory + "?")){
            let result = await deleteCategory(selectedKeyCategory, selectedCategory);
            if (result.status === 200) {
                alert("Categoría eliminada con éxito");
                navigate('/account/manageCategories');
            } else {
                alert("ERROR: la categoría " + selectedCategory + " no se pudo eliminar, hubo un error o está asociada a una o más publicaciones o productos");
            }
        }
    }

    const deleteCategory = async (pId, pCategory) => {
        console.log("PIDDDDDDDDDDDDD", pId, pCategory)
        const response = await fetch('http://localhost:5000/category/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: pId,
                name: pCategory
            })
        });

        return response;
    }

    return(
        <div>
            <h1 name='categoryTitle'>Eliminar Categoría</h1>
            <label name='categoryLabel'>Seleccione categoría: </label>
            <Dropdown isOpen={dropdownCategory} toggle={OpenCloseDropdownCategory}>
                <DropdownToggle caret className='selectBox'>
                    {parsedCategories.length > 0 ? selectedCategory : "No hay categorías"}
                </DropdownToggle>

                <DropdownMenu>
                    {parsedCategories.map((category, index) => (
                        <DropdownItem key={index} data-key={category.id} onClick={handleSelectCategory}>{category.name}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>

            <br /><br />
            {
            isChecked && 
                    <div>
                        <label name='categoryLabel'>Seleccione subcategoría:</label>
                        <Dropdown isOpen={dropdownSubcategory} toggle={OpenCloseDropdownSubcategory}>
                            <DropdownToggle caret className='selectBox'>
                                {selectedSubcategory} 
                            </DropdownToggle>
            
                            <DropdownMenu>
                                <DropdownItem onClick={handleSelectSubcategory}>Cruela</DropdownItem>
                                <DropdownItem onClick={handleSelectSubcategory}>Bruja</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <br />
                    </div>
            }
            <br /><br />
            <button name='categoryOption' onClick={handleConfirmation}>Eliminar</button>
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