import React, { useState} from 'react';
import Navbar from "../../components/Navbar"
import { useNavigate } from 'react-router-dom'; 

export function DynamicList( {userData, setAccount}) {
    const [selected, setSelected] = useState('');

    const getAccount = async(pUser) => {
        const response = await fetch('http://localhost:5000/getAccount',{
          method: 'GET',
          headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': pUser 
          }
        });
    
        if(response.ok){
          const data = await response.json();
          setAccount(data.account);
        }
        
    }
    
    return (
        <div className='scroller'>
            <ul>
                {userData.map((data, index) => (
                    <li 
                        key={index} 
                        style={{ backgroundColor: selected === data ? 'white' : '#EAEAEA' }}
                        onClick={async () => { 
                            setSelected(data);
                            await getAccount(data); }}
                    >
                    {data}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function OptionAdmin( {account} ){
    const navigate = useNavigate();
    
    const ManageAdminPage = () => {
        navigate('/accountAdmin');
    };

    const becomeAdmin = async() => {        
        const response = await fetch('http://localhost:5000/updateAccount',{
        method: 'PATCH',
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: account.username,
            password: account.password,
            email: account.email,
            admin: true
        })
        })

        if(response.ok) {
            const data = await response.text();
            alert('Se convirtió con éxito', data);
        }
    }
    
    const becomeUser = async() => {
        const response = await fetch('http://localhost:5000/updateAccount',{
            method: 'PATCH',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: account.username,
                password: account.password,
                email: account.email,
                admin: false
            })
        })

        if(response.ok) {
            const data = await response.text();
            alert('Se deshizo con éxito', data);
        }
    }

    return(
        <div>
            <button onClick={becomeAdmin}>Convertir a Administrador</button>
            <br />
            <br />
            <button onClick={becomeUser} >Deshacer</button>
            <br />
            <br />
            <button name='backButton' onClick={ManageAdminPage}>Volver</button>
        </div>
    )
}

function ManageAdmin(){
    const [account, setAccount] = useState({});
    const [username, setUsername] = useState('')
    const [userData, setUserData] = useState([])
    
    
    const handleInputChange = (value) => {
        setUsername(value);
    }

    const getUsernames = async() => {
        const response = await fetch('http://localhost:5000/getUsernames',{
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: username
            })
        })

        if(response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
                setUserData(data);
            } else {
                console.error('Los datos recibidos no son un array:', data);
            }
        }
    }

    return(
        <div>
            <Navbar showIcons={false} />
            <div className='manageAdmin'>
                <h1>Gestionar Administradores</h1>
                <input type='text' placeholder='Ingrese nombre de usuario' name='username' onChange={(e) => handleInputChange(e.target.value)}/>&nbsp;<button name='searchButton' onClick={getUsernames}>Buscar</button>
                <br />
                <br />
                < DynamicList userData={userData} setAccount={setAccount}/>
                <br />
                < OptionAdmin account={account}/>
            </div>
        </div>
    )
}

export default ManageAdmin;