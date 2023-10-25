import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Input } from '../components/Input/Input';
import '../styles/Publications.css'

function CreatePublication() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        console.log('username: ', username);
        console.log('password: ', password);
        // handle form submission logic here
    };

    const handleChange = (id,value) => {
        if(id === "username"){
            setUsername(value);
        }
        else if(id === "password"){
            setPassword(value);
        }
    }

    return (
        <div>
            <Navbar />
            <section className='create-layout'>
                <div>
                    <button>test</button>
                    <h1 className='title-create'>Crear Publicación</h1>
                </div>
                <div></div>
                <div></div>
            </section>
        </div>
    );
}

export default CreatePublication;