import React, { useState } from 'react';
import '../styles/Account.css'
import paletteColors from '../components/assets/paletteColors.png'
import DeleteAccount from './DeleteAccount';

export function MenuAdmin(){
  return(
    <div className='menuAdmin'>
      <button>Gestionar Administradores</button><br />
      <br />
      <button>Gestionar Publicaciones</button><br />
      <br />
      <button>Gestionar Productos</button><br />
      <br />
      <button>Gestionar Categorías</button><br />
      <br />
      <button>Gestionar Agenda</button><br />
      <br />
      <button name="LogOut">Cerrar Sesión</button>
    </div>
  )
}


export function InfoAccount(){
  const [mostrarDeleteAccount, setMostrarDeleteAccount] = useState(false);

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
      <button name="Update">Modificar datos</button><br />
      <br />
      <button name="Delete" onClick={handleClick}>Eliminar cuenta</button>
      {mostrarDeleteAccount && <DeleteAccount onConfirmar={handleConfirmar} />}
    </div>
  )
}


function AccountAdmin(){
  return(
      <div className='AccountAdmin'> 
          <img src={paletteColors} alt=""/>
          <div style={{display: 'flex', justifyContent: 'flex-start'}}>
              <InfoAccount />
              <MenuAdmin />
          </div>
      </div> 
  )
}

export default AccountAdmin;