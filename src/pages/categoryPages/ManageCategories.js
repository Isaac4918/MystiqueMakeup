import React from 'react';
import '../../styles/Category.css'
import Navbar from "../../components/Navbar" 
import { useNavigate } from 'react-router-dom';

export function MenuCategories(){
  const navigate = useNavigate();

  const DeleteCategoryPage = () => {
    navigate('/account/manageCategories/deleteCategory');
  };

  const CreateCategoryPage = () => {
    navigate('/account/manageCategories/createCategory');
  };

  const ModifyCategoryPage = () => {
    navigate('/account/manageCategories/modifyCategory');
  };

  const AccountAdminPage = () => {
    navigate('/accountAdmin');
  };
  
  return(
    <div className='manageCategories'>
    <h1>Gestionar Categorías</h1>
    <button onClick={CreateCategoryPage}>Crear Categoría</button><br />
    <br />
    <button onClick={ModifyCategoryPage}>Modificar Categoría</button><br />
    <br />
    <button onClick={DeleteCategoryPage}>Eliminar Categoría</button><br />
    <br />
    <button name="backButton" onClick={AccountAdminPage}>Volver</button>
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