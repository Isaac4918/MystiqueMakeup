import React, { useState } from 'react';
import DeleteAccount from './DeleteAccount';
import '../styles/Account.css'
import paletteColors from '../components/assets/paletteColors.png'
import Navbar from "../../components/Navbar"
import { useNavigate } from 'react-router-dom'; 

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
      <button name="Update" onClick={ModifyAccountPage}>Modificar datos</button>
      <br />
      <br />
      <button name="Delete" onClick={handleClick}>Eliminar cuenta</button>
      {mostrarDeleteAccount && <DeleteAccount onConfirmar={handleConfirmar} />}
</div>
  )
}

export function MenuUser(){
  return(
    <div className='menuUser'>
      <h2>Bienvenido/a</h2>
      <button name= "Purchases">Ver mis compras</button><br />
      <br />
      <button name="LogOut">Cerrar Sesión</button>
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

