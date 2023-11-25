import React, { useEffect, useState } from 'react';
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
  const baseAPIurl = 'http://localhost:5000';
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isOn, setIsOn] = useState(false);
  const icon = isOn ? notificationOnIcon : notificationOffIcon;
  let username = localStorage.getItem('username');
  const navigate = useNavigate();

  const notificationClose = () => {
    setNotification(null);
  };
  
  const notificationOpen = (event) => {
    setNotification(event.currentTarget);
  }

  const markNotificationAsRead = async (notification) =>{
    const response = await fetch(baseAPIurl + '/notification/update',{
      method: 'PUT',
      headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
      },
      body: JSON.stringify({
        id: notification.id,
        read: notification.read
      })
    });
    
    if(response.status === 200){
      getNotifications();
    }
  }

  const getAccount = async(pIcon) => {
    const response = await fetch(baseAPIurl + '/getAccount',{
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

  const getNotifications = async() =>{
    const response = await fetch(baseAPIurl + '/get/notifications',{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': username 
      }
    }).then(res => res.json());

    let notificationsListAll = [];

    for (let i = 0; i < response.length; i++) {
      notificationsListAll.push(response[i]);
    }

    setNotifications(notificationsListAll);
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

  useEffect(() => {
    getNotifications();
  }, []);

  useEffect(() => {
    let hasUnreadNotification = false;
    for(let i = 0; i < notifications.length; i++) {
        if(notifications[i].read == false) {
            hasUnreadNotification = true;
            break;
        }
    }

    if(hasUnreadNotification) {
        setIsOn(true);
    } else {
        setIsOn(false);
    }
  }, [notifications]);


  return ( 
  	<div className="navbar">
        <div className="leftSide">
            <a href="/"><h2>Mystique Makeup</h2></a>
        </div>
        {showIcons && (
          <div className="rightSide">
            { username && <li><a href="/#"  onClick={notificationOpen}><img src={icon} alt=""/></a></li>}
            <Menu id="simple-menu" 
            anchorEl={notification} keepMounted open={Boolean(notification)} onClose={notificationClose}
            sx={{ 
              '& .MuiPaper-root': {
                width: '300px', 
                height: '400px', 
              },
            }}>
                {notifications.map((notification, index) => (
                    <MenuItem key={index} 
                    onClick={() => {
                      notificationClose();
                      markNotificationAsRead(notification);
                    }}
                    sx={{
                      display: 'flex',
                      background: notification.read ? '#FFFFFF' : '#9ADE7B',
                      flexDirection: 'column',
                      alignItems: 'start',
                      justifyContent: 'center',
                      borderBottom: '2px solid gray', 
                      wordWrap: 'break-word', // Ajusta las palabras largas
                      whiteSpace: 'normal', // Permite que el texto se ajuste a nuevas líneas
                      '&:last-child': {
                        borderBottom: 'none', // Remueve la línea de la última notificación
                      }
                    }}
                    ><strong>Nueva notificación: </strong><p>{notification.message}</p></MenuItem>
                ))}
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
