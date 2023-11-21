import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from "../../components/Navbar" 
import '../../styles/Account.css'
import paletteColors from '../../components/assets/paletteColors.png'


export function InfoAccount(){
  const navigate = useNavigate();
  const [ account, setAccount] = useState({});
  let username = localStorage.getItem('username');
  
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
      <label>Usuario: {account.username}</label><br />
      <br />
      <label>Email: {account.email}</label><br />
      <br />
      <button name="Update" onClick={ModifyAccountPage}>Modificar datos</button>
      <br />
      <br />
      <button name="Delete" onClick={DeleteAccountPage}>Eliminar cuenta</button>
      <br />
      <br />
      <button name="Delete" onClick={backPage}>Volver</button>
</div>
  )
}

export function MenuUser(){
  const navigate = useNavigate();
  
  const HomePage = () => {
    console.log("CIERRE SESION");
    localStorage.removeItem('username');
    navigate('/');
  };

  const PurchasesPage = () => {
    navigate('/MyPurchases');
  };

  return(
    <div className='menuUser'>
      <h2>Bienvenido/a</h2>
      <button name= "Purchases" onClick={PurchasesPage}>Ver mis compras</button><br />
      <br />
      <button name="LogOut" onClick={HomePage}>Cerrar Sesión</button>
    </div>
  )
}


function AccountUser(){  
    return(
      <div>
         <Navbar showIcons={false} /> 
         <div className='AccountUser'>
            <img src={paletteColors} alt="" />
            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
              <InfoAccount />
              <MenuUser />
            </div>
        </div> 
      </div>
    )
}

export default AccountUser;

