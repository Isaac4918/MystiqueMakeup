import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import paletteColors from '../../components/assets/paletteColors.png'
import Navbar from "../../components/Navbar"
import '../../styles/Account.css'

export function MenuAdmin(){
  const navigate = useNavigate();

  const ManageCategoriesPage = () => {
    navigate('/account/manageCategories');
  };

  const ManageAdminPage = () => {
    navigate('/account/manageAdmin');
  };

  const HomePage = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const ManageProductsPage = () => {
    navigate('/ProductManagement');
  };

  const ManagePublicationsPage = () => {
    navigate('/PublicationManagement');
  };

  return(
    <div className='menuAdmin'>
      <h2>Bienvenido/a</h2>
      <button onClick={ManageAdminPage}>Gestionar Administradores</button><br />
      <br />
      <button onClick={ManagePublicationsPage}>Gestionar Publicaciones</button><br />
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
  const [ account, setAccount] = useState({});
  const navigate = useNavigate();
  

  const ModifyAccountPage = () => {
    navigate('/account/modifyAccount');
  };

  const DeleteAccountPage = () => {
    navigate('/account/deleteAccount');
  };

  const backPage = () => {
    navigate('/');
  };
 
  const getAccount = async() => {
    const response = await fetch('http://localhost:5000/getAccount',{
      method: 'GET',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': username 
      }
    });

    if(response.ok){
      const data = await response.json();
      console.log("Cuenta recibida", data);
      setAccount(data.account);
    }
    
  }

  useEffect(() => {
    getAccount();
  }, []);
  
  return(
    <div className='infoAccount'>  
      <h2>Información</h2>
      <label>Usuario: { account.username}</label><br />
      <br />
      <label>Email: {account.email}</label><br />
      <br />
      <button name="Update" onClick={ModifyAccountPage}>Modificar datos</button><br />
      <br />
      <button name="Delete" onClick={DeleteAccountPage}>Eliminar cuenta</button>
      <br />
      <br />
      <button name="Delete" onClick={backPage}>Volver</button>
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