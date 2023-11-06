import React from "react";
import { useEffect , useState , useRef } from 'react';
import "../styles/Payment.css";
import Navbar from "../components/Navbar" 
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import back from "../components/assets/arrowBack.png";
import imagePlaceholder from '../components/assets/imagePlaceHolder.png';

function PaymentDetails(){
    // VARIABLES -----------------------------------------------------------------
    const navigate = useNavigate();    
    const hiddenFileInput = useRef(null);
    let username = localStorage.getItem('username');
    
    const baseAPIurl = 'http://localhost:5000';
    const [blobImage, setBlobImage] = useState('-');

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCanton, setSelectedCanton] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedDetails, setSelectedDetails] = useState('');
    
    const [selectedImage, setImage] = useState(imagePlaceholder);
    const [cantons, setCantons] = useState([]);
    const [districts, setDistricts] = useState([]);

    const address = [
        {
            province: "San José", 
            cantons: [
                {
                    canton: "Tibás", districts: ["Colima", "Cinco Esquinas"]
                }, 
                {
                    canton: "Escazú", districts: ["San Antonio", "San Rafael"]
                },
                {
                    canton: "Puriscal", districts: ["Desamparaditos", "Chires"]
                }
            ]
        },
        {
            province: "Cartago", 
            cantons: [
                {
                    canton: "Paraíso", districts: ["Orosi", "Cachi"] 
                },
                {
                    canton: "Turrialba", districts: ["Santa Cruz", "Peralta"]
                },
                {
                    canton: "El Guarco", districts: ["San Isidro", "El Tejar"]
                }
            ]
        },
        {
            province: "Alajuela", 
            cantons: [
                {
                    canton: "San Ramón", districts: ["Volio", "Santiago"]
                },
                {
                    canton: "Atenas", districts: ["Jesús", "Mercedes"]
                },
                {
                    canton: "Poás", districts: ["San Pedro", "San Juan"]
                }
            ]
        },
        {
            province: "Heredia",
            cantons: [
                {
                    canton: "Santo Domingo" , districts: ["San Miguel", "Tures"]
                },
                {
                    canton: "Barva", districts: ["San Pedro", "San Pablo"]
                },
                {
                    canton: "Santa Bárbara", districts: ["San Pedro", "San Juan"]
                }
            ]
        },
        {
            province: "Guanacaste",
            cantons: [
                {
                    canton: "Liberia", districts: ["Cañas", "Bagaces"]
                },
                {
                    canton: "Nicoya", districts: ["Santa Cruz", "Nandayure"]
                },
                {
                    canton: "Santa Cruz", districts: ["Bolsón", "Veintisiete de Abril"]
                }
            ]   
        },
        {
            province: "Puntarenas",
            cantons: [
                {
                    canton: "Quepos", districts: ["Naranjito", "Savegre"]
                },
                {
                    canton: "Esparza", districts: ["San Rafael", "San Jerónimo"]
                },
                {
                    canton: "Buenos Aires", districts: ["Volcán", "Potrero Grande"]
                }
            ]
        },
        {
            province: "Limón",
            cantons: [
                {
                    canton: "Limón", districts: ["Valle La Estrella", "Matama"]
                },
                {
                    canton: "Pococi", districts: ["Guápiles", "Rita"]
                },
                {
                    canton: "Siquirres", districts: ["Pacuarito", "Florida"]
                }
            ]
        }
    ];

    // USE EFFECTS -----------------------------------------------------------------
    useEffect(() => {
        if (selectedProvince) {
          const province = address.find((p) => p.province === selectedProvince);
          setCantons(province ? province.cantons : []);
        } 
        else {
          setCantons([]);
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedCanton) {
          const canton = cantons.find((c) => c.canton === selectedCanton);
          setDistricts(canton ? canton.districts : []);
        } 
        else {
          setDistricts([]);
        }
    }, [selectedCanton, cantons]);

    // FUNCTIONS -----------------------------------------------------------------
    const handleClickImage = (event) => {
        hiddenFileInput.current.click();
    };

    const handleChangeImage = (event) => {
        const fileUploaded = event.target.files;

        if (fileUploaded[0].name) {
            setImage(URL.createObjectURL(fileUploaded[0]));
            setBlobImage(fileUploaded[0]);
        }
    };

    /*

    username: string;
    address: string;
    receiptImagePath: string;
    receiptImageURL: string;
    partialPrice: number;
    finalPrice: number;
    scheduled: boolean;
    paymentDate: string;
    deliveryDate: string;
    cart: ShoppingCart;


    
    ---------------------------------


    */ 

    const createPurchase = async() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // months are zero indexed
        const day = date.getDate();
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

        // get id
        const currentId = await fetch(baseAPIurl + '/purchases/get/id', {
            method: 'GET',
        }).then(res => res.json());

        // update the id
        const nextId = await fetch(baseAPIurl + '/publications/update/id', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, body: JSON.stringify({
                id: currentId + 1
            })
        });

        // upload the image
        let formData = new FormData();
        formData.append('image', blobImage)
        
        const uploadImage = await fetch(baseAPIurl + '/image/upload/receipt/' + currentId.toString(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        }).then(res => res.json());
        
        // save the url of the image
        let imageURL = uploadImage.imageUrl;
        
        //define the path of the image
        let imagePath = 'Receipts/' + currentId.toString();

        // create the publication
        const newData = await fetch(baseAPIurl + '/purchases/create',{
        method: 'POST',
        headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
        },
        body: JSON.stringify({
            id: currentId,
            username: username,
            address: selectedDetails,
            imagePath: imagePath,
            imageURL: imageURL,
            paymentDate: formattedDate,
            deliveryDate: 'Pendiente'
            
        })
    });
                
        return newData;
    }


    const handlePayment = (event) => {
        event.preventDefault();

        if (!selectedProvince || !selectedCanton || !selectedCanton || !selectedDetails || !selectedImage) {
            alert("ERROR: Todos los campos son obligatorios");
            return;
        }

        if (selectedDetails.length > 122) {
            alert("ERROR: La descripción es muy larga, el máximo es 122 caracteres");
            return;
        }

        if (selectedDetails.length < 10) {
            alert("ERROR: La descripción es muy corta, el mínimo es 28 caracteres");
            return;
        }

        if(selectedImage === imagePlaceholder){
            alert("ERROR: Debe seleccionar una imagen");
            return;
        }

        navigate('/ProcessedPurchase');
    }



    // RETURN -----------------------------------------------------------------
    return(
        <div className="PaymentDetails">
            <Navbar showIcons={true} />
            <Link to={"/Cart"}><button className="backManagement"><img src={back} alt=""/></button></Link>
            <h1>Datos de Pago</h1>
            <section className="layoutPayment">
                <div className="LeftGridPayment">
                    <label><b>Dirección de entrega:</b></label><br />
                    <div className="dropdows">
                        <Dropdown name="province" value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)} options={address.map((item) => item.province)} placeholder="Seleccione provincia" className="optionsPayment" />
                        <br />

                        <Dropdown name="canton" value={selectedCanton} onChange={(e) => setSelectedCanton(e.target.value)} options={cantons.map((item) => item.canton)} placeholder="Seleccione cantón" className="optionsPayment" />
                        <br />

                        <Dropdown name="district" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} options={districts} placeholder="Seleccione distrito" className="optionsPayment" />
                        <br />
                    </div>
                    <label><b>Detalles de entrega:</b></label><br />
                    <textarea type="text" name="details" id="details" value={selectedDetails} onChange={(e) => setSelectedDetails(e.target.value)}/><br />

                    <label><b>Cantidad de productos:</b></label>
                    <label>#</label><br />

                    <label><b>Precio final:</b></label>
                    <label>#</label><br />

                    <button className="buttonEnd" type="button" onClick={handlePayment}>Finalizar pago</button>

                </div>
                <div className="RightGridPayment">
                    <img src={selectedImage} alt="" name="image"/>
                    <button className="buttonLoadPayment" type="button" onClick={handleClickImage}>Cargar comprobante</button>
                    <input type="file" onChange={handleChangeImage} ref={hiddenFileInput} style={{display: "none"}}/>
                </div>
            </section>
        </div>
    );
}

export default PaymentDetails;