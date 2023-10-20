import React, { useState } from 'react';
import DeleteAccount from './DeleteAccount';
import '../styles/Account.css'
import paletteColors from '../components/assets/paletteColors.png'


function AccountUser(){
    const [mostrarDeleteAccount, setMostrarDeleteAccount] = useState(false);

    const handleClick = () => {
      setMostrarDeleteAccount(true);
    }
  
    const handleConfirmar = () => {
      setMostrarDeleteAccount(false);
    }
  
    return(
        <div className='AccountUser'> 
            <img src={paletteColors} alt="" />
            <div> 
                <h2>Información</h2>
                <label>Usuario: XXXXX</label>
                <br />
                <button name= "Purchases">Ver mis compras</button>
                <br />
                <label>Email: XXX@gmail.com</label>
                <br />
                <button name="LogOut">Cerrar Sesión</button>
                <br />
                <button name="Update">Modificar datos</button>
                <br />
                <br />
                <button name="Delete" onClick={handleClick}>Eliminar cuenta</button>
                {mostrarDeleteAccount && <DeleteAccount onConfirmar={handleConfirmar} />}
            </div>
        </div> 
    )
}

export default AccountUser;

