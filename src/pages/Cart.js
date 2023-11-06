import React, { useEffect, useState } from 'react';
import '../styles/Cart.css';
import Navbar from "../components/Navbar"
import back from "../components/assets/arrowBack.png";

export function Back() {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="backCart">
      <a onClick={handleGoBack}><img src={back} alt="" /></a>
    </div>
  )
}

function Cart() {
  const [productList, setProductList] = useState([]);
  const baseAPIurl = 'http://localhost:5000';
  const [totalPrice, setTotalPrice] = useState(0);
  //const [total, setTotal] = useState(calculateTotal({}));
  //const[cart, setCart] = useState({})
  let username = localStorage.getItem('username');

  const ModifyQuantity = ({ quantity, onIncrement, onDecrement }) => {
    //let number = available - (available - 1);
    return (
      <div>
        <div className="buttonIncrement">
          <div className="available">
            <button onClick={onDecrement}>-</button>
  
            <label onChange={calculateTotal}>{quantity}</label>
  
            <button onClick={onIncrement}>+</button>
          </div>
        </div>
      </div>
  
    );
  
  };

  const OpenPayment = () => {
    return (
      <div>
        <a href="/PaymentDetails"><button onClick={updateCart} className="buttonPay">Pagar</button></a>
      </div>
    )
  }

  const calculateTotal = () => {
    setTotalPrice(productList.reduce((total, product) => total + product.price * product.quantity, 0));
  };

  const getCart = async () => {
    console.log("USERNAME", username);
    const response = await fetch(baseAPIurl + '/shoppingCart/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': username
      }
    }).then(res => res.json());
    console.log("CARRITO", response);
    console.log("PRODUCTO", response.products)
    setProductList(response.products)
    let totalvar = 0;
    for (let i = 0; i < response.products.length; i++) {
      totalvar += response.products[i].price * response.products[i].quantity;
    }
    setTotalPrice(totalvar);
  }

  const onIncrement = (index) => {
    setProductList((prevProducts) => {
      if(prevProducts[index].available > prevProducts[index].quantity){
        const updatedProduct = { ...prevProducts[index], quantity: prevProducts[index].quantity + 1 };
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = updatedProduct;
        return updatedProducts;
      }else{
        return prevProducts;
      }
    });
  };

  const onDecrement = (index) => {
    setProductList((prevProducts) => {
      const updatedProduct = { ...prevProducts[index], quantity: prevProducts[index].quantity - 1 };
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = updatedProduct;

      // If the available is zero, remove the product from the cart
      if (updatedProduct.quantity === 0) {
        updatedProducts.splice(index, 1);
        //borrar de la base
      }
      return updatedProducts;
    });
  };

  const updateCart = async() =>{
    const response = await fetch(baseAPIurl + '/shoppingCart/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            products: productList
        })
    });
}


  useEffect(() => {
    getCart();
    calculateTotal();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [productList]);



  return (
    <div>
      <Navbar showIcons={true} />
      <div className="CartManagement">
        <Back />
        <div className="container">
          <h1>Mi Carrito</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(productList) && productList.map((product, index) => {
                return (
                  <tr key={product.name}>
                    <div className="imageContentCart">
                      <div className="cardImageCart">
                        <td><img src={product.imageURL} alt={product.name} /></td>
                      </div>
                    </div>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                    <ModifyQuantity
                        quantity={product.quantity}
                        onIncrement={() => onIncrement(index)}
                        onDecrement={() => onDecrement(index)}
                      />
                    </td>
                    <td>{product.price * product.quantity}</td>
                  </tr>)
              })}
            </tbody>
          </table>

          <h2>Total: ₡{totalPrice}</h2>
          <div className="buttonPay">
            <OpenPayment />
          </div>
        </div>
      </div>
    </div>
  );
}

{/*

*/}

export default Cart;