import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import backButton from '../../components/assets/back.png'
import Navbar from "../../components/Navbar"  
import '../../styles/Category.css'
import { useNavigate } from 'react-router-dom';

export function BackAccount(){
    return(
        <div className="back"> 
            <a href="/account/manageCategories"><img src={backButton} alt=""/></a>
        </div>
    )
}

export function UpdateInfo(){
    const [dropdown, setDropdown] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedKey, setSelectedKey] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const [inputCount, setInputCount] = useState("0");
    const [inputs, setInputs] = useState([]);
    const [inputValues, setInputValues] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [parsedCategories, setParsedCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(false);
    const navigate = useNavigate();

    const OpenCloseDropdown = () =>{
        setDropdown(!dropdown);
    }

    const handleSelect = (event) => {
        setSelectedItem(event.currentTarget.textContent);
        setSelectedKey(event.currentTarget.getAttribute('data-key'))
        let id = event.currentTarget.getAttribute('data-key');
        let currentCategoryVar = getCategoryById(id);
        setCurrentCategory(currentCategoryVar);
        console.log("Me actualicé")
    }

    const updateInputs = async() => {
        if(currentCategory !== false){
            setIsChecked(true)
            setInputCount(currentCategory.subCategories.length);
            generateInputs(currentCategory.subCategories.length);
            setSelectedCategory(currentCategory.name);
            setInputValues(await parseSubcategories(currentCategory.subCategories));
            console.log(inputValues)
        }
    }

    const parseSubcategories = (listOfSubCat) =>{
        let subcategories = [];
        for(let i = 0; i < listOfSubCat.length; i++){
            subcategories.push(listOfSubCat[i].name);
        }
        return subcategories;
    }

    const Check = () => {
        setIsChecked(!isChecked);
    };

    const getCategoryById = (pId) => {
        for(let i = 0; i < parsedCategories.length; i++) {
            if(parsedCategories[i].id.toString() === pId) {
                return parsedCategories[i];
            }
        }
    }

    const checkInputValues = () => {
        for(let i = 0; i < inputValues.length; i++) {
            if(inputValues[i] === '') {
                return true;
            }
        }
        return false;
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

    const handleInputChange = (event) => {
        const newInputCount = event.target.value;
        setInputCount(newInputCount);

        if (newInputCount < inputCount) {
            setInputValues(inputValues.slice(0, newInputCount));
        } else if (newInputCount > inputCount) {
            setInputValues(prevInputValues => [...prevInputValues, ...new Array(newInputCount - inputCount).fill('')]);
        }

        setInputCount(event.target.value);
        generateInputs(event.target.value);
    }

    const generateInputs = (num) =>{
        const newInputs = [];
        for(let i = 0; i < num; i++) {
            newInputs.push(
                <input 
                  key={i} 
                  type="text" 
                  name='generateInputs' 
                  value = {inputValues[i]}
                  onChange={event => {
                    const newValue = num;
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

    const handleConfirmation = async (event) => {
        event.preventDefault();

        if(!selectedCategory){
            alert('Todos los campos son obligatorios');
        }

        else if(inputCount === "0" || !isChecked){
            alert('Ingrese la cantidad de subcategorías');
        }

        else if(checkInputValues()){
             alert('Todos los campos son obligatorios');
        }

        else{
            let result = await updateCategory(selectedKey, selectedCategory, inputValues);
            if (result.status === 200) {
                alert("Categoría modificada con éxito");
                navigate('/account/manageCategories');
            } else {
                alert("ERROR: No se pudo modificar la categoría");
            }
        }
    }

    const updateCategory = async (pId, pCategory, pSubcategories) => {
        //aca solo actualiza las subcategorias de la categoria seleccionada
        const response = await fetch('http://localhost:5000/category/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: pId,
                name: pCategory,
                subCategories: pSubcategories
            })
        });

        return response;
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
                    {parsedCategories.map((category) => (
                        <DropdownItem key={category.id} data-key={category.id} onClick={handleSelect}>{category.name}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            <button name='categoryOption' onClick={updateInputs}>Obtener Información</button>
            <div>
            <label name='categoryLabel'>Nombre</label>
            <br />
            <input type='text' name='nameCategory' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}/>
            <br />
            <label name='categoryLabel'>
                <input type="checkbox" name='subcategoryCheckBox' checked={isChecked} onChange={Check} />
                &nbsp;Modificar subcategoría
            </label>
            <br /><br />
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
            <button name='categoryOption' onClick={handleConfirmation}>Modificar</button>
        </div>
        </div>
    )
}


function ModifyCategory(){
    return(
        <div>
            <Navbar showIcons={false}/>
            <div className='modifyCategory'>
                <BackAccount />
                <UpdateInfo />
            </div>
        </div>
    )

}

export default ModifyCategory;