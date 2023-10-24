import '../styles/Category.css'
import Navbar from "../components/Navbar" 
import { useNavigate } from 'react-router-dom';

export function MenuCategories(){
  const navigate = useNavigate();

  const DeleteSubCategoryPage = () => {
    navigate('/accountn/manageCategories/deleteSubCategory');
  };

  return(
    <div className='manageCategories'>
    <h1>Gestionar Categorías</h1>
    <button>Crear Categoría</button><br />
    <br />
    <button>Modificar Categoría</button><br />
    <br />
    <button onClick={DeleteSubCategoryPage}>Eliminar Subcategoría</button><br />
    <br />
    <button>Eliminar Categoría</button><br />
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