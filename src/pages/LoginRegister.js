import React, { useState } from 'react';
import '../styles/Account.css';
import Navbar from "../components/Navbar" 
import { useNavigate } from 'react-router-dom';


export function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')


    const handleInputChange = (name, value) => {
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
            navigate('/');
            console.log('Account created successfully');
        }
    }
    
    const handleAccount = (event) => {
        event.preventDefault();
        if(username === "" || password === "" || email === ""){
            alert("ERROR: Todos los campos son obligatorios");
            return;
        }else{
            if(username.length < 4){
                alert("ERROR: El nombre de usuario debe tener más de 4 caracteres");
                return;
            }

            if(username.length > 10){
                alert("ERROR: Nombre de usuario demasiado largo, recuerde que debe estar entre 4 y 10 caracteres");
                return;
            }
            
            const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(regexEmail.test(email) === false){
                alert("ERROR: Por favor ingresar un correo válido");
                return;
            }

            const regexPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#%&])/;
            if(password.length < 8 || regexPassword.test(password) === false){
                alert("ERROR: Por favor ingresar una contraseña minimo de 8 digitos con al menos una letra, número y caracter especial");
                return;
            }
            
            createAccount(username, password, email);
        }
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
                <button onClick={handleAccount}>Crear Cuenta</button>
            </form>
        </div>
    );
}


export function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleInputChange = (name, value) => {
        if(name === "username"){
            setUsername(value)
        }
        else if(name === "password"){
            setPassword(value)
        }
    }

    const signIn = async(pUser, pPassword) => {
        const response = await fetch('http://localhost:5000/loginAccount',{
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: pUser,
                password: pPassword
            })
        })

        if(response.ok) {
            const data = await response.json();
            const token = data.token;
            console.log('Token:', token);

            localStorage.setItem('token', token);
            navigate('/');
        } else {
            alert("ERROR: Revisar los datos ingresados");
        }
    }

    const handleLogin = (event) => {
        event.preventDefault();
        if(username === "" || password === ""){
            alert("ERROR: Todos los campos son obligatorios");
            return;
        }else{
            if(username.length < 4){
                alert("ERROR: El nombre de usuario debe tener más de 4 caracteres");
                return;
            }

            if(username.length > 10){
                alert("ERROR: Nombre de usuario demasiado largo, recuerde que debe estar entre 4 y 10 caracteres");
                return;
            }
            
            const regexPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#%&])/;
            if(password.length < 8 || regexPassword.test(password) === false){
                alert("ERROR: Por favor ingresar una contraseña minimo de 8 digitos con al menos una letra, número y caracter especial");
                return;
            }
            
            signIn(username, password);
        }
    }

    return (
        <div className="Login">
            <form>
                <h1>Inicio Sesión</h1>
                <label>Usuario</label>
                <br />
                <input
                    name='username'
                    type='text'
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                <br />
                <label>Contraseña</label>
                <br />
                <input
                    name='password'
                    type='password'
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)} 
                />
                <br />
                <button onClick={handleLogin}>Iniciar Sesión</button>
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
