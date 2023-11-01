import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../../styles/Account.css';
import backButton from '../../components/assets/back.png'
import Navbar from "../../components/Navbar" 

export function BackAccount( { account } ){
    const navigate = useNavigate();

    const accountPage = () => {
        if(account.admin === true){
            navigate('/accountAdmin');
        }else{
            navigate('/accountUser');
        }
    };

    return(
        <div className="back"> 
            <a onClick={accountPage}><img src={backButton} alt=""/></a>
        </div>
    )
}

export function UpdateAccount( { account, setAccount } ){
    let username = localStorage.getItem('username');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const getAccount = async() => {
        const response = await fetch('http://localhost:5000/getAccount',{
          method: 'GET',
          headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': username 
          }
        });
    
        if(response.ok){
          const data = await response.json();
          console.log("Cuenta recibida", data);
          setAccount(data.account);
        }
        
    }

    useEffect(() => {
        getAccount();
    }, []);

    useEffect(() => {
        setEmail(account.email);
        setPassword(account.password);
    }, [account]);

    
    const handleInputChange = (name, value) => {
        if(name === "email"){
            setEmail(value)
        }
        else if(name === "password"){
            setPassword(value)
        }
    }

    const updateAccount = async(pUser, pPassword, pEmail) => {
        const response = await fetch('http://localhost:5000/updateAccount',{
            method: 'PATCH',
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
        })

        if(response.ok) {
            const data = await response.text();
            alert('Cuenta actualizada con éxito', data);
            
            if(account.admin === true){
                navigate('/accountAdmin');
            }else{
                navigate('/accountUser');
            }
        }
    }

    const updateData = (event) =>{
        event.preventDefault();
        if(password === "" || email === ""){
            alert("ERROR: Todos los campos son obligatorios");
            return;
        }else{

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
            
            updateAccount(username, password, email);
        }
    }

    return(
        <div>
            <form>
                <h1>Modificar Cuenta</h1>
                <label>Usuario</label><br />
                <input type='text' name='username' disabled={true} value={account.username}/>
                <br />
                <label>Correo electrónico</label><br />
                <input
                    type='email'
                    value={email}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    name='email'
                /><br />
                <label>Contraseña</label>
                <br />
                <input
                    type='password'
                    value={password}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    name='password'
                /><br />
                <br />
                <button onClick={updateData}>Guardar cambios</button>
            </form>
        </div>
    )
}


function ModifyAccount() {
    const [account, setAccount] = useState({});

    return (
        <div>
            <Navbar showIcons={false} />
            <div className="modifyAccount">
                <BackAccount account={account}/>
                <UpdateAccount account={account} setAccount={setAccount}/>
            </div>
        </div>
    );
}

export default ModifyAccount;