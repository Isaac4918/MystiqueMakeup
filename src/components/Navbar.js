import React, { useState,useEffect } from 'react';
import "../styles/Navbar.css";
import searchIcon from "../components/assets/search.png";
import shoppingIcon from "../components/assets/shoppingbag.png";
import accountIcon from "../components/assets/user.png";
import { useNavigate } from 'react-router-dom'; 

const Navbar = ({ showIcons = true }) => {
  let username = localStorage.getItem('username');
  const navigate = useNavigate();
 
  const getAccount = async(pIcon) => {
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

      if(pIcon == true){
        if(data.account.admin === true){
          navigate('/accountAdmin');
        }else{
          navigate('/accountUser');
        }
      }else{
        if(data.account.admin === true){
          navigate('/deliveryPending');
        }else{
          navigate('/Cart');
        }
      }
    }
    
  }

  const loginPage = () => {
    if(username === null || username === ''){
      navigate('/LoginRegister');
    }else{
      getAccount(true);
    }
  };

  const shoppingPage = () =>{
    getAccount(false);
  }

  return ( 
  	<div className="navbar">
        <div className="leftSide">
            <a href="/"><h2>Mystique Makeup</h2></a>
        </div>
        {showIcons && (
          <div className="rightSide">
            <li><a><img src={shoppingIcon} alt=""onClick={shoppingPage}/></a></li>
            <li><a><img src={accountIcon} alt="" onClick={loginPage}/></a></li>
            <li><a href="/Search"><img src={searchIcon} alt=""/></a></li>
          </div>
        )}
    </div>
  );
};
 
export default Navbar;