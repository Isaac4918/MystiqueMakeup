import React, { useState } from 'react';
import '../styles/LoginRegister.css';

function Login() {
    const [data, setDatos] = useState({
        usuario: '',
        contraseña: ''
    });

    const handleInputChange = (event) => {
        setDatos({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const sendData = (event) => {
        event.preventDefault();
        console.log(data.usuario +' '+data.contraseña)
    }

    return (
        <div className="Login">
            <form onSubmit={sendData}>
                <h1>Inicio Sesión</h1>
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
                <button type='submit'>Iniciar Sesión</button>
                <li><a href="/" alt="">¿Olvidaste tu contraseña?</a></li>
            </form>
        </div>

    );
}

export default Login;