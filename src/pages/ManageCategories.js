import React, { useState } from 'react';
import '../styles/Category.css'
import Navbar from "../components/Navbar" 
import { useNavigate } from 'react-router-dom';
import DeleteAccount from './DeleteAccount';

export function MenuCategories(){
  const [mostrarDeleteAccount, setMostrarDeleteAccount] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setMostrarDeleteAccount(true);
  }

  const handleConfirmar = () => {
    setMostrarDeleteAccount(false);
  }

  const DeleteSubCategoryPage = () => {
    navigate('/account/manageCategories/deleteSubCategory');
  };

  const CreateCategoryPage = () => {
    navigate('/account/manageCategories/createCategory');
  };

  const ModifyCategoryPage = () => {
    navigate('/account/manageCategories/modifyCategory');
  };
  
  return(
    <div className='manageCategories'>
    <h1>Gestionar Categorías</h1>
    <button onClick={CreateCategoryPage}>Crear Categoría</button><br />
    <br />
    <button onClick={ModifyCategoryPage}>Modificar Categoría</button><br />
    <br />
    <button onClick={DeleteSubCategoryPage}>Eliminar Subcategoría</button><br />
    <br />
    <button onClick={handleClick}>Eliminar Categoría</button><br />
    {mostrarDeleteAccount && <DeleteAccount onConfirmar={handleConfirmar} />}
    <br />
    <button name="backButton">Volver</button>
  </div>
  )
}


function ManageCategories(){
    return(
      <div>
        <Navbar showIcons={false} />
        <MenuCategories />
      </div>
    )
  }

  export default ManageCategories;