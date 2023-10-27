import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import paletteColors from '../../components/assets/paletteColors.png'
import Navbar from "../../components/Navbar"
import '../../styles/Account.css'
import DeleteAccount from './DeleteAccount';

export function MenuAdmin(){
  const navigate = useNavigate();

  const ManageCategoriesPage = () => {
    navigate('/account/manageCategories');
  };

  const ManageAdminPage = () => {
    navigate('/account/manageAdmin');
  };

  const HomePage = () => {
    navigate('/');
  };

  return(
    <div className='menuAdmin'>
      <h2>Bienvenido/a</h2>
      <button onClick={ManageAdminPage}>Gestionar Administradores</button><br />
      <br />
      <button>Gestionar Publicaciones</button><br />
      <br />
      <button onClick={ManageProductsPage}>Gestionar Productos</button><br />
      <br />
      <button onClick={ManageCategoriesPage}>Gestionar Categorías</button><br />
      <br />
      <button>Gestionar Agenda</button><br />
      <br />
      <button name="LogOut" onClick={HomePage}>Cerrar Sesión</button>
    </div>
  )
}


export function InfoAccount(){
  const [mostrarDeleteAccount, setMostrarDeleteAccount] = useState(false);
  const navigate = useNavigate();
  
  const ModifyAccountPage = () => {
    navigate('/account/modifyAccount');
  };

  const handleClick = () => {
    setMostrarDeleteAccount(true);
  }

  const handleConfirmar = () => {
    setMostrarDeleteAccount(false);
  }
  
  return(
    <div className='infoAccount'>  
      <h2>Información</h2>
      <label>Usuario: XXXXX</label><br />
      <br />
      <label>Email: XXX@gmail.com</label><br />
      <br />
      <button name="Update" onClick={ModifyAccountPage}>Modificar datos</button><br />
      <br />
      <button name="Delete" onClick={handleClick}>Eliminar cuenta</button>
      {mostrarDeleteAccount && <DeleteAccount onConfirmar={handleConfirmar} />}
    </div>
  )
}


function AccountAdmin(){
  return(
    <div>
      <Navbar showIcons={false} />
      <div className='AccountAdmin'> 
          <img src={paletteColors} alt=""/>
          <div style={{display: 'flex', justifyContent: 'flex-start'}}>
              <InfoAccount />
              <MenuAdmin />
          </div>
      </div> 
    </div>
  )
}

export default AccountAdmin;