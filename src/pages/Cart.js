import React, { useState } from 'react';
import '../styles/Cart.css'; 
import Navbar from "../components/Navbar" 
import back from "../components/assets/arrowBack.png";
import Brillo from "../components/assets/Gel brillo.png";
import LabialM from "../components/assets/labial mate.jpg";
import LabialP from "../components/assets/Labial morado.jpg";

export function Back(){

 const handleGoBack = () => {
    window.history.back();
 };
 return(
      <div className="backCart"> 
          <a onClick={handleGoBack}><img src={back} alt=""/></a>
      </div>
 )
}

export function OpenPayment(){
  return(
      <div> 
          <a href="/PaymentDetails"><button className="buttonPay">Pagar</button></a>
      </div>
  )
}

const products = [
  {
     name: "Labial Ultra Mate", description: "El labial matecito" , price: 2000, available: 1, category: "Labios", subcategory: "Labiales", image: LabialM
       
  },
  {
     
     name: "Labial purple", description: "El labial mas morado" , price: 1500, available: 5 , category: "Labios", subcategory: "Labiales", image: LabialP
       
  },
 
  {
     name: 'Gel brillo', description: "El labial mas morado" , price: 3000, available: 5 , category: "Body", subcategory: "Glitter", image: Brillo
  }
];

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
 const [productList, setProductList] = useState(products);
 const [total, setTotal] = useState(calculateTotal(products));

 const onIncrement = (index) => {
    setProductList((prevProducts) => {
      const updatedProduct = { ...prevProducts[index], available: prevProducts[index].available + 1 };
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = updatedProduct;
      setTotal(calculateTotal(updatedProducts));
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

    setTotal(calculateTotal(updatedProducts));
    return updatedProducts;
  });
};


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
          {productList.map((product, index) => (
            <tr key={product.name}>
              <div className="imageContentCart">
              <div className="cardImageCart">
              <td><img src={product.image} alt={product.name} /></td>
              </div>
              </div>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>        
                <ModifyQuantity
                 available={product.available}
                 onIncrement={() => onIncrement(index)}
                 onDecrement={() => onDecrement(index)}
                />
              </td>
              <td>{product.price * product.available}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Total: ₡{total}</h2>
      <div className="buttonPay">
          <OpenPayment />
      </div>
            </div>
        </div>
    </div>
 );
}

export default Cart;
