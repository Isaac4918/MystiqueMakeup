import React, { useState } from 'react';
import '../../styles/Account.css';

function DeleteAccount({ onConfirmar }) {
  const [mensaje, setMensaje] = useState('');

  const handleClick = () => {
    setMensaje('Cuenta eliminada.');
    onConfirmar();
    // Aquí puedes agregar el código para eliminar la cuenta
  }

  const handleVolver = () =>{
    onConfirmar();
  }

  return (
    <div className='DeleteAccount'>
      <h1>¿En verdad desea eliminar la cuenta?</h1>
      <br />
      <button onClick={handleClick}>Confirmar</button>
      {mensaje && <p>{mensaje}</p>}
      <br />
      <button onClick={handleVolver}>Volver</button>
    </div>
  );
}

export default DeleteAccount;