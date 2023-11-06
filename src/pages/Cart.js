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

export function OpenPayment() {
  return (
    <div>
      <a href="/PaymentDetails"><button className="buttonPay">Pagar</button></a>
    </div>
  )
}




const calculateTotal = (products) => {
  return products.reduce((total, product) => total + product.price * product.available, 0);
};

const ModifyQuantity = ({ available, onIncrement, onDecrement }) => {

  return (
    <div>
      <div className="buttonIncrement">
        <div className="available">
          <button onClick={onDecrement}>-</button>

          <span>{available}</span>

          <button onClick={onIncrement}>+</button>
        </div>
      </div>
    </div>

  );

};

function Cart() {
  const [productList, setProductList] = useState({});
  //const [total, setTotal] = useState(calculateTotal({}));
  //const[cart, setCart] = useState({})
  let username = localStorage.getItem('username');

  const getCart = async () => {
    const response = await fetch('http://localhost:5000/shoppingCart/get', {
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
  }

  const onIncrement = (index) => {
    setProductList((prevProducts) => {
      const updatedProduct = { ...prevProducts[index], available: prevProducts[index].available + 1 };
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = updatedProduct;
      //setTotal(calculateTotal(updatedProducts));
      return updatedProducts;
    });
  };

  const onDecrement = (index) => {
    setProductList((prevProducts) => {
      const updatedProduct = { ...prevProducts[index], available: prevProducts[index].available - 1 };
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = updatedProduct;

      // If the available is zero, remove the product from the cart
      if (updatedProduct.available === 0) {
        updatedProducts.splice(index, 1);
      }

      //setTotal(calculateTotal(updatedProducts));
      return updatedProducts;
    });
  };


  useEffect(() => {
    getCart();
  }, []);



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
                return(                
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
                        available={1}
                        onIncrement={() => onIncrement(index)}
                        onDecrement={() => onDecrement(index)}
                      />
                    </td>
                  <td>{product.price * (product.available-(product.available-1))}</td>
                </tr>)
              })}
            </tbody>
          </table>

          <h2>Total: ₡{0}</h2>
          <div className="buttonPay">
            <OpenPayment />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
