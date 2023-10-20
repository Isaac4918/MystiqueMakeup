import React, { useState } from 'react';
import '../styles/LoginRegister.css';

function Register() {
    const [data, setDatos] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleInputChange = (event) => {
        setDatos({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const sendData = (event) => {
        event.preventDefault();
        
        // Validación de los datos
        if (!data.username || !data.email || !data.password) {
            console.log('Todos los campos son obligatorios');
            return;
        }

        //const controller = accountController.getInstanceAccountController();
        //controller.createAccount(data.username, data.password, data.email, true);
    }

    return (
        <div className="Register">
            <form onSubmit={sendData}>
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

export default Register;