import '../styles/Category.css'
import Navbar from "../components/Navbar" 

export function MenuCategories(){
  return(
    <div className='manageCategories'>
    <h1>Gestionar Categorías</h1>
    <button>Crear Categoría</button><br />
    <br />
    <button>Modificar Categoría</button><br />
    <br />
    <button>Eliminar Subcategoría</button><br />
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