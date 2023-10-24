// import
// const categoryController = require('../controllers/categoryController');
// const express = require('express');

import express from 'express';
import { accountController } from '../controllers/accountController';
import { admin } from "../models/DAO/databaseConfig"

// Create a new express app
const app = express();
// App configuration
app.disable('x-powered-by');
app.use(express.json());

// Define port number
const PORT = 5000;

// Define routes

// main route
app.get('/', (req, res) => {
    res.send('Welcome to the Mystique Makeup API!');
});

// new account
app.post('/createAccount', (req, res) => {
    const controller = accountController.getInstanceAccountController();
    const data = req.body;
    controller.createAccount(data.username, data.password, data.email, data.admin);
    res.send('Account created successfully');
});

// get account
app.get('/getAccount', async (req, res) =>{
    const controller = accountController.getInstanceAccountController();
    const data = req.body;
    const account = await controller.getAccount(data.username)
    res.send('GetAccount successfully');
});


// login
app.post('/loginAccount',async (req, res) => {
    const controller = accountController.getInstanceAccountController();
    const data = req.body;
    const isValid = await controller.verifyCredentials(data.username, data.password);
    if (isValid == true) {
        // Si las credenciales son válidas, genera un token de autenticación y envíalo al cliente
        const token = await admin.auth().createCustomToken(data.username);
        res.status(200).send({ token });
      } else {
        res.status(401).send('Unauthorized');
      }
  });



// get all categories
/*app.get('/categories/all', (req, res) => {
    const controller = new categoryController();
    controller.getAllCategories().then((data) => {
    console.log(data)
    res.json(data)
    })
});*/


app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});


/*
const fetchData = async(user, contra) => {
        const newData = await fetch('http://localhost:5000/inicio',{
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                {"subcategory": ["Subprueba1", "Subprueba2"], "name": "PruebaAPI" }
            })
        }).then(res => res.json())
        if(newData.outResult == 0){
            console.log(true)
            navigate("/home")
        }else{
            console.log(false)
            setPasswordError(true);
        }
        
    }
*/