import React, { useState } from 'react';
import '../styles/LoginRegister.css';

function Registro() {
    const [datos, setDatos] = useState({
        usuario: '',
        correo: '',
        contraseña: ''
    });

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault();
        console.log(datos.usuario +' '+ datos.correo +' '+datos.contraseña)
    }

    return (
        <div className="Registro">
            <form onSubmit={enviarDatos}>
                <h1>Registrar cuenta</h1>
                <label>Usuario</label>
                <br />
                <input
                    type='text'
                    onChange={handleInputChange}
                    name='username'
                />
                <br />
                <label>Correo electrónico</label>
                <br />
                <input
                    type='email'
                    onChange={handleInputChange}
                    name='email'
                />
                <br />
                <label>Contraseña</label>
                <br />
                <input
                    type='password'
                    onChange={handleInputChange}
                    name='password'
                />
                <br />
                <button type='submit'>Crear Cuenta</button>
            </form>
        </div>
    );
}

export default Registro;