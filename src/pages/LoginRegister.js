import React, { useState } from 'react';
import '../styles/Account.css';
import Navbar from "../components/Navbar" 
import { useNavigate } from 'react-router-dom';


export function Register() {
    let navigate = useNavigate();
    const [data, setDatos] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')


    const handleInputChange = (name, value) => {
        // setDatos({
        //     ...data,
        //     [event.target.name] : event.target.value
        // })

        if(name === "username"){
            setUsername(value)
        }
        else if(name === "password"){
            setPassword(value)
        }
        else if(name === "email"){
            setEmail(value)
        }
    }

    const createAccount = async(pUser, pPassword, pEmail) => {
            const newData = await fetch('http://localhost:5000/createAccount',{
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: pUser,
                    password: pPassword,
                    email: pEmail,
                    admin: true
                })
            }).then(res => res.json())
            if(newData.response === 'Account created successfully'){
                navigate('/publication/create')
                console.log('Account created successfully')
            }
        }
    
    const prueba = () => {
        createAccount(username, password, email)
    }

    return (
        <div className="Register">
            <form>
                <h1>Registrar cuenta</h1>
                <label>Usuario</label>
                <br />
                <input
                    type='text'
                    name='username'
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                <br />
                <label>Correo electrónico</label>
                <br />
                <input
                    type='email'
                    name='email'
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                <br />
                <label>Contraseña</label>
                <br />
                <input
                    type='password'
                    name='password'
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                <br />
                <button type='submit' onClick={prueba}>Crear Cuenta</button>
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
