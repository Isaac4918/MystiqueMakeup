import React from "react";
import { useEffect, useState, useRef } from 'react';
import "../styles/Payment.css";
import Navbar from "../components/Navbar"
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import back from "../components/assets/arrowBack.png";
import imagePlaceholder from '../components/assets/imagePlaceHolder.png';

function PaymentDetails() {
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
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [productQuantity, setProductQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [partialPrice, setPartialPrice] = useState(0);
    const [addressText, setAddressText] = useState('');
    const [shoppingCart, setShoppingCart] = useState({});

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
                    canton: "Santo Domingo", districts: ["San Miguel", "Tures"]
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

    const prices = {
        "San José": 1000,
        "Cartago": 1000,
        "Alajuela": 1000,
        "Heredia": 1000,
        "Guanacaste": 3000,
        "Puntarenas": 3000,
        "Limón": 3000,
    }

    const getCart = async () => {
        const response = await fetch(baseAPIurl + '/shoppingCart/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': username
            }
        }).then(res => res.json());
        setShoppingCart(response);

        let quantity = 0;
        for (let i = 0; i < response.products.length; i++) {
            quantity += response.products[i].quantity;
        }
        setProductQuantity(quantity);
    }
    // USE EFFECTS -----------------------------------------------------------------
    useEffect(() => {
        getCart();
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            const province = address.find((p) => p.province === selectedProvince);
            setCantons(province ? province.cantons : []);
            setDeliveryPrice(prices[selectedProvince]);
            console.log(prices[selectedProvince]);
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

    useEffect(() => {
        if (selectedCanton) {
            const canton = cantons.find((c) => c.canton === selectedCanton);
            setDistricts(canton ? canton.districts : []);
            setAddressText(selectedProvince + ', ' + selectedCanton + ', ' + selectedDistrict);
        }
        else {
            setDistricts([]);
        }
    }, [selectedDistrict]);

    // FUNCTIONS -----------------------------------------------------------------
    const handleClickImage = (event) => {
        hiddenFileInput.current.click();
    };

    const handleChangeImage = (event) => {
        const fileUploaded = event.target.files;
        if (fileUploaded[0]) {
            setImage(URL.createObjectURL(fileUploaded[0]));
            setBlobImage(fileUploaded[0]);
        }
    };

    const calculateFinalPrice = () => {
        let tempPrice = 0;
        let quantity = 0;
        for (let i = 0; i < shoppingCart.products.length; i++) {
            tempPrice += shoppingCart.products[i].price * shoppingCart.products[i].quantity;
            quantity += shoppingCart.products[i].quantity;
        }
        setProductQuantity(quantity);
        setPartialPrice(tempPrice);
        if(deliveryPrice !== 0){
            
            setTotalPrice(tempPrice + deliveryPrice);
        }else{
            alert("ERROR: Debe seleccionar una dirección de entrega");
        }
        
    }


    const handlePayment = async(event) => {
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

        if (selectedImage === imagePlaceholder) {
            alert("ERROR: Debe seleccionar una imagen");
            return;
        }

        let result = await createPurchase();
        if (result.status === 200) {
            alert("Compra realizada con éxito");
            navigate('/');
        } else {
            alert("ERROR: No se pudo procesar la compra");
        }

        // update the products in the cart so they reduce the available quantity
        // for (let i = 0; i < shoppingCart.products.length; i++) {
        //     const product = shoppingCart.products[i];
        //     const updatedProduct = await fetch(baseAPIurl + '/products/update/quantity', {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json'
        //         }, body: JSON.stringify({
        //             id: product._id,
        //             quantity: product.quantity
        //         })
        //     });
        // }

        
    }

    const createPurchase = async () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // months are zero indexed
        const day = date.getDate();
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;

        // get id
        const currentId = await fetch(baseAPIurl + '/purchases/get/id', {
            method: 'GET',
        }).then(res => res.json());

        // update the id
        const nextId = await fetch(baseAPIurl + '/purchases/update/id', {
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

        // create the purchase
        const newData = await fetch(baseAPIurl + '/purchases/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                orderNumber: currentId,
                username: username,
                address: addressText,
                details: selectedDetails,
                receiptImagePath: imagePath,
                receiptImageURL: imageURL,
                partialPrice: partialPrice,
                finalPrice: totalPrice,
                scheduled: false,
                paymentDate: formattedDate,
                deliveryDate: "",
                cart: shoppingCart
            })
        });

        return newData;
    }

    // RETURN -----------------------------------------------------------------
    return (
        <div className="PaymentDetails">
            <Navbar showIcons={true} />
            <Link to={"/Cart"}><button className="backManagement"><img src={back} alt="" /></button></Link>
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
                    <textarea type="text" name="details" id="details" value={selectedDetails} onChange={(e) => setSelectedDetails(e.target.value)} /><br />

                    <label><b>Cantidad de productos:</b></label>
                    <label>{productQuantity}</label><br />

                    <label><b>Precio final:</b></label>
                    <label>{totalPrice}</label><br />
                    <button className="buttonEnd" type="button" onClick={calculateFinalPrice}>Calcular Precio Final</button>
                    <button className="buttonEnd" type="button" onClick={handlePayment}>Finalizar pago</button>

                </div>
                <div className="RightGridPayment">
                    <img src={selectedImage} alt="" name="image" />
                    <button className="buttonLoadPayment" type="button" onClick={handleClickImage}>Cargar comprobante</button>
                    <input type="file" onChange={handleChangeImage} ref={hiddenFileInput} style={{ display: "none" }} />
                </div>
            </section>
        </div>
    );
}

export default PaymentDetails;