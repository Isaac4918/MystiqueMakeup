import React, { useState, useEffect } from 'react';
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

  const ManageProductsPage = () => {
    navigate('/ProductManagement');
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
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  let token = localStorage.getItem('token');
  
  const ModifyAccountPage = () => {
    navigate('/account/modifyAccount');
  };
 
  const getAccount = async() => {
    const response = await fetch('http://localhost:5000/getAccount',{
      method: 'GET',
      headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}` 
      }
    })

    const data = await response.json(); // Esto convierte la respuesta en un objeto JSON

    console.log(data.account); // Esto imprimirá el objeto account en la consola

    setUserData(data.account); // Esto actualiza el estado con los nuevos datos
  }

  useEffect(() => {
    getAccount();
  }, []);

  const handleClick = () => {
    setMostrarDeleteAccount(true);
  }

  const handleConfirmar = () => {
    setMostrarDeleteAccount(false);
  }
  
  return(
    <div className='infoAccount'>  
      <h2>Información</h2>
      <label>Usuario: { userData.username}</label><br />
      <br />
      <label>Email: { userData.email }</label><br />
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