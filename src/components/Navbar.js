import React, { useState } from 'react';
import "../styles/Navbar.css";
import searchIcon from "../components/assets/search.png";
import shoppingIcon from "../components/assets/shoppingbag.png";
import accountIcon from "../components/assets/user.png";
import notificationOffIcon from "../components/assets/NotificationOff.png";
import notificationOnIcon from "../components/assets/NotificationOn.png";
import { useNavigate } from 'react-router-dom'; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



const Navbar = ({ showIcons = true }) => {
  const [notification, setNotification] = useState(null);
  const [isOn, setIsOn] = useState(false);
  const icon = isOn ? notificationOnIcon : notificationOffIcon;
  let username = localStorage.getItem('username');
  console.log(username);
  const navigate = useNavigate();

  const notificationClose = () => {
    setNotification(null);
  };
  
  const notificationOpen = (event) => {
    setNotification(event.currentTarget);
  }

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

      if(pIcon === true){
        if(data.account.admin === true){
          navigate('/accountAdmin');
        }else{
          navigate('/accountUser');
        }
      }else{
        if(data.account.admin === true){
          navigate('/DeliveryPending');
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
            { username && <li><a href="/#"  onClick={notificationOpen}><img src={icon} alt=""/></a></li>}
            <Menu id="simple-menu" notification={notification} keepMounted open={Boolean(notification)} onClose={notificationClose}>
              <MenuItem onClick={notificationClose}>Notificación 3</MenuItem>
            </Menu>
            {username && <li><a><img src={shoppingIcon} alt=""onClick={shoppingPage}/></a></li>}
            <li><a><img src={accountIcon} alt="" onClick={loginPage}/></a></li>
            <li><a href="/Search"><img src={searchIcon} alt=""/></a></li>
          </div>
        )}
    </div>
  );
};
 
export default Navbar;

/*
import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:4000';  // Cambia esto por la URL de tu servidor

const User = ({ username }) => {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('notification', (message) => {
      // Aquí puedes actualizar el estado de tu aplicación para mostrar la notificación
    });
  }, []);

  // ...
};
 */