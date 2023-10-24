import React, { useState } from 'react';
import '../styles/Account.css';
import Navbar from "../components/Navbar" 


export function Register() {
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

        //Faltan validaciones y conexión con el API
        //addData(data.username, data.password, data.email, true);
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


export function Login() {
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
        //Faltan validaciones y conexión con el API
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


function LoginRegister() {
    return (
        <div>
            <Navbar showIcons={false} />
            <div className='LoginRegister'>
                    <Register />
                    <Login />
            </div>
        </div>

    );
}

export default LoginRegister;
