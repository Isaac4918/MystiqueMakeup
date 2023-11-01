import React, { useState } from 'react';
import '../../styles/Account.css';
import Navbar from "../../components/Navbar" 
import backButton from '../../components/assets/back.png'




function DeleteAccount({ onConfirmar }) {

  const handleClick = () => {

    // Aquí puedes agregar el código para eliminar la cuenta
  }



  return (
    <div>
       <Navbar showIcons={false} />
       <div className='DeleteAccount'>
          <h1>¿En verdad desea eliminar la cuenta?</h1>
          <br />
          <br />
          <button onClick={handleClick}>Confirmar</button>
        </div>    
    </div>
  );
}

export default DeleteAccount;