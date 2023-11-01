import React, { useState, useEffect } from 'react';
import '../../styles/Account.css';
import Navbar from "../../components/Navbar" 
import backButton from '../../components/assets/back.png'
import { useNavigate } from 'react-router-dom'; 

export function BackAccount( { account } ){
  const navigate = useNavigate();

  const accountPage = () => {
      if(account.admin === true){
          navigate('/accountAdmin');
      }else{
          navigate('/accountUser');
      }
  };

  return(
      <div className="back"> 
          <a onClick={accountPage}><img src={backButton} alt=""/></a>
      </div>
  )
}



export function RemoveAccount({ account, setAccount }) {
  let username = localStorage.getItem('username');
  const navigate = useNavigate();

  const getAccount = async() => {
    const response = await fetch('http://localhost:5000/getAccount',{
      method: 'GET',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': username 
      }
    });

    if(response.ok){
      const data = await response.json();
      console.log("Cuenta recibida", data);
      setAccount(data.account);
    }
    
}

useEffect(() => {
    getAccount();
}, []);

const confirmRemove = async() => {
  const response = await fetch('http://localhost:5000/deleteAccount',{
      method: 'DELETE',
      headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          username: username
      })
  })

  if(response.ok) {
      const data = await response.text();
      alert('Cuenta eliminada con éxito', data);
      
      if(account.admin === true){
          navigate('/accountAdmin');
      }else{
          navigate('/accountUser');
      }
  }
}

  return (
    <div>
      <h1>¿En verdad desea eliminar la cuenta?</h1>
      <br />
      <br />
      <button onClick={confirmRemove}>Confirmar</button>
  </div> 
  );


}


function DeleteAccount(){
  const [account, setAccount] = useState({});
  return (
    <div>
        <Navbar showIcons={false} />
        <div className="DeleteAccount">
            <BackAccount account={account}/>
            <RemoveAccount account={account} setAccount={setAccount}/>
        </div>
    </div>
);
}

export default DeleteAccount;