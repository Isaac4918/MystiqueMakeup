import React from 'react';
import Register from './Register';
import Login from './Login'; 
import '../styles/LoginRegister.css';

function LoginRegister() {
    return (
        <div className='LoginRegister'>
            <Register />
            <Login />
        </div>
    );
}

export default LoginRegister;
