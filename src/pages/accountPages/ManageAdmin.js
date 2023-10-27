import React, { useState } from 'react';
import Navbar from "../../components/Navbar"
import { useNavigate } from 'react-router-dom'; 

export function DynamicList() {
    const datos = ['Usuario 1', 'Usuario 2', 'Usuario 3'];

    const [seleccionado, setSeleccionado] = useState(null);
  
    return (
        <div className='scroller'>
            <ul>
                {datos.map((dato, index) => (
                    <li 
                        key={index} 
                        style={{ backgroundColor: seleccionado === index ? 'white' : '#EAEAEA' }}
                        onClick={() => setSeleccionado(index)}
                    >
                    {dato}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function OptionAdmin(){
    const navigate = useNavigate();

    const ManageAdminPage = () => {
        navigate('/accountAdmin');
      };

    return(
        <div>
            <button>Convertir a Administrador</button>
            <br />
            <br />
            <button>Deshacer</button>
            <br />
            <br />
            <button name='backButton' onClick={ManageAdminPage}>Volver</button>
        </div>
    )
}

function ManageAdmin(){
    return(
        <div>
            <Navbar showIcons={false} />
            <div className='manageAdmin'>
                <h1>Gestionar Administradores</h1>
                <input type='text'/>&nbsp;<button name='searchButton'>Buscar</button>
                <br />
                <br />
                < DynamicList />
                <br />
                < OptionAdmin />
            </div>
        </div>
    )
}

export default ManageAdmin;