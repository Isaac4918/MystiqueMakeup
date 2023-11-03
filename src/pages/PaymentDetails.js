import React from "react";
import { useRef , useState } from 'react';
import "../styles/Payment.css";
import Navbar from "../components/Navbar" 
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import back from "../components/assets/arrowBack.png";

function PaymentDetails(){
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCanton, setSelectedCanton] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    const provinces = ["San José", "Cartago", "Guanacaste", "Limón", "Heredia", "Alajuela"];
    const cantons = ["Tibás", "Pococí", "San Carlos"];
    const districts = ["Colima"];

    const [data, setData] = useState({
        details: '',
        province: '',
        canton: '',
        district: '',
        image: null
    });

    const handleChangeProvince = (event) => {
        setSelectedProvince(event.target.value)
        setData({
            ...data,
            province : event.target.value
        })
    }

    const handleChangeCanton = (event) => {
        setSelectedCanton(event.target.value)
        setData({
            ...data,
            canton : event.target.value
        })
    }

    const handleChangeDistrict = (event) => {
        setSelectedDistrict(event.target.value)
        setData({
            ...data,
            district : event.target.value
        })
    }

    return(
        <div className="PaymentDetails">
            <Navbar showIcons={true} />
            <Link to={"/Cart"}><button className="backManagement"><img src={back} alt=""/></button></Link>
            <h1>Datos de Pago</h1>
            <section className="layoutPayment">
                <div className="LeftGridPayment">
                    <label><b>Dirección de entrega:</b></label><br />
                    <div className="dropdows">
                        <Dropdown value={selectedProvince} onChange={handleChangeProvince} options={provinces} placeholder="Seleccione provincia" className="optionsPayment" />
                        <br />

                        <Dropdown value={selectedCanton} onChange={handleChangeCanton} options={cantons} placeholder="Seleccione cantón" className="optionsPayment" />
                        <br />

                        <Dropdown value={selectedDistrict} onChange={handleChangeDistrict} options={districts} placeholder="Seleccione distrito" className="optionsPayment" />
                        <br />
                    </div>
                    <label><b>Detalles de entrega:</b></label><br />
                    <textarea type="text" name="provincia" id="provincia"/><br />

                    <label><b>Cantidad de productos:</b></label>
                    <label>#</label><br />

                    <label><b>Precio final:</b></label>
                    <label>#</label><br />

                    <button className="buttonEnd" type="button">Finalizar pago</button>

                </div>
                <div className="RightGridPayment">
                    <label>Imagen</label>
                    <button className="buttonLoadPayment" type="button">Cargar comprobante</button>
                </div>
            </section>
        </div>
    );
}

export default PaymentDetails;