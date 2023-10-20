import React, { useState } from 'react';
import '../styles/Account.css';

function ModifyAccount() {
    const [data, modifyData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleInputChange = (event) => {
        modifyData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const updateData = (event) => {
        event.preventDefault();
        
        // Validación de los datos
        if (!data.username || !data.email || !data.password) {
            console.log('Todos los campos son obligatorios');
            return;
        }

    }

    return (
    <div className="ModifyAccount">
            <form onSubmit={updateData}>
                <h1>Modificar Cuenta</h1>
                <label>Usuario</label>
                <br />
                <input type='text' name='username' disabled={true}/>
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
                <button type='submit'>Guardar cambios</button>
            </form>
        </div>
    );
}

export default ModifyAccount;