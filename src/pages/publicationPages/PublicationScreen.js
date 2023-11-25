import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import "../../styles/Product.css";
import back from "../../components/assets/arrowBack.png";

export function BackMainPubli() {
    return (
        <div className="backManagementPublication">
            <a href="/"><img src={back} alt="" /></a>
        </div>
    )
}

function PublicationScreen() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [publication, setPublication] = useState({});
    const [parsedTags, setParsedTags] = useState('');
    const baseAPIurl = 'http://localhost:5000';
    let username = localStorage.getItem('username');
    const [visible, setVisible] = useState(true);

    const parseTags = () => {
        let parsedTags = '';
        let pTags = publication.tags;
        for (let i = 0; i < pTags.length; i++) {
            parsedTags += '#' + pTags[i] + ' ';
        }
        setParsedTags(parsedTags);
    }

    useEffect(() => {
        const getPublication = async () => {
            const response = await fetch(baseAPIurl + '/publications/get/' + id, {
                method: 'GET',
            }).then(res => res.json());
            setPublication(response);
        }
        getPublication();
    }, []);

    useEffect(() => {
        if (publication.tags) {
            parseTags();
        }
    }, [publication]);

    const getAccount = async () => {
        const response = await fetch('http://localhost:5000/getAccount', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': username
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (data.account.admin === true) {
                setVisible(false);
            } else {
                setVisible(true);
            }
        }

    }

    useEffect(() => {
        if (username === '' || username === null) {

        } else {
            getAccount();
        }
    }, []);

    const handleRequestMakeup = async () => {
        const response = await fetch(baseAPIurl + '/publications/request/get/all', {
            method: 'GET',
        }).then(res => res.json());

        for (let i = 0; i < response.length; i++) {
            if (response[i].username === username && response[i].makeup === publication.name) {
                alert("Ya has solicitado este maquillaje");
                return;
            }
        }

        let result = await createRequestMakeup();
        if (result.status === 200) {
            alert("Maquillaje solicitado con éxito");
            navigate('/');
        } else {
            alert("ERROR: No se pudo solicitar el maquillaje");
        }
    };

    const createRequestMakeup = async () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // months are zero indexed
        const day = date.getDate();
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;

        // get id
        const currentId = await fetch(baseAPIurl + '/publications/request/get/id', {
            method: 'GET',
        }).then(res => res.json());

        // update the id
        const nextId = await fetch(baseAPIurl + '/publications/request/update/id', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, body: JSON.stringify({
                id: currentId + 1
            })
        });

        // create the request
        const newData = await fetch(baseAPIurl + '/publications/request/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                orderNumber: currentId,
                username: username,
                makeup: publication.name,
                requestedDate: formattedDate,
                scheduled: "Pendiente"
            })
        });

        return newData
    }

    return (
        <div>
            <Navbar showIcons={false} />
            <BackMainPubli />
            <div className="pagePublicationScreen">
                <section className="layout">
                    <div>
                        <h1>{publication.name}</h1>
                        <img src={publication.imageURL} alt="" />
                    </div>
                    <div className="infoContainerPublication">
                        <h2>Descripción: </h2>
                        <p>{publication.description}</p>
                        <h2>Fecha: </h2>
                        <p>{publication.date}</p>
                        <h2>Tags: </h2>
                        <div className="tagsPublication">
                            <p>{parsedTags}</p>
                        </div>
                        {visible &&
                            <button className="buttonAgendarCita" onClick={handleRequestMakeup}>Solicitar Maquillaje</button>
                        }

                    </div>
                </section>
            </div>
        </div>
    );
}

export default PublicationScreen;