// import
// const categoryController = require('../controllers/categoryController');
// const express = require('express');

import express from 'express';
import { categoryController } from '../controllers/categoryController';


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

// get all categories
app.get('/categories/all', (req, res) => {
    const controller = new categoryController();
    controller.getAllCategories().then((data) => {
    console.log(data)
    res.json(data)
    })
});


// post a new category
app.post('/categories', (req, res) => {
    const controller = new categoryController();
    const data = req.body;
    controller.createCategory(data.name, data.subcategory)
    res.send('Category created successfully');
});

// Isaac Endpoints







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